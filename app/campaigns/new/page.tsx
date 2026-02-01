'use client';

import { useState, useEffect } from 'react';
import { Send, Upload, X, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import BackButton from '@/components/ui/BackButton';
import { useRouter } from 'next/navigation';

export default function NewCampaignPage() {
    const router = useRouter();
    const [isWhatsAppConnected, setIsWhatsAppConnected] = useState(false);
    const [isCheckingConnection, setIsCheckingConnection] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [sendProgress, setSendProgress] = useState({ sent: 0, total: 0 });

    const [formData, setFormData] = useState({
        name: '',
        message: '',
        numbers: '',
        attachment: null as File | null,
    });

    const [errors, setErrors] = useState<string[]>([]);
    const [success, setSuccess] = useState(false);

    // Check WhatsApp connection status
    useEffect(() => {
        const checkConnection = async () => {
            try {
                const response = await fetch('/api/whatsapp/status');
                const data = await response.json();
                setIsWhatsAppConnected(data.ready);
            } catch (error) {
                setIsWhatsAppConnected(false);
            } finally {
                setIsCheckingConnection(false);
            }
        };

        checkConnection();
        const interval = setInterval(checkConnection, 5000);
        return () => clearInterval(interval);
    }, []);

    const parseNumbers = (text: string): string[] => {
        // Extract all numbers from text (supports various formats)
        const numbers = text.match(/[\d+\-() ]+/g) || [];
        return numbers
            .map(num => num.replace(/[^\d+]/g, '')) // Remove non-digits except +
            .filter(num => num.length >= 10); // Filter valid numbers
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors([]);
        setSuccess(false);

        // Validation
        const newErrors: string[] = [];
        if (!formData.name.trim()) newErrors.push('Campaign name is required');
        if (!formData.message.trim()) newErrors.push('Message is required');
        if (!formData.numbers.trim()) newErrors.push('At least one phone number is required');

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        const numbers = parseNumbers(formData.numbers);
        if (numbers.length === 0) {
            setErrors(['No valid phone numbers found. Please enter at least one number.']);
            return;
        }

        setIsSending(true);
        setSendProgress({ sent: 0, total: numbers.length });

        try {
            // Prepare contacts
            const contacts = numbers.map(phone => ({
                phone,
                message: formData.message
            }));

            // Send bulk messages
            const response = await fetch('/api/whatsapp/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'bulk',
                    contacts
                })
            });

            const result = await response.json();

            if (result.success) {
                setSuccess(true);
                setTimeout(() => {
                    router.push('/campaigns');
                }, 2000);
            } else {
                setErrors([result.error || 'Failed to send messages']);
            }
        } catch (error) {
            setErrors(['Failed to send messages. Please try again.']);
        } finally {
            setIsSending(false);
        }
    };

    if (isCheckingConnection) {
        return (
            <div className="space-y-6">
                <BackButton />
                <div className="card text-center py-12">
                    <Loader2 className="w-12 h-12 text-trust-blue mx-auto mb-4 animate-spin" />
                    <p className="text-slate-gray">Checking WhatsApp connection...</p>
                </div>
            </div>
        );
    }

    if (!isWhatsAppConnected) {
        return (
            <div className="space-y-6">
                <BackButton />
                <div className="card text-center py-12">
                    <AlertCircle className="w-16 h-16 text-warning-amber mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-dark-navy mb-2">WhatsApp Not Connected</h2>
                    <p className="text-slate-gray mb-6">
                        You need to connect your WhatsApp account before creating campaigns.
                    </p>
                    <Button onClick={() => router.push('/whatsapp-connect')}>
                        Connect WhatsApp Now
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <BackButton />

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-dark-navy mb-2">Create New Campaign</h1>
                <p className="text-slate-gray">
                    Send bulk WhatsApp messages to your contacts
                </p>
            </div>

            {/* Success Message */}
            {success && (
                <div className="card bg-success-green/10 border-2 border-success-green">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-success-green" />
                        <div>
                            <h3 className="font-semibold text-success-green">Campaign Sent Successfully!</h3>
                            <p className="text-sm text-slate-gray">Redirecting to campaigns...</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Error Messages */}
            {errors.length > 0 && (
                <div className="card bg-red-50 border-2 border-red-200">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <h3 className="font-semibold text-red-600 mb-2">Please fix the following errors:</h3>
                            <ul className="list-disc list-inside space-y-1">
                                {errors.map((error, index) => (
                                    <li key={index} className="text-sm text-red-600">{error}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campaign Name */}
                <div className="card">
                    <h2 className="text-xl font-semibold text-dark-navy mb-4">Campaign Details</h2>
                    <Input
                        label="Campaign Name"
                        placeholder="e.g., Summer Sale 2024"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>

                {/* Phone Numbers */}
                <div className="card">
                    <h2 className="text-xl font-semibold text-dark-navy mb-4">Recipients</h2>
                    <div>
                        <label className="block text-sm font-medium text-dark-navy mb-2">
                            Phone Numbers
                        </label>
                        <textarea
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-trust-blue focus:ring-2 focus:ring-trust-blue/20 outline-none transition-all font-mono text-sm"
                            rows={10}
                            placeholder="Paste phone numbers here (one per line or comma-separated):
+1234567890
+0987654321
1234567890, 0987654321

Supports any format - just paste your numbers!"
                            value={formData.numbers}
                            onChange={(e) => setFormData({ ...formData, numbers: e.target.value })}
                            required
                        />
                        <p className="text-sm text-slate-gray mt-2">
                            {parseNumbers(formData.numbers).length} valid numbers detected
                        </p>
                    </div>
                </div>

                {/* Message */}
                <div className="card">
                    <h2 className="text-xl font-semibold text-dark-navy mb-4">Message</h2>
                    <div>
                        <label className="block text-sm font-medium text-dark-navy mb-2">
                            Your Message
                        </label>
                        <textarea
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-trust-blue focus:ring-2 focus:ring-trust-blue/20 outline-none transition-all"
                            rows={6}
                            placeholder="Type your message here...

Example:
Hi! 👋 Check out our amazing summer sale with up to 50% off! 
Visit: www.example.com"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                        />
                        <p className="text-sm text-slate-gray mt-2">
                            {formData.message.length} characters
                        </p>
                    </div>
                </div>

                {/* Attachment (Coming Soon) */}
                <div className="card bg-soft-gray">
                    <div className="flex items-center gap-3 mb-3">
                        <Upload className="w-5 h-5 text-slate-gray" />
                        <h2 className="text-xl font-semibold text-dark-navy">Attachments</h2>
                        <span className="px-2 py-1 bg-warning-amber/20 text-warning-amber text-xs font-medium rounded">
                            Coming Soon
                        </span>
                    </div>
                    <p className="text-sm text-slate-gray">
                        Image and document attachments will be available in the next update.
                    </p>
                </div>

                {/* Submit Button */}
                <div className="card bg-gradient-primary text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold mb-1">Ready to Send?</h3>
                            <p className="text-white/80 text-sm">
                                {parseNumbers(formData.numbers).length} messages will be sent
                            </p>
                        </div>
                        <Button
                            type="submit"
                            disabled={isSending}
                            className="bg-white text-trust-blue hover:bg-gray-100"
                        >
                            {isSending ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Sending... {sendProgress.sent}/{sendProgress.total}
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Send Campaign
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
