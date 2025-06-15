import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

interface Post {
  slug: string
  frontMatter: {
    title: string
    date: string
    description: string
  }
}

function getPostMetadata(): Post[] {
  const folder = path.join(process.cwd(), 'content/posts/')
  const files = fs.readdirSync(folder)
  const markdownPosts = files.filter((file) => file.endsWith('.mdx'))

  const posts = markdownPosts.map((fileName) => {
    const fileContents = fs.readFileSync(
      path.join(folder, fileName),
      'utf8'
    )
    const matterResult = matter(fileContents)
    return {
      slug: fileName.replace('.mdx', ''),
      frontMatter: matterResult.data as Post['frontMatter'],
    }
  })

  return posts.sort((a, b) =>
    new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime()
  )
}

export default function Home() {
  const posts = getPostMetadata()

  return (
    <div className="mt-4 max-w-3xl mx-auto px-6 pt-8 pb-16 rounded-lg bg-gray-20 shadow-md">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-primary">My Blog</h1>
        <p className="text-primary border-b border-gray-300 pb-4">
          Thoughts, ideas, and everything in between.</p>
      </header>
      <main>
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="pb-8 p-6 rounded-lg bg-white hover:bg-gray-100 transition-colors">
              <Link href={`/blog/${post.slug}`} className="block group">
                <h2 className="text-xl font-semibold mb-2 text-primary group-hover:text-secondary-light">
                  {post.frontMatter.title}
                </h2>
                <p className="text-primary text-sm mb-3">
                  {new Date(post.frontMatter.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-primary">
                  {post.frontMatter.description}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
