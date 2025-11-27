# Quick Fix: Port 5000 Already in Use

## 🚀 Quick Solution

### Option 1: Use the Batch File (Easiest)

1. **Double-click**: `kill-port-5000.bat`
2. It will automatically find and kill the process
3. Then run `npm run dev` again

### Option 2: Manual Command

Open PowerShell or Command Prompt and run:

```powershell
# Find the process
netstat -ano | findstr :5000

# Kill it (replace PID with the number you see)
taskkill /PID <PID_NUMBER> /F
```

### Option 3: Change Port (Alternative)

If you keep having issues, change the port:

1. Edit `backend/.env`:
   ```env
   PORT=5001
   ```

2. Edit `frontend/vite.config.js`:
   ```js
   proxy: {
     '/api': {
       target: 'http://localhost:5001',  // Change this
       changeOrigin: true
     }
   }
   ```

3. Restart both servers

## 💡 Why This Happens

- You closed the terminal without stopping the server (Ctrl+C)
- Another instance of the server is still running
- Another application is using port 5000

## ✅ Prevention

Always stop servers properly:
- Press `Ctrl+C` in the terminal
- Wait for the process to stop
- Then close the terminal

---

**After killing the process, run `npm run dev` again!**

