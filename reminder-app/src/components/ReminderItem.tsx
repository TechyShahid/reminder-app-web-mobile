import React from 'react';
import { Check, Trash2, Repeat, Calendar } from 'lucide-react';
import type { Reminder } from '../types';
import { useReminders } from '../context/ReminderContext';
import { format, parseISO } from 'date-fns';

interface ReminderItemProps {
    reminder: Reminder;
}

const categoryColors: Record<string, string> = {
    Rent: 'bg-red-100 text-red-700',
    Medicine: 'bg-blue-100 text-blue-700',
    Subscription: 'bg-purple-100 text-purple-700',
    Birthday: 'bg-pink-100 text-pink-700',
    Other: 'bg-gray-100 text-gray-700',
};

export const ReminderItem: React.FC<ReminderItemProps> = ({ reminder }) => {
    const { toggleReminder, deleteReminder } = useReminders();

    const isOverdue = new Date(reminder.dueDate) < new Date() && !reminder.isCompleted;

    return (
        <div className={`group bg-white rounded-xl p-4 shadow-sm border transition-all ${reminder.isCompleted ? 'border-gray-100 opacity-60' : 'border-gray-100 hover:border-indigo-200 hover:shadow-md'
            }`}>
            <div className="flex items-start gap-4">
                <button
                    onClick={() => toggleReminder(reminder.id)}
                    className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${reminder.isCompleted
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 hover:border-indigo-500'
                        }`}
                >
                    {reminder.isCompleted && <Check className="w-4 h-4" />}
                </button>

                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className={`font-medium text-gray-900 ${reminder.isCompleted ? 'line-through text-gray-500' : ''}`}>
                                {reminder.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[reminder.category]}`}>
                                    {reminder.category}
                                </span>
                                {reminder.amount && (
                                    <span className="font-medium text-gray-700">
                                        ${reminder.amount.toFixed(2)}
                                    </span>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={() => deleteReminder(reminder.id)}
                            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                        <div className={`flex items-center gap-1 ${isOverdue ? 'text-red-500 font-medium' : ''}`}>
                            <Calendar className="w-3.5 h-3.5" />
                            {format(parseISO(reminder.dueDate), 'MMM d, yyyy')}
                        </div>
                        {reminder.frequency !== 'Once' && (
                            <div className="flex items-center gap-1">
                                <Repeat className="w-3.5 h-3.5" />
                                {reminder.frequency}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
