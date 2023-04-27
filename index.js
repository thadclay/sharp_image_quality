import fs from 'node:fs/promises';
import sharp from 'sharp';

const resize = { width: 970, height: 250, scale: 'inside', quality: 92 };

async function bufferAndFileJpeg() {
  const input = './inputs/flowers_v1.jpg'
  const output = './outputs/flowers_v1_file_direct.jpg';
  const output2 = './outputs/flowers_v1_buffer_to_file.jpg';
  const result = await sharp(input)
    .resize({ width: resize.width, height: resize.height, fit: resize.scale })
    .sharpen()
    .jpeg({ quality: resize.quality, chromaSubsampling: '4:4:4' });
  await result.toFile(output);
  const buf = await result.toBuffer({ resolveWithObject: true });
  await sharp(buf.data).toFile(output2);
}

async function bufferAndFilePng() {
  const input = './inputs/flowers_v1.png'
  const output = './outputs/flowers_v1_file_direct.png';
  const output2 = './outputs/flowers_v1_buffer_to_file.png';
  const result = await sharp(input)
    .resize({ width: resize.width, height: resize.height, fit: resize.scale })
    .sharpen()
    .png({ quality: resize.quality });
  await result.toFile(output);
  const buf = await result.toBuffer({ resolveWithObject: true });
  await sharp(buf.data).toFile(output2);
}

await fs.rm('./outputs', { recursive: true, force: true });
await fs.mkdir('./outputs');

await bufferAndFileJpeg();
await bufferAndFilePng();