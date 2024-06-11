import React, { useState, useEffect } from "react";
import "./UserSliders.scss";

const images = [
  "https://dntu.edu.vn/storage/slider/SNKI6B5zhVjVfJzWW8IjSuImULqobt-metaZ0NnUnFTY0Q2TlM4d3FqWkpNNHg4d3ZnVEJWWW9YLW1ldGFZK0c3bFc1bkxtcHdadz09LS5qcGc=-.webp",
  "https://dntu.edu.vn/storage/slider/UoBCeY2SctQYqZLj22K59ReYq2JZCR-metaY29uZy12aWVuLXJlc2l6ZS5wbmc=-.webp",
  "https://dntu.edu.vn/images/popup-xethocba.jpg",
  "https://dntu.edu.vn/storage/dntu/post/01HZNSPTKQ4ADEDCXCN2A8VAKK.jpg",
];

interface UserSlidersProps {
  interval?: number;
}

const UserSliders: React.FC<UserSlidersProps> = ({ interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [interval]);

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="image-slider">
      <div
        className="main-slide"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      />
      <button className="prev" onClick={prevSlide}>
        ❮
      </button>
      <button className="next" onClick={nextSlide}>
        ❯
      </button>
    </div>
  );
};

export default UserSliders;
