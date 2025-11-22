const TOKEN = '44a3a6dd-4fa7-4fa9-aaf2-8b9da84f9c6d';

export interface Collection {
    _id: number;
    title: string;
    color?: string;
    count: number;
}

export interface Raindrop {
    _id: number;
    title: string;
    link: string;
    description: string;
    cover: string;
    tags: string[];
    created: string;
    collectionId: number;
    domain: string;
}

export async function getCollections(): Promise<Collection[]> {
    try {
        const response = await fetch('https://api.raindrop.io/rest/v1/collections', {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });

        if (!response.ok) return [];
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error fetching collections:', error);
        return [];
    }
}

export async function getRaindrops(collectionId: number = 0): Promise<Raindrop[]> {
    try {
        // Fetching page 0 with 50 items (max per page usually)
        // For a full implementation we might need pagination, but starting with 50 is good.
        const response = await fetch(`https://api.raindrop.io/rest/v1/raindrops/${collectionId}?perpage=50`, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });

        if (!response.ok) return [];
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error fetching raindrops:', error);
        return [];
    }
}
