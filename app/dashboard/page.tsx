import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { MessageSquare, Users, Send, TrendingUp, Clock, CheckCircle2, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Dashboard - BulkWaMsg',
    description: 'Manage your WhatsApp campaigns and contacts',
};

export default async function DashboardPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-dark-navy mb-2">
                    Welcome back, {user?.user_metadata?.name || 'User'}!
                </h1>
                <p className="text-slate-gray">
                    Here's what's happening with your WhatsApp campaigns today.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="card">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
                                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                            </div>
                            <span className={`text-sm font-medium ${stat.changeColor}`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-dark-navy mb-1">{stat.value}</h3>
                        <p className="text-sm text-slate-gray">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="card">
                <h2 className="text-xl font-bold text-dark-navy mb-4">Quick Actions</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    {quickActions.map((action, index) => (
                        <Link
                            key={index}
                            href={action.href}
                            className="flex items-center gap-4 p-4 rounded-lg border-2 border-gray-100 hover:border-trust-blue transition-all group"
                        >
                            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-trust-blue transition-colors">
                                <action.icon className="w-6 h-6 text-trust-blue group-hover:text-white transition-colors" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-dark-navy group-hover:text-trust-blue transition-colors">
                                    {action.title}
                                </h3>
                                <p className="text-sm text-slate-gray">{action.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recent Campaigns */}
            <div className="card">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-dark-navy">Recent Campaigns</h2>
                    <Link href="/campaigns" className="text-trust-blue font-semibold hover:underline text-sm">
                        View all
                    </Link>
                </div>

                <div className="space-y-4">
                    {recentCampaigns.map((campaign, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-soft-gray rounded-lg">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${campaign.status === 'completed' ? 'bg-success-green/10' :
                                    campaign.status === 'scheduled' ? 'bg-warning-amber/10' :
                                        'bg-trust-blue/10'
                                    }`}>
                                    {campaign.status === 'completed' ? (
                                        <CheckCircle2 className="w-5 h-5 text-success-green" />
                                    ) : campaign.status === 'scheduled' ? (
                                        <Clock className="w-5 h-5 text-warning-amber" />
                                    ) : (
                                        <Send className="w-5 h-5 text-trust-blue" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-dark-navy">{campaign.name}</h3>
                                    <p className="text-sm text-slate-gray">{campaign.recipients} recipients</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium text-dark-navy">{campaign.deliveryRate}</p>
                                <p className="text-xs text-slate-gray">{campaign.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Getting Started Guide */}
            <div className="card bg-gradient-to-br from-trust-blue to-premium-indigo text-white">
                <h2 className="text-2xl font-bold mb-4">Get Started with BulkWaMsg</h2>
                <p className="mb-6 opacity-90">
                    Follow these steps to send your first campaign
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                    {gettingStarted.map((step, index) => (
                        <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mb-3 text-sm font-bold">
                                {index + 1}
                            </div>
                            <h3 className="font-semibold mb-2">{step.title}</h3>
                            <p className="text-sm opacity-90">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const stats = [
    {
        icon: Send,
        label: 'Messages Sent',
        value: '0',
        change: '+0%',
        changeColor: 'text-success-green',
        bgColor: 'bg-blue-50',
        iconColor: 'text-trust-blue',
    },
    {
        icon: Users,
        label: 'Total Contacts',
        value: '0',
        change: '+0%',
        changeColor: 'text-success-green',
        bgColor: 'bg-green-50',
        iconColor: 'text-success-green',
    },
    {
        icon: TrendingUp,
        label: 'Delivery Rate',
        value: '0%',
        change: '+0%',
        changeColor: 'text-success-green',
        bgColor: 'bg-purple-50',
        iconColor: 'text-premium-indigo',
    },
    {
        icon: MessageSquare,
        label: 'Active Campaigns',
        value: '0',
        change: '0 total',
        changeColor: 'text-slate-gray',
        bgColor: 'bg-orange-50',
        iconColor: 'text-warning-amber',
    },
];

const quickActions = [
    {
        icon: Send,
        title: 'New Campaign',
        description: 'Create and send a new message',
        href: '/campaigns',
    },
    {
        icon: Users,
        title: 'Import Contacts',
        description: 'Add contacts from CSV',
        href: '/contacts',
    },
    {
        icon: BarChart3,
        title: 'View Analytics',
        description: 'Check campaign performance',
        href: '/analytics',
    },
];

const recentCampaigns = [
    {
        name: 'Welcome Campaign',
        recipients: '0',
        deliveryRate: '0%',
        date: 'No campaigns yet',
        status: 'scheduled',
    },
];

const gettingStarted = [
    {
        title: 'Connect WhatsApp',
        description: 'Scan QR code to link your WhatsApp account',
    },
    {
        title: 'Import Contacts',
        description: 'Upload your contact list from CSV or Excel',
    },
    {
        title: 'Send Campaign',
        description: 'Create your message and send to contacts',
    },
];
