import { defineField, defineType } from "sanity";
import { ImageIcon } from "lucide-react";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
  name: "gallery",
  type: "document",
  title: "Gallery",
  icon: ImageIcon,
  groups: [
    {
      name: "content",
      title: "Content",
    },
    {
      name: "seo",
      title: "SEO",
    },
    {
      name: "settings",
      title: "Settings",
    },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "The main title for this gallery page",
      group: "content",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "settings",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      description: "The smaller text that sits above the title to provide context",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "A brief description of this gallery",
      type: "text",
      group: "content",
    }),
    defineField({
      name: "images",
      type: "array",
      title: "Images",
      description: "Add images to your gallery",
      group: "content",
      of: [
        {
          name: "image",
          type: "image",
          title: "Image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alt Text",
              description:
                "Remember to use alt text for people to be able to read what is happening in the image if they are using a screen reader, it's also important for SEO",
            }),
            defineField({
              name: "caption",
              type: "string",
              title: "Caption",
              description: "Optional caption to display below the image",
            }),
          ],
        },
      ],
      options: {
        layout: "grid",
      },
    }),
    defineField({
      name: "display",
      type: "string",
      title: "Display as",
      description: "How should we display these images?",
      group: "content",
      options: {
        list: [
          { title: "Grid", value: "grid" },
          { title: "Masonry", value: "masonry" },
          { title: "Carousel", value: "carousel" },
          { title: "Lightbox", value: "lightbox" },
        ],
        layout: "radio",
      },
      initialValue: "grid",
    }),
    defineField({
      name: "columns",
      type: "string",
      title: "Grid Columns",
      description: "Number of columns for grid layout",
      group: "content",
      options: {
        list: [
          { title: "2 Columns", value: "grid-cols-2" },
          { title: "3 Columns", value: "grid-cols-3" },
          { title: "4 Columns", value: "grid-cols-4" },
          { title: "5 Columns", value: "grid-cols-5" },
          { title: "6 Columns", value: "grid-cols-6" },
        ],
        layout: "radio",
      },
      initialValue: "grid-cols-3",
    }),
    defineField({
      name: "zoom",
      type: "boolean",
      title: "Zoom enabled",
      description: "Should we enable zooming of images?",
      group: "content",
      initialValue: false,
    }),
    defineField({
      name: "meta_title",
      title: "Meta Title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "meta_description",
      title: "Meta Description",
      type: "text",
      group: "seo",
    }),
    defineField({
      name: "noindex",
      title: "No Index",
      type: "boolean",
      initialValue: false,
      group: "seo",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image - [1200x630]",
      type: "image",
      group: "seo",
    }),
    orderRankField({ type: "gallery" }),
  ],
  preview: {
    select: {
      title: "title",
      images: "images",
      image: "images.0",
    },
    prepare(selection) {
      const { title, images, image } = selection;
      const imageCount = images ? images.length : 0;

      return {
        title: title || "Gallery",
        subtitle: `${imageCount} image${imageCount !== 1 ? "s" : ""}`,
        media: image,
      };
    },
  },
}); 