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

  const renderImages = (uniformSizing: boolean = false) => {
    return cleanImages.map((image: any, index: number) => {
      if (!image || !image.asset) return null;

      // Get original image dimensions for proper aspect ratio
      const originalWidth = image.asset.metadata?.dimensions?.width || 800;
      const originalHeight = image.asset.metadata?.dimensions?.height || 600;
      const aspectRatio = originalWidth / originalHeight;

      const imageUrl = urlFor(image)
        .width(800)
        .url();

      return (
        <div
          key={image._key || index}
          className={cn(
            "relative overflow-hidden rounded-lg",
            cleanZoom && "cursor-zoom-in transition-transform hover:scale-105",
            uniformSizing && "aspect-square"
          )}
          style={{
            aspectRatio: uniformSizing ? undefined : aspectRatio,
          }}
        >
          <img
            src={imageUrl}
            alt={image.alt || ""}
            className={cn(
              "h-full w-full",
              uniformSizing ? "object-cover" : "object-contain"
            )}
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
      
      case "masonry":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" style={{ gridAutoRows: 'auto' }}>
            {renderImages()}
          </div>
        );
      
      case "uniform":
        return (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {renderImages(true)}
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