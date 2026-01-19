# System Architecture Documentation

## 1. ⚙️ High-Level Overview

The app implements a collaborative drawing board using a server-authoritative event model.

**Key goals:**
- Real-time drawing
- Multi-user awareness
- Global undo/redo
- Late join consistency

## 2. 📊 Data Flow Diagram

```
+---------+    STROKE_END      +---------+
| ClientA | -----------------> | Server  |
|         |                    |         |
| Canvas  | <-- STROKE_COMMIT -|         |
+---------+                    +---------+
     |                              |
     |        REPLAY_HISTORY        |
     +------------------------------+
```

**Cursor Data Flow:**
```
Client → CURSOR_UPDATE → Server → broadcast → Clients
```

## 3. 🧩 Stroke Data Model

Each stroke is stored as:

```javascript
{
  id: string,
  userId: string,
  tool: "brush" | "eraser",
  color: string,
  width: number,
  points: [{ x, y }, ...]
}
```

**Why stroke model?**
- Clean undo/redo
- Deterministic replay
- Conflict-safe across users

## 4. 🔌 WebSocket Protocol

### Client → Server Events

| Event | Payload | Description |
|-------|---------|-------------|
| `CURSOR_UPDATE` | `{userId, x, y}` | remote cursor sharing |
| `STROKE_END` | `stroke object` | finalize stroke |
| `UNDO` | `none` | request global undo |
| `REDO` | `none` | request global redo |

### Server → Client Events

| Event | Payload | Description |
|-------|---------|-------------|
| `INITIAL_STATE` | `{users, history}` | initial user+history sync |
| `USER_JOINED` | `{user}` | notify peers |
| `USER_LEFT` | `{userId}` | remove cursor |
| `STROKE_COMMIT` | `stroke` | broadcast new stroke |
| `REPLAY_HISTORY` | `[strokes]` | full history redraw |
| `CLEAR_CANVAS` | `none` | erase before replay |

## 5. 🔁 Undo/Redo Strategy

### Global Undo Logic

Server maintains two stacks:

```javascript
let strokeHistory = [];
let undoneStrokes = [];
```

**Undo sequence:**
1. Pop last stroke from `strokeHistory`
2. Push into `undoneStrokes`
3. Broadcast:
   - `CLEAR_CANVAS`
   - `REPLAY_HISTORY(strokeHistory)`

**Redo:**
1. Pop stroke from `undoneStrokes`
2. Push to `strokeHistory`
3. Broadcast clear + replay

This ensures determinism across clients.

## 6. 🔐 Conflict Resolution

### Simultaneous drawing
- **No conflict:** strokes are independent

### Undo vs In-progress stroke
- Undo affects completed strokes only

### Undo across users
- Global undo removes last stroke globally, as required

## 7. 🏎 Performance Decisions

### Stroke batching
- Only send stroke on `mouseUp`, not every pixel
- Reduces bandwidth and CPU load

### Replay over patching
- Redraw all strokes after undo
- Simpler + deterministic

### In-memory history
- O(1) push/pop
- Fast for prototype

## 8. 🚀 Scaling Thoughts (Live Interview)

To handle 1000+ users:
- Store strokes in Redis/Mongo
- Use rooms for sharding
- Use CRDT for offline merges
- Use compression for stroke paths
- Use WebRTC for P2P cursor streams (optional)

## 9. 🎯 Possible Enhancements

- Persistent storage
- Touch support
- Pressure-sensitive strokes
- Selection/Move tools
- Export to PNG/SVG
- Auth + avatars
