import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { GALLERY_QUERY, GALLERIES_SLUGS_QUERY } from "@/sanity/queries/gallery-document";
import { Metadata } from "next";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import GalleryDisplay from "@/components/blocks/GalleryDisplay";

export async function generateStaticParams() {
  const galleries = await client.fetch(GALLERIES_SLUGS_QUERY);
  return galleries.map((gallery: any) => ({
    slug: gallery.slug.current,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const gallery = await client.fetch(GALLERY_QUERY, { slug: params.slug });

  if (!gallery) {
    return {
      title: "Gallery Not Found",
    };
  }

  return {
    title: gallery.meta_title || gallery.title,
    description: gallery.meta_description || gallery.description,
    openGraph: gallery.ogImage
      ? {
          images: [
            {
              url: urlFor(gallery.ogImage).url(),
              width: 1200,
              height: 630,
              alt: gallery.title,
            },
          ],
        }
      : undefined,
  };
}

export default async function GalleryPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const gallery = await client.fetch(GALLERY_QUERY, { slug: params.slug });

  if (!gallery) {
    notFound();
  }

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
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
              <img
                src={urlFor(gallery.images[0])
                  .width(1200)
                  .height(900)
                  .url()}
                alt={gallery.images[0]?.alt || ""}
                className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
              />
              <button
                className="absolute top-4 right-4 text-white text-3xl font-bold"
              >
                &times;
              </button>
            </div>
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
    <div className="my-16 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          {gallery.eyebrow && (
            <p className="text-sm font-medium text-muted-foreground mb-2">
              {gallery.eyebrow}
            </p>
          )}
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {gallery.title}
          </h1>
          {gallery.description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {gallery.description}
            </p>
          )}
        </div>

        {/* Gallery */}
        <GalleryDisplay gallery={gallery} />
      </div>
    </div>
  );
} 