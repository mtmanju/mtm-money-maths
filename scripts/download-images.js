import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = [
  {
    url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
    filename: 'financial-calculator-1.jpg',
    description: 'Modern financial calculator on desk (Unsplash)'
  },
  {
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    filename: 'financial-dashboard-1.jpg',
    description: 'Financial dashboard with charts (Unsplash)'
  },
  {
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    filename: 'investment-analysis-1.jpg',
    description: 'Investment analysis workspace (Unsplash)'
  },
  {
    url: 'https://unsplash.com/photos/black-and-white-texas-instruments-calculator-3xwrg7Vv6Ts/download?force=true',
    filename: 'calculator-bw.jpg',
    description: 'Black and white Texas Instruments calculator (Unsplash)'
  },
  {
    url: 'https://unsplash.com/photos/a-calculator-sitting-on-top-of-a-piece-of-paper-ySZdYkPGEbs/download?force=true',
    filename: 'calculator-on-paper.jpg',
    description: 'Calculator sitting on top of a piece of paper (Unsplash)'
  }
];

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const filepath = path.join(__dirname, '../src/images', filename);
    const file = fs.createWriteStream(filepath);

    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
};

const downloadAllImages = async () => {
  try {
    // Create images directory if it doesn't exist
    const imagesDir = path.join(__dirname, '../src/images');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    // Create a README.md file with image descriptions
    const readmeContent = `# Financial Calculator Images\n\nThis directory contains high-quality images used in the financial calculator application.\n\n## Images\n\n${images.map(img => `- \`${img.filename}\`: ${img.description}`).join('\n')}\n\n## Usage\n\nThese images are used in various parts of the application:\n- Hero section\n- Feature cards\n- Calculator interfaces\n- Dashboard visualizations\n\n## Credits\n\nImages are sourced from Unsplash.\n`;

    fs.writeFileSync(path.join(imagesDir, 'README.md'), readmeContent);
    console.log('Created README.md with image descriptions');

    // Download all images
    for (const image of images) {
      await downloadImage(image.url, image.filename);
    }
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
};

downloadAllImages(); 