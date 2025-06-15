import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { PieChart } from '@/components/PieChart'
import { metadata } from '@/app/layout'
import BackButton from '@/components/BackButton'
import Image from 'next/image'

export async function generateStaticParams() {
  const folder = path.join(process.cwd(), 'content/posts/')
  const files = fs.readdirSync(folder)
  const markdownPosts = files.filter((file) => file.endsWith('.mdx'))

  return markdownPosts.map((fileName) => ({
    slug: fileName.replace('.mdx', ''),
  }))
}

const components = {
  PieChart
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const folder = path.join(process.cwd(), 'content/posts/')
  const file = path.join(folder, `${slug}.mdx`)
  const content = fs.readFileSync(file, 'utf8')
  const matterResult = matter(content)
  metadata.title = matterResult.data.title
  metadata.description = matterResult.data.description

  return (
    <div className="mt-4 max-w-3xl mx-auto px-6 pt-8 pb-16 rounded-lg bg-gray-20 shadow-md border-t">
      <BackButton />
      <article>
        <header className="mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3">
              <h1 className="text-3xl font-bold mb-2 text-primary">{matterResult.data.title}</h1>
              <p className="text-primary">
                {new Date(matterResult.data.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="text-primary mt-2">{matterResult.data.description}</p>
            </div>
            {matterResult.data.thumbnail && (
              <div className="md:w-1/3 relative h-48">
                <Image 
                  src={matterResult.data.thumbnail} 
                  alt={matterResult.data.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            )}
          </div>
          <div className="border-b border-gray-300 my-4"></div>
        </header>

        <div className="prose max-w-none">
          <MDXRemote
            source={matterResult.content}
            components={components}
          />
        </div>

        <div className="mt-4">
          <BackButton />
        </div>
      </article>
    </div>
  )
}