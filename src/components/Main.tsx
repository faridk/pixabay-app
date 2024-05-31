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
  
  useEffect(() => {
    getPhotos(query, page)
    .then(response => {
      console.log(response);
      setPhotos(response.hits);
      setPhotoCount(response.totalHits);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, [query, page])

  return (
    <div className="mx-auto max-w-screen-md">
      <SearchBar query={query} setQuery={setQuery} />
      <PhotoList photos={photos}/>
      <Paginator page={page} setPage={setPage} itemCount={photoCount} />
    </div>
  );
};

export default Main;
