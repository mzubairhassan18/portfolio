// Blog System JavaScript

// Blog posts data structure
let blogPosts = [];
let currentPost = null;

// Initialize blog system
function initBlogSystem() {
  console.log("Initializing blog system...");

  // Check if blog modal is loaded
  setTimeout(() => {
    const blogModalContainer = document.getElementById("blog-modal-container");
    const blogModal = document.getElementById("blog-modal-overlay");
    const blogPostModal = document.getElementById("blog-post-modal");
    const blogPostModalBody = document.getElementById("blog-post-modal-body");

    console.log("Blog system initialization check:");
    console.log("- Blog modal container:", blogModalContainer);
    console.log("- Blog modal overlay:", blogModal);
    console.log("- Blog post modal:", blogPostModal);
    console.log("- Blog post modal body:", blogPostModalBody);

    // Check if the blog modal container has content
    if (blogModalContainer) {
      console.log(
        "Blog modal container content:",
        blogModalContainer.innerHTML
      );
      console.log(
        "Blog modal container children:",
        blogModalContainer.children.length
      );
    }

    if (!blogModal) {
      console.error(
        "❌ Blog modal overlay not found - component may not have loaded"
      );
    } else {
      console.log("✅ Blog modal overlay found");
    }

    if (!blogPostModal) {
      console.error(
        "❌ Blog post modal not found - component may not have loaded"
      );
    } else {
      console.log("✅ Blog post modal found");

      // Ensure blog-post-modal-body exists
      if (!blogPostModalBody) {
        console.log("🔧 Creating missing blog-post-modal-body element...");
        const modalContent = blogPostModal.querySelector(
          ".blog-post-modal-content"
        );
        if (modalContent) {
          const modalBodyElement = document.createElement("div");
          modalBodyElement.className = "blog-post-modal-body";
          modalBodyElement.id = "blog-post-modal-body";
          modalBodyElement.innerHTML =
            "<!-- Individual blog post content will be loaded here -->";
          modalContent.appendChild(modalBodyElement);
          console.log("✅ Created blog-post-modal-body element");
        }
      } else {
        console.log("✅ Blog post modal body found");
      }
    }
  }, 1000);

  // Don't auto-load posts, wait for modal to be opened
}

// Open blog modal
function openBlogModal() {
  console.log("Opening blog modal...");
  const modal = document.getElementById("blog-modal-overlay");

  // Debug: Check what blog-related elements exist
  console.log("Blog modal overlay:", modal);
  console.log(
    "Blog modal container:",
    document.getElementById("blog-modal-container")
  );
  console.log(
    "All elements with 'blog' in ID:",
    document.querySelectorAll('[id*="blog"]')
  );

  if (!modal) {
    console.error("Blog modal not found");
    return;
  }

  console.log("Blog modal found, adding active class");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  // Debug: Check close button
  const closeButton = document.querySelector(".blog-modal-close");
  console.log("Blog modal close button:", closeButton);
  if (closeButton) {
    console.log("Close button styles:", window.getComputedStyle(closeButton));
    console.log("Close button position:", closeButton.getBoundingClientRect());

    // Check SVG specifically
    const svg = closeButton.querySelector("svg");
    const lines = closeButton.querySelectorAll("svg line");
    const closeText = closeButton.querySelector(".close-text");

    console.log("SVG element:", svg);
    console.log("SVG lines:", lines);
    console.log("Close text:", closeText);

    if (svg) {
      console.log("SVG styles:", window.getComputedStyle(svg));
      console.log("SVG color:", window.getComputedStyle(svg).color);
      console.log("SVG stroke:", window.getComputedStyle(svg).stroke);
    }

    if (lines.length > 0) {
      console.log("First line styles:", window.getComputedStyle(lines[0]));
    }
  }

  // Load blog posts when modal opens
  loadBlogPosts();
}

