
import fs from 'fs';
import path from 'path';

const SOURCE_DIR = '/Users/luanmaitan/Library/CloudStorage/OneDrive-Pessoal/Biblioteca/cofre/index/citações';
const DEST_DIR = path.join(process.cwd(), 'src/content/citacoes');

if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`Source directory not found: ${SOURCE_DIR}`);
    process.exit(1);
}

if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
}

const files = fs.readdirSync(SOURCE_DIR);
const markdownFiles = files.filter(file => file.endsWith('.md'));

console.log(`Found ${markdownFiles.length} files to import.`);

let copied = 0;
for (const file of markdownFiles) {
    const srcPath = path.join(SOURCE_DIR, file);
    const destPath = path.join(DEST_DIR, file);
    
    try {
        fs.copyFileSync(srcPath, destPath);
        copied++;
    } catch (err) {
        console.error(`Error copying ${file}:`, err);
    }
}

console.log(`Successfully imported ${copied} files to ${DEST_DIR}`);

