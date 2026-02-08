import React from 'react';
import { X, Check, Star } from 'lucide-react';
import { useReminders } from '../context/ReminderContext';

export const UpgradeModal: React.FC = () => {
    const { closeUpgradeModal, upgradeToPremium } = useReminders();

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative">
                <button
                    onClick={closeUpgradeModal}
                    className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>

                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 text-white text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
                        <Star className="w-8 h-8 text-yellow-300 fill-yellow-300" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Upgrade to Premium</h2>
                    <p className="text-indigo-100">Unlock the full potential of RemindMe</p>
                </div>

                <div className="p-8">
                    <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-1 rounded-full bg-green-100 text-green-600">
                                <Check className="w-4 h-4" />
                            </div>
                            <span className="text-gray-700 font-medium">Unlimited Reminders</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-1 rounded-full bg-green-100 text-green-600">
                                <Check className="w-4 h-4" />
                            </div>
                            <span className="text-gray-700 font-medium">Smart Suggestions</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-1 rounded-full bg-green-100 text-green-600">
                                <Check className="w-4 h-4" />
                            </div>
                            <span className="text-gray-700 font-medium">Email & SMS Notifications</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-1 rounded-full bg-green-100 text-green-600">
                                <Check className="w-4 h-4" />
                            </div>
                            <span className="text-gray-700 font-medium">Priority Support</span>
                        </div>
                    </div>

                    <div className="text-center mb-6">
                        <span className="text-3xl font-bold text-gray-900">$2.00</span>
                        <span className="text-gray-500"> / month</span>
                    </div>

                    <button
                        onClick={upgradeToPremium}
                        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
                    >
                        Upgrade Now
                    </button>

                    <p className="text-xs text-center text-gray-400 mt-4">
                        Cancel anytime. Secure payment processing.
                    </p>
                </div>
            </div>
        </div>
    );
};
