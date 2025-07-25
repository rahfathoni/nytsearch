export interface Article {
  _id: string
  web_url: string
  snippet: string
  abstract: string
  lead_paragraph?: string
  pub_date: string
  source: string
  word_count: number
  document_type: string
  type_of_material: string
  section_name?: string
  subsection_name?: string
  news_desk?: string
  byline?: {
    original?: string
  }
  headline: {
    main: string
    kicker?: string
    print_headline?: string
  }
  keywords: {
    name: string
    value: string
    rank: number
  }[]
  multimedia?: {
    caption?: string
    credit?: string
    default?: {
      url: string
      height: number
      width: number
    }
    thumbnail?: {
      url: string
      height: number
      width: number
    }
  }
}

export interface NytSearchResponse {
  status: string
  copyright: string
  response: {
    docs: Article[]
    metadata: {
      hits: number
      offset: number
      time: number
    }
  }
}