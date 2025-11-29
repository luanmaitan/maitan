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

// Algoritmo para calcular a data da Páscoa (Meeus/Jones/Butcher)
function getEaster(year: number): Date {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31) - 1; // 0-indexed (March is 2, April is 3)
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    
    return new Date(year, month, day);
}

// Gera feriados para um ano específico
function generateHolidaysForYear(year: number): Array<{ date: Date, title: string }> {
    const holidays = [
        // Feriados Fixos
        { date: new Date(year, 0, 1), title: 'Confraternização Universal' },
        { date: new Date(year, 0, 25), title: 'Aniversário de São Paulo' },
        { date: new Date(year, 3, 21), title: 'Tiradentes' },
        { date: new Date(year, 4, 1), title: 'Dia do Trabalho' },
        { date: new Date(year, 6, 9), title: 'Revolução Constitucionalista' },
        { date: new Date(year, 8, 7), title: 'Independência do Brasil' },
        { date: new Date(year, 9, 12), title: 'Nossa Senhora Aparecida' },
        { date: new Date(year, 10, 2), title: 'Finados' },
        { date: new Date(year, 10, 15), title: 'Proclamação da República' },
        { date: new Date(year, 10, 20), title: 'Dia da Consciência Negra' },
        { date: new Date(year, 11, 25), title: 'Natal' }
    ];

    // Feriados Móveis (baseados na Páscoa)
    const easter = getEaster(year);
    
    // Carnaval (47 dias antes da Páscoa - Terça)
    // Create new Date instance to avoid reference issues
    const carnival = new Date(easter.getTime());
    carnaval.setDate(easter.getDate() - 47);
    holidays.push({ date: carnival, title: 'Carnaval' });
    
    // Segunda de Carnaval
    const carnivalMonday = new Date(carnaval.getTime());
    carnavalMonday.setDate(carnaval.getDate() - 1);
    holidays.push({ date: carnivalMonday, title: 'Carnaval' });

    // Paixão de Cristo (2 dias antes da Páscoa)
    const goodFriday = new Date(easter.getTime());
    goodFriday.setDate(easter.getDate() - 2);
    holidays.push({ date: goodFriday, title: 'Paixão de Cristo' });

    // Corpus Christi (60 dias após a Páscoa)
    const corpusChristi = new Date(easter.getTime());
    corpusChristi.setDate(easter.getDate() + 60);
    holidays.push({ date: corpusChristi, title: 'Corpus Christi' });

    return holidays;
}

// Função para obter eventos
export function getEvents(): CalendarEvent[] {
    const today = new Date();
    const currentYear = today.getFullYear();
    
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
            start: new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()), // Approx 1 month from now for demo
            allDay: true,
            category: 'efemerides',
            color: CATEGORIES.efemerides.color,
            description: 'Comemoração internacional'
        },
        {
            id: '3',
            title: 'Feira do Livro',
            start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7, 14, 0),
            end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7, 18, 0),
            category: 'eventos',
            color: CATEGORIES.eventos.color,
            description: 'Participação na feira local'
        }
    ];

    // Gera feriados para o ano anterior, atual e próximo (para garantir cobertura na navegação)
    const yearsToGenerate = [currentYear - 1, currentYear, currentYear + 1, currentYear + 2];
    
    yearsToGenerate.forEach(year => {
        const holidays = generateHolidaysForYear(year);
        
        holidays.forEach((holiday, index) => {
            events.push({
                id: `holiday-${year}-${index}`,
                title: holiday.title,
                start: holiday.date,
                allDay: true,
                category: 'feriados',
                color: CATEGORIES.feriados.color,
                backgroundColor: CATEGORIES.feriados.bgColor,
                borderColor: CATEGORIES.feriados.borderColor,
                textColor: CATEGORIES.feriados.textColor,
                description: 'Feriado Nacional ou Regional'
            });
        });
    });

    return events;
}
