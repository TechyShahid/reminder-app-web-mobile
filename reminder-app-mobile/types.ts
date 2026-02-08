export type ReminderCategory = 'Rent' | 'Medicine' | 'Subscription' | 'Birthday' | 'Other';

export type RecurrenceFrequency = 'Once' | 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';

export interface Reminder {
    id: string;
    title: string;
    category: ReminderCategory;
    amount?: number; // For Rent/Subscription
    dueDate: string; // ISO date string
    frequency: RecurrenceFrequency;
    isCompleted: boolean;
    notes?: string;
}

export interface UserSettings {
    isPremium: boolean;
    currency: string;
}
