import React from "react";
import search from "../assets/icons/search.svg";
import close from "../assets/icons/close.svg";

export default function SearchInput({ value, onChange, onSubmit }) {
  const checkSubmitEnter = (e) => {
    if (e.key === "Enter") onSubmit();
  };
  return (
    <div className="search-input-wrapper">
      <div className="input-container">
        <input
          className="search-input"
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search cards..."
          onKeyDown={checkSubmitEnter}
        />
        {value.length > 0 && (
          <img
            className="close"
            onClick={(e) => onSubmit(true)}
            src={close}
            alt=""
          />
        )}
      </div>
      <img src={search} onClick={(e) => onSubmit()} alt="" />
    </div>
  );
}
