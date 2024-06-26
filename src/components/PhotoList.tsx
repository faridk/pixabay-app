"use client";
import React from "react";
import Photo from "./Photo";

interface PhotoListProps {
  photos: PixabayImage[];
}

const PhotoList: React.FC<PhotoListProps> = ({ photos }) => {
  
  return (
    <div>
      {photos.map((photo) => (
        <div key={photo.id} className="max-w-lg max-h-lg">
          <Photo photo={photo} />
        </div>
      ))}
    </div>
  );
};

export default PhotoList;
