import { stegaClean } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

interface GalleryProps {
  images: any[];
  display?: string;
  zoom?: boolean;
}

export default function Gallery({
  images,
  display,
  zoom,
}: GalleryProps) {
  const cleanImages = stegaClean(images);
  const cleanDisplay = stegaClean(display);
  const cleanZoom = stegaClean(zoom);

  if (!cleanImages || !Array.isArray(cleanImages) || cleanImages.length === 0) {
    return null;
  }

  const renderImages = () => {
    return cleanImages.map((image: any, index: number) => {
      if (!image || !image.asset) return null;

      const imageUrl = urlFor(image)
        .width(800)
        .height(600)
        .url();

      return (
        <div
          key={image._key || index}
          className={cn(
            "relative overflow-hidden rounded-lg",
            cleanZoom && "cursor-zoom-in transition-transform hover:scale-105"
          )}
        >
          <img
            src={imageUrl}
            alt={image.alt || ""}
            className="h-full w-full object-cover"
          />
        </div>
      );
    });
  };

  const renderGallery = () => {
    switch (cleanDisplay) {
      case "stacked":
        return (
          <div className="space-y-4">
            {renderImages()}
          </div>
        );
      
      case "inline":
        return (
          <div className="flex flex-wrap gap-4">
            {renderImages()}
          </div>
        );
      
      case "carousel":
        return (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {renderImages()}
          </div>
        );
      
      default:
        return (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {renderImages()}
          </div>
        );
    }
  };

  return (
    <section className="my-16 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="gallery-container">
          {renderGallery()}
        </div>
      </div>
    </section>
  );
} 