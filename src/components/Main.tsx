"use client";
import React, { useState, useEffect } from "react";
import PhotoList from "./PhotoList";
import getPhotos from "@/lib/getPhotos";
import SearchBar from "./SearchBar";
import Paginator from "./Paginator";

const Main: React.FC = () => {
  const [query, setQuery] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [photoCount, setPhotoCount] = useState<number>(0);
  const [photos, setPhotos] = useState<PixabayImage[]>([]);
  const [showNoPhotosMessage, setShowNoPhotosMessage] = useState<boolean>(false);
  
  useEffect(() => {
    getPhotos(query, page)
    .then(response => {
      console.log(response);
      setPhotos(response.hits);
      setPhotoCount(response.totalHits);
      setShowNoPhotosMessage(response.totalHits == 0);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, [query, page])

  return (
    <div className="mx-auto max-w-screen-md">
      <SearchBar query={query} setQuery={setQuery} />
      {
        showNoPhotosMessage ?
        <div className="flex flex-col justify-center items-center my-10">No photos found</div>
        :
        <>
          <PhotoList photos={photos}/>
          <Paginator page={page} setPage={setPage} itemCount={photoCount} />
        </>
      }
    </div>
  );
};

export default Main;
