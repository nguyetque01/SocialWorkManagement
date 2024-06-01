import React, { useState, useEffect } from "react";
import "./UserSliders.scss";

const images = [
  "https://dntu.edu.vn/storage/slider/SNKI6B5zhVjVfJzWW8IjSuImULqobt-metaZ0NnUnFTY0Q2TlM4d3FqWkpNNHg4d3ZnVEJWWW9YLW1ldGFZK0c3bFc1bkxtcHdadz09LS5qcGc=-.webp",
  "https://dntu.edu.vn/storage/dntu/post/niqGSwhMTCCzfyOx680ytSsnZ5cf4j-metaMS5qcGc=-.jpg",
  "https://dntu.edu.vn/storage/images/resized/dntu-chuyen-xe-ve-que-don-tet-nam-2024.jpg",
  "https://dntu.edu.vn/storage/images/resized/tham-gia-dien-tap-phuong-an-chua-chay-cuu-nan-cuu-ho-cnch-phoi-hop-nhieu-luc-luong-tai-trung-tam-thuong-mai-lotte-mart-dong-nai.jpg",
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
      {images.map((image, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
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
