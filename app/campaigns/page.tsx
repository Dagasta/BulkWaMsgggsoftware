'use client';

import { Metadata } from 'next';
import { useState } from 'react';
import { Plus, Search, Send, Calendar, MoreVertical, CheckCircle2, Clock, XCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import BackButton from '@/components/ui/BackButton';

export default function CampaignsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="space-y-6">
            <BackButton />

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-dark-navy mb-2">Campaigns</h1>
                    <p className="text-slate-gray">Create and manage your WhatsApp message campaigns</p>
                </div>
                <a href="/campaigns/new">
                    <Button>
                        <Plus className="w-5 h-5" />
                        New Campaign
                    </Button>
                </a>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="card">
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
                                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                            </div>
                            <h3 className="text-2xl font-bold text-dark-navy">{stat.value}</h3>
                        </div>
                        <p className="text-sm text-slate-gray">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Search and Filters */}
            <div className="card">
                <div className="flex items-center gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-gray" />
                        <input
                            type="text"
                            placeholder="Search campaigns..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-trust-blue focus:ring-2 focus:ring-trust-blue/20 outline-none"
                        />
                    </div>
                    <select className="px-4 py-3 rounded-lg border border-gray-200 focus:border-trust-blue focus:ring-2 focus:ring-trust-blue/20 outline-none">
                        <option>All Status</option>
                        <option>Completed</option>
                        <option>Scheduled</option>
                        <option>Draft</option>
                    </select>
                </div>
            </div>

            {/* Campaigns List */}
            <div className="card">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left py-4 px-4 text-sm font-semibold text-dark-navy">Campaign Name</th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-dark-navy">Status</th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-dark-navy">Recipients</th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-dark-navy">Sent</th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-dark-navy">Delivery Rate</th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-dark-navy">Date</th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-dark-navy">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaigns.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-12">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                                                <Send className="w-8 h-8 text-trust-blue" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-dark-navy mb-1">No campaigns yet</h3>
                                                <p className="text-sm text-slate-gray mb-4">Create your first campaign to start sending messages</p>
                                                <Button>
                                                    <Plus className="w-5 h-5" />
                                                    Create Campaign
                                                </Button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                campaigns.map((campaign, index) => (
                                    <tr key={index} className="border-b border-gray-50 hover:bg-soft-gray transition-colors">
                                        <td className="py-4 px-4">
                                            <div className="font-medium text-dark-navy">{campaign.name}</div>
                                            <div className="text-sm text-slate-gray">{campaign.message}</div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${campaign.status === 'completed' ? 'bg-success-green/10 text-success-green' :
                                                campaign.status === 'scheduled' ? 'bg-warning-amber/10 text-warning-amber' :
                                                    'bg-gray-100 text-slate-gray'
                                                }`}>
                                                {campaign.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                                                {campaign.status === 'scheduled' && <Clock className="w-3 h-3" />}
                                                {campaign.status === 'draft' && <XCircle className="w-3 h-3" />}
                                                {campaign.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-dark-navy">{campaign.recipients}</td>
                                        <td className="py-4 px-4 text-dark-navy">{campaign.sent}</td>
                                        <td className="py-4 px-4 text-dark-navy">{campaign.deliveryRate}</td>
                                        <td className="py-4 px-4 text-slate-gray text-sm">{campaign.date}</td>
                                        <td className="py-4 px-4">
                                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                                <MoreVertical className="w-5 h-5 text-slate-gray" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

const stats = [
    {
        icon: Send,
        label: 'Total Campaigns',
        value: '0',
        bgColor: 'bg-blue-50',
        iconColor: 'text-trust-blue',
    },
    {
        icon: CheckCircle2,
        label: 'Completed',
        value: '0',
        bgColor: 'bg-green-50',
        iconColor: 'text-success-green',
    },
    {
        icon: Clock,
        label: 'Scheduled',
        value: '0',
        bgColor: 'bg-orange-50',
        iconColor: 'text-warning-amber',
    },
    {
        icon: XCircle,
        label: 'Drafts',
        value: '0',
        bgColor: 'bg-gray-100',
        iconColor: 'text-slate-gray',
    },
];

const campaigns: any[] = [];
