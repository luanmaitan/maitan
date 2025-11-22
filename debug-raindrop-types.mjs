const TOKEN = '44a3a6dd-4fa7-4fa9-aaf2-8b9da84f9c6d';

async function testRaindropTypes() {
    try {
        console.log('Fetching Raindrops...');
        const raindropsRes = await fetch('https://api.raindrop.io/rest/v1/raindrops/0?perpage=50', {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });

        if (!raindropsRes.ok) {
            console.error(`Error fetching raindrops: ${raindropsRes.status}`);
            return;
        }

        const data = await raindropsRes.json();
        console.log('Raindrops found:', data.items.length);

        // Analyze types and importance
        const types = {};
        let importantCount = 0;

        data.items.forEach(item => {
            // Count types
            types[item.type] = (types[item.type] || 0) + 1;

            // Count important
            if (item.important) importantCount++;

            // Log sample of each type
            if (types[item.type] === 1) {
                console.log(`Sample ${item.type}:`, JSON.stringify(item, null, 2));
            }
        });

        console.log('\nType Distribution:', types);
        console.log('Important Count:', importantCount);

    } catch (error) {
        console.error('Unexpected error:', error);
    }
}

testRaindropTypes();
