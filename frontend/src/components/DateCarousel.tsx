"use client";
import DateCard from "@/components/DateCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const DateCarousel = ({
  onChange,
  selectedDate,
}: {
  onChange: (date: Date) => void;
  selectedDate?: Date;
}) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7,
    },
  };

  return (
    <Carousel responsive={responsive} draggable>
      {[...Array(30)].map((_, idx) => (
        <DateCard
          key={idx}
          timestamp={Date.now() - (idx + 1) * 24 * 3600 * 1000}
          onClick={(date) => onChange(date)}
          selectedDate={selectedDate}
        />
      ))}
    </Carousel>
  );
};
export default DateCarousel;
