const TOKEN = '44a3a6dd-4fa7-4fa9-aaf2-8b9da84f9c6d';

async function testRaindropAPI() {
    try {
        console.log('Fetching Collections...');
        const collectionsRes = await fetch('https://api.raindrop.io/rest/v1/collections', {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });

        if (!collectionsRes.ok) {
            console.error(`Error fetching collections: ${collectionsRes.status} ${collectionsRes.statusText}`);
            const text = await collectionsRes.text();
            console.error(text);
            return;
        }

        const collectionsData = await collectionsRes.json();
        console.log('Collections found:', collectionsData.items.length);
        if (collectionsData.items.length > 0) {
            console.log('First Collection:', JSON.stringify(collectionsData.items[0], null, 2));
        }

        console.log('\nFetching Raindrops (All)...');
        const raindropsRes = await fetch('https://api.raindrop.io/rest/v1/raindrops/0', {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });

        if (!raindropsRes.ok) {
            console.error(`Error fetching raindrops: ${raindropsRes.status} ${raindropsRes.statusText}`);
            return;
        }

        const raindropsData = await raindropsRes.json();
        console.log('Raindrops found:', raindropsData.items.length);
        if (raindropsData.items.length > 0) {
            console.log('First Raindrop:', JSON.stringify(raindropsData.items[0], null, 2));
        }

    } catch (error) {
        console.error('Unexpected error:', error);
    }
}

testRaindropAPI();
