"use client";
import "./styles/dateCard.css";

const checkDatesAreSameDay = (first: Date, second: Date): boolean =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

const DateCard = ({
  timestamp,
  onClick,
  selectedDate,
}: {
  timestamp: number;
  onClick: (date: Date) => void;
  selectedDate?: Date;
}) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return (
    <div
      className={
        selectedDate && checkDatesAreSameDay(selectedDate, date)
          ? "datecard-root active"
          : "datecard-root"
      }
      onClick={() => onClick(date)}
      onMouseDown={(e) => e.preventDefault()}
      onMouseMove={(e) => e.preventDefault()}
    >
      <div className="datecard-bold">
        {month} {day}
      </div>
      <div className="datecard-light">{year}</div>
    </div>
  );
};
export default DateCard;
