import { NextRequest, NextResponse } from 'next/server';
import { generateLeetcodeSVG } from '@/lib/leetcode-svg';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get('username');
  
  if (!username) {
    return new NextResponse('Username parameter is required', { status: 400 });
  }

  const theme = searchParams.get('theme') || 'dark';
  const showBadges = searchParams.get('show_badges') !== 'false';
  const animateBadges = searchParams.get('animate_badges') !== 'false';
  const showGraph = searchParams.get('show_graph') !== 'false';

  try {
    const lcQuery = `
      query getUserProfile($username: String!) {
        allQuestionsCount {
          difficulty
          count
        }
        matchedUser(username: $username) {
          profile {
            ranking
            reputation
          }
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
          badges {
            name
            icon
            creationDate
          }
        }
        calendarUser: matchedUser(username: $username) {
          userCalendar(year: 2023) {
            activeYears
            streak
            totalActiveDays
            submissionCalendar
          }
        }
        userContestRanking(username: $username) {
          rating
          globalRanking
          attendedContestsCount
          topPercentage
        }
        userContestRankingHistory(username: $username) {
          rating
          contest {
            startTime
          }
        }
      }
    `;
    const lcRes = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com'
      },
      body: JSON.stringify({
        query: lcQuery,
        variables: { username }
      }),
      next: { revalidate: 3600 }
    });

    if (!lcRes.ok) {
      return new NextResponse('Error fetching LeetCode data', { status: 500 });
    }

    const lcData = await lcRes.json();
    if (!lcData?.data?.matchedUser) {
      return new NextResponse('LeetCode User not found', { status: 404 });
    }

    const { matchedUser, calendarUser, userContestRanking, allQuestionsCount, userContestRankingHistory } = lcData.data;
    const stats = matchedUser.submitStats?.acSubmissionNum || [];
    
    let all = 0, easy = 0, medium = 0, hard = 0;
    let totalAll = 0, totalEasy = 0, totalMedium = 0, totalHard = 0;
    
    for (const stat of stats) {
      if (stat.difficulty === 'All') all = stat.count;
      if (stat.difficulty === 'Easy') easy = stat.count;
      if (stat.difficulty === 'Medium') medium = stat.count;
      if (stat.difficulty === 'Hard') hard = stat.count;
    }

    if (allQuestionsCount) {
      for (const stat of allQuestionsCount) {
        if (stat.difficulty === 'All') totalAll = stat.count;
        if (stat.difficulty === 'Easy') totalEasy = stat.count;
        if (stat.difficulty === 'Medium') totalMedium = stat.count;
        if (stat.difficulty === 'Hard') totalHard = stat.count;
      }
    }

    let submissionCalendar = {};
    if (calendarUser?.userCalendar?.submissionCalendar) {
      try {
        submissionCalendar = JSON.parse(calendarUser.userCalendar.submissionCalendar);
      } catch (e) {
        console.error("Failed to parse submission calendar");
      }
    }

    // Convert badge images to base64 to avoid SVG external image blocking
    let badges = matchedUser.badges || [];
    
    // Sort badges by creationDate (newest first)
    badges = badges.sort((a: any, b: any) => {
      const dateA = a.creationDate ? new Date(a.creationDate).getTime() : 0;
      const dateB = b.creationDate ? new Date(b.creationDate).getTime() : 0;
      return dateB - dateA;
    });
    
    const topBadges = badges.slice(0, 4);
    const base64Badges = [];
    if (showBadges) {
      for (const b of topBadges) {
        let iconUrl = b.icon;
        if (iconUrl.startsWith('/')) iconUrl = 'https://leetcode.com' + iconUrl;
        try {
          const imgRes = await fetch(iconUrl);
          if (imgRes.ok) {
            const arrayBuffer = await imgRes.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const base64 = buffer.toString('base64');
            const contentType = imgRes.headers.get('content-type') || 'image/png';
            base64Badges.push({
              name: b.name,
              icon: `data:${contentType};base64,${base64}`,
              creationDate: b.creationDate
            });
          }
        } catch (e) {
          console.error('Failed to fetch badge image:', e);
        }
      }
    }

    const data = {
      username,
      solved: { all, easy, medium, hard },
      totals: { all: totalAll, easy: totalEasy, medium: totalMedium, hard: totalHard },
      ranking: matchedUser.profile?.ranking || 0,
      reputation: matchedUser.profile?.reputation || 0,
      rating: userContestRanking?.rating || null,
      globalRanking: userContestRanking?.globalRanking || null,
      attendedContestsCount: userContestRanking?.attendedContestsCount || 0,
      topPercentage: userContestRanking?.topPercentage || null,
      contestHistory: userContestRankingHistory ? userContestRankingHistory.map((h: any) => ({
        rating: h.rating,
        startTime: h.contest?.startTime
      })) : [],
      badges: base64Badges,
      calendar: calendarUser?.userCalendar ? {
        activeYears: calendarUser.userCalendar.activeYears || [],
        streak: calendarUser.userCalendar.streak || 0,
        totalActiveDays: calendarUser.userCalendar.totalActiveDays || 0,
        submissionCalendar
      } : undefined
    };

    const svg = generateLeetcodeSVG(data, {
      theme,
      showBadges,
      animateBadges,
      showGraph,
      fontFamily: searchParams.get('font_family') || undefined,
      textColor: searchParams.get('text_color') || undefined,
      borderStyle: searchParams.get('border_style') || undefined,
      borderColor: searchParams.get('border_color') || undefined,
      cornerRadius: searchParams.get('corner_radius') || undefined,
      bgStyle: searchParams.get('bg_style') || undefined,
      fontSize: searchParams.get('font_size') || undefined,
    });

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error generating leetcode card:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
