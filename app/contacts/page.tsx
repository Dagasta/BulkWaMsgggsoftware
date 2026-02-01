'use client';

import { useState } from 'react';
import { Plus, Search, Upload, Download, MoreVertical, Users as UsersIcon } from 'lucide-react';
import Button from '@/components/ui/Button';
import BackButton from '@/components/ui/BackButton';

export default function ContactsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="space-y-6">
            <BackButton />

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-dark-navy mb-2">Contacts</h1>
                    <p className="text-slate-gray">Manage your contact lists and segments</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="secondary">
                        <Upload className="w-5 h-5" />
                        Import CSV
                    </Button>
                    <Button>
                        <Plus className="w-5 h-5" />
                        Add Contact
                    </Button>
                </div>
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

            {/* Search and Actions */}
            <div className="card">
                <div className="flex items-center gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-gray" />
                        <input
                            type="text"
                            placeholder="Search contacts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-trust-blue focus:ring-2 focus:ring-trust-blue/20 outline-none"
                        />
                    </div>
                    <select className="px-4 py-3 rounded-lg border border-gray-200 focus:border-trust-blue focus:ring-2 focus:ring-trust-blue/20 outline-none">
                        <option>All Tags</option>
                        <option>Customers</option>
                        <option>Leads</option>
                        <option>VIP</option>
                    </select>
                    <Button variant="secondary">
                        <Download className="w-5 h-5" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Contacts Table */}
            <div className="card">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left py-4 px-4">
                                    <input type="checkbox" className="rounded border-gray-300 text-trust-blue focus:ring-trust-blue" />
                                </th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-dark-navy">Name</th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-dark-navy">Phone Number</th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-dark-navy">Tags</th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-dark-navy">Status</th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-dark-navy">Added</th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-dark-navy">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-12">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                                                <UsersIcon className="w-8 h-8 text-trust-blue" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-dark-navy mb-1">No contacts yet</h3>
                                                <p className="text-sm text-slate-gray mb-4">Import contacts from CSV or add them manually</p>
                                                <div className="flex items-center gap-3 justify-center">
                                                    <Button variant="secondary">
                                                        <Upload className="w-5 h-5" />
                                                        Import CSV
                                                    </Button>
                                                    <Button>
                                                        <Plus className="w-5 h-5" />
                                                        Add Contact
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                contacts.map((contact, index) => (
                                    <tr key={index} className="border-b border-gray-50 hover:bg-soft-gray transition-colors">
                                        <td className="py-4 px-4">
                                            <input type="checkbox" className="rounded border-gray-300 text-trust-blue focus:ring-trust-blue" />
                                        </td>
                                        <td className="py-4 px-4 font-medium text-dark-navy">{contact.name}</td>
                                        <td className="py-4 px-4 text-dark-navy">{contact.phone}</td>
                                        <td className="py-4 px-4">
                                            <div className="flex gap-2">
                                                {contact.tags.map((tag: string, tagIndex: number) => (
                                                    <span key={tagIndex} className="bg-blue-50 text-trust-blue px-2 py-1 rounded text-xs">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${contact.status === 'active' ? 'bg-success-green/10 text-success-green' : 'bg-gray-100 text-slate-gray'
                                                }`}>
                                                {contact.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-slate-gray text-sm">{contact.added}</td>
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
        icon: UsersIcon,
        label: 'Total Contacts',
        value: '0',
        bgColor: 'bg-blue-50',
        iconColor: 'text-trust-blue',
    },
    {
        icon: UsersIcon,
        label: 'Active',
        value: '0',
        bgColor: 'bg-green-50',
        iconColor: 'text-success-green',
    },
    {
        icon: UsersIcon,
        label: 'Segments',
        value: '0',
        bgColor: 'bg-purple-50',
        iconColor: 'text-premium-indigo',
    },
    {
        icon: UsersIcon,
        label: 'This Month',
        value: '0',
        bgColor: 'bg-orange-50',
        iconColor: 'text-warning-amber',
    },
];

const contacts: any[] = [];
