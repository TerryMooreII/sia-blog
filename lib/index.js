import config from "../config.js";
import { buildBlogListPage, buildPages } from "./build.js";
import { mkdir, cpdir } from "./helpers.js";
import path from "path";
import { generateRSS } from './rss.js'
const { app } = config;


export const run = () => {
  mkdir(app.public);

  const posts = buildPages(
    [
      {
        directory: app.posts,
        template: app.post_template,
        collectForBlogLinks: true,
      },
      {
        directory: app.pages,
        template: app.page_template,
        collectForBlogLinks: false,
      },
    ]
  );

  buildBlogListPage(posts);
  generateRSS(posts, app.feed.count);


  cpdir(path.join(app.src, app.css), path.join(app.public, app.css));
  cpdir(path.join(app.src, app.js), path.join(app.public, app.js));
  cpdir(path.join(app.images, app.js), path.join(app.public, app.images));
}

run()
console.log("Success");