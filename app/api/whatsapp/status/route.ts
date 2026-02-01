import { NextResponse } from 'next/server';
import { initializeWhatsApp, getQRCode, isWhatsAppReady } from '@/lib/whatsapp/client';

export async function GET() {
    try {
        // Initialize WhatsApp client
        initializeWhatsApp();

        const qrCode = getQRCode();
        const ready = isWhatsAppReady();

        return NextResponse.json({
            qrCode,
            ready,
            message: ready ? 'WhatsApp is connected' : qrCode ? 'Scan QR code to connect' : 'Initializing...'
        });
    } catch (error) {
        console.error('WhatsApp status error:', error);
        return NextResponse.json(
            { error: 'Failed to get WhatsApp status' },
            { status: 500 }
        );
    }
}
