import nextMdx from '@next/mdx'

const withMdx = nextMdx({
  extension: /\.mdx?$/,
})

export default withMdx({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  reactStrictMode: true,
  output: 'export',
  transpilePackages: ['next-mdx-remote'],
  images: {
    unoptimized: true,
  },
})
