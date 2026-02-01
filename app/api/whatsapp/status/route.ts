import { NextResponse } from 'next/server';
import { initializeWhatsApp, getQRCode, isWhatsAppReady, isWhatsAppInitializing } from '@/lib/whatsapp/client';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
    try {
        // Get authenticated user
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const userId = user.id;

        // Initialize WhatsApp client for this user if not already done
        initializeWhatsApp(userId);

        const qrCode = getQRCode(userId);
        const ready = isWhatsAppReady(userId);
        const initializing = isWhatsAppInitializing(userId);

        return NextResponse.json({
            qrCode,
            ready,
            initializing,
            message: ready
                ? 'WhatsApp is connected'
                : qrCode
                    ? 'Scan QR code to connect'
                    : initializing
                        ? 'Initializing WhatsApp...'
                        : 'Starting connection...'
        });
    } catch (error) {
        console.error('WhatsApp status error:', error);
        return NextResponse.json(
            { error: 'Failed to get WhatsApp status' },
            { status: 500 }
        );
    }
}
