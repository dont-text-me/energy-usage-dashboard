"use client";
import DateCard from "@/components/DateCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const DateCarousel = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
  };

  return (
    <Carousel responsive={responsive} centerMode>
      {[...Array(15)].map((_, idx) => (
        <DateCard key={idx} timestamp={Date.now() - idx * 24 * 3600 * 1000} />
      ))}
    </Carousel>
  );
};
export default DateCarousel;
