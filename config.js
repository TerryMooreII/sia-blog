export default {
  // User Config
  site: {
    blog_url: "https://terrymooreii.dev",
    blog_title: "Terry Moore II",
    blog_description: "Just another blog with no real value",
    blog_image: "",
    author: "Terry Moore II",
    email_address: 'terry.moore.ii@gmail.com',
    highlightjs_theme: 'atom-one-dark.min',
    nav: [
      {
        title: 'Home',
        href: '/'
      },
      {
        title: 'Blog',
        href: '/blog.html'
      },
      {
        title: 'Page2',
        href: '/page2.html'
      }
    ]
  },

  // App config
  app: {
    public: "./public",
    src: "./src",
    partials: "_partials",
    posts: "posts",
    pages: "pages",
    css: "css",
    js: "js",
    images: "imgs",
    posts_template: "posts.njk",
    post_template: "post.njk",
    page_template: "page.njk",
    blog_page: "blog.html",
    feed: {
      count: 10,
      rss2: true,
      atom1: true,
      json1: true
    },

  },
};
