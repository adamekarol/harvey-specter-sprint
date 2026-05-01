import { defineQuery } from 'next-sanity'

export const portfolioQuery = defineQuery(`
  *[_type == "portfolio"] | order(order asc) {
    _id,
    title,
    slug,
    tags,
    image,
    link,
    order
  }
`)

export type PortfolioItem = {
  _id: string
  title: string
  slug: { current: string } | null
  tags: string[] | null
  image: { asset: { _ref: string } } | null
  link: string | null
  order: number | null
}

export const servicesQuery = defineQuery(`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    order,
    description,
    deliverables,
    image,
    imagePosition
  }
`)

export type Service = {
  _id: string
  title: string
  slug: { current: string } | null
  order: number
  description: string
  deliverables: string[] | null
  image: { asset: { _ref: string } } | null
  imagePosition: string | null
}
