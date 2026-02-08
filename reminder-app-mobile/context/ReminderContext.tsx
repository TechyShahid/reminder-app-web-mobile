import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Reminder, UserSettings } from '../types';

interface ReminderContextType {
    reminders: Reminder[];
    addReminder: (reminder: Omit<Reminder, 'id' | 'isCompleted'>) => void;
    toggleReminder: (id: string) => void;
    deleteReminder: (id: string) => void;
    settings: UserSettings;
    upgradeToPremium: () => void;
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
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [settings, setSettings] = useState<UserSettings>({ isPremium: false, currency: 'USD' });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const savedReminders = await AsyncStorage.getItem('reminders');
                const savedSettings = await AsyncStorage.getItem('settings');
                if (savedReminders) setReminders(JSON.parse(savedReminders));
                if (savedSettings) setSettings(JSON.parse(savedSettings));
            } catch (e) {
                console.error('Failed to load data', e);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            AsyncStorage.setItem('reminders', JSON.stringify(reminders));
        }
    }, [reminders, isLoading]);

    useEffect(() => {
        if (!isLoading) {
            AsyncStorage.setItem('settings', JSON.stringify(settings));
        }
    }, [settings, isLoading]);

    const addReminder = (newReminderString: Omit<Reminder, 'id' | 'isCompleted'>) => {
        const newReminder: Reminder = {
            ...newReminderString,
            id: Math.random().toString(36).substr(2, 9), // Simple ID for RN
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
        setSettings((prev: UserSettings) => ({ ...prev, isPremium: true }));
    };

    return (
        <ReminderContext.Provider
            value={{ reminders, addReminder, toggleReminder, deleteReminder, settings, upgradeToPremium }}
        >
            {children}
        </ReminderContext.Provider>
    );
};
