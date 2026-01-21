import React from "react";
import socket from "../socket/socket";

export default function ToolsBar({
  tool,
  setTool,
  strokeWidth,
  setStrokeWidth,
  color,
  setColor
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        left: "10px",
        background: "rgba(255,255,255,0.95)",
        padding: "10px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        zIndex: 1000,
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
      }}
    >
      <button
        onClick={() => setTool("brush")}
        style={{
          padding: "6px 10px",
          borderRadius: "4px",
          border: tool === "brush" ? "2px solid #007bff" : "1px solid #aaa",
          background: "white",
          cursor: "pointer"
        }}
      >
        Brush
      </button>

      <button
        onClick={() => setTool("eraser")}
        style={{
          padding: "6px 10px",
          borderRadius: "4px",
          border: tool === "eraser" ? "2px solid #007bff" : "1px solid #aaa",
          background: "white",
          cursor: "pointer"
        }}
      >
        Eraser
      </button>

      {/* Stroke width */}
      <input
        type="range"
        min="1"
        max="20"
        value={strokeWidth}
        onChange={(e) => setStrokeWidth(Number(e.target.value))}
      />

      {/* Color picker */}
      <input
        type="color"
        value={color}
        disabled={tool === "eraser"}
        onChange={(e) => setColor(e.target.value)}
      />

      {/* Undo / Redo */}
      <button
        onClick={() => socket.emit("UNDO")}
        style={{ padding: "6px 10px", cursor: "pointer" }}
      >
        Undo
      </button>

      <button
        onClick={() => socket.emit("REDO")}
        style={{ padding: "6px 10px", cursor: "pointer" }}
      >
        Redo
      </button>
    </div>
  );
}
