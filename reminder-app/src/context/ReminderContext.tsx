import { createContext, useContext, useEffect, useState } from 'react';
import type { Reminder, UserSettings } from '../types';

interface ReminderContextType {
    reminders: Reminder[];
    addReminder: (reminder: Omit<Reminder, 'id' | 'isCompleted'>) => void;
    toggleReminder: (id: string) => void;
    deleteReminder: (id: string) => void;
    settings: UserSettings;
    upgradeToPremium: () => void;
    isUpgradeModalOpen: boolean;
    openUpgradeModal: () => void;
    closeUpgradeModal: () => void;
}

const ReminderContext = createContext<ReminderContextType | undefined>(undefined);

export const useReminders = () => {
    const context = useContext(ReminderContext);
    if (!context) {
        throw new Error('useReminders must be used within a ReminderProvider');
    }
    return context;
};

export const ReminderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [reminders, setReminders] = useState<Reminder[]>(() => {
        const saved = localStorage.getItem('reminders');
        return saved ? JSON.parse(saved) : [];
    });

    const [settings, setSettings] = useState<UserSettings>(() => {
        const saved = localStorage.getItem('settings');
        return saved ? JSON.parse(saved) : { isPremium: false, currency: 'USD' };
    });

    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('reminders', JSON.stringify(reminders));
    }, [reminders]);

    useEffect(() => {
        localStorage.setItem('settings', JSON.stringify(settings));
    }, [settings]);

    const addReminder = (newReminderString: Omit<Reminder, 'id' | 'isCompleted'>) => {
        const newReminder: Reminder = {
            ...newReminderString,
            id: crypto.randomUUID(),
            isCompleted: false,
        };
        setReminders((prev) => [...prev, newReminder]);
    };

    const toggleReminder = (id: string) => {
        setReminders((prev) =>
            prev.map((r) => (r.id === id ? { ...r, isCompleted: !r.isCompleted } : r))
        );
    };

    const deleteReminder = (id: string) => {
        setReminders((prev) => prev.filter((r) => r.id !== id));
    };

    const upgradeToPremium = () => {
        setSettings((prev) => ({ ...prev, isPremium: true }));
        setIsUpgradeModalOpen(false);
    };

    const openUpgradeModal = () => setIsUpgradeModalOpen(true);
    const closeUpgradeModal = () => setIsUpgradeModalOpen(false);

    return (
        <ReminderContext.Provider
            value={{
                reminders,
                addReminder,
                toggleReminder,
                deleteReminder,
                settings,
                upgradeToPremium,
                isUpgradeModalOpen,
                openUpgradeModal,
                closeUpgradeModal
            }}
        >
            {children}
        </ReminderContext.Provider>
    );
};
