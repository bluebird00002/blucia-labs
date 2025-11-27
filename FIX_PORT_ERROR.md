# Fix: Port Already in Use Error

## ✅ Problem Fixed!

The process using port 5000 has been stopped. You can now restart your server.

## 🚀 Next Steps

1. **Go back to your terminal** where you ran `npm run dev`
2. **Press any key** or run the command again:
   ```bash
   npm run dev
   ```

The server should now start successfully!

## 🔧 If It Happens Again

### Quick Fix (Windows):
```powershell
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with the number you see)
taskkill /PID <PID_NUMBER> /F
```

### Alternative: Change Port

If you want to use a different port, edit `backend/.env`:
```env
PORT=5001
```

Then update `frontend/vite.config.js` proxy:
```js
proxy: {
  '/api': {
    target: 'http://localhost:5001',  // Change this
    changeOrigin: true
  }
}
```

## 💡 Prevention Tips

- Always stop servers with `Ctrl+C` before closing terminal
- Check for running processes before starting server
- Use different ports for different projects

---

**Your server should now start without errors!** 🎉

