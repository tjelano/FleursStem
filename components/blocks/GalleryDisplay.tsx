"use client";

import React, { useState } from "react";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

interface GalleryDisplayProps {
  gallery: any;
}

export default function GalleryDisplay({ gallery }: GalleryDisplayProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);

  const renderImages = (forLightbox = false) => {
    if (!gallery.images || gallery.images.length === 0) {
      return <p className="text-center text-muted-foreground">No images found.</p>;
    }

    return gallery.images.map((image: any, index: number) => {
      if (!image || !image.asset) return null;

      const imageUrl = urlFor(image)
        .width(800)
        .height(600)
        .url();

      return (
        <div
          key={image._key || index}
          className={cn(
            "relative overflow-hidden rounded-lg mb-4",
            gallery.zoom && "cursor-zoom-in transition-transform hover:scale-105"
          )}
          onClick={gallery.display === "lightbox" && !forLightbox ? () => openLightbox(index) : undefined}
          style={{ breakInside: "avoid" }}
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
  };

  const renderGallery = () => {
    switch (gallery.display) {
      case "grid":
        return (
          <div className={cn(
            "grid gap-4",
            gallery.columns || "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          )}>
            {renderImages()}
          </div>
        );
      case "masonry":
        return (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
            {renderImages()}
          </div>
        );
      case "carousel":
        return (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {renderImages()}
          </div>
        );
      case "lightbox":
        return (
          <>
            <div className={cn(
              "grid gap-4",
              gallery.columns || "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            )}>
              {renderImages()}
            </div>
            {lightboxOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" onClick={closeLightbox}>
                <img
                  src={urlFor(gallery.images[lightboxIndex])
                    .width(1200)
                    .height(900)
                    .url()}
                  alt={gallery.images[lightboxIndex]?.alt || ""}
                  className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
                />
                <button
                  className="absolute top-4 right-4 text-white text-3xl font-bold"
                  onClick={closeLightbox}
                >
                  &times;
                </button>
              </div>
            )}
          </>
        );
      default:
        return (
          <div className={cn(
            "grid gap-4",
            gallery.columns || "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          )}>
            {renderImages()}
          </div>
        );
    }
  };

  return (
    <div className="gallery-container">
      {renderGallery()}
    </div>
  );
} 