import React from 'react';
import { useReminders } from '../context/ReminderContext';
import { ReminderItem } from './ReminderItem';

export const Dashboard: React.FC = () => {
    const { reminders } = useReminders();

    const sortedReminders = [...reminders].sort((a, b) => {
        // Sort by completion (incomplete first), then date
        if (a.isCompleted === b.isCompleted) {
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
        return a.isCompleted ? 1 : -1;
    });

    const upcomingReminders = sortedReminders.filter(r => !r.isCompleted);
    const completedReminders = sortedReminders.filter(r => r.isCompleted);

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming</h2>
                {upcomingReminders.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                        <p className="text-gray-500">No upcoming reminders</p>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                        {upcomingReminders.map(reminder => (
                            <ReminderItem key={reminder.id} reminder={reminder} />
                        ))}
                    </div>
                )}
            </div>

            {completedReminders.length > 0 && (
                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Completed</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                        {completedReminders.map(reminder => (
                            <ReminderItem key={reminder.id} reminder={reminder} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
