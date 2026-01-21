import { useEffect, useRef } from "react";
import socket from "../socket/socket";

export default function CanvasBoard({ tool, strokeWidth, overrideColor }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const drawing = useRef(false);
  const currentStroke = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctxRef.current = ctx;
  }, []);

  const startDrawing = (e) => {
    drawing.current = true;

    const strokeColor =
      tool === "eraser"
        ? "white"
        : overrideColor || (window.currentUsers?.[socket.id]?.color || "black");

    currentStroke.current = {
      id: crypto.randomUUID(),
      userId: socket.id,
      tool,
      color: strokeColor,
      width: strokeWidth,
      points: [{ x: e.clientX, y: e.clientY }],
    };

    const ctx = ctxRef.current;
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
  };

  const draw = (e) => {
    if (!drawing.current) return;

    const { color, width, points } = currentStroke.current;
    points.push({ x: e.clientX, y: e.clientY });

    const ctx = ctxRef.current;
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!drawing.current) return;
    drawing.current = false;

    // finalize stroke & send to server
    socket.emit("STROKE_END", currentStroke.current);
    currentStroke.current = null;
  };

  // === SOCKET EVENTS ===
  useEffect(() => {
    // commit stroke drawn by another user
    socket.on("STROKE_COMMIT", (stroke) => {
      drawStroke(stroke);
    });

    // clear canvas for replay
    socket.on("CLEAR_CANVAS", () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // replay full history
    socket.on("REPLAY_HISTORY", (history) => {
      history.forEach((stroke) => drawStroke(stroke));
    });

    return () => {
      socket.off("STROKE_COMMIT");
      socket.off("CLEAR_CANVAS");
      socket.off("REPLAY_HISTORY");
    };
  }, []);

  // === helper to draw a stored stroke ===
  const drawStroke = (stroke) => {
    const ctx = ctxRef.current;
    ctx.beginPath();
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.width;

    stroke.points.forEach((pt, i) => {
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });

    ctx.stroke();
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        background: "white",
        zIndex: 1,
      }}
    />
  );
}