// Close blog modal
function closeBlogModal() {
  console.log("Closing blog modal...");
  const modal = document.getElementById("blog-modal-overlay");
  if (!modal) {
    console.error("Blog modal not found for closing");
    return;
  }

  console.log("Blog modal found, removing active class");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

// Load blog posts from markdown files
async function loadBlogPosts() {
  const blogPostsContainer = document.getElementById("blog-posts");
  const blogLoading = document.getElementById("blog-loading");
  const blogError = document.getElementById("blog-error");

  // Show loading state
  blogLoading.style.display = "flex";
  blogPostsContainer.style.display = "none";
  blogError.style.display = "none";

  try {
    // In a real implementation, this would fetch from a server
    // For now, we'll simulate loading the blog posts
    await simulateBlogLoading();

    // Hide loading, show posts
    blogLoading.style.display = "none";
    blogPostsContainer.style.display = "grid";

    renderBlogPosts();
  } catch (error) {
    console.error("Error loading blog posts:", error);

    // Show error state
    blogLoading.style.display = "none";
    blogError.style.display = "flex";
  }
}

// Simulate blog loading (replace with actual server call)
async function simulateBlogLoading() {
  return new Promise(async (resolve) => {
    setTimeout(async () => {
      // Simulate parsing markdown files
      blogPosts = [
        {
          id: "intro-to-cs",
          title: "Introduction to Computer Science",
          excerpt:
            "Computer Science is a fascinating field that combines mathematics, engineering, and creativity to solve complex problems. In this blog post, I'll share my journey into the world of computer science...",
          date: "2025-09-09",
          category: "Computer Science",
          author: "Muhammad Zubair ul Hassan",
          content: await loadMarkdownContent("blogs/sep-9-2025/intro-to-cs.md"),
          slug: "intro-to-cs",
        },
        {
          id: "web-development-trends",
          title: "Web Development Trends in 2025",
          excerpt:
            "Web development continues to evolve at a rapid pace, with new technologies and frameworks emerging regularly. As we navigate through 2025, several trends are shaping the future...",
          date: "2025-10-15",
          category: "Web Development",
          author: "Muhammad Zubair ul Hassan",
          content: await loadMarkdownContent(
            "blogs/oct-15-2025/web-development-trends.md"
          ),
          slug: "web-development-trends",
        },
        {
          id: "portfolio-development",
          title: "Building My Portfolio Website",
          excerpt:
            "Creating a personal portfolio website is one of the most rewarding projects for any developer. It's not just a showcase of your work—it's a reflection of your skills, creativity...",
          date: "2025-11-20",
          category: "Personal Projects",
          author: "Muhammad Zubair ul Hassan",
          content: await loadMarkdownContent(
            "blogs/nov-20-2025/portfolio-development.md"
          ),
          slug: "portfolio-development",
        },
      ];
      resolve();
    }, 1000);
  });
}

// Load markdown content (simplified version)
async function loadMarkdownContent(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const markdown = await response.text();
    return parseMarkdown(markdown);
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error);
    return "<p>Error loading blog post content.</p>";
  }
}

