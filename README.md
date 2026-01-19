# Real-Time Collaborative Drawing Canvas
A browser-based collaborative whiteboard where multiple users can draw together in real-time with brush/eraser tools, undo/redo, and multi-user color indicators.

## 🚀 Features

✏️ Freehand drawing with smoothing

🧽 Eraser tool

🎨 Color picker & brush size control

✨ Assigned user colors

👥 See other users' cursors live

↩️ Global undo & redo

⏱ Real-time networking via WebSockets

🔄 Consistent history replay for late joins
## 🛠️ Setup Instructions

### Installation
# Install & Run

## 1. Clone repo
git clone https://github.com/Ojas-Mahajan/FlameApp_Assign.git
cd FlameApp_Assign

## 2. Install dependencies

# Backend:
cd server
npm install
npm start

# Frontend:
cd ../client
npm install
npm start

## 3. Access App
# Open http://localhost:5173 in multiple browser tabs/windows.

### Local Testing:
- Open the app in multiple browser windows/tabs or use incognito mode
- Start drawing - you'll see real-time synchronization

### Network Testing:
- Find your local IP (`ipconfig` on Windows, `ifconfig` on Mac/Linux)
- Update WebSocket URL in client to your IP address
- Access from other devices on the same network

### Test Features:
- Drawing with different colors and stroke widths
- Eraser functionality
- Global undo/redo operations
- User cursor tracking
- Multiple simultaneous users (3+)

## 🐛 Known Limitations

1. Initial sync for new users may be slow with extensive canvas drawings
2. Mobile touch events less smooth than desktop experience
3. High latency (>200ms) causes noticeable delays
4. Rapid concurrent undo operations may occasionally cause sync issues
5. Tested primarily on Chrome/Firefox; Safari may have minor differences

## ⏱️ Development Timeline

**Total Time:**

12 hours total, broken down as:

Canvas APIs: 2.5h

Real-time WebSockets: 2h

Tools UI: 2h

Undo/Redo + history: 3.5h

Documentation: 1h

Debug/Polish: 1
## 📚 Tech Stack

**Frontend:** React (CRA), HTML5 Canvas API, Socket.io-client
**Backend:** Node.js, Express.js, Socket.io,In-memory stroke history

## 📖 Documentation

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed technical documentation.


