// Tipos para eventos do calendário
export interface CalendarEvent {
    id: string;
    title: string;
    start: string | Date;
    end?: string | Date;
    allDay?: boolean;
    category: string;
    color: string;
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
    description?: string;
    url?: string;
    extendedProps?: {
        category: string;
        description?: string;
    };
}

// Categorias e suas cores
export const CATEGORIES = {
    marketing: {
        name: 'Marketing',
        color: '#3b82f6', // blue
        bgColor: '#dbeafe',
        borderColor: '#3b82f6',
        textColor: '#1e40af'
    },
    efemerides: {
        name: 'Efemérides',
        color: '#10b981', // green
        bgColor: '#d1fae5',
        borderColor: '#10b981',
        textColor: '#065f46'
    },
    eventos: {
        name: 'Eventos',
        color: '#f59e0b', // amber
        bgColor: '#fef3c7',
        borderColor: '#f59e0b',
        textColor: '#92400e'
    }
} as const;

// Função para criar um evento formatado para FullCalendar
export function formatEventForCalendar(event: CalendarEvent): any {
    const categoryConfig = CATEGORIES[event.category as keyof typeof CATEGORIES] || CATEGORIES.eventos;
    
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
            description: event.description || ''
        }
    };
}

// Função para obter eventos (pode ser expandida para buscar de uma API ou arquivo)
export function getEvents(): CalendarEvent[] {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    return [
        {
            id: '1',
            title: 'Lançamento de Campanha',
            start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
            end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 30),
            category: 'marketing',
            color: CATEGORIES.marketing.color,
            description: 'Lançamento da nova campanha de verão'
        },
        {
            id: '2',
            title: 'Dia da Poesia',
            start: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate()),
            allDay: true,
            category: 'efemerides',
            color: CATEGORIES.efemerides.color,
            description: 'Comemoração internacional'
        },
        {
            id: '3',
            title: 'Feira do Livro',
            start: new Date(nextWeek.getFullYear(), nextWeek.getMonth(), nextWeek.getDate(), 14, 0),
            end: new Date(nextWeek.getFullYear(), nextWeek.getMonth(), nextWeek.getDate(), 18, 0),
            category: 'eventos',
            color: CATEGORIES.eventos.color,
            description: 'Participação na feira local'
        }
    ];
}
