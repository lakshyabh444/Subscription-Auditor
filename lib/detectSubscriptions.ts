
import Papa from 'papaparse';

export interface Subscription {
    id: string;
    date: string;
    description: string;
    amount: number;
    category: string;
    icon?: string;
}

export interface ParseResult {
    subscriptions: Subscription[];
    totalSpend: number;
    rawCount: number;
}

interface SubscriptionRule {
    name: string;
    patterns: string[];
    category: string;
}

const SUBSCRIPTION_RULES: SubscriptionRule[] = [
    // Entertainment
    { name: 'Netflix', patterns: ['netflix'], category: 'Entertainment' },
    { name: 'Spotify', patterns: ['spotify'], category: 'Entertainment' },
    { name: 'Amazon Prime', patterns: ['prime video', 'amazon prime', 'amzn digital', 'amazon video'], category: 'Entertainment' },
    { name: 'YouTube Premium', patterns: ['youtube', 'google *youtube'], category: 'Entertainment' },
    { name: 'Disney+ Hotstar', patterns: ['hotstar', 'disney plus'], category: 'Entertainment' },
    { name: 'SonyLIV', patterns: ['sonyliv'], category: 'Entertainment' },
    { name: 'Apple Services', patterns: ['apple.com/bill', 'itunes'], category: 'Entertainment' },

    // Food & Travel
    { name: 'Zomato', patterns: ['zomato'], category: 'Food & Travel' },
    { name: 'Swiggy', patterns: ['swiggy'], category: 'Food & Travel' },
    { name: 'Uber', patterns: ['uber', 'uber trip'], category: 'Food & Travel' },
    { name: 'Ola', patterns: ['ola cabs', 'olacabs'], category: 'Food & Travel' },
    { name: 'Rapido', patterns: ['rapido'], category: 'Food & Travel' },

    // Utilities
    { name: 'Jio', patterns: ['jio', 'reliance jio'], category: 'Utilities' },
    { name: 'Airtel', patterns: ['airtel'], category: 'Utilities' },
    { name: 'Vi', patterns: ['vodafone', 'vi prepaid', 'vi postpaid'], category: 'Utilities' },
    { name: 'Bescom', patterns: ['bescom'], category: 'Utilities' },
    { name: 'Act Fibernet', patterns: ['act fibernet', 'act broadband'], category: 'Utilities' },

    // Finance
    { name: 'Cred', patterns: ['cred club', 'cred.'], category: 'Finance' },
    { name: 'Zerodha', patterns: ['zerodha'], category: 'Finance' },
    { name: 'Groww', patterns: ['groww'], category: 'Finance' },

    // Software
    { name: 'Adobe', patterns: ['adobe'], category: 'Software' },
    { name: 'Google One', patterns: ['google one', 'google storage'], category: 'Software' },
    { name: 'Microsoft 365', patterns: ['microsoft*365', 'msft'], category: 'Software' },
];

const normalizeText = (text: string): string => {
    return text.toLowerCase().trim();
};

const formatDate = (dateStr: string): string => {
    if (!dateStr) return 'Unknown Date';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;

    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }).format(date);
};

export const detectSubscriptions = (file: File): Promise<ParseResult> => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const subscriptions: Subscription[] = [];
                let totalSpend = 0;
                const data = results.data as any[];

                data.forEach((row, index) => {
                    // Identify columns
                    const amountKey = Object.keys(row).find(k => /amount|debit|value|cost/i.test(k));
                    const descKey = Object.keys(row).find(k => /desc|memo|narrative|detail/i.test(k));
                    const dateKey = Object.keys(row).find(k => /date/i.test(k));

                    const rawDescription = descKey ? row[descKey] : Object.values(row).join(' ');
                    const description = normalizeText(rawDescription || '');

                    let amount = 0;
                    if (amountKey) {
                        const val = row[amountKey];
                        const cleaned = String(val).replace(/[^0-9.-]+/g, '');
                        amount = parseFloat(cleaned);
                    } else {
                        // Fallback
                        const values = Object.values(row);
                        for (const v of values) {
                            if (typeof v === 'string' || typeof v === 'number') {
                                const cleaned = String(v).replace(/[^0-9.-]+/g, '');
                                const n = parseFloat(cleaned);
                                if (!isNaN(n) && Math.abs(n) > 0) {
                                    // heuristic likely amount if we can't find column
                                }
                            }
                        }
                    }

                    // Force positive amount for spend
                    const absAmount = Math.abs(amount || 0);

                    if (absAmount > 0) {
                        const match = SUBSCRIPTION_RULES.find(rule =>
                            rule.patterns.some(pattern => description.includes(pattern))
                        );

                        if (match) {
                            const sub: Subscription = {
                                id: `sub-${index}-${Date.now()}`,
                                date: dateKey ? formatDate(row[dateKey]) : 'Unknown Date',
                                description: match.name, // Use clean display name
                                amount: absAmount,
                                category: match.category
                            };
                            subscriptions.push(sub);
                            totalSpend += sub.amount;
                        }
                    }
                });

                resolve({
                    subscriptions,
                    totalSpend,
                    rawCount: data.length
                });
            },
            error: (error) => {
                reject(error);
            }
        });
    });
};

export const getDemoData = (): ParseResult => {
    const demoSubs: Subscription[] = [
        { id: '1', date: 'Jan 12, 2024', description: 'Netflix Premium', amount: 649.00, category: 'Entertainment' },
        { id: '2', date: 'Jan 15, 2024', description: 'Zomato Gold', amount: 99.00, category: 'Food & Travel' },
        { id: '3', date: 'Jan 18, 2024', description: 'Jio Prepaid', amount: 399.00, category: 'Utilities' },
        { id: '4', date: 'Jan 20, 2024', description: 'Spotify Duo', amount: 149.00, category: 'Entertainment' },
        { id: '5', date: 'Jan 25, 2024', description: 'Uber Trip', amount: 245.50, category: 'Food & Travel' },
        { id: '6', date: 'Jan 28, 2024', description: 'Cred Membership', amount: 0.00, category: 'Finance' }, // Example of tracking even 0 cost or membership
    ];

    return {
        subscriptions: demoSubs,
        totalSpend: demoSubs.reduce((acc, sub) => acc + sub.amount, 0),
        rawCount: 25 // Simulate a larger file
    };
};
