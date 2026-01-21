import { useEffect, useState } from "react";
import socket from "./socket/socket";
import "./App.css";
import CanvasBoard from "./components/CanvasBoard";
import ToolsBar from "./components/ToolsBar";

function App() {
  const [cursors, setCursors] = useState({});
  const [users, setUsers] = useState({});

  const [tool, setTool] = useState("brush");
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    socket.on("connect", () => console.log("Connected:", socket.id));

    socket.on("INITIAL_STATE", ({ users, history }) => {
      const map = {};
      users.forEach(u => map[u.id] = u);
      setUsers(map);
      window.currentUsers = map;
      // replay strokes for late join
      history.forEach(stroke => socket.emit("STROKE_COMMIT", stroke));
    });

    socket.on("USER_JOINED", ({ user }) => {
      setUsers(prev => {
        const updated = { ...prev, [user.id]: user };
        window.currentUsers = updated;
        return updated;
      });
    });

    socket.on("USER_LEFT", ({ userId }) => {
      setUsers(prev => {
        const updated = { ...prev };
        delete updated[userId];
        window.currentUsers = updated;
        return updated;
      });

      setCursors(prev => {
        const updated = { ...prev };
        delete updated[userId];
        return updated;
      });
    });

    socket.on("CURSOR_UPDATE", ({ userId, x, y }) => {
      setCursors(prev => ({ ...prev, [userId]: { x, y } }));
    });

    const handleMouseMove = (e) => {
      socket.emit("CURSOR_UPDATE", {
        userId: socket.id,
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      socket.off();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      <ToolsBar
        tool={tool}
        setTool={setTool}
        strokeWidth={strokeWidth}
        setStrokeWidth={setStrokeWidth}
        color={color}
        setColor={setColor}
      />

      <CanvasBoard tool={tool} strokeWidth={strokeWidth} overrideColor={color} />

      {Object.entries(cursors).map(([id, pos]) => (
        <div
          key={id}
          style={{
            position: "fixed",
            left: pos.x + "px",
            top: pos.y + "px",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: users[id]?.color || "red",
            pointerEvents: "none",
            transform: "translate(-50%, -50%)",
            zIndex: 999,
          }}
        />
      ))}
    </div>
  );
}

export default App;
