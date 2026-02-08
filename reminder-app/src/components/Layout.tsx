import { Bell, Plus, Settings } from 'lucide-react';
import { useReminders } from '../context/ReminderContext';

interface LayoutProps {
    children: React.ReactNode;
    onAddClick: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onAddClick }) => {
    const { settings, openUpgradeModal } = useReminders();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Sidebar / Mobile Header */}
            <aside className="bg-white border-b md:border-r border-gray-200 md:w-64 flex-shrink-0">
                <div className="p-4 flex items-center justify-between md:block">
                    <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
                        <Bell className="w-6 h-6" />
                        <span>RemindMe</span>
                    </div>
                    <div className="md:hidden">
                        {/* Mobile menu button could go here */}
                    </div>
                </div>

                <nav className="p-4 space-y-2 hidden md:block">
                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 bg-gray-100 rounded-lg font-medium">
                        <Bell className="w-5 h-5" />
                        Dashboard
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                        <Settings className="w-5 h-5" />
                        Settings
                    </a>
                    {!settings.isPremium && (
                        <div className="mt-8 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                            <h3 className="font-semibold text-indigo-900">Go Premium</h3>
                            <p className="text-xs text-indigo-700 mt-1 mb-3">Get unlimited reminders for just $2/mo.</p>
                            <button
                                onClick={openUpgradeModal}
                                className="w-full py-1.5 px-3 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                Upgrade
                            </button>
                        </div>
                    )}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 overflow-auto">
                <div className="max-w-4xl mx-auto">
                    {children}
                </div>
            </main>

            {/* Floating Action Button */}
            <button
                onClick={onAddClick}
                className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 transition-transform hover:scale-105 active:scale-95"
            >
                <Plus className="w-8 h-8" />
            </button>
        </div>
    );
};
