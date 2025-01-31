import type { NextConfig } from "next";
import createMDX from '@next/mdx'
import remarkFrontmatter from 'remark-frontmatter'

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  transpilePackages: ['three'],
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter], // Add this plugin
    rehypePlugins: [],
  },
})


export default withMDX(nextConfig);
