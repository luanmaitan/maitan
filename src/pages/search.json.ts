import { getCollection } from 'astro:content';

export async function GET() {
  // 1. Get collection content
  const escritorio = await getCollection('escritorio');
  
  // 2. Define static pages
  const staticPages = [
    {
      slug: '/',
      title: 'Início',
      description: 'Jardim digital, portfolio e laboratório.',
      category: 'página'
    },
    {
      slug: '/sobre-mim',
      title: 'Sobre Mim',
      description: 'Testemunho e trajetória pessoal.',
      category: 'página'
    },
    {
      slug: '/curriculo',
      title: 'Currículo',
      description: 'Experiência profissional e formação.',
      category: 'página'
    },
    {
      slug: '/portfolio',
      title: 'Portfólio',
      description: 'Trabalhos selecionados.',
      category: 'página'
    },
    {
      slug: '/laboratorio',
      title: 'Laboratório',
      description: 'Experimentos digitais e ferramentas.',
      category: 'página'
    },
    {
        slug: '/observatorio',
        title: 'Observatório',
        description: 'Filmes, livros, links e citações.',
        category: 'página'
    },
    {
        slug: '/escritorio',
        title: 'Escritório',
        description: 'Ensaios, dramaturgia, poesia e textos em desenvolvimento.',
        category: 'página'
    },
    {
        slug: '/colophon',
        title: 'Colophon',
        description: 'Detalhes técnicos e design system.',
        category: 'página'
    },
    {
        slug: '/policy',
        title: 'Políticas',
        description: 'Privacidade, termos e licença.',
        category: 'página'
    }
  ];

  // 3. Map collection items to search format
  const collectionItems = escritorio.map((item) => ({
    slug: `/notas/${item.slug}`,
    title: item.data.title,
    description: item.data.description,
    category: item.data.category || 'nota',
    content: item.body // For full content search if desired
  }));

  // 4. Combine
  const searchIndex = [...staticPages, ...collectionItems];

  return new Response(JSON.stringify(searchIndex), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

