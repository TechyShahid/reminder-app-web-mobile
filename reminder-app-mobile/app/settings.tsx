import React from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { useReminders } from '../context/ReminderContext';
import { ChevronRight, Crown } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
    const { settings } = useReminders();
    const router = useRouter();

    return (
        <View className="flex-1 bg-gray-50 p-4">
            <View className="bg-white rounded-xl overflow-hidden mb-6">
                <View className="p-4 border-b border-gray-100 flex-row items-center justify-between">
                    <Text className="text-base font-medium text-gray-900">Premium Status</Text>
                    {settings.isPremium ? (
                        <View className="flex-row items-center gap-2 bg-indigo-50 px-3 py-1 rounded-full">
                            <Crown size={14} color="#4f46e5" />
                            <Text className="text-indigo-700 font-medium text-xs uppercase tracking-wide">Active</Text>
                        </View>
                    ) : (
                        <TouchableOpacity onPress={() => router.push('/modal-upgrade')}>
                            <Text className="text-indigo-600 font-medium">Upgrade</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <Text className="text-sm font-medium text-gray-500 mb-2 ml-1">Preferences</Text>
            <View className="bg-white rounded-xl overflow-hidden mb-6">
                <View className="p-4 border-b border-gray-100 flex-row items-center justify-between">
                    <Text className="text-base text-gray-700">Push Notifications</Text>
                    <Switch value={true} trackColor={{ false: "#767577", true: "#4f46e5" }} />
                </View>
                <View className="p-4 flex-row items-center justify-between">
                    <Text className="text-base text-gray-700">Currency</Text>
                    <View className="flex-row items-center gap-2">
                        <Text className="text-gray-500">USD ($)</Text>
                        <ChevronRight size={20} color="#9ca3af" />
                    </View>
                </View>
            </View>

            <View className="items-center mt-4">
                <Text className="text-gray-400 text-xs">Version 1.0.0</Text>
            </View>
        </View>
    );
}
