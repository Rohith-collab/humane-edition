// Script to download face-api.js models
// Run this with: node scripts/download-models.js

const https = require('https');
const fs = require('fs');
const path = require('path');

const MODEL_BASE_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights';
const MODELS_DIR = path.join(__dirname, '../public/models');

const models = [
  'tiny_face_detector_model-weights_manifest.json',
  'tiny_face_detector_model-shard1',
  'face_expression_model-weights_manifest.json', 
  'face_expression_model-shard1',
  'face_landmark_68_model-weights_manifest.json',
  'face_landmark_68_model-shard1'
];

// Create models directory if it doesn't exist
if (!fs.existsSync(MODELS_DIR)) {
  fs.mkdirSync(MODELS_DIR, { recursive: true });
  console.log('Created models directory:', MODELS_DIR);
}

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${path.basename(filepath)}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file on error
      reject(err);
    });
  });
}

async function downloadModels() {
  console.log('Downloading face-api.js models...');
  
  try {
    for (const model of models) {
      const url = `${MODEL_BASE_URL}/${model}`;
      const filepath = path.join(MODELS_DIR, model);
      
      // Check if file already exists
      if (fs.existsSync(filepath)) {
        console.log(`Skipping ${model} (already exists)`);
        continue;
      }
      
      await downloadFile(url, filepath);
    }
    
    console.log('All models downloaded successfully!');
    console.log('Models are available in:', MODELS_DIR);
  } catch (error) {
    console.error('Error downloading models:', error);
  }
}

// Run if called directly
if (require.main === module) {
  downloadModels();
}

module.exports = { downloadModels };
