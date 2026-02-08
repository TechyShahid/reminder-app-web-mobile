import { Stack } from 'expo-router';
import { ReminderProvider } from '../context/ReminderContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Layout() {
    return (
        <SafeAreaProvider>
            <ReminderProvider>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="index" />
                    <Stack.Screen name="modal-add" options={{ presentation: 'modal' }} />
                    <Stack.Screen name="modal-upgrade" options={{ presentation: 'modal' }} />
                    <Stack.Screen name="settings" options={{ presentation: 'card', headerTitle: 'Settings', headerShown: true }} />
                </Stack>
            </ReminderProvider>
        </SafeAreaProvider>
    );
}
