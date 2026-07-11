import { NextRequest, NextResponse } from 'next/server';
import { imageToAscii } from '@/lib/ascii';
import { generateSVG, GithubUserData } from '@/lib/svg';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get('username');
  const customImage = searchParams.get('custom_image');
  const customFont = searchParams.get('card_font');
  const customColor = searchParams.get('text_color');
  
  // 10 new custom visual properties
  const theme = searchParams.get('theme') || 'dark';
  const borderStyle = searchParams.get('border_style') || 'solid';
  const borderColor = searchParams.get('border_color') || 'default';
  const cornerRadius = searchParams.get('corner_radius') || '15';
  const animSpeed = searchParams.get('anim_speed') || '8';
  const bgStyle = searchParams.get('bg_style') || 'solid';
  const fontSize = searchParams.get('font_size') || '16';
  const layoutGap = searchParams.get('layout_gap') || 'normal';
  
  const avatarStyle = searchParams.get('avatar_style') || 'colored';
  const asciiDensity = searchParams.get('ascii_density') || 'standard';

  if (!username && !customImage) {
    return new NextResponse('Username or custom_image parameter is required', { status: 400 });
  }

  try {
    let userData: Partial<GithubUserData> = {
      public_repos: 0,
      followers: 0,
      following: 0,
    };

    if (username) {
      // Fetch GitHub User Data
      const headers: Record<string, string> = {
        'User-Agent': 'ASCII-README-Generator',
      };
      if (process.env.GITHUB_TOKEN) {
        headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
      }
      
      const githubRes = await fetch(`https://api.github.com/users/${username}`, {
        headers,
        next: { revalidate: 3600 } // Cache for 1 hour to prevent rate limiting
      });

      if (githubRes.ok) {
        userData = await githubRes.json();
      }
    }

    // Override with query params allowing full customization without backend
    let finalImageUrl = customImage || userData.avatar_url || 'https://github.com/ghost.png';
    if (finalImageUrl.includes('github.com') && finalImageUrl.includes('/blob/')) {
      finalImageUrl = finalImageUrl.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
    }
    userData.avatar_url = finalImageUrl;
    userData.login = searchParams.get('custom_username') || username || 'Anonymous';
    userData.name = searchParams.get('name') || userData.name || userData.login;
    userData.bio = searchParams.get('bio') || userData.bio || '';
    
    if (searchParams.has('repos')) userData.public_repos = parseInt(searchParams.get('repos') || '0');
    if (searchParams.has('followers')) userData.followers = parseInt(searchParams.get('followers') || '0');
    if (searchParams.has('following')) userData.following = parseInt(searchParams.get('following') || '0');
    if (searchParams.has('company')) userData.company = searchParams.get('company') || '';
    if (searchParams.has('location')) userData.location = searchParams.get('location') || '';

    userData.hide_name = searchParams.get('hide_name') === 'true';
    userData.hide_login = searchParams.get('hide_login') === 'true';
    userData.hide_bio = searchParams.get('hide_bio') === 'true';
    userData.hide_repos = searchParams.get('hide_repos') === 'true';
    userData.hide_followers = searchParams.get('hide_followers') === 'true';
    userData.hide_following = searchParams.get('hide_following') === 'true';
    userData.hide_company = searchParams.get('hide_company') === 'true';
    userData.hide_location = searchParams.get('hide_location') === 'true';

    // Extract up to 5 custom fields
    userData.custom_fields = [];
    for (let i = 1; i <= 5; i++) {
      const key = searchParams.get(`custom_key_${i}`);
      const val = searchParams.get(`custom_val_${i}`);
      if (key && val) {
        userData.custom_fields.push({ key, value: val });
      }
    }

    // Generate ASCII Art from Avatar
    // 70 characters wide to fill the left half better
    const asciiFrames = await imageToAscii(userData.avatar_url!, {
      width: 70,
      colorMode: avatarStyle as 'colored' | 'grayscale' | 'sepia',
      density: asciiDensity as 'standard' | 'classic'
    });

    const svg = generateSVG(asciiFrames, userData as GithubUserData, {
      fontFamily: customFont || undefined,
      textColor: customColor || undefined,
      theme,
      borderStyle,
      borderColor,
      cornerRadius,
      animSpeed,
      bgStyle,
      fontSize,
      layoutGap
    });

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error generating card:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
