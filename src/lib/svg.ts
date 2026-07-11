import { ColoredChar } from './ascii';

export interface GithubUserData {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  company: string;
  location: string;
  custom_fields?: Array<{key: string, value: string}>;
  hide_name?: boolean;
  hide_login?: boolean;
  hide_bio?: boolean;
  hide_repos?: boolean;
  hide_followers?: boolean;
  hide_following?: boolean;
  hide_company?: boolean;
  hide_location?: boolean;
}

interface Segment {
  text: string;
  color: string;
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&apos;').replace(/"/g, '&quot;');
}

export interface SVGCustomOptions {
  fontFamily?: string;
  textColor?: string;
  theme?: string;
  borderStyle?: string;
  borderColor?: string;
  cornerRadius?: string;
  animSpeed?: string;
  bgStyle?: string;
  fontSize?: string;
  layoutGap?: string;
}

// Helper to wrap long text at spaces
function wrapText(text: string, maxLen: number): string[] {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';
  
  for (const word of words) {
    if (currentLine.length === 0) {
      currentLine = word;
    } else if (currentLine.length + word.length + 1 <= maxLen) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine.length > 0) lines.push(currentLine);
  return lines;
}

export function generateSVG(asciiFrames: ColoredChar[][][], user: GithubUserData, options: SVGCustomOptions = {}): string {
  const width = 850;
  const height = 450;

  // Theme Parsing
  const themes: Record<string, any> = {
    dark: { bg: '#0d1117', text: '#c9d1d9', keyword: '#ff7b72', variable: '#79c0ff', stroke: '#30363d' },
    light: { bg: '#ffffff', text: '#24292f', keyword: '#cf222e', variable: '#0550ae', stroke: '#d0d7de' },
    hacker: { bg: '#0a0a0a', text: '#10b981', keyword: '#047857', variable: '#34d399', stroke: '#047857' },
    dracula: { bg: '#282a36', text: '#f8f8f2', keyword: '#ff79c6', variable: '#8be9fd', stroke: '#6272a4' },
    monokai: { bg: '#272822', text: '#f8f8f2', keyword: '#f92672', variable: '#a6e22e', stroke: '#75715e' },
  };
  const theme = themes[options.theme || 'dark'] || themes.dark;
  
  const colors = {
    keyword: theme.keyword,
    variable: theme.variable,
    punctuation: options.textColor || theme.text,
    key: options.textColor || theme.text,
    string: options.textColor || theme.text,
    number: options.textColor || theme.variable,
  };

  // Build the lines of code
  const lines: Segment[][] = [
    [
      { text: 'const ', color: colors.keyword },
      { text: 'developer ', color: colors.variable },
      { text: '= {', color: colors.punctuation },
    ]
  ];

  if (!user.hide_name) {
    lines.push([
      { text: '  name: ', color: colors.key },
      { text: `'${escapeHtml(user.name || user.login)}'`, color: colors.string },
      { text: ',', color: colors.punctuation },
    ]);
  }

  if (!user.hide_login) {
    lines.push([
      { text: '  username: ', color: colors.key },
      { text: `'${escapeHtml(user.login)}'`, color: colors.string },
      { text: ',', color: colors.punctuation },
    ]);
  }

  if (user.bio && !user.hide_bio) {
    const rawBio = escapeHtml(user.bio).replace(/\n/g, ' ');
    // Keep max 150 chars to avoid massive bio blocks
    const truncatedBio = rawBio.length > 150 ? rawBio.substring(0, 150) + '...' : rawBio;
    const bioLines = wrapText(truncatedBio, 38);
    
    if (bioLines.length <= 1) {
      lines.push([
        { text: '  bio: ', color: colors.key },
        { text: `'${bioLines[0] || ''}'`, color: colors.string },
        { text: ',', color: colors.punctuation },
      ]);
    } else {
      lines.push([
        { text: '  bio: ', color: colors.key },
        { text: `'${bioLines[0]} ' +`, color: colors.string },
      ]);
      
      for (let i = 1; i < bioLines.length - 1; i++) {
        lines.push([
          { text: `       '${bioLines[i]} ' +`, color: colors.string },
        ]);
      }
      
      lines.push([
        { text: `       '${bioLines[bioLines.length - 1]}'`, color: colors.string },
        { text: ',', color: colors.punctuation },
      ]);
    }
  }

  if (!user.hide_repos) {
    lines.push([
      { text: '  repos: ', color: colors.key },
      { text: `${user.public_repos}`, color: colors.number },
      { text: ',', color: colors.punctuation },
    ]);
  }

  if (!user.hide_followers) {
    lines.push([
      { text: '  followers: ', color: colors.key },
      { text: `${user.followers}`, color: colors.number },
      { text: ',', color: colors.punctuation },
    ]);
  }

  if (user.company && !user.hide_company) {
    const rawCompany = escapeHtml(user.company);
    const companyLines = wrapText(rawCompany, 38);
    
    if (companyLines.length <= 1) {
      lines.push([
        { text: '  company: ', color: colors.key },
        { text: `'${companyLines[0] || ''}'`, color: colors.string },
        { text: ',', color: colors.punctuation },
      ]);
    } else {
      lines.push([
        { text: '  company: ', color: colors.key },
        { text: `'${companyLines[0]} ' +`, color: colors.string },
      ]);
      for (let i = 1; i < companyLines.length - 1; i++) {
        lines.push([{ text: `           '${companyLines[i]} ' +`, color: colors.string }]);
      }
      lines.push([
        { text: `           '${companyLines[companyLines.length - 1]}'`, color: colors.string },
        { text: ',', color: colors.punctuation },
      ]);
    }
  }

  if (user.location && !user.hide_location) {
    const rawLocation = escapeHtml(user.location);
    const locationLines = wrapText(rawLocation, 38);
    
    if (locationLines.length <= 1) {
      lines.push([
        { text: '  location: ', color: colors.key },
        { text: `'${locationLines[0] || ''}'`, color: colors.string },
        { text: ',', color: colors.punctuation },
      ]);
    } else {
      lines.push([
        { text: '  location: ', color: colors.key },
        { text: `'${locationLines[0]} ' +`, color: colors.string },
      ]);
      for (let i = 1; i < locationLines.length - 1; i++) {
        lines.push([{ text: `            '${locationLines[i]} ' +`, color: colors.string }]);
      }
      lines.push([
        { text: `            '${locationLines[locationLines.length - 1]}'`, color: colors.string },
        { text: ',', color: colors.punctuation },
      ]);
    }
  }

  if (user.custom_fields && user.custom_fields.length > 0) {
    user.custom_fields.forEach(field => {
      if (!field.key || !field.value) return;
      const rawValue = escapeHtml(field.value);
      const valueLines = wrapText(rawValue, 38);
      
      const sanitizedKey = escapeHtml(field.key.replace(/\s+/g, '_').toLowerCase());
      
      if (valueLines.length <= 1) {
        lines.push([
          { text: `  ${sanitizedKey}: `, color: colors.key },
          { text: `'${valueLines[0] || ''}'`, color: colors.string },
          { text: ',', color: colors.punctuation },
        ]);
      } else {
        lines.push([
          { text: `  ${sanitizedKey}: `, color: colors.key },
          { text: `'${valueLines[0]} ' +`, color: colors.string },
        ]);
        const padLen = sanitizedKey.length + 5;
        const padding = ' '.repeat(padLen);
        for (let i = 1; i < valueLines.length - 1; i++) {
          lines.push([{ text: `${padding}'${valueLines[i]} ' +`, color: colors.string }]);
        }
        lines.push([
          { text: `${padding}'${valueLines[valueLines.length - 1]}'`, color: colors.string },
          { text: ',', color: colors.punctuation },
        ]);
      }
    });
  }

  lines.push([
    { text: '};', color: colors.punctuation },
  ]);

  // ASCII art generation
  const asciiFontSize = 9;
  const asciiLineHeight = 10;
  const asciiHeight = (asciiFrames[0]?.length || 0) * asciiLineHeight;
  const asciiStartY = (height - asciiHeight) / 2 + 10;
  
  let asciiContent = '';
  let asciiDefs = '';
  
  let sweepDuration = parseFloat(options.animSpeed || '8');
  let asciiClipPath = '';
  
  if (sweepDuration > 0) {
    asciiDefs += `
      <clipPath id="ascii-sweep">
        <rect x="0" y="0" width="420" height="0">
          <animate attributeName="height" from="0" to="${height}" begin="0s" dur="${sweepDuration}s" fill="freeze" />
        </rect>
      </clipPath>
    `;
    asciiClipPath = `clip-path="url(#ascii-sweep)"`;
  }

  if (asciiFrames.length > 1) {
    const totalDuration = (asciiFrames.length * 0.1).toFixed(2); // ~100ms per frame
    asciiDefs += `\n<style>\n`;
    asciiFrames.forEach((_, i) => {
      asciiDefs += `
        .frame-${i} {
          animation: frame-anim-${i} ${totalDuration}s infinite step-end;
        }
        @keyframes frame-anim-${i} {
          0% { opacity: ${i === 0 ? 1 : 0}; }
          ${((i / asciiFrames.length) * 100).toFixed(2)}% { opacity: 1; }
          ${(((i + 1) / asciiFrames.length) * 100).toFixed(2)}% { opacity: 0; }
          100% { opacity: 0; }
        }
      `;
    });
    asciiDefs += `\n</style>\n`;
  }

  asciiContent += `<g ${asciiClipPath}>\n`;

  asciiFrames.forEach((grid, frameIdx) => {
    const frameClass = asciiFrames.length > 1 ? `class="frame-${frameIdx}"` : '';
    const frameStyle = asciiFrames.length > 1 && frameIdx > 0 ? 'style="opacity:0;"' : '';
    asciiContent += `<g ${frameClass} ${frameStyle}>\n`;
    
    grid.forEach((row, y) => {
      const yPos = asciiStartY + y * asciiLineHeight;
      asciiContent += `<text x="30" y="${yPos}" font-family="'Courier New', monospace" font-size="${asciiFontSize}px" font-weight="900" xml:space="preserve">`;
      
      // CRITICAL PERFORMANCE FIX: Merge adjacent characters of the same color
      let currentColor = '';
      let currentText = '';
      
      const flushText = () => {
        if (currentText) {
          asciiContent += `<tspan fill="${currentColor}">${currentText}</tspan>`;
        }
      };

      row.forEach(cell => {
        const char = cell.char === ' ' ? '&#160;' : escapeHtml(cell.char);
        if (cell.color !== currentColor) {
          flushText();
          currentColor = cell.color;
          currentText = char;
        } else {
          currentText += char;
        }
      });
      flushText();
      
      asciiContent += `</text>\n`;
    });
    
    asciiContent += `</g>\n`;
  });

  asciiContent += `</g>\n`;

  // Text generation
  let textContent = '';
  const startX = 420;
  const startY = 80;
  
  let lineHeight = 30;
  if (options.layoutGap === 'compact') lineHeight = 24;
  if (options.layoutGap === 'relaxed') lineHeight = 36;
  
  const fontSize = options.fontSize || '16';
  const fontToUse = options.fontFamily || "'Courier New', Courier, monospace";

  lines.forEach((segments, index) => {
    const y = startY + index * lineHeight;
    textContent += `<text x="${startX}" y="${y}" font-family="${fontToUse}" font-size="${fontSize}px" font-weight="bold" xml:space="preserve">`;
    
    segments.forEach(seg => {
      textContent += `<tspan fill="${seg.color}">${seg.text.replace(/ /g, '&#160;')}</tspan>`;
    });
    
    textContent += `</text>\n`;
  });

  // Border & Background parsing
  const borderColors: Record<string, string> = {
    default: theme.stroke,
    emerald: '#10b981',
    cyan: '#06b6d4',
    purple: '#a855f7',
    crimson: '#e11d48'
  };
  const strokeColor = borderColors[options.borderColor || 'default'] || theme.stroke;
  
  let strokeDasharray = '';
  if (options.borderStyle === 'dashed') strokeDasharray = 'stroke-dasharray="10, 10"';
  if (options.borderStyle === 'dotted') strokeDasharray = 'stroke-dasharray="4, 4" stroke-linecap="round"';
  const strokeWidth = options.borderStyle === 'none' ? '0' : '2';
  
  const rx = options.cornerRadius || '15';
  
  let fillOpacity = '1.0';
  if (options.bgStyle === 'glass') fillOpacity = '0.7';
  if (options.bgStyle === 'transparent') fillOpacity = '0.0';

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${asciiDefs}
    <style>
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      .cursor {
        animation: blink 1s step-end infinite;
      }
    </style>
  </defs>
  
  <rect width="${width}" height="${height}" rx="${rx}" fill="${theme.bg}" fill-opacity="${fillOpacity}" stroke="${strokeColor}" stroke-width="${strokeWidth}" ${strokeDasharray}/>
  
  <!-- ASCII Art Section -->
  <g>
    ${asciiContent}
  </g>

  <!-- Typewriter Text Section -->
  <g>
    ${textContent}
  </g>
</svg>`;
}
