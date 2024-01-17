import config from '../config.js'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import nunjucks from 'nunjucks'
import markdownit from 'markdown-it'
import { full as emoji } from 'markdown-it-emoji'
import taskLists from 'markdown-it-task-lists'
import hljs from 'highlight.js'
import { formatDate, mkdir, writefile } from './helpers.js'
import javascript from 'highlight.js/lib/languages/javascript'
import bash from 'highlight.js/lib/languages/bash'
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('bash', bash)

const { app, site } = config

const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      } catch (__) {}
    }

    return ''
  },
})
  .use(emoji)
  .use(taskLists)

nunjucks.configure(path.join(app.src, app.partials), {
  autoescape: false,
})

const render = (srcFolder, publicFolder, file) => {
  const parsed = matter.read(path.join(srcFolder, file))
  const { data: page, content } = parsed
  const fileName = path.parse(file).name
  const fileNameHtml = `${fileName}.html`

  if (!page.template) return

  page.date = formatDate(page.created_at)

  // technically slug is the permalink or uri
  // this removes the public folder path to reveal the slug path
  page.slug = path.join(publicFolder).replace(app.public, '')
  // index pages will render automatically in folder but if the file
  // name is not then make sure it included in the permalink
  if (fileNameHtml !== 'index.html') {
    page.slug = path.join(page.slug, fileNameHtml)
  }

  const html = md.render(content)
  const rendered = nunjucks.render(`${page.template}${app.template_ext}`, {
    content: html,
    page,
    site,
  })

  writefile(path.join(publicFolder, fileNameHtml), rendered)

  // collect all the page attibutes for blog posts
  if (page.template === 'post') {
    return { ...page }
  }
}

const getAllFiles = (srcPath, posts) => {
  // take the source path and generate the public path equivalent
  const publicPath = srcPath.replace(path.join(app.src, app.content), app.public)

  mkdir(publicPath)

  const files = fs.readdirSync(srcPath)

  files.forEach((file) => {
    const filePath = path.join(srcPath, file)

    if (fs.statSync(filePath).isDirectory()) {
      // recursively look at files
      getAllFiles(filePath, posts)
    } else {
      // Process markdown files and render the nunjucks template
      if (path.extname(file) === '.md') {
        const post = render(srcPath, publicPath, file)
        if (post) {
          posts.push(post)
        }
      } else {
        // file is not a markdown file so just copy it to its public folder
        fs.copyFileSync(path.join(srcPath, file), path.join(publicPath, file))
      }
    }
  })
  return posts
}

export const parseContent = () => {
  return getAllFiles(path.join(app.src, app.content), [], '/').filter((o) => o != null) // make sure there are no undefined items
}

export const generateBlogListPage = (posts) => {
  const rendered = nunjucks.render(app.posts_template, {
    posts,
    site,
  })

  const blogListDirectory = path.join(app.public, app.blog_list)

  mkdir(blogListDirectory)
  writefile(path.join(blogListDirectory, 'index.html'), rendered)
}
