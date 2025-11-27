const TOKEN = process.env.RAINDROP_TOKEN;

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
            return;
        }

        const collectionsData = await collectionsRes.json();
        console.log('Collections found:', collectionsData.items.length);

        collectionsData.items.forEach(c => {
            console.log(`ID: ${c._id}, Title: ${c.title}, Cover:`, JSON.stringify(c.cover));
        });

    } catch (error) {
        console.error('Unexpected error:', error);
    }
}

testRaindropAPI();
