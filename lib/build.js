import config from "../config.js";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import nunjucks from "nunjucks";
import markdownit from "markdown-it";
import { full as emoji } from "markdown-it-emoji";
import taskLists from "markdown-it-task-lists";
import hljs from "highlight.js";
import { formatDate } from "./helpers.js";
import javascript from "highlight.js/lib/languages/javascript";
import bash from "highlight.js/lib/languages/bash";
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("bash", bash);

const { app, site } = config

const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return "";
  },
})
  .use(emoji)
  .use(taskLists);

nunjucks.configure(path.join(app.src, app.partials), {
  autoescape: false,
});

export const buildPages = (pagesAndPosts) => {
  const posts = [];

  pagesAndPosts.forEach(({ directory, template, collectForBlogLinks }) => {
    const files = fs.readdirSync(path.join(app.src, directory));

    files.forEach((file) => {
      if ([".njk", "html"].includes(path.extname(file))) return;

      const parsed = matter.read(path.join(app.src, directory, file));
      const { data: page, content } = parsed;

      if (!page.slug) return

      page.date = formatDate(page.created_at)

      // collect all the page attibutes for blog posts
      if (collectForBlogLinks) {
        posts.push({ ...page });
      }

      const html = md.render(content);
      const rendered = nunjucks.render(template, {
        content: html,
        page,
        site,
      });

      fs.writeFileSync(path.join(app.public,`${page.slug}.html`), rendered, {
        flag: "w+",
      });
    });
  });

  return posts;
};

export const buildBlogListPage = (posts) => {
  const rendered = nunjucks.render(app.posts_template, {
    posts,
    site
  });

  fs.writeFileSync(path.join(app.public, app.blog_page), rendered, {
    flag: "w+",
  });
};
