import React from "react";
import plus from "../../assets/icons/plus.svg";
import video from "../../assets/icons/video.svg";
import FloatingButton from "../FloatingButton";
import "./index.css";

export default function Navbar() {
  return (
    <div className="navbar-wrapper">
      <div className="navbar-container">
        <div className="app-logo">
          <span className="logo">Virtual cards</span>
          <div className="learn-more">
            <img className="icon-image" src={video} alt="" />
            <span>learn more</span>
          </div>
        </div>
        <FloatingButton icon={plus} text={"Virtual card"} />
      </div>
    </div>
  );
}
