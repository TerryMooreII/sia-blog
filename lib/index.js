import config from '../config.js'
import { parseContent, generateBlogListPage } from './build.js'
import { mkdir, cpdir } from './helpers.js'
import path from 'path'
import { generateRSS } from './rss.js'
const { app } = config

export const run = () => {
  mkdir(path.join(app.public))

  const posts = parseContent()

  generateBlogListPage(posts)
  generateRSS(posts, app.feed.count)

  cpdir(path.join(app.src, app.css), path.join(app.public, app.css))
  cpdir(path.join(app.src, app.js), path.join(app.public, app.js))
  cpdir(path.join(app.src, app.images), path.join(app.public, app.images))
  cpdir(path.join(app.src, app.assets), path.join(app.public, app.assets))
}

run()
console.log('Success')
