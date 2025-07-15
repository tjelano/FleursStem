import { groq } from "next-sanity";

export const GALLERY_QUERY = groq`
  *[_type == "gallery" && slug.current == $slug][0]{
    title,
    slug,
    eyebrow,
    description,
    images[]{
      _key,
      alt,
      caption,
      hotspot,
      crop,
      asset->{
        _id,
        url,
        mimeType,
        metadata {
          lqip,
          dimensions {
            width,
            height
          }
        }
      }
    },
    display,
    columns,
    zoom,
    meta_title,
    meta_description,
    noindex,
    ogImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
    }
  }
`;

export const GALLERIES_QUERY = groq`
  *[_type == "gallery" && defined(slug)] | order(_createdAt desc){
    title,
    slug,
    eyebrow,
    description,
    coverImage {
      alt,
      hotspot,
      crop,
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions {
            width,
            height
          }
        }
      }
    },
    images[]{
      _key,
      alt,
      hotspot,
      crop,
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions {
            width,
            height
          }
        }
      }
    }
  }
`;

export const GALLERIES_SLUGS_QUERY = groq`*[_type == "gallery" && defined(slug)]{slug}`; 