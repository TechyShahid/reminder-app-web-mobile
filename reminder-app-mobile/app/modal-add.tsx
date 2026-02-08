import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useReminders } from '../context/ReminderContext';
import { ReminderCategory, RecurrenceFrequency } from '../types';
import { X } from 'lucide-react-native';

export default function AddReminderModal() {
    const router = useRouter();
    const { addReminder } = useReminders();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<ReminderCategory>('Other');
    const [amount, setAmount] = useState('');
    const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
    const [frequency, setFrequency] = useState<RecurrenceFrequency>('Once');

    const handleSubmit = () => {
        addReminder({
            title,
            category,
            amount: amount ? parseFloat(amount) : undefined,
            dueDate,
            frequency,
        });
        router.back();
    };

    const categories: ReminderCategory[] = ['Rent', 'Medicine', 'Subscription', 'Birthday', 'Other'];
    const frequencies: RecurrenceFrequency[] = ['Once', 'Daily', 'Weekly', 'Monthly', 'Yearly'];

    return (
        <View className="flex-1 bg-white">
            <View className="p-4 border-b border-gray-100 flex-row justify-between items-center bg-gray-50">
                <Text className="text-lg font-semibold text-gray-800">New Reminder</Text>
                <TouchableOpacity onPress={() => router.back()} className="p-2">
                    <X size={24} color="#6b7280" />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 p-6">
                <View className="mb-4">
                    <Text className="text-sm font-medium text-gray-700 mb-2">Title</Text>
                    <TextInput
                        value={title}
                        onChangeText={setTitle}
                        placeholder="e.g. Pay Rent"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-base"
                    />
                </View>

                <View className="flex-row gap-4 mb-4">
                    <View className="flex-1">
                        <Text className="text-sm font-medium text-gray-700 mb-2">Category</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2">
                            {categories.map(cat => (
                                <TouchableOpacity
                                    key={cat}
                                    onPress={() => setCategory(cat)}
                                    className={`px-3 py-2 rounded-lg border ${category === cat ? 'bg-indigo-100 border-indigo-500' : 'bg-white border-gray-300'}`}
                                >
                                    <Text className={category === cat ? 'text-indigo-700' : 'text-gray-700'}>{cat}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>

                <View className="flex-row gap-4 mb-4">
                    <View className="flex-1">
                        <Text className="text-sm font-medium text-gray-700 mb-2">Amount ($)</Text>
                        <TextInput
                            value={amount}
                            onChangeText={setAmount}
                            placeholder="0.00"
                            keyboardType="numeric"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-base"
                        />
                    </View>
                </View>

                <View className="flex-row gap-4 mb-4">
                    <View className="flex-1">
                        <Text className="text-sm font-medium text-gray-700 mb-2">Date (YYYY-MM-DD)</Text>
                        <TextInput
                            value={dueDate}
                            onChangeText={setDueDate}
                            placeholder="2025-01-01"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-base"
                        />
                    </View>
                </View>

                <View className="mb-6">
                    <Text className="text-sm font-medium text-gray-700 mb-2">Frequency</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2">
                        {frequencies.map(freq => (
                            <TouchableOpacity
                                key={freq}
                                onPress={() => setFrequency(freq)}
                                className={`px-3 py-2 rounded-lg border ${frequency === freq ? 'bg-indigo-100 border-indigo-500' : 'bg-white border-gray-300'}`}
                            >
                                <Text className={frequency === freq ? 'text-indigo-700' : 'text-gray-700'}>{freq}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <TouchableOpacity
                    onPress={handleSubmit}
                    className="w-full py-4 bg-indigo-600 rounded-xl items-center shadow-lg active:opacity-90"
                >
                    <Text className="text-white font-bold text-lg">Create Reminder</Text>
                </TouchableOpacity>
                <View className="h-10" />
            </ScrollView>
        </View>
    );
}
