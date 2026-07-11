const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// Colors
content = content.replace(/text-emerald-400/g, 'text-zinc-200');
content = content.replace(/bg-emerald-500\/20/g, 'bg-white/10');
content = content.replace(/border-emerald-500\/20/g, 'border-white/20');
content = content.replace(/focus:border-emerald-500\/50/g, 'focus:border-white/50');
content = content.replace(/focus:ring-emerald-500\/50/g, 'focus:ring-white/50');

// Navbar buttons
content = content.replace(/bg-emerald-500\/10 text-zinc-200/g, 'bg-white/10 text-white border border-white/20');
content = content.replace(/hover:bg-emerald-500 hover:text-black/g, 'hover:bg-white hover:text-black');
content = content.replace(/shadow-\[0_0_15px_rgba\(16,185,129,0\.1\)\]/g, 'shadow-[0_0_15px_rgba(255,255,255,0.1)]');
content = content.replace(/hover:shadow-\[0_0_25px_rgba\(16,185,129,0\.4\)\]/g, 'hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]');

// Bottom info card
content = content.replace(/bg-emerald-500\/5/g, 'bg-white/5');
content = content.replace(/border-emerald-500\/10/g, 'border-white/10');
content = content.replace(/text-emerald-100\/60/g, 'text-zinc-400');
content = content.replace(/bg-emerald-950\/50/g, 'bg-white/10');
content = content.replace(/border-emerald-900\/50/g, 'border-white/20');

// Make the text-zinc-200 more elegant with gradient in AnimatedLogo
content = content.replace(/text-zinc-200 font-bold text-\[7px\]/g, 'bg-gradient-to-br from-white to-zinc-500 text-transparent bg-clip-text font-bold text-[7px]');

// Background blobs
content = content.replace(/bg-emerald-500\/10/g, 'bg-white/5');
content = content.replace(/bg-cyan-500\/10/g, 'bg-zinc-500/10');
content = content.replace(/scrollbarColor: '#10b981 transparent'/g, "scrollbarColor: '#d4d4d8 transparent'");

fs.writeFileSync('src/app/page.tsx', content);
