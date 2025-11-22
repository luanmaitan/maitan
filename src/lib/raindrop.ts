const TOKEN = '44a3a6dd-4fa7-4fa9-aaf2-8b9da84f9c6d';

export interface Collection {
    _id: number;
    title: string;
    color?: string;
    cover?: string[];
    count: number;
}

export interface Raindrop {
    _id: number;
    title: string;
    link: string;
    description: string;
    cover: string;
    tags: string[];
    type: 'link' | 'article' | 'image' | 'video' | 'document' | 'audio';
    important: boolean;
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
        return Array.isArray(data.items) ? data.items : [];
    } catch (error) {
        console.error('Error fetching collections:', error);
        return [];
    }
}

export async function getRaindrops(collectionId: number = 0, search?: string): Promise<Raindrop[]> {
    try {
        let allRaindrops: Raindrop[] = [];
        let page = 0;
        const perPage = 50;
        const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';

        while (true) {
            const response = await fetch(`https://api.raindrop.io/rest/v1/raindrops/${collectionId}?perpage=${perPage}&page=${page}${searchParam}`, {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`
                }
            });

            if (!response.ok) break;

            const data = await response.json();
            const items = Array.isArray(data.items) ? data.items : [];

            allRaindrops = [...allRaindrops, ...items];

            if (items.length < perPage) {
                break;
            }

            page++;
        }

        return allRaindrops;
    } catch (error) {
        console.error('Error fetching raindrops:', error);
        return [];
    }
}
