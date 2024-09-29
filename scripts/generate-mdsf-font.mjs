import fs from 'fs';
import path, { dirname } from 'path';
import { exec as execChildProcess } from 'child_process';
import { fileURLToPath } from 'url';

// See https://pmndrs.github.io/uikit/docs/tutorials/custom-fonts.

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Logs title with format:
 * ┌──────────────────────────┐
 * │ This is an example title │
 * └──────────────────────────┘
 */
const logTitle = (title) => {
  console.log(
    `┌${'─'.repeat(title.length + 2)}┐\n│ ${title} │\n└${'─'.repeat(title.length + 2)}┘`
  );
};

const exec = async (title, command) => {
  logTitle(title);

  return new Promise((resolve) => {
    execChildProcess(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command:\n\n${error.message}`);
        return;
      }

      if (stderr) {
        console.error(stderr);
        resolve();
        return;
      }

      console.log(stdout);
      resolve();
    });
  });
};

const fontName = process.argv[2];

if (!fontName) {
  console.error('Please provide a font name.');
  process.exit(1);
}

const projectRoot = path.resolve(__dirname, '../');
const fontPath = path.resolve(projectRoot, 'assets', 'fonts');

const charsetFile = `${fontPath}/charset.txt`;
const fontFile = `${fontPath}/${fontName}.ttf`;
const outputFile = path.resolve(projectRoot, 'public', 'fonts', fontName);

if (!fs.existsSync(fontFile)) {
  console.error(`Font file ${fontFile} does not exist.`);
  process.exit(1);
}

if (!fs.existsSync(charsetFile)) {
  console.error(`Missing ${charsetFile} charset file`);
  process.exit(1);
}

const generatedFontFile = `${fontPath}/generated/${fontName}.ttf`;

// Remove overlaps
await exec(
  'Removing overlaps from font',
  `fontforge -lang=ff -c 'Open($1); SelectAll(); RemoveOverlap(); Generate($2)' ${fontFile} ${generatedFontFile}`
);

// Generate mdsf font
await exec(
  'Generating msdf font',
  `msdf-bmfont -f json ${generatedFontFile} -i ${charsetFile} -m 512,1024 -o ${outputFile} -s 100`
);

logTitle('Success!');
