import { defineField, defineType } from "sanity";
import { Files } from "lucide-react";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
  name: "page",
  type: "document",
  title: "Page",
  icon: Files,
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
    defineField({ name: "title", type: "string", group: "content" }),
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
      name: "blocks",
      type: "array",
      group: "content",
      of: [
        { type: "hero-1" },
        { type: "hero-2" },
        { type: "section-header" },
        { type: "split-row" },
        { type: "grid-row" },
        { type: "carousel-1" },
        { type: "carousel-2" },
        { type: "timeline-row" },
        { type: "cta-1" },
        { type: "logo-cloud-1" },
        { type: "faqs" },
        { type: "form-newsletter" },
        { type: "all-posts" },
        { type: "galleryBlock" },
      ],
      options: {
        insertMenu: {
          groups: [
            {
              name: "hero",
              title: "Hero",
              of: ["hero-1", "hero-2"],
            },
            {
              name: "logo-cloud",
              title: "Logo Cloud",
              of: ["logo-cloud-1"],
            },
            {
              name: "section-header",
              title: "Section Header",
              of: ["section-header"],
            },
            {
              name: "grid",
              title: "Grid",
              of: ["grid-row"],
            },
            {
              name: "split",
              title: "Split",
              of: ["split-row"],
            },
            {
              name: "carousel",
              title: "Carousel",
              of: ["carousel-1", "carousel-2"],
            },
            {
              name: "timeline",
              title: "Timeline",
              of: ["timeline-row"],
            },
            {
              name: "cta",
              title: "CTA",
              of: ["cta-1"],
            },
            {
              name: "faqs",
              title: "FAQs",
              of: ["faqs"],
            },
            {
              name: "forms",
              title: "Forms",
              of: ["form-newsletter"],
            },
            {
              name: "all-posts",
              title: "All Posts",
              of: ["all-posts"],
            },
            {
              name: "galleryBlock",
              title: "Gallery Block",
              of: ["galleryBlock"],
            },
          ],
          views: [
            {
              name: "grid",
              previewImageUrl: (block) => `/sanity/preview/${block}.jpg`,
            },
            { name: "list" },
          ],
        },
      },
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
    orderRankField({ type: "page" }),
  ],
});
