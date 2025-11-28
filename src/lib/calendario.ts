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
    },
    feriados: {
        name: 'Feriados',
        color: '#ef4444', // red
        bgColor: '#fee2e2',
        borderColor: '#ef4444',
        textColor: '#991b1b'
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

// Feriados Nacionais e de São Paulo para 2025
const HOLIDAYS_2025 = [
    { date: '2025-01-01', title: 'Confraternização Universal' },
    { date: '2025-01-25', title: 'Aniversário de São Paulo' },
    { date: '2025-03-03', title: 'Carnaval' },
    { date: '2025-03-04', title: 'Carnaval' },
    { date: '2025-04-18', title: 'Paixão de Cristo' },
    { date: '2025-04-21', title: 'Tiradentes' },
    { date: '2025-05-01', title: 'Dia do Trabalho' },
    { date: '2025-06-19', title: 'Corpus Christi' },
    { date: '2025-07-09', title: 'Revolução Constitucionalista' },
    { date: '2025-09-07', title: 'Independência do Brasil' },
    { date: '2025-10-12', title: 'Nossa Senhora Aparecida' },
    { date: '2025-11-02', title: 'Finados' },
    { date: '2025-11-15', title: 'Proclamação da República' },
    { date: '2025-11-20', title: 'Dia da Consciência Negra' },
    { date: '2025-12-25', title: 'Natal' }
];

// Função para obter eventos (pode ser expandida para buscar de uma API ou arquivo)
export function getEvents(): CalendarEvent[] {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const events: CalendarEvent[] = [
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

    // Adiciona feriados
    HOLIDAYS_2025.forEach((holiday, index) => {
        // Ajusta o fuso horário para garantir que a data fique correta
        const holidayDate = new Date(holiday.date + 'T00:00:00');
        
        events.push({
            id: `holiday-${index}`,
            title: holiday.title,
            start: holidayDate,
            allDay: true,
            category: 'feriados',
            color: CATEGORIES.feriados.color,
            backgroundColor: CATEGORIES.feriados.bgColor,
            borderColor: CATEGORIES.feriados.borderColor,
            textColor: CATEGORIES.feriados.textColor,
            description: 'Feriado Nacional ou Regional'
        });
    });

    return events;
}
