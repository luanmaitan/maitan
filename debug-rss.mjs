import { XMLParser } from 'fast-xml-parser';

const RSS_URL = 'https://letterboxd.com/lmaitan/rss/';

async function getMovies() {
    try {
        console.log(`Fetching ${RSS_URL}...`);
        const response = await fetch(RSS_URL);
        if (!response.ok) {
            console.error(`Failed to fetch: ${response.status} ${response.statusText}`);
            return;
        }
        const xml = await response.text();
        console.log('XML fetched (first 500 chars):', xml.substring(0, 500));

        const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: "@_"
        });
        const result = parser.parse(xml);

        // Log the structure to see where 'item' is
        console.log('Parsed Root Keys:', Object.keys(result));
        if (result.rss) {
            console.log('RSS Keys:', Object.keys(result.rss));
            if (result.rss.channel) {
                console.log('Channel Keys:', Object.keys(result.rss.channel));
                if (result.rss.channel.item) {
                    console.log('Item count:', result.rss.channel.item.length);
                    console.log('First Item:', JSON.stringify(result.rss.channel.item[0], null, 2));
                } else {
                    console.log('No items found in channel');
                }
            } else {
                console.log('No channel found in rss');
            }
        } else {
            console.log('No rss found in result');
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

getMovies();
