import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { GALLERY_QUERY, GALLERIES_SLUGS_QUERY } from "@/sanity/queries/gallery-document";
import { Metadata } from "next";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import GalleryImageGrid from "@/components/blocks/gallery-image-grid";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const galleries = await client.fetch(GALLERIES_SLUGS_QUERY);
  return galleries.map((gallery: any) => ({
    slug: gallery.slug.current,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const gallery = await client.fetch(GALLERY_QUERY, { slug });

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

export default async function GalleryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const gallery = await client.fetch(GALLERY_QUERY, { slug });

  if (!gallery) {
    notFound();
  }

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
        <div className="gallery-container">
          <GalleryImageGrid
            images={gallery.images}
            zoom={gallery.zoom}
            display={gallery.display}
            columns={gallery.columns}
          />
        </div>
      </div>
    </div>
  );
} 