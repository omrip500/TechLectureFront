import React, { useState } from "react";
import "./ToolBar.css";

const VirtualWritingToolbar = () => {
  const [drawingMode, setDrawingMode] = useState(false);

  const startDrawing = () => {
    setDrawingMode(true);
  };

  const stopDrawing = () => {
    setDrawingMode(false);
  };

  const handleToolClick = (toolName) => {
    if (toolName === "טוש") {
      startDrawing();
    } else {
      stopDrawing();
    }
    console.log(`נבחר כלי: ${toolName}`);
  };

  return (
    <div className="virtual-writing-toolbar">
      <button
        onClick={() => handleToolClick("טוש")}
        className={`writing-tool-button ${drawingMode ? "active" : ""}`}
      >
        טוש
      </button>
      <button
        onClick={() => handleToolClick("מגוון צבעים")}
        className="writing-tool-button"
      >
        מגוון צבעים
      </button>
      <button
        onClick={() => handleToolClick("מחק")}
        className="writing-tool-button"
      >
        מחק
      </button>
      <button
        onClick={() => handleToolClick("עפרונות")}
        className="writing-tool-button"
      >
        עפרונות
      </button>
    </div>
  );
};

export default VirtualWritingToolbar;
