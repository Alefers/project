import path from 'node:path';
import sharp from 'sharp';
import glob from 'glob-all';


const imagePaths = glob.sync([
  'apps/dashboard/src/assets/**/*.{jpg,png,jpeg}',
]);

const handleFile = async (input) => {
  try {
    const { dir, name } = path.parse(input);
    const output = path.join(dir, `${name}.webp`);
    await sharp(input)
      .webp({ quality: 100 })
      .toFile(output);
    console.log(`Converted ${input} to ${output}`);
  } catch (err) {
    throw `Error in file: ${input}\n\n${err}`;
  }
};

(() => {
  return Promise.all(imagePaths.map(handleFile)).then(
    (data) => {
      console.log('\x1b[32m', `Converted ${data.length} images`);
    },
  );
})();
