// Tipos para eventos do calendário
export interface CalendarEvent {
    id: string;
    title: string;
    start: string | Date;
    end?: string | Date;
    allDay?: boolean;
    category: string;
    tags: string[];
    color: string;
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
    description?: string;
    url?: string;
    extendedProps?: {
        category: string;
        tags: string[];
        description?: string;
    };
}

// Categorias e suas cores
export const CATEGORIES = {
    trabalho: {
        name: 'Trabalho',
        color: '#3b82f6', // blue
        bgColor: '#dbeafe',
        borderColor: '#3b82f6',
        textColor: '#1e40af'
    },
    pessoal: {
        name: 'Pessoal',
        color: '#10b981', // green
        bgColor: '#d1fae5',
        borderColor: '#10b981',
        textColor: '#065f46'
    },
    estudos: {
        name: 'Estudos',
        color: '#8b5cf6', // purple
        bgColor: '#ede9fe',
        borderColor: '#8b5cf6',
        textColor: '#5b21b6'
    },
    eventos: {
        name: 'Eventos',
        color: '#f59e0b', // amber
        bgColor: '#fef3c7',
        borderColor: '#f59e0b',
        textColor: '#92400e'
    },
    viagens: {
        name: 'Viagens',
        color: '#ef4444', // red
        bgColor: '#fee2e2',
        borderColor: '#ef4444',
        textColor: '#991b1b'
    },
    saude: {
        name: 'Saúde',
        color: '#ec4899', // pink
        bgColor: '#fce7f3',
        borderColor: '#ec4899',
        textColor: '#9f1239'
    },
    outros: {
        name: 'Outros',
        color: '#6b7280', // gray
        bgColor: '#f3f4f6',
        borderColor: '#6b7280',
        textColor: '#374151'
    }
} as const;

// Tags disponíveis
export const TAGS = [
    'importante',
    'urgente',
    'reunião',
    'deadline',
    'projeto',
    'aprendizado',
    'lazer',
    'família',
    'amigos',
    'saúde',
    'financeiro',
    'criativo'
] as const;

// Função para criar um evento formatado para FullCalendar
export function formatEventForCalendar(event: CalendarEvent): any {
    const categoryConfig = CATEGORIES[event.category as keyof typeof CATEGORIES] || CATEGORIES.outros;
    
    return {
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        allDay: event.allDay ?? false,
        color: event.color || categoryConfig.color,
        backgroundColor: event.backgroundColor || categoryConfig.bgColor,
        borderColor: event.borderColor || categoryConfig.borderColor,
        textColor: event.textColor || categoryConfig.textColor,
        url: event.url,
        extendedProps: {
            category: event.category,
            tags: event.tags || [],
            description: event.description || ''
        }
    };
}

// Função para obter eventos (pode ser expandida para buscar de uma API ou arquivo)
export function getEvents(): CalendarEvent[] {
    // Exemplo de eventos - pode ser substituído por uma chamada de API ou leitura de arquivo
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    return [
        {
            id: '1',
            title: 'Reunião de Equipe',
            start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
            end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 30),
            category: 'trabalho',
            tags: ['importante', 'reunião'],
            color: CATEGORIES.trabalho.color,
            description: 'Reunião semanal com a equipe para alinhamento de projetos'
        },
        {
            id: '2',
            title: 'Aniversário',
            start: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate()),
            allDay: true,
            category: 'pessoal',
            tags: ['família', 'importante'],
            color: CATEGORIES.pessoal.color,
            description: 'Aniversário de alguém especial'
        },
        {
            id: '3',
            title: 'Curso Online',
            start: new Date(nextWeek.getFullYear(), nextWeek.getMonth(), nextWeek.getDate(), 14, 0),
            end: new Date(nextWeek.getFullYear(), nextWeek.getMonth(), nextWeek.getDate(), 16, 0),
            category: 'estudos',
            tags: ['aprendizado', 'projeto'],
            color: CATEGORIES.estudos.color,
            description: 'Aula do curso de desenvolvimento web'
        }
    ];
}


