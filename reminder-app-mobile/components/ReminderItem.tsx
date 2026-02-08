import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Check, Trash2, Repeat, Calendar } from 'lucide-react-native';
import { Reminder } from '../types';
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

// Start of helper to get color style manually since NativeWind dynamic classes can be tricky
const getCategoryStyle = (category: string) => {
    switch (category) {
        case 'Rent': return 'bg-red-100';
        case 'Medicine': return 'bg-blue-100';
        case 'Subscription': return 'bg-purple-100';
        case 'Birthday': return 'bg-pink-100';
        default: return 'bg-gray-100';
    }
}
const getCategoryTextStyle = (category: string) => {
    switch (category) {
        case 'Rent': return 'text-red-700';
        case 'Medicine': return 'text-blue-700';
        case 'Subscription': return 'text-purple-700';
        case 'Birthday': return 'text-pink-700';
        default: return 'text-gray-700';
    }
}

export const ReminderItem: React.FC<ReminderItemProps> = ({ reminder }) => {
    const { toggleReminder, deleteReminder } = useReminders();

    const isOverdue = new Date(reminder.dueDate) < new Date() && !reminder.isCompleted;

    return (
        <View className={`bg-white rounded-xl p-4 mb-3 border border-gray-100 shadow-sm ${reminder.isCompleted ? 'opacity-60' : ''}`}>
            <View className="flex-row items-center gap-4">
                <TouchableOpacity
                    onPress={() => toggleReminder(reminder.id)}
                    className={`w-6 h-6 rounded-full border-2 items-center justify-center ${reminder.isCompleted
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-300'
                        }`}
                >
                    {reminder.isCompleted && <Check size={14} color="white" />}
                </TouchableOpacity>

                <View className="flex-1">
                    <View className="flex-row justify-between items-start">
                        <View>
                            <Text className={`font-medium text-gray-900 text-base ${reminder.isCompleted ? 'line-through text-gray-500' : ''}`}>
                                {reminder.title}
                            </Text>
                            <View className="flex-row items-center gap-2 mt-1">
                                <View className={`px-2 py-0.5 rounded-full ${getCategoryStyle(reminder.category)}`}>
                                    <Text className={`text-xs font-medium ${getCategoryTextStyle(reminder.category)}`}>
                                        {reminder.category}
                                    </Text>
                                </View>
                                {reminder.amount && (
                                    <Text className="font-medium text-gray-700 text-xs">
                                        ${reminder.amount.toFixed(2)}
                                    </Text>
                                )}
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={() => deleteReminder(reminder.id)}
                            className="p-1"
                        >
                            <Trash2 size={20} color="#9ca3af" />
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row items-center gap-4 mt-3">
                        <View className="flex-row items-center gap-1">
                            <Calendar size={14} color={isOverdue ? "#ef4444" : "#9ca3af"} />
                            <Text className={`text-xs ${isOverdue ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
                                {format(parseISO(reminder.dueDate), 'MMM d, yyyy')}
                            </Text>
                        </View>
                        {reminder.frequency !== 'Once' && (
                            <View className="flex-row items-center gap-1">
                                <Repeat size={14} color="#9ca3af" />
                                <Text className="text-xs text-gray-400">{reminder.frequency}</Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
};
