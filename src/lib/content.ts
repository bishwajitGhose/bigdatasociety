export interface BlogPost {
  slug: string;
  title: string;
  desc: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  content: string;
}

function normalizePath(path: string): string {
  const segments = path.split("/");
  const out: string[] = [];

  for (const seg of segments) {
    if (!seg || seg === ".") continue;
    if (seg === "..") {
      if (out.length > 0) out.pop();
      continue;
    }
    out.push(seg);
  }

  return `/${out.join("/")}`;
}

function resolveContentAssetUrl(
  postPath: string,
  rawUrl: string,
  imageModules: Record<string, string>
): string {
  const url = rawUrl.trim().replace(/^['"]|['"]$/g, "");

  // Keep absolute and non-file URLs untouched.
  if (
    !url ||
    /^(https?:)?\/\//i.test(url) ||
    url.startsWith("data:") ||
    url.startsWith("mailto:") ||
    url.startsWith("#")
  ) {
    return url;
  }

  // Public/static paths should remain as-is.
  if (url.startsWith("/")) return url;

  const postDir = postPath.slice(0, postPath.lastIndexOf("/"));
  const resolvedSourcePath = normalizePath(`${postDir}/${url}`);

  // Vite returns the final built URL for eager-imported static assets.
  return imageModules[resolvedSourcePath] || url;
}

function getCategoryFromPath(path: string): string {
  const parts = path.split("/");
  // e.g. "/src/content/web-dev/frontend/nextjs-routing.md" -> categoryFolder is "frontend"
  const categoryFolder = parts[parts.length - 2]?.toLowerCase();

  const mapping: Record<string, string> = {
    "apache-spark": "Apache Spark",
    "apache-kafka": "Apache Kafka",
    "mongodb": "MongoDB",
    "apache-cassandra": "Apache Cassandra",
    "apache-hbase": "Apache HBase",
    "elasticsearch": "Elasticsearch",
    "r": "R",
    "python": "Python",
    "stata": "Stata",
    "sql": "SQL",
    "scala": "Scala",
    "julia": "Julia",
    "frontend": "Frontend",
    "backend": "Backend",
    "databases": "Databases",
    "cloud": "Cloud",
    "devops": "DevOps",
    "full-stack": "Full-Stack"
  };

  return mapping[categoryFolder] || "General";
}

export function getBlogPosts(): BlogPost[] {
  // Discover and read both markdown (.md) and Quarto markdown (.qmd) files recursively.
  const modules = import.meta.glob(
    ["/src/content/**/*.md", "/src/content/**/*.qmd"],
    {
      query: "?raw",
      import: "default",
      eager: true,
    }
  ) as Record<string, string>;

  const imageModules = import.meta.glob(
    [
      "/src/content/**/*.{png,jpg,jpeg,gif,webp,svg,avif}",
      "/src/content/**/*.{PNG,JPG,JPEG,GIF,WEBP,SVG,AVIF}"
    ],
    {
      eager: true,
      import: "default",
    }
  ) as Record<string, string>;

  const posts: BlogPost[] = [];

  // Load dynamic Markdown & Quarto posts
  for (const path in modules) {
    const rawContent = modules[path];
    // Strip either extension to construct the URL slug
    const slug = path.split("/").pop()?.replace(/\.(md|qmd)$/, "") || "";
    
    const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---/;
    const match = rawContent.match(frontmatterRegex);
    let frontmatter: Record<string, string> = {};
    let content = rawContent;

    if (match) {
      const yamlText = match[1];
      content = rawContent.replace(match[0], "").trim();
      yamlText.split("\n").forEach((line) => {
        const parts = line.split(":");
        if (parts.length >= 2) {
          const key = parts[0].trim();
          const value = parts.slice(1).join(":").trim().replace(/^['"]|['"]$/g, "");
          frontmatter[key] = value;
        }
      });
    }

    // Convert raw HTML image tags from rendered qmd/md files into markdown image syntax.
    content = content.replace(
      /<img[^>]*src=["']([^"']+)["'][^>]*>/gi,
      (_m, src: string) => `![](${resolveContentAssetUrl(path, src, imageModules)})`
    );

    // Resolve relative markdown image URLs (common in qmd chart outputs) to built asset URLs.
    content = content.replace(
      /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g,
      (_m, alt: string, src: string, title?: string) => {
        const resolved = resolveContentAssetUrl(path, src, imageModules);
        const titlePart = title ? ` "${title}"` : "";
        return `![${alt}](${resolved}${titlePart})`;
      }
    );

    const headingMatch = content.match(/^#\s+(.+)$/m);
    const fallbackTitle = headingMatch?.[1]?.trim() || "Untitled Post";
    if (!frontmatter.title && headingMatch) {
      content = content.replace(headingMatch[0], "").trim();
    }

    const imageFromHtml = content.match(/<img[^>]*src=["']([^"']+)["'][^>]*>/i)?.[1];
    const imageFromMarkdown = content.match(/!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/)?.[1];
    const fallbackImage =
      resolveContentAssetUrl(path, frontmatter.image || "", imageModules) ||
      imageFromHtml ||
      imageFromMarkdown ||
      "/images/tech-placeholder.jpg";

    const firstParagraph = content
      .split(/\r?\n\r?\n/)
      .map((chunk) => chunk.replace(/[#*_`>-]/g, "").trim())
      .find((chunk) => chunk.length > 60);

    console.log("CONTENT_DEBUG:", { path, slug, category: frontmatter.category || getCategoryFromPath(path) });

    posts.push({
      slug,
      title: frontmatter.title || fallbackTitle,
      desc: frontmatter.desc || firstParagraph || "",
      category: frontmatter.category || getCategoryFromPath(path),
      readTime: frontmatter.readTime || "5 min read",
      date: frontmatter.date || "",
      image: fallbackImage,
      content,
    });
  }

  // Sort by date (descending order)
  return posts.sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });
}
