import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { PieChart } from '@/components/PieChart'
import NavigationBar from '@/components/NavigationBar'
import { metadata } from '@/app/layout'

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
    <article className="max-w-2xl mx-auto px-6 py-16">
      <NavigationBar />
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{matterResult.data.title}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {new Date(matterResult.data.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </header>

      <div className="prose dark:prose-invert max-w-none">
        <MDXRemote
          source={matterResult.content}
          components={components}
        />
      </div>
    </article>
  )
}