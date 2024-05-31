"use client";
import React, { useState, useEffect } from "react";
import PhotoList from "./PhotoList";
import getPhotos from "@/lib/getPhotos";
import SearchBar from "./SearchBar";
import Paginator from "./Paginator";
import { useRouter, useSearchParams } from "next/navigation";

const Main: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState<string | null>(searchParams.get("q") || null);
  
  const pageString: string | null = searchParams.get("page");
  const pageInt: number | null = pageString !== null ? parseInt(pageString, 10) : null;
  const [page, setPage] = useState<number | null>(pageInt !== null && !isNaN(pageInt) ? pageInt : null);

  const [photoCount, setPhotoCount] = useState<number>(0);
  const [photos, setPhotos] = useState<PixabayImage[]>([]);
  const [showNoPhotosMessage, setShowNoPhotosMessage] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [showLoadingMessage, setShowLoadingMessage] = useState<boolean>(false);
  
  useEffect(() => {
    setShowLoadingMessage(true);
    getPhotos(query, page)
    .then(response => {
      console.log(response);
      setPhotos(response.hits);
      setPhotoCount(response.totalHits);
      setShowNoPhotosMessage(response.totalHits == 0);
      setShowLoadingMessage(false);
    })
    .catch(error => {
      console.error('Error:', error);
      setShowErrorMessage(true);
      setShowLoadingMessage(false);
    });
  }, [query, page]);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    query !== null ? newParams.set("q", query) : newParams.delete("q");
    page !== null ? newParams.set("page", page.toString()) : newParams.delete("page");
    router.push(`/?${newParams.toString()}`);
  }, [query, page, searchParams, router]);

  return (
    <div className="mx-auto max-w-screen-md">
      <SearchBar query={query} setQuery={setQuery} />
      {
        showNoPhotosMessage ?
          <div className="flex flex-col justify-center items-center my-10">No photos found</div>
          :
          showErrorMessage ?
            <div className="flex flex-col justify-center items-center my-10">Error</div>
            :
            showLoadingMessage ?
              <div className="flex flex-col justify-center items-center my-10">Loading...</div>
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
