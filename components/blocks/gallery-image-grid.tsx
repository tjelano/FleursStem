"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";

interface GalleryImageGridProps {
  images: any[];
  zoom: boolean;
  display: string;
  columns?: string;
}

export default function GalleryImageGrid({ images, zoom, display, columns }: GalleryImageGridProps) {
  const [zoomedImageIndex, setZoomedImageIndex] = useState<number | null>(null);

  if (!images || images.length === 0) {
    return <p className="text-center text-muted-foreground">No images found.</p>;
  }

  // Filter out images without assets
  const validImages = images.filter(image => image && image.asset);

  const handleImageClick = (index: number) => {
    if (zoom) {
      setZoomedImageIndex(index);
    }
  };

  const handleClose = () => {
    setZoomedImageIndex(null);
  };

  const handlePrevious = () => {
    if (zoomedImageIndex !== null && zoomedImageIndex > 0) {
      setZoomedImageIndex(zoomedImageIndex - 1);
    }
  };

  const handleNext = () => {
    if (zoomedImageIndex !== null && zoomedImageIndex < validImages.length - 1) {
      setZoomedImageIndex(zoomedImageIndex + 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (zoomedImageIndex === null) return;

      switch (e.key) {
        case "Escape":
          handleClose();
          break;
        case "ArrowLeft":
          e.preventDefault();
          handlePrevious();
          break;
        case "ArrowRight":
          e.preventDefault();
          handleNext();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [zoomedImageIndex]);

  const renderImages = (uniformSizing: boolean = true) =>
    validImages.map((image: any, index: number) => {
      // Get original image dimensions for proper aspect ratio
      const originalWidth = image.asset.metadata?.dimensions?.width || 800;
      const originalHeight = image.asset.metadata?.dimensions?.height || 600;
      const aspectRatio = originalWidth / originalHeight;
      
      // Generate URLs without forcing aspect ratio
      const imageUrl = urlFor(image).width(800).url();
      
      return (
        <div
          key={image._key || index}
          className={cn(
            "relative overflow-hidden rounded-lg",
            zoom && "cursor-zoom-in transition-transform hover:scale-105",
            uniformSizing && "aspect-square"
          )}
          onClick={() => handleImageClick(index)}
          style={{
            aspectRatio: uniformSizing ? undefined : aspectRatio,
          }}
        >
          <img
            src={imageUrl}
            alt={image.alt || ""}
            className={cn(
              "h-full w-full object-center",
              uniformSizing ? "object-cover" : "object-contain"
            )}
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
      gridContent = <div className="space-y-4">{renderImages(false)}</div>;
      break;
    case "inline":
      gridContent = <div className="flex flex-wrap gap-4">{renderImages(false)}</div>;
      break;
    case "carousel":
      gridContent = <div className="flex gap-4 overflow-x-auto pb-4">{renderImages(false)}</div>;
      break;
    case "masonry":
      gridContent = (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" style={{ gridAutoRows: 'auto' }}>
          {renderImages(false)}
        </div>
      );
      break;
    case "uniform":
      gridContent = (
        <div className={cn("grid gap-4", columns || "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")}>
          {renderImages(true)}
        </div>
      );
      break;
    default:
      gridContent = (
        <div className={cn("grid gap-4", columns || "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")}>
          {renderImages(true)}
        </div>
      );
  }

  const currentImage = zoomedImageIndex !== null ? validImages[zoomedImageIndex] : null;
  const largeImageUrl = currentImage ? urlFor(currentImage).width(1600).url() : "";

  return (
    <>
      {gridContent}
      {zoomedImageIndex !== null && currentImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={handleClose}
        >
          <img
            src={largeImageUrl}
            alt={currentImage.alt || "Zoomed"}
            className="max-w-[90vw] max-h-[90vh] object-contain object-center rounded-lg shadow-lg border-4 border-white"
            onClick={e => e.stopPropagation()}
          />
          
          {/* Navigation buttons */}
          {validImages.length > 1 && (
            <>
              {/* Previous button */}
              {zoomedImageIndex > 0 && (
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl font-bold bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-80 transition-all"
                  onClick={handlePrevious}
                  aria-label="Previous image"
                >
                  ‹
                </button>
              )}
              
              {/* Next button */}
              {zoomedImageIndex < validImages.length - 1 && (
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl font-bold bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-80 transition-all"
                  onClick={handleNext}
                  aria-label="Next image"
                >
                  ›
                </button>
              )}
            </>
          )}
          
          {/* Close button */}
          <button
            className="absolute top-8 end-8 text-white text-3xl font-bold bg-black bg-opacity-50 rounded-full px-3 py-1 hover:bg-opacity-80"
            onClick={handleClose}
            aria-label="Close zoomed image"
          >
            ×
          </button>
          
          {/* Image counter */}
          {validImages.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white bg-black bg-opacity-50 rounded-full px-4 py-2 text-sm">
              {zoomedImageIndex + 1} / {validImages.length}
            </div>
          )}
        </div>
      )}
    </>
  );
} 