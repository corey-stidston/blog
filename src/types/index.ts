export interface PostFrontMatter {
  title: string
  date: string
  description: string
  thumbnail?: string
  tags: string[]
}

export interface Post {
  slug: string
  frontMatter: PostFrontMatter
}
