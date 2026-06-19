import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const replacementMap = {
  'bg-zinc-950': 'bg-white',
  'bg-zinc-900': 'bg-zinc-50',
  'bg-zinc-800': 'bg-zinc-100',
  'bg-zinc-700': 'bg-zinc-200',
  
  'border-zinc-900': 'border-zinc-200',
  'border-zinc-800': 'border-zinc-200',
  'border-zinc-700': 'border-zinc-300',
  'border-zinc-600': 'border-zinc-400',
  
  'text-zinc-100': 'text-zinc-900',
  'text-zinc-200': 'text-zinc-800',
  'text-zinc-300': 'text-zinc-700',
  'text-zinc-400': 'text-zinc-600',
  'text-zinc-500': 'text-zinc-500',
  
  'text-white': 'text-zinc-900',
  'bg-black': 'bg-white',
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  for (const [darkClass, lightClass] of Object.entries(replacementMap)) {
    const regex = new RegExp(`((?:[^\\s"'\`{]+:)+)?\\b(${darkClass})(/\\d+|/\\[.*?\\])?\\b`, 'g');
    
    content = content.replace(regex, (match, pseudo, baseClass, opacity) => {
      if (pseudo && pseudo.includes('dark:')) return match;
      if (match.includes('dark:')) return match;
      
      const p = pseudo || '';
      const op = opacity || '';
      return `${p}${lightClass}${op} dark:${p}${baseClass}${op}`;
    });
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

console.log("Starting theme migration via Vite...");
walkDir(path.join(__dirname, 'src'));
console.log("Migration complete!");
