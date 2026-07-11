import { Jimp } from 'jimp';

async function test() {
  try {
    const image = await Jimp.read('https://avatars.githubusercontent.com/u/1024025?v=4');
    console.log('Read image:', image.bitmap.width, 'x', image.bitmap.height);
    image.resize({ w: 10, h: 10 });
    console.log('Resized:', image.bitmap.width, 'x', image.bitmap.height);
    const color = image.getPixelColor(0, 0);
    // intToRGBA was moved in v1, let's just test if we can read and get pixel color
    console.log('Pixel 0,0:', color);
  } catch (err) {
    console.error('Error:', err);
  }
}

test();
