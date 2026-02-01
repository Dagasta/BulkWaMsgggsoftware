import { NextRequest, NextResponse } from 'next/server';
import { sendMessage, sendBulkMessages } from '@/lib/whatsapp/client';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
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
        const body = await request.json();
        const { type, to, message, contacts } = body;

        if (type === 'single') {
            // Send single message
            if (!to || !message) {
                return NextResponse.json(
                    { error: 'Phone number and message are required' },
                    { status: 400 }
                );
            }

            await sendMessage(userId, to, message);
            return NextResponse.json({ success: true, message: 'Message sent successfully' });
        } else if (type === 'bulk') {
            // Send bulk messages
            if (!contacts || !Array.isArray(contacts)) {
                return NextResponse.json(
                    { error: 'Contacts array is required' },
                    { status: 400 }
                );
            }

            const results = await sendBulkMessages(userId, contacts);
            return NextResponse.json({ success: true, results });
        } else {
            return NextResponse.json(
                { error: 'Invalid type. Use "single" or "bulk"' },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error('Send message error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to send message' },
            { status: 500 }
        );
    }
}
