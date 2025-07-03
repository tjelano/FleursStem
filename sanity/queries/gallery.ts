import { groq } from "next-sanity";

export const galleryQuery = groq`
  _type == "gallery" => {
    _type,
    _key,
    images[]{
      _key,
      alt,
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
    zoom,
  }
`; 