// Simple markdown parser
function parseMarkdown(markdown) {
  let html = markdown;

  // Parse headers
  html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");
  html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  html = html.replace(/^#### (.*$)/gim, "<h4>$1</h4>");

  // Parse bold text
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Parse italic text
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Parse code blocks
  html = html.replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>");

  // Parse inline code
  html = html.replace(/`(.*?)`/g, "<code>$1</code>");

  // Parse links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Parse lists
  html = html.replace(/^\* (.*$)/gim, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>");

  // Parse paragraphs
  html = html.replace(/^(?!<[h|u|l|p|d])(.+)$/gim, "<p>$1</p>");

  // Parse horizontal rules
  html = html.replace(/^---$/gim, "<hr>");

  // Clean up multiple consecutive paragraphs
  html = html.replace(/<\/p>\s*<p>/g, "\n");

  return html;
}

// Render blog posts
function renderBlogPosts() {
  const blogPostsContainer = document.getElementById("blog-posts");

  if (!blogPosts.length) {
    blogPostsContainer.innerHTML =
      '<p class="no-posts">No blog posts available.</p>';
    return;
  }

  // Sort posts by date (newest first)
  const sortedPosts = blogPosts.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  blogPostsContainer.innerHTML = sortedPosts
    .map(
      (post) => `
    <div class="blog-post-card" onclick="openBlogPost('${post.slug}')">
      <div class="blog-post-header">
        <div class="blog-post-meta">
          <span class="blog-post-date">${formatDate(post.date)}</span>
          <span class="blog-post-category">${post.category}</span>
        </div>
        <h3 class="blog-post-title">${post.title}</h3>
        <p class="blog-post-excerpt">${post.excerpt}</p>
      </div>
      <div class="blog-post-footer">
        <div class="blog-post-author">
          <div class="author-avatar">${post.author.charAt(0)}</div>
          <span>${post.author}</span>
        </div>
        <span class="read-more">
          Read More
          <svg viewBox="0 0 24 24">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12,5 19,12 12,19"></polyline>
          </svg>
        </span>
      </div>
    </div>
  `
    )
    .join("");
}

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

// Open individual blog post in modal
function openBlogPost(slug) {
  console.log("Opening blog post:", slug);
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    console.error("Blog post not found:", slug);
    return;
  }

  currentPost = post;
  const modal = document.getElementById("blog-post-modal");
  const modalBody = document.getElementById("blog-post-modal-body");

  // Alternative: Try querySelector as well
  const modalBodyAlt = document.querySelector("#blog-post-modal-body");
  console.log("Modal body via querySelector:", modalBodyAlt);

  // Debug: Check what elements exist
  console.log("Blog post modal:", modal);
  console.log("Blog post modal body:", modalBody);
  console.log(
    "All elements with 'blog-post' in ID:",
    document.querySelectorAll('[id*="blog-post"]')
  );

  // Debug: Check what's inside the blog-post-modal
  if (modal) {
    console.log("Contents of blog-post-modal:", modal.innerHTML);
    console.log("Direct children of blog-post-modal:", modal.children);
    console.log(
      "All descendants with 'blog-post-modal-body' ID:",
      modal.querySelectorAll("#blog-post-modal-body")
    );
  }

  // Check if elements exist
  if (!modal) {
    console.error("Blog post modal not found");
    return;
  }

  // Use alternative method if getElementById fails
  let finalModalBody = modalBody || modalBodyAlt;

  // If still not found, create it dynamically
  if (!finalModalBody && modal) {
    console.log("Creating blog-post-modal-body element dynamically...");
    const modalContent = modal.querySelector(".blog-post-modal-content");
    if (modalContent) {
      // Create the missing element
      const modalBodyElement = document.createElement("div");
      modalBodyElement.className = "blog-post-modal-body";
      modalBodyElement.id = "blog-post-modal-body";
      modalBodyElement.innerHTML =
        "<!-- Individual blog post content will be loaded here -->";

      // Add it to the modal content
      modalContent.appendChild(modalBodyElement);
      finalModalBody = modalBodyElement;
      console.log("Created modal body element:", finalModalBody);
    }
  }

  if (!finalModalBody) {
    console.error(
      "Blog post modal body not found with either method and could not be created"
    );
    return;
  }

  console.log("Using modal body:", finalModalBody);

  // Populate modal content
  finalModalBody.innerHTML = `
    <div class="blog-post-content">
      <div class="blog-post-meta">
        <span class="blog-post-date">${formatDate(post.date)}</span>
        <span class="blog-post-category">${post.category}</span>
      </div>
      <h1>${post.title}</h1>
      <div class="blog-post-author">
        <div class="author-avatar">${post.author.charAt(0)}</div>
        <span>By ${post.author}</span>
      </div>
      <hr>
      ${post.content}
    </div>
  `;

  // Show modal
  modal.classList.add("active");

  // Scroll to top of modal content
  modalBody.scrollTop = 0;
}

// Close individual blog post modal
function closeBlogPostModal() {
  const modal = document.getElementById("blog-post-modal");
  modal.classList.remove("active");
  currentPost = null;
}

// Handle escape key to close modals
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close individual blog post modal first, then main blog modal
    const blogPostModal = document.getElementById("blog-post-modal");
    if (blogPostModal && blogPostModal.classList.contains("active")) {
      closeBlogPostModal();
    } else {
      closeBlogModal();
    }
  }
});

// Handle modal overlay clicks
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("blog-post-modal-overlay")) {
    closeBlogPostModal();
  }

  // Handle main blog modal overlay clicks
  if (e.target.classList.contains("blog-modal-overlay")) {
    closeBlogModal();
  }
});

// Export functions for global access
window.loadBlogPosts = loadBlogPosts;
window.openBlogPost = openBlogPost;
window.closeBlogModal = closeBlogModal;
window.closeBlogPostModal = closeBlogPostModal;
window.openBlogModal = openBlogModal;
window.initBlogSystem = initBlogSystem;
