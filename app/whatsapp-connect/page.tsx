'use client';

import { useState, useEffect } from 'react';
import { QrCode, CheckCircle2, Loader2, RefreshCw } from 'lucide-react';
import Button from '@/components/ui/Button';
import BackButton from '@/components/ui/BackButton';

export default function WhatsAppConnectPage() {
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const checkStatus = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch('/api/whatsapp/status');
            const data = await response.json();

            setQrCode(data.qrCode);
            setIsReady(data.ready);
            setIsLoading(false);
        } catch (err) {
            setError('Failed to connect to WhatsApp service');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkStatus();

        // Poll for status updates every 3 seconds
        const interval = setInterval(checkStatus, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6">
            <BackButton />

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-dark-navy mb-2">Connect WhatsApp</h1>
                <p className="text-slate-gray">
                    Scan the QR code with your WhatsApp mobile app to connect
                </p>
            </div>

            {/* Connection Status */}
            <div className="card max-w-2xl mx-auto">
                {isLoading && !qrCode && !isReady && (
                    <div className="text-center py-12">
                        <Loader2 className="w-16 h-16 text-trust-blue mx-auto mb-4 animate-spin" />
                        <h3 className="text-xl font-semibold text-dark-navy mb-2">Initializing WhatsApp...</h3>
                        <p className="text-slate-gray">Please wait while we set up the connection</p>
                    </div>
                )}

                {error && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <QrCode className="w-8 h-8 text-red-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-dark-navy mb-2">Connection Error</h3>
                        <p className="text-slate-gray mb-4">{error}</p>
                        <Button onClick={checkStatus}>
                            <RefreshCw className="w-5 h-5" />
                            Try Again
                        </Button>
                    </div>
                )}

                {isReady && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-success-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-8 h-8 text-success-green" />
                        </div>
                        <h3 className="text-xl font-semibold text-dark-navy mb-2">WhatsApp Connected!</h3>
                        <p className="text-slate-gray mb-6">
                            Your WhatsApp account is successfully connected. You can now send messages.
                        </p>
                        <Button onClick={() => window.location.href = '/campaigns'}>
                            Start Sending Messages
                        </Button>
                    </div>
                )}

                {qrCode && !isReady && (
                    <div className="text-center py-8">
                        <h3 className="text-xl font-semibold text-dark-navy mb-4">Scan QR Code</h3>
                        <p className="text-slate-gray mb-6">
                            Open WhatsApp on your phone → Settings → Linked Devices → Link a Device
                        </p>

                        <div className="bg-white p-6 rounded-lg inline-block shadow-lg mb-6">
                            <img
                                src={qrCode}
                                alt="WhatsApp QR Code"
                                className="w-64 h-64 mx-auto"
                            />
                        </div>

                        <div className="flex items-center justify-center gap-2 text-sm text-slate-gray">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Waiting for scan...</span>
                        </div>

                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold text-dark-navy mb-2">How to scan:</h4>
                            <ol className="text-left text-sm text-slate-gray space-y-1 max-w-md mx-auto">
                                <li>1. Open WhatsApp on your phone</li>
                                <li>2. Tap Menu (⋮) or Settings</li>
                                <li>3. Tap "Linked Devices"</li>
                                <li>4. Tap "Link a Device"</li>
                                <li>5. Point your phone at this screen to scan the QR code</li>
                            </ol>
                        </div>
                    </div>
                )}
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="card text-center">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <QrCode className="w-6 h-6 text-trust-blue" />
                    </div>
                    <h3 className="font-semibold text-dark-navy mb-2">Free Forever</h3>
                    <p className="text-sm text-slate-gray">
                        No monthly fees. Use your own WhatsApp account.
                    </p>
                </div>

                <div className="card text-center">
                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-6 h-6 text-success-green" />
                    </div>
                    <h3 className="font-semibold text-dark-navy mb-2">Unlimited Messages</h3>
                    <p className="text-sm text-slate-gray">
                        Send as many messages as you want to your contacts.
                    </p>
                </div>

                <div className="card text-center">
                    <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <RefreshCw className="w-6 h-6 text-premium-indigo" />
                    </div>
                    <h3 className="font-semibold text-dark-navy mb-2">Always Connected</h3>
                    <p className="text-sm text-slate-gray">
                        Stays connected 24/7. Reconnect anytime if needed.
                    </p>
                </div>
            </div>
        </div>
    );
}
