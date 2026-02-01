import { Server } from 'http';
import { Client, LocalAuth } from 'whatsapp-web.js';
import QRCode from 'qrcode';

let whatsappClient: Client | null = null;
let qrCodeData: string | null = null;
let isReady = false;

export function initializeWhatsApp() {
    if (whatsappClient) {
        return whatsappClient;
    }

    whatsappClient = new Client({
        authStrategy: new LocalAuth({
            dataPath: './.wwebjs_auth'
        }),
        puppeteer: {
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
    });

    whatsappClient.on('qr', async (qr) => {
        console.log('QR Code received');
        qrCodeData = await QRCode.toDataURL(qr);
    });

    whatsappClient.on('ready', () => {
        console.log('WhatsApp client is ready!');
        isReady = true;
        qrCodeData = null;
    });

    whatsappClient.on('authenticated', () => {
        console.log('WhatsApp authenticated');
    });

    whatsappClient.on('auth_failure', (msg) => {
        console.error('WhatsApp authentication failed:', msg);
    });

    whatsappClient.on('disconnected', (reason) => {
        console.log('WhatsApp disconnected:', reason);
        isReady = false;
        whatsappClient = null;
    });

    whatsappClient.initialize();

    return whatsappClient;
}

export function getWhatsAppClient() {
    return whatsappClient;
}

export function getQRCode() {
    return qrCodeData;
}

export function isWhatsAppReady() {
    return isReady;
}

export async function sendMessage(to: string, message: string) {
    if (!whatsappClient || !isReady) {
        throw new Error('WhatsApp client is not ready');
    }

    // Format phone number (remove any non-digits and add country code if needed)
    const formattedNumber = to.replace(/\D/g, '');
    const chatId = `${formattedNumber}@c.us`;

    try {
        await whatsappClient.sendMessage(chatId, message);
        return { success: true };
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}

export async function sendBulkMessages(contacts: Array<{ phone: string; message: string }>) {
    if (!whatsappClient || !isReady) {
        throw new Error('WhatsApp client is not ready');
    }

    const results = [];

    for (const contact of contacts) {
        try {
            await sendMessage(contact.phone, contact.message);
            results.push({ phone: contact.phone, success: true });

            // Add delay between messages to avoid spam detection (3-5 seconds)
            await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 2000));
        } catch (error) {
            results.push({ phone: contact.phone, success: false, error });
        }
    }

    return results;
}
