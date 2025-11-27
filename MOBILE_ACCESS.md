# Access Website on Mobile Phone

## ✅ Configuration Complete!

Your website is now configured to be accessible from your local network.

## 📱 How to Access on Your Phone

### Step 1: Make Sure Both Devices Are on Same Network
- Your computer and phone must be connected to the **same Wi-Fi network**

### Step 2: Find Your Computer's IP Address
Your computer's IP address is: **192.168.1.4**

(If this changes, you can find it by running: `ipconfig` in PowerShell and looking for "IPv4 Address")

### Step 3: Access from Your Phone
Open your phone's browser and go to:

```
http://192.168.1.4:3000
```

**Important**: Use `http://` (not `https://`) and include the port `:3000`

### Step 4: Test It!
1. Open the URL on your phone
2. You should see the BluCia Labs website
3. Navigate through the pages
4. Test the responsive design!

## 🔧 If It Doesn't Work

### Check Firewall
Windows Firewall might be blocking the connection. To allow it:

1. Open Windows Defender Firewall
2. Click "Allow an app or feature through Windows Firewall"
3. Find "Node.js" or add a new rule for port 3000 and 5000
4. Allow both "Private" and "Public" networks

### Quick Firewall Fix (Run as Administrator)
```powershell
netsh advfirewall firewall add rule name="Node.js Frontend" dir=in action=allow protocol=TCP localport=3000
netsh advfirewall firewall add rule name="Node.js Backend" dir=in action=allow protocol=TCP localport=5000
```

### Verify Servers Are Running
- Frontend should show: `Local: http://localhost:3000/`
- Backend should show: `🚀 BluCia Labs server running on port 5000`

### Check Network Connection
- Make sure phone and computer are on the same Wi-Fi
- Try pinging your computer from phone (if possible)
- Restart both servers after configuration changes

## 📝 Notes

- The IP address (192.168.1.4) might change if you reconnect to Wi-Fi
- If the IP changes, just run `ipconfig` again to find the new one
- Both frontend (port 3000) and backend (port 5000) are now accessible on the network
- The website will work exactly the same on mobile as on desktop

## 🎯 Quick Access

**Your website URL for mobile:**
```
http://192.168.1.4:3000
```

Bookmark this on your phone for easy access!

---

**Enjoy testing your responsive design! 📱✨**

