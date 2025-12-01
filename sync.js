// sync.js
import chokidar from 'chokidar';
import fs from 'fs-extra';
import path from 'path';
import 'dotenv/config';

// 1. Configuração
const SOURCE = process.env.OBSIDIAN_PATH;
const TARGET = './src/content/escritorio'; // Ajustado para sua pasta correta

// Verifica se o caminho foi definido
if (!SOURCE) {
    console.log('\x1b[33m%s\x1b[0m', '⚠️  OBSIDIAN_PATH não definido no .env. Pulando sincronização.');
    process.exit(0);
}

const isWatch = process.argv.includes('--watch');

// Verifica se a pasta de destino existe, se não, cria
fs.ensureDirSync(TARGET);

console.log('\x1b[36m%s\x1b[0m', `👁️  Vigiando pasta: ${SOURCE}`);
console.log('\x1b[36m%s\x1b[0m', `📂 Sincronizando para: ${TARGET}`);

// 2. Inicializa o Observador
const watcher = chokidar.watch(SOURCE, {
    persistent: isWatch,
    ignoreInitial: false, // Copia arquivos já existentes ao iniciar
    awaitWriteFinish: {
        stabilityThreshold: 2000, // Espera 2s após você parar de digitar para copiar (evita cópias corrompidas)
        pollInterval: 100
    },
    ignored: /(^|[\/\\])\../ // Ignora arquivos ocultos (.git, .DS_Store, etc)
});

// 3. Define as Ações
watcher
    .on('add', filePath => copyFile(filePath))
    .on('change', filePath => copyFile(filePath))
    .on('unlink', filePath => removeFile(filePath))
    .on('error', error => console.error(`Erro no observador: ${error}`))
    .on('ready', () => {
        if (!isWatch) {
            console.log('\x1b[32m%s\x1b[0m', '✨ Sincronização inicial concluída.');
            watcher.close();
        }
    });

// Funções Auxiliares
async function copyFile(filePath) {
    // Mantém a estrutura de pastas relativa à origem
    const relativePath = path.relative(SOURCE, filePath);

    // Ignora arquivos de sistema ou ocultos (redundância de segurança)
    if (relativePath.startsWith('.') || relativePath.includes('/.')) return;

    const destination = path.join(TARGET, relativePath);

    try {
        // Se for arquivo Markdown, processa o Frontmatter
        if (filePath.endsWith('.md')) {
            let content = await fs.readFile(filePath, 'utf8');

            // Verifica se tem frontmatter (--- no início)
            if (!content.trim().startsWith('---')) {
                const fileName = path.basename(filePath, '.md');
                const defaultFrontmatter = `---
title: "${fileName}"
pubDate: ${new Date().toISOString()}
tags: []
category: "ensaios"
---

`;
                content = defaultFrontmatter + content;
                console.log('\x1b[33m%s\x1b[0m', `⚠️  Frontmatter adicionado: ${relativePath}`);
            }

            await fs.outputFile(destination, content);
        } else {
            // Outros arquivos (imagens, etc) apenas copia
            await fs.copy(filePath, destination);
        }

        // Mensagem verde de sucesso
        console.log('\x1b[32m%s\x1b[0m', `✨ Sincronizado: ${relativePath}`);
    } catch (err) {
        console.error(`Erro ao copiar ${relativePath}:`, err);
    }
}

async function removeFile(filePath) {
    const relativePath = path.relative(SOURCE, filePath);
    const destination = path.join(TARGET, relativePath);

    try {
        await fs.remove(destination);
        // Mensagem amarela de remoção
        console.log('\x1b[33m%s\x1b[0m', `🗑️  Removido: ${relativePath}`);
    } catch (err) {
        console.error(`Erro ao deletar ${relativePath}:`, err);
    }
}
