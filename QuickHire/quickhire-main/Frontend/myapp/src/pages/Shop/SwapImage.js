import React, { useState, useEffect } from "react";

const SwapImage = ({ images, forProfile }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = (e) => {
    e.preventDefault();
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = (e) => {
    e.preventDefault();
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const [styleImage, setStyleImage] = useState("w-[125px] h-[125px] ");

  useEffect(() => {
    if (forProfile) {
      setStyleImage("w-[150px] h-[150px] md:w-[300px] md:h-[300px] objects-cover");
    }
  }, [forProfile]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-center">
        <button onClick={goToPrevious} className="my-auto w-[2.5rem] bg-[#EF4444] text-white rounded mr-5 ">
          <span className="text-2xl font-bold">&#171;</span>
        </button>
        <div className="flex flex-col">
          <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} className={`${styleImage} rounded mx-auto cursor-pointer`} />
        </div>
        <button onClick={goToNext} className="my-auto w-[2.5rem] bg-[#EF4444] text-white rounded ml-5">
          <span className="text-2xl font-bold">&#187;</span>
        </button>
      </div>
      <div className="flex flex-col">
        <p className="text-center">
          {currentIndex + 1} / {images.length}
        </p>
      </div>
    </div>
  );
};

export default SwapImage;
