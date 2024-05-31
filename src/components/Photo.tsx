"use client";
import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PhotoProps {
  photo: PixabayImage;
}

const Photo: React.FC<PhotoProps> = ({ photo }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Image
            className="my-2 mx-auto"
            src={photo.webformatURL}
            alt={photo.tags}
            width={photo.webformatWidth}
            height={photo.webformatHeight}
          />
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-2xl">
          <div className="my-4">
            <Image
              className="mx-auto"
              src={photo.webformatURL}
              alt={photo.tags}
              width={photo.webformatWidth}
              height={photo.webformatHeight}
            />
            <div className="my-2">
              <span className="font-bold">Uploaded by:</span> {photo.user}
            </div>
            <div className="my-2">
              <span className="font-bold">Tags:</span> {photo.tags}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Photo;
