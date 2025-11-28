import { getCollection } from 'astro:content';

export interface Quote {
    text: string;
    author: string;
    source?: string;
    tags: string[];
}

// Função para atribuir tags baseada no conteúdo e nome do arquivo
function assignTags(fileName: string, text: string, author: string): string[] {
    const tags: string[] = [];
    const lowerText = text.toLowerCase();
    const lowerFileName = fileName.toLowerCase();
    const lowerAuthor = author.toLowerCase();

    // Tags baseadas no nome do arquivo
    if (lowerFileName.includes('arte') || lowerFileName.includes('percepções')) tags.push('arte');
    if (lowerFileName.includes('guerra') || lowerFileName.includes('paz')) tags.push('política');
    if (lowerFileName.includes('morte')) tags.push('morte');
    if (lowerFileName.includes('vida') || lowerFileName.includes('obra de arte')) tags.push('vida');
    if (lowerFileName.includes('escritor') || lowerFileName.includes('escrita')) tags.push('escrita');
    if (lowerFileName.includes('literatura')) tags.push('literatura');
    if (lowerFileName.includes('poesia') || lowerFileName.includes('poema')) tags.push('poesia');
    if (lowerFileName.includes('tempo')) tags.push('tempo');
    if (lowerFileName.includes('liberdade') || lowerFileName.includes('livre')) tags.push('liberdade');
    if (lowerFileName.includes('amor')) tags.push('amor');
    if (lowerFileName.includes('ciência') || lowerFileName.includes('ciencia')) tags.push('ciência');
    if (lowerFileName.includes('filosofia') || lowerFileName.includes('filosófico')) tags.push('filosofia');
    if (lowerFileName.includes('labirinto')) tags.push('filosofia');
    if (lowerFileName.includes('trauma')) tags.push('trauma');
    if (lowerFileName.includes('ódio') || lowerFileName.includes('odio')) tags.push('emoção');
    if (lowerFileName.includes('falhar') || lowerFileName.includes('fracasso')) tags.push('resiliência');
    if (lowerFileName.includes('homem lúcido') || lowerFileName.includes('homem lucido')) tags.push('filosofia', 'sabedoria');
    if (lowerFileName.includes('ideal')) tags.push('poesia');
    if (lowerFileName.includes('livro')) tags.push('literatura');
    if (lowerFileName.includes('real')) tags.push('filosofia');
    if (lowerFileName.includes('entediar') || lowerFileName.includes('segredo')) tags.push('escrita');
    if (lowerFileName.includes('profundidade') || lowerFileName.includes('superfície') || lowerFileName.includes('superficie')) tags.push('filosofia');
    if (lowerFileName.includes('destino')) tags.push('filosofia');
    if (lowerFileName.includes('não deve nada') || lowerFileName.includes('nao deve nada')) tags.push('liberdade', 'filosofia');

    // Tags baseadas no conteúdo
    if (/arte|artístico|percepção|estética/i.test(text)) tags.push('arte');
    if (/filosofia|filosófico|pensamento|pensar|pensar o impensável/i.test(text)) tags.push('filosofia');
    if (/literatura|livro|ler|leitura|escritor|escrever|escrita/i.test(text)) tags.push('literatura');
    if (/poesia|poema|verso|poético/i.test(text)) tags.push('poesia');
    if (/morte|morrer|morre|morto/i.test(text)) tags.push('morte');
    if (/vida|viver|existir|existência/i.test(text)) tags.push('vida');
    if (/tempo|temporal|momento|instante/i.test(text)) tags.push('tempo');
    if (/liberdade|livre|livrar|libertar/i.test(text)) tags.push('liberdade');
    if (/amor|amar|amante|amoroso/i.test(text)) tags.push('amor');
    if (/ciência|científico|progresso/i.test(text)) tags.push('ciência');
    if (/política|político|guerra|paz|pobre|rico/i.test(text)) tags.push('política');
    if (/escrita|escrever|escritor|palavra|texto/i.test(text)) tags.push('escrita');
    if (/falhar|fracasso|fracassar|derrota/i.test(text)) tags.push('resiliência');
    if (/trauma|holocausto|auschwitz|sofrimento/i.test(text)) tags.push('trauma');
    if (/paixão|emoção|sentimento/i.test(text)) tags.push('emoção');
    if (/sabedoria|sábio|lúcido|equilíbrio/i.test(text)) tags.push('sabedoria');
    if (/criatividade|criar|invenção|inovador/i.test(text)) tags.push('criatividade');
    if (/valores|ética|moral/i.test(text)) tags.push('ética');

    // Tags baseadas no autor
    if (/deleuze|foucault|montaigne|spinoza|aristóteles|sócrates/i.test(lowerAuthor)) tags.push('filosofia');
    if (/beckett|proust|borges|hemingway|lessing|babel|gombrowicz|houellebecq|pamuk/i.test(lowerAuthor)) tags.push('literatura');
    if (/mallarmé|rimbaud|pey|medusa|arrigucci|tavares|helder/i.test(lowerAuthor)) tags.push('poesia');
    if (/couto|ribeiro|alvim|kehl|klinger|bosco/i.test(lowerAuthor)) tags.push('literatura');
    if (/einstein|shakespeare|voltaire|camus|baudelaire/i.test(lowerAuthor)) tags.push('literatura');

    // Remove duplicatas e retorna
    return Array.from(new Set(tags));
}

