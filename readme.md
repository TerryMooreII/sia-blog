# Terry Moore II

A static site built with [Sia](https://github.com/sia/sia).

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Creating Content

```bash
# Create a new blog post
npm run new post "My Post Title"

# Create a new page
npm run new page "Page Title"

# Create a short note
npm run new note "Quick thought"
```

## Project Structure

```
├── _config.yml      # Site configuration
├── src/
│   ├── posts/       # Blog posts (markdown)
│   ├── pages/       # Static pages
│   ├── notes/       # Short notes
│   └── images/      # Images
├── _layouts/        # Custom layouts (optional)
├── _includes/       # Custom includes (optional)
├── styles/          # Custom styles (optional)
└── dist/            # Generated output
```

## Customization

- Edit `_config.yml` to change site settings
- Add custom layouts in `_layouts/` to override defaults
- Add custom includes in `_includes/`
- Add `styles/main.css` to override default styles

## Deployment

This site is configured to automatically deploy to GitHub Pages.

### Automatic Deployment

1. Push your code to GitHub
2. Go to your repository Settings → Pages
3. Under "Build and deployment", select "GitHub Actions" as the source
4. Your site will deploy automatically on every push to the main branch

### Manual Deployment

You can also deploy manually:

```bash
npm run build
```

Then upload the `dist/` folder to any static hosting.
