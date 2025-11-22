import { XMLParser } from 'fast-xml-parser';

const RSS_URL = 'https://bg.raindrop.io/rss/public/63395245';

async function getLinks() {
    try {
        console.log('Fetching RSS...');
        const response = await fetch(RSS_URL);
        const xml = await response.text();
        console.log('XML length:', xml.length);

        const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: "@_"
        });
        const result = parser.parse(xml);

        if (!result.rss || !result.rss.channel || !result.rss.channel.item) {
            console.log('Invalid RSS structure');
            return [];
        }

        let items = result.rss.channel.item;
        if (!Array.isArray(items)) {
            items = [items];
        }
        console.log('Items found:', items.length);

        const links = items.map((item) => {
            try {
                // Extract image from description HTML
                const imgMatch = item.description ? item.description.match(/src="([^"]+)"/) : null;
                const image = imgMatch ? imgMatch[1] : null;

                // Clean description (remove img tag and br tags)
                let description = item.description ? item.description.replace(/<img[^>]*>/, '').replace(/<br\s*\/?>/g, ' ').trim() : '';

                // Tags
                let tags = [];
                if (item.category) {
                    if (Array.isArray(item.category)) {
                        tags = item.category.map((t) => t.trim());
                    } else {
                        tags = [item.category.trim()];
                    }
                }

                const date = new Date(item.pubDate);

                return {
                    title: item.title,
                    link: item.link,
                    description: description,
                    tags: tags,
                    date: date,
                    year: date.getFullYear(),
                    dateString: date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace(' de ', ' ').replace('.', '').toUpperCase(),
                    image: image
                };
            } catch (err) {
                console.error('Error parsing item:', item, err);
                return null;
            }
        }).filter(item => item !== null);

        console.log('Parsed links:', links.length);
        if (links.length > 0) {
            console.log('First link:', links[0]);
        }
        return links;

    } catch (error) {
        console.error('Error fetching Raindrop RSS:', error);
        return [];
    }
}

getLinks();
