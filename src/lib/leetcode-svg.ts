interface LeetcodeData {
  username: string;
  solved: {
    all: number;
    easy: number;
    medium: number;
    hard: number;
  };
  totals: {
    all: number;
    easy: number;
    medium: number;
    hard: number;
  };
  ranking: number;
  reputation: number;
  rating: number | null;
  globalRanking: number | null;
  attendedContestsCount: number;
  topPercentage: number | null;
  contestHistory: Array<{
    rating: number;
    startTime: number;
  }>;
  badges: Array<{
    name: string;
    icon: string;
    creationDate: string;
  }>;
  calendar?: {
    activeYears: number[];
    streak: number;
    totalActiveDays: number;
    submissionCalendar: Record<string, number>;
  };
}

export interface SVGCustomOptions {
  theme?: string;
  showBadges?: boolean;
  animateBadges?: boolean;
  showGraph?: boolean;
  
  fontFamily?: string;
  textColor?: string;
  borderStyle?: string;
  borderColor?: string;
  cornerRadius?: string;
  bgStyle?: string;
  fontSize?: string;
}

export function generateLeetcodeSVG(data: LeetcodeData, opt: SVGCustomOptions): string {
  const width = 600;
  // Calculate total height based on elements shown
  // Base stats (circle + bars + contest stats + graph) = 400
  // Badges card (if shown) = 220
  // Badges card (if shown) = 180
  const showBadges = opt.showBadges !== false && data.badges.length > 0;
  const height = 400 + (showBadges ? 180 : 0);
  
  // Theme Parsing matching github
  const themes: Record<string, any> = {
    dark: { bg: '#0d1117', text: '#c9d1d9', keyword: '#ff7b72', variable: '#79c0ff', stroke: '#30363d', accent: '#58a6ff' },
    light: { bg: '#ffffff', text: '#24292f', keyword: '#cf222e', variable: '#0550ae', stroke: '#d0d7de', accent: '#0969da' },
    hacker: { bg: '#0a0a0a', text: '#10b981', keyword: '#047857', variable: '#34d399', stroke: '#047857', accent: '#10b981' },
    dracula: { bg: '#282a36', text: '#f8f8f2', keyword: '#ff79c6', variable: '#8be9fd', stroke: '#6272a4', accent: '#bd93f9' },
    monokai: { bg: '#272822', text: '#f8f8f2', keyword: '#f92672', variable: '#a6e22e', stroke: '#75715e', accent: '#fd971f' },
  };
  const theme = themes[opt.theme || 'dark'] || themes.dark;
  
  let userTextColor = opt.textColor;
  if (userTextColor && /^[0-9A-Fa-f]{3,8}$/.test(userTextColor)) {
    userTextColor = userTextColor.startsWith('#') ? userTextColor : `#${userTextColor}`;
  }
  const textColor = userTextColor || theme.text;
  const fontToUse = opt.fontFamily || '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

  const lcColors = { 
    easy: '#31C392', 
    medium: '#F6B638', 
    hard: '#E84A5F', 
    orange: '#F9A826',
    borderLight: theme.stroke,
    accent: theme.accent,
    textMuted: theme.stroke
  };

  let defs = `
    <style>
      .title { font-family: ${fontToUse}; font-size: ${opt.fontSize ? parseInt(opt.fontSize) + 6 : 22}px; font-weight: 700; fill: ${textColor}; }
      .text { font-family: ${fontToUse}; fill: ${textColor}; font-size: ${opt.fontSize || 16}px; }
      .text-muted { font-family: ${fontToUse}; fill: ${textColor}; opacity: 0.7; font-size: ${opt.fontSize ? parseInt(opt.fontSize) - 2 : 14}px; }
      .bold { font-weight: 700; }
      .small { font-size: ${opt.fontSize ? parseInt(opt.fontSize) - 4 : 12}px; }
      ${opt.animateBadges !== false ? `
      .badge-container { transform-origin: 0 0; animation: spinY 6s infinite; }
      .badge-front { animation: front-vis 6s linear infinite; }
      .badge-back { animation: back-vis 6s linear infinite; }
      
      @keyframes spinY {
        0%, 5%    { transform: perspective(600px) rotateY(0deg); animation-timing-function: ease-in-out; }
        45%, 55%  { transform: perspective(600px) rotateY(180deg); animation-timing-function: ease-in-out; }
        95%, 100% { transform: perspective(600px) rotateY(360deg); animation-timing-function: ease-in-out; }
      }
      @keyframes front-vis {
        0%, 24.99% { opacity: 1; }
        25%, 74.99% { opacity: 0; }
        75%, 100% { opacity: 1; }
      }
      @keyframes back-vis {
        0%, 24.99% { opacity: 0; }
        25%, 74.99% { opacity: 1; }
        75%, 100% { opacity: 0; }
      }
      ` : `
      .badge-container { transform-origin: 0px 0px; }
      .badge-back { display: none; }
      `}
      
      /* Progress bar animations */
      @keyframes expandWidth { from { width: 0; } }
      .bar-fill { animation: expandWidth 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
      @keyframes drawCircleAll { from { stroke-dashoffset: 339.29; } }
      .progress-circle { animation: drawCircleAll 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
    </style>
    <linearGradient id="circle-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${lcColors.easy}" />
      <stop offset="50%" stop-color="${lcColors.medium}" />
      <stop offset="100%" stop-color="${lcColors.hard}" />
    </linearGradient>
    <mask id="progress-mask">
      <circle cx="55" cy="55" r="54" fill="none" stroke="white" stroke-width="8" stroke-dasharray="339.29" stroke-dashoffset="${339.29 - (data.solved.all / Math.max(data.totals.all || 1, 1)) * 339.29}" transform="rotate(-90 55 55)" class="progress-circle" />
    </mask>
    <filter id="silver-silhouette">
      <feColorMatrix type="matrix" values="
        0 0 0 0 0.7
        0 0 0 0 0.7
        0 0 0 0 0.7
        0 0 0 1 0
      " />
    </filter>
  `;

  // Border & Background parsing matching GitHub
  const borderColors: Record<string, string> = {
    default: theme.stroke,
    emerald: '#10b981',
    cyan: '#06b6d4',
    purple: '#a855f7',
    crimson: '#e11d48'
  };
  const strokeColor = borderColors[opt.borderColor || 'default'] || theme.stroke;
  
  let strokeDasharray = '';
  if (opt.borderStyle === 'dashed') strokeDasharray = 'stroke-dasharray="10, 10"';
  if (opt.borderStyle === 'dotted') strokeDasharray = 'stroke-dasharray="4, 4" stroke-linecap="round"';
  const strokeWidth = opt.borderStyle === 'none' ? '0' : '2';
  
  const rx = opt.cornerRadius || '15';
  
  let fillOpacity = '1.0';
  if (opt.bgStyle === 'glass') fillOpacity = '0.7';
  if (opt.bgStyle === 'transparent') fillOpacity = '0.0';

  // --- TOP CARD (Stats & Graph) ---
  let content = `
    <!-- Top Card Background -->
    <rect x="0" y="0" width="${width}" height="${showBadges ? height : 400}" rx="${rx}" fill="${theme.bg}" fill-opacity="${fillOpacity}" stroke="${strokeColor}" stroke-width="${strokeWidth}" ${strokeDasharray} />
    
    <!-- Header (Logo + Username + Rank) -->
    <g transform="translate(30, 35)">
      <!-- LeetCode Logo (Official) -->
      <g transform="scale(1.1) translate(0, -3)">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" fill="${lcColors.orange}"/>
      </g>
      
      <text x="35" y="15" class="title">${data.username}</text>
      <text x="${width - 60}" y="15" class="text-muted bold" text-anchor="end" font-size="14px">#${data.ranking}</text>
    </g>

    <!-- Top Left: Giant Circle -->
    <g transform="translate(60, 110)">
      <circle cx="55" cy="55" r="54" fill="none" stroke="${lcColors.borderLight}" stroke-width="5" stroke-dasharray="4 4" stroke-linecap="butt" opacity="0.3" />
      <circle cx="55" cy="55" r="54" fill="none" stroke="url(#circle-gradient)" stroke-width="5" stroke-dasharray="4 4" stroke-linecap="butt" mask="url(#progress-mask)" />
      <text x="55" y="48" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" class="text bold" font-size="${opt.fontSize ? parseInt(opt.fontSize) + 12 : 32}px">${data.solved.all}</text>
      <text x="55" y="70" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" class="text-muted" font-size="12px">Solved</text>
    </g>
    
    <!-- Top Right: Progress Bars -->
    <g transform="translate(200, 85)">
  `;

  const drawBar = (label: string, solved: number, total: number, y: number, color: string) => {
    const p = total > 0 ? (solved / total) * 100 : 0;
    const barWidth = 350;
    const filledWidth = (p / 100) * barWidth;
    return `
      <text x="0" y="${y}" class="text bold" fill="${lcColors.accent}" font-size="15px">${label}</text>
      <text x="${barWidth}" y="${y}" class="text-muted bold" font-size="13px" text-anchor="end">${solved} / ${total}</text>
      <rect x="0" y="${y + 10}" width="${barWidth}" height="6" rx="3" fill="${lcColors.borderLight}" />
      <rect x="0" y="${y + 10}" width="${filledWidth}" height="6" rx="3" fill="${color}" class="bar-fill" />
    `;
  };

  content += drawBar('Easy', data.solved.easy, data.totals.easy || 0, 0, lcColors.easy);
  content += drawBar('Medium', data.solved.medium, data.totals.medium || 0, 45, lcColors.medium);
  content += drawBar('Hard', data.solved.hard, data.totals.hard || 0, 90, lcColors.hard);
  content += `</g>`;

  // Separator
  content += `<line x1="30" y1="240" x2="${width - 30}" y2="240" stroke="${lcColors.accent}" stroke-opacity="0.4" stroke-width="1" />`;

  // Contest Stats Row
  const highestRating = data.contestHistory?.length > 0 
    ? Math.max(...data.contestHistory.map(h => h.rating))
    : data.rating;

  content += `
    <g transform="translate(30, 265)">
      <!-- Col 1 -->
      <text x="0" y="0" class="text-muted small">Contest Rating</text>
      <text x="0" y="25" class="text bold" fill="${textColor}" font-size="${opt.fontSize ? parseInt(opt.fontSize) + 12 : 28}px">${Math.round(data.rating || 0)}</text>
      
      <!-- Col 2 -->
      <text x="160" y="0" class="text-muted small">Highest Rating</text>
      <text x="160" y="25" class="text bold" fill="${textColor}" font-size="${opt.fontSize ? parseInt(opt.fontSize) + 12 : 28}px">${Math.round(highestRating || 0)}</text>
      
      <!-- Col 3 -->
      <text x="${width - 60}" y="0" class="text-muted small" text-anchor="end">${data.globalRanking || '?'} / ${Math.round((data.globalRanking || 1) / ((data.topPercentage || 1) / 100))}</text>
      <text x="${width - 60}" y="25" class="text bold" fill="${textColor}" font-size="${opt.fontSize ? parseInt(opt.fontSize) + 12 : 28}px" text-anchor="end">${data.topPercentage ? data.topPercentage.toFixed(2) : '?'}%</text>
    </g>
  `;

  // Rating History Line Graph
  if (data.contestHistory && data.contestHistory.length > 1 && opt.showGraph) {
    const graphWidth = width - 60;
    const graphHeight = 70;
    const gx = 30;
    const gy = 310;
    
    let minR = Math.min(...data.contestHistory.map(h => h.rating));
    let maxR = Math.max(...data.contestHistory.map(h => h.rating));
    if (minR === maxR) { minR -= 100; maxR += 100; }
    
    // Add padding to graph bounds
    const yPad = (maxR - minR) * 0.1;
    minR -= yPad;
    maxR += yPad;
    
    const scaleY = (r: number) => graphHeight - ((r - minR) / (maxR - minR)) * graphHeight;
    const scaleX = (idx: number) => (idx / (data.contestHistory.length - 1)) * graphWidth;

    let points = data.contestHistory.map((h, i) => `${scaleX(i)},${scaleY(h.rating)}`).join(' ');

    content += `
      <g transform="translate(${gx}, ${gy})">
        <!-- Horizontal Grid Lines (rough approximations) -->
        <line x1="0" y1="${graphHeight * 0.25}" x2="${graphWidth}" y2="${graphHeight * 0.25}" stroke="${lcColors.borderLight}" stroke-opacity="0.3" />
        <line x1="0" y1="${graphHeight * 0.75}" x2="${graphWidth}" y2="${graphHeight * 0.75}" stroke="${lcColors.borderLight}" stroke-opacity="0.3" />
        
        <text x="-5" y="${graphHeight * 0.25 + 4}" class="text-muted small" text-anchor="end" font-size="10px">${Math.round(maxR - yPad * 2.5)}</text>
        <text x="-5" y="${graphHeight * 0.75 + 4}" class="text-muted small" text-anchor="end" font-size="10px">${Math.round(minR + yPad * 2.5)}</text>
        
        <!-- Graph Line -->
        <polyline points="${points}" fill="none" stroke="${lcColors.accent}" stroke-width="2" />
        
        <!-- X Axis Labels (first and last dates) -->
        <text x="0" y="${graphHeight + 15}" class="text-muted small" font-size="10px">${new Date(data.contestHistory[0].startTime * 1000).toISOString().slice(0,7).replace('-','/')}</text>
        <text x="${graphWidth}" y="${graphHeight + 15}" class="text-muted small" text-anchor="end" font-size="10px">${new Date(data.contestHistory[data.contestHistory.length-1].startTime * 1000).toISOString().slice(0,7).replace('-','/')}</text>
      </g>
    `;
  }

  // --- BOTTOM CARD (Badges) ---
  if (showBadges) {
    content += `
      <g transform="translate(30, 430)">
        <!-- LeetCode Logo (Official) -->
        <g transform="scale(1.1) translate(0, -3)">
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" fill="${lcColors.orange}"/>
        </g>
        
        <text x="35" y="15" class="title">Badges</text>
      </g>
    `;

    // Render Badges
    const maxBadges = Math.min(data.badges.length, 4);
    const spacing = (width - 60) / maxBadges;
    for (let i = 0; i < maxBadges; i++) {
      const b = data.badges[i];
      const bx = 30 + (i * spacing) + (spacing / 2);
      const by = 500;
      
      let badgeName = b.name;
      if (badgeName.length > 15) badgeName = badgeName.slice(0,13) + '...';

      content += `
        <g transform="translate(${bx}, ${by})">
          <g class="${opt.animateBadges ? 'badge-container' : ''}" style="animation-delay: ${i * 0.2}s">
            
            <!-- Back Face (mirrored so it looks correct when container is scaled by -1) -->
            <g class="badge-back" transform="scale(-1, 1)">
              <!-- Silhouette of the exact same badge shape in silver -->
              <image href="${b.icon}" x="-35" y="-35" width="70" height="70" filter="url(#silver-silhouette)" />
              <!-- Dark Silver LeetCode Logo -->
              <g transform="scale(0.6) translate(-12, -12)">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" fill="#4a4a4a"/>
              </g>
            </g>
            
            <!-- Front Face -->
            <g class="badge-front">
              <image href="${b.icon}" x="-35" y="-35" width="70" height="70" />
            </g>
          </g>
          <text x="0" y="55" class="text bold" font-size="13px" text-anchor="middle">${badgeName}</text>
          ${b.creationDate ? `<text x="0" y="75" class="text-muted" font-size="12px" text-anchor="middle">${b.creationDate}</text>` : ''}
        </g>
      `;
    }
  }

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  ${defs}
  ${content}
</svg>`;
}
