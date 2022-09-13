import React from "react";

export default function FloatingButton({ icon, text, onClick }) {
  return (
    <div className="floating-button flex-center" onClick={onClick}>
      <img className="icon-image" src={icon} alt="" />
      <span>{text}</span>
    </div>
  );
}
