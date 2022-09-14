import React from "react";
import "./index.css";
import burner from "../../assets/icons/burner-red.svg";
import rotate from "../../assets/icons/rotate.svg";

export default function Card({ card }) {
  let available = (card.available_to_spend || {}).value || 0,
    spent = (card.spent || {}).value || 0;
  let available_percentage = (available / (spent + available)) * 100;
  let spent_percentage = (spent / (spent + available)) * 100;
  return (
    <div className="single-card col-sm-12 col-lg-6">
      <div className="card card-item">
        <div className="card-body">
          <div className="card-head">
            <div className="card-head-content">
              <h3 className="card-name">{card.name}</h3>
              <span className="budget-name">{card.budget_name}</span>
            </div>
            <div className="card-head-image">
              <img src={card.card_type == "burner" ? burner : rotate} alt="" />
            </div>
          </div>
          <div className="card-details">
            <span className="type">{card.card_type}</span>
            <span className="date">
              {card.card_type == "burner"
                ? `Expires: ${new Date(card.expiry).toLocaleDateString()}`
                : `Limit: ${card.limit} ${
                    card?.available_to_spend?.currency || ""
                  }`}
            </span>
          </div>
          <div className="card-spent-status">
            <div
              className="spent-status"
              style={{ width: `${available_percentage}%` }}
            ></div>
            <div
              className="available-status"
              style={{ width: `${spent_percentage}%` }}
            ></div>
          </div>
          <div className="card-amount-type">
            <span className="amount-head">Spent</span>
            <span>
              {card?.available_to_spend?.value}{" "}
              {card?.available_to_spend?.currency}
            </span>
          </div>
          <div className="card-amount-type">
            <span className="amount-head green-head">Available to spend</span>
            <span>
              <strong>
                {card?.spent?.value} {card?.spent?.currency}
              </strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
