export const dynamic = "force-dynamic";
import { client } from "@/sanity/lib/client";
import { GALLERIES_QUERY } from "@/sanity/queries/gallery-document";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galleries",
  description: "Browse our collection of image galleries",
};

export default async function GalleriesPage() {
  const galleries = await client.fetch(GALLERIES_QUERY);

  return (
    <div className="my-16 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Image Galleries
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of curated image galleries
          </p>
        </div>

        {/* Galleries Grid */}
        {galleries && galleries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleries.map((gallery: any) => (
              <Link
                key={gallery.slug.current}
                href={`/gallery/${gallery.slug.current}`}
                className="group block"
              >
                <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* Gallery Preview Image */}
                  {gallery.coverImage ? (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={urlFor(gallery.coverImage)
                          .width(400)
                          .height(225)
                          .url()}
                        alt={gallery.coverImage.alt || gallery.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : gallery.images && gallery.images.length > 0 && gallery.images[0] ? (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={urlFor(gallery.images[0])
                          .width(400)
                          .height(225)
                          .url()}
                        alt={gallery.images[0].alt || gallery.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : null}
                  
                  {/* Gallery Info */}
                  <div className="p-6">
                    {gallery.eyebrow && (
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        {gallery.eyebrow}
                      </p>
                    )}
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {gallery.title}
                    </h2>
                    {gallery.description && (
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {gallery.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>
                        {gallery.images?.length || 0} image{gallery.images?.length !== 1 ? 's' : ''}
                      </span>
                      <span className="group-hover:text-primary transition-colors">
                        View Gallery →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No galleries found.</p>
          </div>
        )}
      </div>
    </div>
  );
} 