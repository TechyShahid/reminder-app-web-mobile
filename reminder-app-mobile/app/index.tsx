import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useReminders } from '../context/ReminderContext';
import { ReminderItem } from '../components/ReminderItem';
import { Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function Dashboard() {
    const { reminders, settings } = useReminders();
    const router = useRouter();

    const sortedReminders = [...reminders].sort((a, b) => {
        if (a.isCompleted === b.isCompleted) {
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
        return a.isCompleted ? 1 : -1;
    });

    const upcomingReminders = sortedReminders.filter(r => !r.isCompleted);
    const completedReminders = sortedReminders.filter(r => r.isCompleted);

    const handleAddPress = () => {
        if (!settings.isPremium && reminders.length >= 5) {
            router.push('/modal-upgrade');
        } else {
            router.push('/modal-add');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="p-4 flex-row justify-between items-center bg-white border-b border-gray-200">
                <Text className="text-xl font-bold text-indigo-600">RemindMe</Text>
                <TouchableOpacity onPress={() => router.push('/settings')}>
                    <Text className="text-indigo-600">Settings</Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 p-4">
                <Text className="text-lg font-bold text-gray-800 mb-4">Upcoming</Text>
                {upcomingReminders.length === 0 ? (
                    <View className="items-center py-12 bg-white rounded-2xl border-dashed border border-gray-300 mb-4">
                        <Text className="text-gray-500">No upcoming reminders</Text>
                    </View>
                ) : (
                    upcomingReminders.map(reminder => (
                        <ReminderItem key={reminder.id} reminder={reminder} />
                    ))
                )}

                {completedReminders.length > 0 && (
                    <View className="mt-6">
                        <Text className="text-lg font-bold text-gray-800 mb-4">Completed</Text>
                        {completedReminders.map(reminder => (
                            <ReminderItem key={reminder.id} reminder={reminder} />
                        ))}
                    </View>
                )}
                <View className="h-20" />
            </ScrollView>

            <TouchableOpacity
                onPress={handleAddPress}
                className="absolute bottom-8 right-8 w-14 h-14 bg-indigo-600 rounded-full items-center justify-center shadow-lg"
            >
                <Plus color="white" size={32} />
            </TouchableOpacity>
        </SafeAreaView>
    );
}