// Função para remover links no formato [[nome]]
function removeWikiLinks(text: string): string {
    return text.replace(/\[\[([^\]]+)\]\]/g, '$1');
}

// Função para extrair autor do texto (geralmente no final entre [[nome]])
function extractAuthor(text: string): { author: string; remainingText: string } {
    // Procura por padrões como [[Nome]] no final (pode ter múltiplos autores)
    // Pega o último [[nome]] que não seja parte de uma referência de fonte
    const allLinks = [...text.matchAll(/\[\[([^\]]+)\]\]/g)];
    
    if (allLinks.length > 0) {
        // Pega o último link que não está em contexto de "Citado em", "de", etc.
        for (let i = allLinks.length - 1; i >= 0; i--) {
            const match = allLinks[i];
            const linkText = match[1];
            const beforeLink = text.substring(0, match.index || 0);
            const afterLink = text.substring((match.index || 0) + match[0].length);
            
            // Se não está em contexto de fonte (Citado em, de, em), provavelmente é o autor
            const isSourceContext = /Citado em|,\s*de\s+\[\[|,\s*em\s+\[\[|p\.\s*\d+/i.test(beforeLink.slice(-30));
            
            // Se está sozinho em uma linha ou no final, provavelmente é o autor
            const isAlone = /^\s*$/.test(afterLink) || afterLink.trim().length === 0;
            
            if (!isSourceContext && (isAlone || i === allLinks.length - 1)) {
                const author = linkText;
                // Remove este link e tudo após ele
                const remainingText = text.substring(0, match.index || 0).trim();
                return { author, remainingText };
            }
        }
        
        // Se não encontrou, pega o último link mesmo assim (fallback)
        const lastMatch = allLinks[allLinks.length - 1];
        const author = lastMatch[1];
        const remainingText = text.substring(0, lastMatch.index || 0).trim();
        return { author, remainingText };
    }
    
    return { author: '', remainingText: text };
}

// Função para extrair fonte (geralmente após o autor)
function extractSource(text: string): { source?: string; remainingText: string } {
    // Procura por padrões como "Citado em", "de", "em", etc.
    const sourcePatterns = [
        /Citado em\s+\[\[([^\]]+)\]\](?:\s*,\s*de\s+\[\[([^\]]+)\]\])?/i,
        /,\s*de\s+\[\[([^\]]+)\]\]/i,
        /,\s*em\s+\[\[([^\]]+)\]\]/i,
        /\[\[([^\]]+)\]\],?\s*p\.?\s*(\d+)/i,
        /\[\[([^\]]+)\]\],?\s*page\s*(\d+)/i,
    ];

    for (const pattern of sourcePatterns) {
        const match = text.match(pattern);
        if (match) {
            let source = match[1] || match[0];
            // Se tem segundo grupo (como "Citado em X, de Y"), combina
            if (match[2]) {
                source = `${match[1]}, de ${match[2]}`;
            }
            // Se tem página
            if (match[3]) {
                source = `${source}, p. ${match[3]}`;
            }
            const remainingText = text.replace(pattern, '').trim();
            return { source, remainingText };
        }
    }

    // Procura por referências no formato [[nome]], p. 123 (já coberto acima, mas mantém para segurança)
    const refMatch = text.match(/\[\[([^\]]+)\]\],?\s*p\.?\s*(\d+)/i);
    if (refMatch) {
        const source = `${refMatch[1]}, p. ${refMatch[2]}`;
        const remainingText = text.replace(/\[\[([^\]]+)\]\],?\s*p\.?\s*(\d+)/i, '').trim();
        return { source, remainingText };
    }

    return { remainingText: text };
}

