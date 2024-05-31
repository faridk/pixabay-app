"use client";
import Image from "next/image";
import React from "react";

interface PhotoProps {
  photo: PixabayImage;
}

const Photo: React.FC<PhotoProps> = ({ photo }) => {
  return (
    <div>
      <Image
        className="my-2"
        src={photo.webformatURL}
        alt={photo.tags}
        width={photo.webformatWidth}
        height={photo.webformatHeight}
      />
    </div>
  );
};

export default Photo;
