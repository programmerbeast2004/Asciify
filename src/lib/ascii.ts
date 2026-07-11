import { Jimp } from 'jimp';
import { parseGIF, decompressFrames } from 'gifuct-js';

export interface ColoredChar {
  char: string;
  color: string;
}

export interface AsciiOptions {
  width?: number;
  colorMode?: 'colored' | 'grayscale' | 'sepia';
  density?: 'standard' | 'classic';
}

export async function imageToAscii(imageUrl: string, options: AsciiOptions = {}): Promise<ColoredChar[][][]> {
  const width = options.width || 50;
  const colorMode = options.colorMode || 'colored';
  const density = options.density || 'standard';
  
  const charSet = density === 'classic' ? '@%#*+=-:. ' : '8096543271 ';

  // Helper to process a single RGBA pixel into our ColoredChar
  const processPixel = (r: number, g: number, b: number, a: number): ColoredChar => {
    if (a < 128) {
      return { char: ' ', color: 'transparent' };
    }
    const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
    const charIndex = Math.floor((brightness / 255) * (charSet.length - 1));
    const char = charSet[charIndex] || ' ';
    
    let finalColor = `rgb(${r}, ${g}, ${b})`;
    if (colorMode === 'grayscale') {
      const lum = Math.round(brightness);
      finalColor = `rgb(${lum}, ${lum}, ${lum})`;
    } else if (colorMode === 'sepia') {
      const tr = Math.min(255, Math.round((r * 0.393) + (g * 0.769) + (b * 0.189)));
      const tg = Math.min(255, Math.round((r * 0.349) + (g * 0.686) + (b * 0.168)));
      const tb = Math.min(255, Math.round((r * 0.272) + (g * 0.534) + (b * 0.131)));
      finalColor = `rgb(${tr}, ${tg}, ${tb})`;
    }
    
    return { char, color: finalColor };
  };

  try {
    const isGif = imageUrl.toLowerCase().includes('.gif');
    if (isGif) {
      const response = await fetch(imageUrl);
      const buffer = await response.arrayBuffer();
      
      const gif = parseGIF(buffer);
      const allFrames = decompressFrames(gif, true);
      
      // CRITICAL PERFORMANCE FIX: Limit to max 12 frames to prevent browser freezing
      const MAX_FRAMES = 12;
      const step = Math.max(1, Math.floor(allFrames.length / MAX_FRAMES));
      const frames = allFrames.filter((_, index) => index % step === 0).slice(0, MAX_FRAMES);

      const asciiFrames: ColoredChar[][][] = [];
      
      for (const frame of frames) {
        const { width: fWidth, height: fHeight } = frame.dims;
        const patch = frame.patch;
        const aspectRatio = fWidth / fHeight;
        const outHeight = Math.round(width / aspectRatio * 0.54);
        
        const grid: ColoredChar[][] = [];
        for (let y = 0; y < outHeight; y++) {
          const row: ColoredChar[] = [];
          for (let x = 0; x < width; x++) {
             // Circular mask
             const cx = (width - 1) / 2;
             const cy = (outHeight - 1) / 2;
             const dx = (x - cx) / cx;
             const dy = (y - cy) / cy;
             if (dx * dx + dy * dy > 1) {
               row.push({ char: ' ', color: 'transparent' });
               continue;
             }
             
             // Nearest neighbor sampling
             const srcX = Math.floor((x / width) * fWidth);
             const srcY = Math.floor((y / outHeight) * fHeight);
             const srcIdx = (srcY * fWidth + srcX) * 4;
             
             const r = patch[srcIdx];
             const g = patch[srcIdx + 1];
             const b = patch[srcIdx + 2];
             const a = patch[srcIdx + 3];
             
             row.push(processPixel(r, g, b, a));
          }
          grid.push(row);
        }
        asciiFrames.push(grid);
      }
      return asciiFrames;
    }
  } catch (e) {
    console.warn("Failed to parse GIF, falling back to static processing", e);
  }

  // Static image processing (Jimp)
  const image = await Jimp.read(imageUrl);
  const aspectRatio = image.bitmap.width / image.bitmap.height;
  const height = Math.round(width / aspectRatio * 0.54);
  image.resize({ w: width, h: height });

  const grid: ColoredChar[][] = [];
  for (let y = 0; y < height; y++) {
    const row: ColoredChar[] = [];
    for (let x = 0; x < width; x++) {
      const cx = (width - 1) / 2;
      const cy = (height - 1) / 2;
      const dx = (x - cx) / cx;
      const dy = (y - cy) / cy;
      if (dx * dx + dy * dy > 1) {
        row.push({ char: ' ', color: 'transparent' });
        continue;
      }
      const color = image.getPixelColor(x, y);
      const r = (color >> 24) & 255;
      const g = (color >> 16) & 255;
      const b = (color >> 8) & 255;
      const a = color & 255;
      
      row.push(processPixel(r, g, b, a));
    }
    grid.push(row);
  }
  return [grid];
}
