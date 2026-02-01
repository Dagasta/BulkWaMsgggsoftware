'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Loader2, Wifi, WifiOff } from 'lucide-react';

export default function WhatsAppStatus() {
    const [isConnected, setIsConnected] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const response = await fetch('/api/whatsapp/status');
                const data = await response.json();
                setIsConnected(data.ready);
            } catch (error) {
                setIsConnected(false);
            } finally {
                setIsChecking(false);
            }
        };

        checkStatus();
        const interval = setInterval(checkStatus, 10000); // Check every 10 seconds
        return () => clearInterval(interval);
    }, []);

    if (isChecking) {
        return (
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                <Loader2 className="w-4 h-4 text-slate-gray animate-spin" />
                <span className="text-sm text-slate-gray">Checking...</span>
            </div>
        );
    }

    if (isConnected) {
        return (
            <div className="flex items-center gap-2 px-3 py-2 bg-success-green/10 rounded-lg">
                <Wifi className="w-4 h-4 text-success-green" />
                <span className="text-sm font-medium text-success-green">WhatsApp Connected</span>
            </div>
        );
    }

    return (
        <a
            href="/whatsapp-connect"
            className="flex items-center gap-2 px-3 py-2 bg-warning-amber/10 rounded-lg hover:bg-warning-amber/20 transition-colors"
        >
            <WifiOff className="w-4 h-4 text-warning-amber" />
            <span className="text-sm font-medium text-warning-amber">Connect WhatsApp</span>
        </a>
    );
}
