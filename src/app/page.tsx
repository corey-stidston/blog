import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/types'

function getPostMetadata(): Post[] {
  const folder = path.join(process.cwd(), 'content/posts/')
  const files = fs.readdirSync(folder)
  const markdownPosts = files.filter((file) => file.endsWith('.mdx'))
  
  // Filter out playground.mdx in production
  const filteredPosts = process.env.NODE_ENV === 'development' 
    ? markdownPosts 
    : markdownPosts.filter(file => file !== 'playground.mdx')

  const posts = filteredPosts.map((fileName) => {
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
      <header className="mb-8 border-b border-gray-300 pb-4">
        <div className="flex items-center gap-4 mb-1 pb-2">
          <div>
            <Image
              src="/images/corey_stidston_profile.png"
              alt="Corey Stidston Logo"
              width={80}
              height={80}
              className="rounded-full border"
              priority
            />
          </div>
          <div>
            <h1 className="text-2xl font-semibold mb-2 text-primary">Corey&apos;s place</h1>
          </div>
        </div>
        <p className="text-primary">
          Covering topics on software design & development. <a href="https://github.com/corey-stidston" className="underline" target="_blank" rel="noopener noreferrer">github.com/corey-stidston</a>
        </p>
      </header>
      <main>
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="pb-8 p-6 rounded-lg bg-white hover:bg-gray-100 transition-colors">
              <Link href={`/posts/${post.slug}`} className="block group">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-2/3">
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
                    <p className="text-primary mb-4">
                      {post.frontMatter.description}
                    </p>
                    {post.frontMatter.tags.map((tag) => (
                      <span key={tag} className="inline-block bg-gray-200 text-gray-700 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {post.frontMatter.thumbnail && (
                    <div className="md:w-1/3 relative h-48">
                      <Image 
                        src={post.frontMatter.thumbnail} 
                        alt={post.frontMatter.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover rounded-md"
                        priority
                      />
                    </div>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
