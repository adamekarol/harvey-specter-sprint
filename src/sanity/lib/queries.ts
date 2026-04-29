import { defineQuery } from 'next-sanity'

export const portfolioQuery = defineQuery(`
  *[_type == "portfolio"] | order(order asc) {
    _id,
    title,
    slug,
    tags,
    image,
    externalImageUrl,
    link,
    order
  }
`)
