import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useReminders } from '../context/ReminderContext';
import { X, Check, Star } from 'lucide-react-native';

export default function UpgradeModal() {
    const router = useRouter();
    const { upgradeToPremium } = useReminders();

    const handleUpgrade = () => {
        upgradeToPremium();
        router.back();
    };

    return (
        <View className="flex-1 bg-white">
            <View className="relative">
                <View className="bg-indigo-600 p-8 pt-12 items-center">
                    <View className="w-16 h-16 bg-white/20 rounded-2xl items-center justify-center mb-4">
                        <Star size={32} color="#fde047" fill="#fde047" />
                    </View>
                    <Text className="text-2xl font-bold text-white mb-2">Upgrade to Premium</Text>
                    <Text className="text-indigo-100">Unlock the full potential of RemindMe</Text>
                </View>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="absolute top-4 right-4 p-2 bg-white/20 rounded-full"
                >
                    <X size={20} color="white" />
                </TouchableOpacity>
            </View>

            <View className="p-8 flex-1">
                <View className="mb-8 gap-4">
                    {[
                        'Unlimited Reminders',
                        'Smart Suggestions',
                        'Email & SMS Notifications',
                        'Priority Support'
                    ].map((feature, index) => (
                        <View key={index} className="flex-row items-center gap-3">
                            <View className="p-1 rounded-full bg-green-100">
                                <Check size={16} color="#16a34a" />
                            </View>
                            <Text className="text-gray-700 font-medium text-base">{feature}</Text>
                        </View>
                    ))}
                </View>

                <View className="items-center mb-8">
                    <Text className="text-4xl font-bold text-gray-900">$2.00<Text className="text-base font-normal text-gray-500"> / month</Text></Text>
                </View>

                <TouchableOpacity
                    onPress={handleUpgrade}
                    className="w-full py-4 bg-indigo-600 rounded-xl items-center shadow-lg active:opacity-90"
                >
                    <Text className="text-white font-bold text-lg">Upgrade Now</Text>
                </TouchableOpacity>

                <Text className="text-xs text-center text-gray-400 mt-4">
                    Cancel anytime. Secure payment processing.
                </Text>
            </View>
        </View>
    );
}
