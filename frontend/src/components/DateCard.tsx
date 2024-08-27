"use client";
import "./styles/dateCard.css";
const DateCard = ({ timestamp }: { timestamp: number }) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return (
    <div className="datecard-root">
      <div className="datecard-bold">
        {month} {day}
      </div>
      <div className="datecard-light">{year}</div>
    </div>
  );
};
export default DateCard;
