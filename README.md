Real-Time Collaborative Drawing Canvas
A multi-user drawing application with real-time synchronization using WebSockets. Multiple users can draw simultaneously on the same canvas with instant updates.
🚀 Features

Real-time drawing synchronization across all connected users
Drawing tools: Brush, eraser, color picker, stroke width adjustment
Global undo/redo operations (synchronized across users)
User cursors visible to all participants
Online user indicators with unique color assignments
Custom canvas implementation (no external drawing libraries)

🛠️ Setup Instructions
Installation
bash# Clone repository
git clone https://github.com/Ojas-Mahajan/FlameApp_Assign.git
cd FlameApp_Assign

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
Running the Application
bash# Terminal 1 - Start server
cd server
npm start
# Server runs on http://localhost:3000

# Terminal 2 - Start client
cd client
npm start
# Client opens at http://localhost:5173
🧪 Testing with Multiple Users
Local Testing:

Open the app in multiple browser windows/tabs or use incognito mode
Start drawing - you'll see real-time synchronization

Network Testing:

Find your local IP (ipconfig on Windows, ifconfig on Mac/Linux)
Update WebSocket URL in client to your IP address
Access from other devices on the same network

Test Features:

Drawing with different colors and stroke widths
Eraser functionality
Global undo/redo operations
User cursor tracking
Multiple simultaneous users (3+)

🐛 Known Limitations

Initial sync for new users may be slow with extensive canvas drawings
Mobile touch events less smooth than desktop experience
High latency (>200ms) causes noticeable delays
Rapid concurrent undo operations may occasionally cause sync issues
Tested primarily on Chrome/Firefox; Safari may have minor differences

⏱️ Development Timeline
Total Time: ~18-20 hours

Day 1: Project setup, canvas implementation, drawing tools (5h)
Day 2: WebSocket integration, real-time sync, user management (6h)
Day 3: Global undo/redo, conflict resolution, cursor tracking (5h)
Day 4: UI polish, testing, bug fixes, documentation (3h)

📚 Tech Stack
Frontend: React.js, HTML5 Canvas API, Socket.io-client, Vite
Backend: Node.js, Express.js, Socket.io
📖 Documentation
See ARCHITECTURE.md for detailed technical documentation.
