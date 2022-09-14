import React from "react";

export default function Button({ text, color, background, onClick }) {
  return (
    <div
      style={{ color: color, backgroundColor: background, borderColor: color }}
      onClick={(e) => onClick && onClick(e)}
      className="filer-button lg6"
    >
      {text}
    </div>
  );
}
