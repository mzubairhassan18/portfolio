# Blog Posts

This directory contains all blog posts for the portfolio website. Each blog post is organized by date in separate folders and uses HTML format for enhanced UI/UX capabilities.

## Folder Structure

```
blogs/
├── dec-15-2025/
│   └── nextjs-vuejs-angularjs-comparison.html
├── dec-20-2025/
│   └── web-development-roadmap.html
├── dec-25-2025/
│   └── requirement-engineering-software-development.html
├── images/
│   ├── framework-comparison-hero.jpg
│   ├── web-development-roadmap-hero.jpg
│   └── requirement-engineering-hero.jpg
└── README.md
```

## Adding New Blog Posts

### 1. Create Date Folder

Create a new folder with the date format: `MMM-DD-YYYY`
Example: `dec-25-2025`

### 2. Create HTML File

Create an HTML file inside the date folder with a descriptive name.
Example: `my-new-blog-post.html`

### 3. Blog Post Format

Each blog post should follow this HTML format:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your Blog Post Title</title>
  </head>
  <body>
    <article class="blog-post">
      <header class="blog-post-header">
        <div class="blog-post-meta">
          <span class="blog-post-date">December 25, 2025</span>
          <span class="blog-post-category">Category Name</span>
        </div>
        <h1>Your Blog Post Title</h1>
        <div class="blog-post-author">
          <div class="author-avatar">M</div>
          <span>By Muhammad Zubair ul Hassan</span>
        </div>
      </header>

      <div class="blog-post-content">
        <div class="hero-image">
          <img
            src="images/your-hero-image.jpg"
            alt="Description"
            loading="lazy"
          />
          <div class="image-caption">Image caption</div>
        </div>

        <section class="overview">
          <h2>Overview</h2>
          <p>Brief description of the blog post...</p>
        </section>

        <!-- Your content sections here -->

        <section class="conclusion">
          <h2>Conclusion</h2>
          <p>Wrap up your thoughts...</p>
        </section>

        <div class="blog-post-footer">
          <div class="tags">
            <span class="tag">Tag1</span>
            <span class="tag">Tag2</span>
          </div>
        </div>
      </div>
    </article>
  </body>
</html>
```

### 4. Supported HTML Features

- Semantic HTML5 elements (article, section, header, footer)
- Responsive images with lazy loading
- Structured content with proper headings
- Tags and metadata
- Social sharing buttons
- Rich formatting and styling

## Automatic Integration

The blog system will automatically:

- ✅ Detect new blog posts
- ✅ Parse markdown content
- ✅ Display them in chronological order
- ✅ Apply theme styling (dark/light mode)
- ✅ Support responsive design
- ✅ Enable modal viewing

## Tips

1. **Use descriptive filenames** - They become part of the URL slug
2. **Keep excerpts concise** - First paragraph should summarize the post
3. **Use proper categories** - Helps with organization
4. **Include relevant dates** - Ensures proper chronological ordering
5. **Test your markdown** - Preview before publishing

## Current Blog Posts

### 1. Next.js vs Vue.js vs Angular.js: Complete Comparison

**Date:** December 15, 2025  
**Category:** Web Development  
**Description:** Comprehensive comparison of modern JavaScript frameworks including pros/cons, use cases, and decision framework.

### 2. Complete Web Development Roadmap 2025

**Date:** December 20, 2025  
**Category:** Web Development  
**Description:** Step-by-step guide to becoming a web developer with learning phases, project ideas, and career paths.

### 3. Requirement Engineering & Software Development Process

**Date:** December 25, 2025  
**Category:** Software Engineering  
**Description:** Industry-standard processes for requirement gathering, analysis, and software development methodologies.

## Categories

Current categories:

- Web Development
- Software Engineering
- Technology Trends
- Career Development
- Best Practices
