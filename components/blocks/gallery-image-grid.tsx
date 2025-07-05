"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";

interface GalleryImageGridProps {
  images: any[];
  zoom: boolean;
  display: string;
  columns?: string;
}

export default function GalleryImageGrid({ images, zoom, display, columns }: GalleryImageGridProps) {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  if (!images || images.length === 0) {
    return <p className="text-center text-muted-foreground">No images found.</p>;
  }

  const renderImages = () =>
    images.map((image: any, index: number) => {
      if (!image || !image.asset) return null;
      const imageUrl = urlFor(image).width(800).height(600).url();
      const largeImageUrl = urlFor(image).width(1600).height(1200).url();
      return (
        <div
          key={image._key || index}
          className={cn(
            "relative overflow-hidden rounded-lg",
            zoom && "cursor-zoom-in transition-transform hover:scale-105"
          )}
          onClick={() => zoom && setZoomedImage(largeImageUrl)}
        >
          <img
            src={imageUrl}
            alt={image.alt || ""}
            className="h-full w-full object-cover"
          />
          {image.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
              {image.caption}
            </div>
          )}
        </div>
      );
    });

  let gridContent;
  switch (display) {
    case "stacked":
      gridContent = <div className="space-y-4">{renderImages()}</div>;
      break;
    case "inline":
      gridContent = <div className="flex flex-wrap gap-4">{renderImages()}</div>;
      break;
    case "carousel":
      gridContent = <div className="flex gap-4 overflow-x-auto pb-4">{renderImages()}</div>;
      break;
    default:
      gridContent = (
        <div className={cn("grid gap-4", columns || "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")}>{renderImages()}</div>
      );
  }

  return (
    <>
      {gridContent}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={() => setZoomedImage(null)}
        >
          <img
            src={zoomedImage}
            alt="Zoomed"
            className="max-w-3xl max-h-[80vh] rounded-lg shadow-lg border-4 border-white"
            onClick={e => e.stopPropagation()}
          />
          <button
            className="absolute top-8 end-8 text-white text-3xl font-bold bg-black bg-opacity-50 rounded-full px-3 py-1 hover:bg-opacity-80"
            onClick={() => setZoomedImage(null)}
            aria-label="Close zoomed image"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
} 