// Função para processar o conteúdo da citação
function processQuoteContent(content: string, id: string): Quote | null {
    try {
        // Remove a primeira linha se for [[Citações]] ou ⮪ [[Citações]]
        let text = content.replace(/^[⮪\s]*\[\[Citações\]\]\s*\n?/i, '').trim();
        
        // Remove linhas vazias no início e fim
        text = text.replace(/^\s*\n+|\n+\s*$/g, '').trim();
        
        if (!text) return null;

        // Remove metadata no final (como ⧗&ensp;26 novembro 2024)
        text = text.replace(/<span class="metadata">.*?<\/span>/gs, '').trim();
        
        // Remove imagens e links externos
        text = text.replace(/!\[.*?\]\(.*?\)/g, '').trim();
        text = text.replace(/\[\[([^\]]+)\]\]#page=\d+[^\]]*\]\]/g, '[[$1]]');
        
        // Processa o texto
        let processedText = text;
        
        // Extrai fonte primeiro (pode estar antes do autor)
        const { source, remainingText: textAfterSource } = extractSource(processedText);
        
        // Extrai autor (geralmente o último [[nome]] que não seja fonte)
        const { author, remainingText: quoteText } = extractAuthor(textAfterSource);
        
        // Limpa o texto da citação
        let cleanText = quoteText
            .replace(/^>+\s*/, '') // Remove blockquotes
            .replace(/\n{3,}/g, '\n\n') // Remove múltiplas quebras de linha
            .replace(/^\s*_([^_]+)_\s*$/gm, '$1') // Remove itálicos simples
            .trim();

        // Remove links wiki do texto, mas mantém o texto
        cleanText = removeWikiLinks(cleanText);
        
        // Remove linhas que são apenas links
        cleanText = cleanText.split('\n')
            .filter(line => {
                const trimmed = line.trim();
                // Remove linhas que são apenas links wiki
                if (/^\[\[.*\]\]$/.test(trimmed)) return false;
                // Remove linhas vazias excessivas
                return trimmed.length > 0;
            })
            .join('\n')
            .trim();

        // Se não encontrou autor, tenta procurar no final novamente
        if (!author) {
            // Procura por padrões como "— Nome" ou "Nome" no final
            const authorPatterns = [
                /—\s*\[\[([^\]]+)\]\]/,
                /—\s*([^\n]+)$/,
                /\[\[([^\]]+)\]\]\s*$/,
            ];
            
            for (const pattern of authorPatterns) {
                const match = cleanText.match(pattern);
                if (match) {
                    const foundAuthor = match[1] || match[0];
                    cleanText = cleanText.replace(pattern, '').trim();
                    const tags = assignTags(id, cleanText, foundAuthor);
                    return {
                        text: cleanText,
                        author: foundAuthor,
                        source,
                        tags,
                    };
                }
            }
        }

        // Se ainda não tem autor mas tem texto, tenta extrair do nome do arquivo ou usar "Desconhecido"
        if (!author && cleanText) {
            // Tenta extrair do nome do arquivo (id)
            // Decodifica URI caso o ID venha com caracteres encoded
            const fileName = decodeURIComponent(id);
            // Se o nome do arquivo contém "por" ou "-", pode ser o autor
            const authorFromFile = fileName.match(/(?:por|de|-)\s*(.+)$/i);
            if (authorFromFile) {
                const tags = assignTags(fileName, cleanText, authorFromFile[1].trim());
                return {
                    text: cleanText,
                    author: authorFromFile[1].trim(),
                    source,
                    tags,
                };
            }
        }

        // Se não tem texto válido, retorna null
        if (!cleanText || cleanText.length < 10) return null;

        // Atribui tags baseadas no conteúdo
        const fileName = decodeURIComponent(id);
        const tags = assignTags(fileName, cleanText, author || '');

        return {
            text: cleanText,
            author: author || 'Desconhecido',
            source,
            tags,
        };
    } catch (error) {
        console.error(`Erro ao processar citação ${id}:`, error);
        return null;
    }
}

// Função para ler todas as citações usando Content Collections
export async function getQuotes(): Promise<Quote[]> {
    try {
        // @ts-ignore - 'citacoes' collection is created dynamically
        const collection = await getCollection('citacoes');
        
        if (!collection || collection.length === 0) {
            return [];
        }

        const quotes: Quote[] = [];

        for (const item of collection) {
            const quote = processQuoteContent(item.body, item.id);
            if (quote && quote.text && quote.author) {
                quotes.push(quote);
            }
        }

        return quotes;
    } catch (error) {
        console.error('Erro ao ler citações:', error);
        return [];
    }
}
