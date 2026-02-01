'use client';

import { useState } from 'react';
import { User, Bell, CreditCard, Shield, Smartphone } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import BackButton from '@/components/ui/BackButton';
import { createClient } from '@/lib/supabase/client';

export default function SettingsPage() {
    const supabase = createClient();
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="space-y-6">
            <BackButton />

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-dark-navy mb-2">Settings</h1>
                <p className="text-slate-gray">Manage your account settings and preferences</p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <div className="flex gap-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 pb-4 border-b-2 transition-colors ${activeTab === tab.id
                                ? 'border-trust-blue text-trust-blue'
                                : 'border-transparent text-slate-gray hover:text-dark-navy'
                                }`}
                        >
                            <tab.icon className="w-5 h-5" />
                            <span className="font-medium">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'profile' && <ProfileSettings />}
            {activeTab === 'notifications' && <NotificationSettings />}
            {activeTab === 'billing' && <BillingSettings />}
            {activeTab === 'security' && <SecuritySettings />}
            {activeTab === 'whatsapp' && <WhatsAppSettings />}
        </div>
    );
}

function ProfileSettings() {
    return (
        <div className="card max-w-2xl">
            <h2 className="text-xl font-bold text-dark-navy mb-6">Profile Information</h2>
            <form className="space-y-4">
                <Input label="Full Name" placeholder="John Doe" />
                <Input label="Email" type="email" placeholder="john@example.com" />
                <Input label="Company Name" placeholder="Your Company" />
                <Input label="Phone Number" placeholder="+1 234 567 8900" />
                <div className="pt-4">
                    <Button>Save Changes</Button>
                </div>
            </form>
        </div>
    );
}

function NotificationSettings() {
    return (
        <div className="card max-w-2xl">
            <h2 className="text-xl font-bold text-dark-navy mb-6">Notification Preferences</h2>
            <div className="space-y-4">
                {notifications.map((notification, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                        <div>
                            <h3 className="font-medium text-dark-navy">{notification.title}</h3>
                            <p className="text-sm text-slate-gray">{notification.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked={notification.enabled} />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-trust-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-trust-blue"></div>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

function BillingSettings() {
    return (
        <div className="space-y-6 max-w-2xl">
            <div className="card">
                <h2 className="text-xl font-bold text-dark-navy mb-4">Current Plan</h2>
                <div className="bg-gradient-to-br from-trust-blue to-premium-indigo text-white p-6 rounded-lg">
                    <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
                    <p className="opacity-90 mb-4">50 messages/month • 100 contacts</p>
                    <Button variant="secondary" className="bg-white text-trust-blue">
                        Upgrade Plan
                    </Button>
                </div>
            </div>

            <div className="card">
                <h2 className="text-xl font-bold text-dark-navy mb-4">Payment Method</h2>
                <p className="text-slate-gray mb-4">No payment method added</p>
                <Button variant="secondary">Add Payment Method</Button>
            </div>

            <div className="card">
                <h2 className="text-xl font-bold text-dark-navy mb-4">Billing History</h2>
                <p className="text-slate-gray">No billing history yet</p>
            </div>
        </div>
    );
}

function SecuritySettings() {
    return (
        <div className="card max-w-2xl">
            <h2 className="text-xl font-bold text-dark-navy mb-6">Security Settings</h2>
            <div className="space-y-6">
                <div>
                    <h3 className="font-semibold text-dark-navy mb-4">Change Password</h3>
                    <form className="space-y-4">
                        <Input label="Current Password" type="password" />
                        <Input label="New Password" type="password" />
                        <Input label="Confirm New Password" type="password" />
                        <Button>Update Password</Button>
                    </form>
                </div>

                <div className="pt-6 border-t border-gray-100">
                    <h3 className="font-semibold text-dark-navy mb-2">Two-Factor Authentication</h3>
                    <p className="text-sm text-slate-gray mb-4">Add an extra layer of security to your account</p>
                    <Button variant="secondary">Enable 2FA</Button>
                </div>
            </div>
        </div>
    );
}

function WhatsAppSettings() {
    return (
        <div className="card max-w-2xl">
            <h2 className="text-xl font-bold text-dark-navy mb-6">WhatsApp Connection</h2>
            <div className="text-center py-8">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="w-8 h-8 text-trust-blue" />
                </div>
                <h3 className="font-semibold text-dark-navy mb-2">No WhatsApp Connected</h3>
                <p className="text-slate-gray mb-6">Connect your WhatsApp account to start sending messages</p>
                <Button>Connect WhatsApp</Button>
            </div>
        </div>
    );
}

const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'whatsapp', label: 'WhatsApp', icon: Smartphone },
];

const notifications = [
    {
        title: 'Campaign Updates',
        description: 'Get notified when campaigns are sent or completed',
        enabled: true,
    },
    {
        title: 'Delivery Reports',
        description: 'Receive reports on message delivery status',
        enabled: true,
    },
    {
        title: 'Low Balance Alerts',
        description: 'Get alerted when your message credits are running low',
        enabled: false,
    },
    {
        title: 'Weekly Summary',
        description: 'Receive a weekly summary of your campaign performance',
        enabled: true,
    },
];
