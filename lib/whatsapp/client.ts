import { Client, LocalAuth } from 'whatsapp-web.js';
import QRCode from 'qrcode';

// Store multiple WhatsApp clients (one per user)
const whatsappClients = new Map<string, {
    client: Client;
    qrCode: string | null;
    isReady: boolean;
    isInitializing: boolean;
}>();

export function initializeWhatsApp(userId: string) {
    // Check if user already has a client
    if (whatsappClients.has(userId)) {
        const existing = whatsappClients.get(userId)!;
        if (existing.isReady || existing.isInitializing) {
            return existing.client;
        }
    }

    console.log(`Initializing WhatsApp for user: ${userId}`);

    // Create new client for this user
    const client = new Client({
        authStrategy: new LocalAuth({
            clientId: userId, // Separate session per user
            dataPath: './.wwebjs_auth'
        }),
        puppeteer: {
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--disable-gpu'
            ]
        }
    });

    // Initialize client state
    whatsappClients.set(userId, {
        client,
        qrCode: null,
        isReady: false,
        isInitializing: true
    });

    const clientState = whatsappClients.get(userId)!;

    // QR Code event - store it and keep it until connected
    client.on('qr', async (qr) => {
        console.log(`QR Code received for user: ${userId}`);
        try {
            const qrCodeData = await QRCode.toDataURL(qr);
            // Always update with latest QR code
            clientState.qrCode = qrCodeData;
            console.log(`QR Code stored for user: ${userId}, length: ${qrCodeData.length}`);
        } catch (error) {
            console.error('QR Code generation error:', error);
        }
    });

    // Ready event
    client.on('ready', () => {
        console.log(`WhatsApp ready for user: ${userId}`);
        clientState.isReady = true;
        clientState.qrCode = null; // Clear QR after connection
        clientState.isInitializing = false;
    });

    // Authenticated event
    client.on('authenticated', () => {
        console.log(`WhatsApp authenticated for user: ${userId}`);
    });

    // Auth failure event
    client.on('auth_failure', (msg) => {
        console.error(`WhatsApp auth failure for user ${userId}:`, msg);
        clientState.isInitializing = false;
    });

    // Disconnected event
    client.on('disconnected', (reason) => {
        console.log(`WhatsApp disconnected for user ${userId}:`, reason);
        clientState.isReady = false;
        clientState.qrCode = null;
        clientState.isInitializing = false;
    });

    // Initialize the client
    client.initialize().catch(error => {
        console.error(`Failed to initialize WhatsApp for user ${userId}:`, error);
        clientState.isInitializing = false;
    });

    return client;
}

export function getWhatsAppClient(userId: string) {
    const clientState = whatsappClients.get(userId);
    return clientState?.client || null;
}

export function getQRCode(userId: string) {
    const clientState = whatsappClients.get(userId);
    return clientState?.qrCode || null;
}

export function isWhatsAppReady(userId: string) {
    const clientState = whatsappClients.get(userId);
    return clientState?.isReady || false;
}

export function isWhatsAppInitializing(userId: string) {
    const clientState = whatsappClients.get(userId);
    return clientState?.isInitializing || false;
}

export async function sendMessage(userId: string, to: string, message: string) {
    const clientState = whatsappClients.get(userId);

    if (!clientState || !clientState.client || !clientState.isReady) {
        throw new Error('WhatsApp client is not ready. Please connect your WhatsApp first.');
    }

    // Format phone number (remove any non-digits and add country code if needed)
    const formattedNumber = to.replace(/\D/g, '');
    const chatId = `${formattedNumber}@c.us`;

    try {
        await clientState.client.sendMessage(chatId, message);
        return { success: true };
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}

export async function sendBulkMessages(userId: string, contacts: Array<{ phone: string; message: string }>) {
    const clientState = whatsappClients.get(userId);

    if (!clientState || !clientState.client || !clientState.isReady) {
        throw new Error('WhatsApp client is not ready. Please connect your WhatsApp first.');
    }

    const results = [];

    for (const contact of contacts) {
        try {
            await sendMessage(userId, contact.phone, contact.message);
            results.push({ phone: contact.phone, success: true });

            // Add delay between messages to avoid spam detection (3-5 seconds)
            await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 2000));
        } catch (error) {
            results.push({ phone: contact.phone, success: false, error });
        }
    }

    return results;
}

export function disconnectWhatsApp(userId: string) {
    const clientState = whatsappClients.get(userId);
    if (clientState?.client) {
        clientState.client.destroy();
        whatsappClients.delete(userId);
    }
}
