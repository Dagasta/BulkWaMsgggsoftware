# QR Code Troubleshooting

## If QR Code Still Disappears:

### Quick Fix - Check Browser Console

1. Open browser console (F12)
2. Go to `/whatsapp-connect`
3. Look for these messages:
   - "QR Code received for user: ..."
   - "QR Code stored for user: ..."

### If you see QR codes being generated repeatedly:
This is normal! WhatsApp generates new QR codes every ~30 seconds for security.
The page should update with the new QR code automatically.

### If QR code appears then disappears:
1. **Check terminal** - Look for errors
2. **Restart dev server**:
   ```bash
   # Stop with Ctrl+C
   npm run dev
   ```
3. **Clear WhatsApp auth data**:
   ```bash
   # Delete the auth folder
   rm -rf .wwebjs_auth
   # Or on Windows:
   rmdir /s .wwebjs_auth
   ```
4. **Try again** at `/whatsapp-connect`

### Expected Behavior:
1. Page loads → "Initializing..."
2. After 5-10 seconds → QR code appears
3. QR code stays visible (may refresh every 30s with new code)
4. Scan with phone → "Connected!"

### Debug Mode:
Check the terminal output for:
```
Initializing WhatsApp for user: <user-id>
QR Code received for user: <user-id>
QR Code stored for user: <user-id>, length: <number>
```

If you don't see these messages, there's an initialization issue.

### Common Issues:

**Issue 1: QR flickers**
- **Cause**: React state updates
- **Fix**: Already implemented - QR only updates when new one arrives

**Issue 2: QR disappears after 1 second**
- **Cause**: WhatsApp client not initializing
- **Fix**: Check terminal for errors, restart server

**Issue 3: No QR code at all**
- **Cause**: whatsapp-web.js not installed properly
- **Fix**: Run `npm install whatsapp-web.js qrcode`

**Issue 4: "Initializing..." forever**
- **Cause**: Puppeteer/Chrome not working
- **Fix**: May need to install Chrome dependencies (Linux only)

---

## Current Implementation:

✅ QR code stored in memory per user
✅ Not cleared on status polls
✅ Only cleared when connected
✅ Updates automatically with new QR codes
✅ 5-second polling interval (not aggressive)

The QR code should now stay visible! If it still disappears, check the terminal for errors.
