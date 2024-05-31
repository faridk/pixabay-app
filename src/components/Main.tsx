"use client";
import React, { useState, useEffect } from "react";
import PhotoGrid from "./PhotoList";
import getPhotos from "@/lib/getPhotos";

const Main: React.FC = () => {
  const [photos, setPhotos] = useState<PixabayImage[]>([]);
  
  useEffect(() => {
    getPhotos()
    .then(response => {
      setPhotos(response.hits);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, [])

  return (
    <div className="mx-auto max-w-screen-md">
      <PhotoGrid photos={photos}/>
    </div>
  );
};

export default Main;
