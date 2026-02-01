import { Metadata } from 'next';
import { TrendingUp, Send, Users, Eye, ArrowUp, ArrowDown } from 'lucide-react';
import BackButton from '@/components/ui/BackButton';

export const metadata: Metadata = {
    title: 'Analytics - BulkWaMsg',
    description: 'View your campaign analytics and performance metrics',
};

export default function AnalyticsPage() {
    return (
        <div className="space-y-6">
            <BackButton />

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-dark-navy mb-2">Analytics</h1>
                <p className="text-slate-gray">Track your campaign performance and engagement metrics</p>
            </div>

            {/* Date Range Selector */}
            <div className="card">
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-dark-navy">Performance Overview</h2>
                    <select className="px-4 py-2 rounded-lg border border-gray-200 focus:border-trust-blue focus:ring-2 focus:ring-trust-blue/20 outline-none">
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Last 90 days</option>
                        <option>All time</option>
                    </select>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric, index) => (
                    <div key={index} className="card">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${metric.bgColor}`}>
                                <metric.icon className={`w-6 h-6 ${metric.iconColor}`} />
                            </div>
                            <span className={`flex items-center gap-1 text-sm font-medium ${metric.trend === 'up' ? 'text-success-green' : 'text-red-500'}`}>
                                {metric.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                                {metric.change}
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-dark-navy mb-1">{metric.value}</h3>
                        <p className="text-sm text-slate-gray">{metric.label}</p>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Messages Sent Chart */}
                <div className="card">
                    <h2 className="text-xl font-bold text-dark-navy mb-6">Messages Sent</h2>
                    <div className="h-64 bg-soft-gray rounded-lg flex items-center justify-center">
                        <p className="text-slate-gray">Chart placeholder - No data yet</p>
                    </div>
                </div>

                {/* Delivery Rate Chart */}
                <div className="card">
                    <h2 className="text-xl font-bold text-dark-navy mb-6">Delivery Rate</h2>
                    <div className="h-64 bg-soft-gray rounded-lg flex items-center justify-center">
                        <p className="text-slate-gray">Chart placeholder - No data yet</p>
                    </div>
                </div>
            </div>

            {/* Campaign Performance */}
            <div className="card">
                <h2 className="text-xl font-bold text-dark-navy mb-6">Top Performing Campaigns</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left py-4 px-4 text-sm font-semibold text-dark-navy">Campaign</th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-dark-navy">Sent</th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-dark-navy">Delivered</th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-dark-navy">Read</th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-dark-navy">Replied</th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-dark-navy">Engagement</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={6} className="text-center py-12">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                                            <TrendingUp className="w-8 h-8 text-trust-blue" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-dark-navy mb-1">No analytics data yet</h3>
                                            <p className="text-sm text-slate-gray">Send your first campaign to see analytics</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Insights */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="card bg-gradient-to-br from-trust-blue to-premium-indigo text-white">
                    <h3 className="text-xl font-bold mb-2">Best Time to Send</h3>
                    <p className="text-white/80 mb-4">Based on your campaign data</p>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p className="text-2xl font-bold">No data yet</p>
                        <p className="text-sm opacity-80">Send more campaigns to see insights</p>
                    </div>
                </div>

                <div className="card bg-gradient-to-br from-success-green to-green-600 text-white">
                    <h3 className="text-xl font-bold mb-2">Average Response Time</h3>
                    <p className="text-white/80 mb-4">How quickly customers respond</p>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p className="text-2xl font-bold">No data yet</p>
                        <p className="text-sm opacity-80">Send more campaigns to see insights</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const metrics = [
    {
        icon: Send,
        label: 'Total Messages Sent',
        value: '0',
        change: '0%',
        trend: 'up',
        bgColor: 'bg-blue-50',
        iconColor: 'text-trust-blue',
    },
    {
        icon: TrendingUp,
        label: 'Delivery Rate',
        value: '0%',
        change: '0%',
        trend: 'up',
        bgColor: 'bg-green-50',
        iconColor: 'text-success-green',
    },
    {
        icon: Eye,
        label: 'Read Rate',
        value: '0%',
        change: '0%',
        trend: 'up',
        bgColor: 'bg-purple-50',
        iconColor: 'text-premium-indigo',
    },
    {
        icon: Users,
        label: 'Response Rate',
        value: '0%',
        change: '0%',
        trend: 'up',
        bgColor: 'bg-orange-50',
        iconColor: 'text-warning-amber',
    },
];
