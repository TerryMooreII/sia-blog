import url from 'url'
import path from 'path'

import { full as emoji } from 'markdown-it-emoji'
import taskLists from 'markdown-it-task-lists'
import video from 'markdown-it-video'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  // User Config
  site: {
    blog_url: process.env.BLOG_URL || 'https://terrymooreii.github.io/sia-blog',
    blog_title: 'Terry Moore II',
    blog_description: 'Just another blog with no real value',
    blog_image: '',
    author: 'Terry Moore II',
    email_address: 'terry.moore.ii@gmail.com',
    highlightjs_theme: 'atom-one-dark.min',
    nav: [
      {
        title: 'Home',
        href: '/',
      },
      {
        title: 'Blog',
        href: '/blog',
      }
    ],
  },

  // App config
  app: {
    public: `${__dirname}/public`,
    src: `${__dirname}/src`,
    partials: '_partials',
    template_ext: '.njk',
    content: 'content',
    css: 'css',
    js: 'js',
    assets: 'assets',
    images: 'imgs',
    posts_template: 'posts.njk',
    blog_list: 'blog',
    feed: {
      count: 10,
      rss2: true,
      atom1: true,
      json1: true,
    },
    markdown: {
      highlightjs: true,
      plugins: [emoji, taskLists, video]
    }
  },
}
