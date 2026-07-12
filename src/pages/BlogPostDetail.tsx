import { useParams, Link } from "wouter";
import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getBlogPosts } from "@/lib/content";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogPostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const posts = getBlogPosts();
  const post = posts.find((p) => p.slug === slug);

  const searchParams = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search)
    : new URLSearchParams();
  const fromParam = searchParams.get("from") || "";
  const fromLabelParam = searchParams.get("fromLabel") || "";

  const safeFromPath = fromParam.startsWith("/") ? fromParam : "";

  const inferredReturnPath = (() => {
    const dataScienceCategories = ["R", "Python", "Stata", "SQL", "Scala", "Julia"];
    const bigDataCategories = ["Apache Spark", "Apache Kafka", "MongoDB", "Apache Cassandra", "Apache HBase", "Elasticsearch"];
    const webDevCategories = ["Frontend", "Backend", "Databases", "Cloud", "DevOps", "Full-Stack"];

    if (post && dataScienceCategories.includes(post.category)) {
      return `/data-science/${post.category.toLowerCase()}`;
    }
    if (post && bigDataCategories.includes(post.category)) {
      return `/big-data?category=${encodeURIComponent(post.category)}`;
    }
    if (post && webDevCategories.includes(post.category)) {
      return `/web-dev?category=${encodeURIComponent(post.category)}`;
    }
    return "/blog";
  })();

  const returnPath = safeFromPath || inferredReturnPath;
  const returnLabel = fromLabelParam || (post ? post.category : "All Posts");

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center py-20">
          <h1 className="blog-charcoal-heading text-2xl font-bold text-[#1f1f1f] dark:text-[#1f1f1f] mb-4">Post Not Found</h1>
          <p className="text-slate-500 mb-6">The article you are looking for does not exist or has been removed.</p>
          <Link href="/" className="px-4 py-2 bg-violet-600 text-white rounded-full text-sm font-semibold hover:bg-violet-700 transition-colors">
            Back to Home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const getLanguageLabel = (className?: string) => {
    if (!className) return "output";
    const raw = className.replace("language-", "").trim();
    if (!raw) return "output";

    // Handle Quarto chunk labels like "{r}" or "{python}".
    const debraced = raw.startsWith("{") && raw.endsWith("}")
      ? raw.slice(1, -1).trim()
      : raw;
    return debraced.split(/\s+/)[0] || "output";
  };

  const toPlainText = (value: React.ReactNode): string => {
    if (typeof value === "string" || typeof value === "number") return String(value);
    if (Array.isArray(value)) return value.map(toPlainText).join("");
    if (React.isValidElement<{ children?: React.ReactNode }>(value)) {
      return toPlainText(value.props.children);
    }
    return "";
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // no-op fallback: if clipboard is unavailable, we silently ignore
    }
  };

  const decodeHtmlEntities = (value: string) =>
    value
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();

  const firstImageInContent = post.content.match(/!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/)?.[1] || "";
  const normalizedCover = decodeHtmlEntities(post.image || "");
  const normalizedContentImage = decodeHtmlEntities(firstImageInContent);
  const shouldRenderTopCover =
    Boolean(normalizedCover) &&
    normalizedCover !== "/images/tech-placeholder.jpg" &&
    normalizedCover !== normalizedContentImage;

  const getYouTubeEmbedUrl = (url: string) => {
    const cleaned = decodeHtmlEntities(url)
      .replace(/^<|>$/g, "")
      .trim();
    const withProtocol = /^(https?:)?\/\//i.test(cleaned)
      ? cleaned
      : `https://${cleaned.replace(/^\/+/, "")}`;

    const shortMatch = withProtocol.match(/youtu\.be\/([a-zA-Z0-9_-]{6,})/i);
    if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;

    const longMatch = withProtocol.match(/[?&]v=([a-zA-Z0-9_-]{6,})/i);
    if (longMatch) return `https://www.youtube.com/embed/${longMatch[1]}`;

    const embedMatch = withProtocol.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{6,})/i);
    if (embedMatch) return `https://www.youtube.com/embed/${embedMatch[1]}`;

    return null;
  };

  return (
    <div className="blog-roboto flex min-h-screen flex-col bg-white dark:bg-slate-950">
      <Navbar />
      <main className="flex-1">
        <article className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <div className="mb-8">
            <Link
              href={returnPath}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:brightness-105"
            >
              <span aria-hidden="true">←</span>
              {`Return to ${returnLabel}`}
            </Link>
          </div>

          {/* Title */}
          <h1 className="blog-charcoal-heading text-3xl md:text-5xl font-black text-[#1f1f1f] dark:text-[#1f1f1f] leading-tight mb-8 tracking-tight">
            {post.title}
          </h1>

          {/* Top cover image (hidden if it duplicates the first in-content image) */}
          {shouldRenderTopCover && (
            <div className="w-full aspect-[21/9] overflow-hidden mb-12 shadow-sm border border-slate-100 dark:border-slate-800/40 rounded-none">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Markdown Content */}
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="blog-charcoal-heading text-3xl font-black text-[#1f1f1f] dark:text-[#1f1f1f] mt-14 mb-6 tracking-tight leading-none">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="blog-charcoal-heading text-2xl font-bold text-[#1f1f1f] dark:text-[#1f1f1f] mt-12 mb-5 tracking-tight leading-snug border-b pb-2 dark:border-slate-800">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="blog-charcoal-heading text-xl font-bold text-[#1f1f1f] dark:text-[#1f1f1f] mt-10 mb-4 tracking-tight leading-snug">{children}</h3>
                ),
                p: ({ children }) => (
                  (() => {
                    const childArray = React.Children.toArray(children).filter(
                      (child) => !(typeof child === "string" && child.trim() === "")
                    );
                    const first = childArray[0];
                    const paragraphText = toPlainText(children).trim();

                    // Auto-embed plain-text YouTube URLs (including angle-bracket autolinks).
                    const plainYoutubeMatch = paragraphText.match(
                      /^<?((?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/[^\s>]+)>?$/i
                    );
                    if (plainYoutubeMatch) {
                      const embedUrl = getYouTubeEmbedUrl(plainYoutubeMatch[1]);
                      if (embedUrl) {
                        return (
                          <div className="my-10 overflow-hidden rounded-none bg-black/5 dark:bg-white/10">
                            <div className="aspect-video w-full">
                              <iframe
                                src={embedUrl}
                                title="Embedded YouTube video"
                                className="h-full w-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                              />
                            </div>
                          </div>
                        );
                      }
                    }

                    // Auto-embed paragraphs that are only a YouTube link.
                    if (
                      childArray.length === 1 &&
                      React.isValidElement<{ href?: string }>(first) &&
                      first.type === "a" &&
                      first.props.href
                    ) {
                      const embedUrl = getYouTubeEmbedUrl(first.props.href);
                      if (embedUrl) {
                        return (
                          <div className="my-10 overflow-hidden rounded-none bg-black/5 dark:bg-white/10">
                            <div className="aspect-video w-full">
                              <iframe
                                src={embedUrl}
                                title="Embedded YouTube video"
                                className="h-full w-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                              />
                            </div>
                          </div>
                        );
                      }
                    }

                    return (
                      <p className="text-slate-700 dark:text-slate-300 text-lg font-serif leading-relaxed mb-6 font-light">{children}</p>
                    );
                  })()
                ),
                li: ({ children }) => (
                  <li className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-2 font-serif">{children}</li>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc ml-6 mb-6 space-y-1">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal ml-6 mb-6 space-y-1">{children}</ol>
                ),
                img: ({ src, alt }) => (
                  <figure className="my-10 overflow-hidden rounded-none shadow-sm">
                    <img src={src || ""} alt={alt || "Post image"} className="h-auto w-full object-cover" loading="lazy" />
                  </figure>
                ),
                a: ({ href, children }) => {
                  const safeHref = href || "#";
                  return (
                    <a
                      href={safeHref}
                      target={safeHref.startsWith("http") ? "_blank" : undefined}
                      rel={safeHref.startsWith("http") ? "noreferrer" : undefined}
                      className="text-violet-600 hover:text-violet-700 dark:text-violet-300 dark:hover:text-violet-200 underline underline-offset-4"
                    >
                      {children}
                    </a>
                  );
                },
                code: ({ className, children, inline, ...props }) => {
                  const isInline = Boolean(inline);
                  if (isInline) {
                    return (
                      <code className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-[0.9em]" {...props}>
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => {
                  const node = React.Children.toArray(children)[0] as React.ReactElement<{ className?: string; children?: React.ReactNode }>;
                  const className = node?.props?.className;
                  const codeChildren = node?.props?.children;
                  const language = getLanguageLabel(className);
                  const isCodeInput = Boolean(className && language !== "output");
                  const codeText = toPlainText(codeChildren);

                  return (
                    <div
                      className={
                        isCodeInput
                          ? "relative my-8 overflow-hidden rounded-2xl bg-[#34344A] text-slate-100 !border-0 !ring-0 !outline-none !shadow-none"
                          : "relative my-8 overflow-hidden rounded-2xl bg-[color:#ffffff] text-slate-800 !border-0 !ring-0 !outline-none !shadow-none"
                      }
                    >
                      {isCodeInput && (
                        <button
                          type="button"
                          onClick={() => void copyToClipboard(codeText)}
                          className="absolute top-3 right-3 rounded-md bg-white/12 px-2.5 py-1 text-[11px] font-medium text-slate-100 hover:bg-white/20 transition-colors !border-0 !ring-0 !outline-none"
                          aria-label="Copy code block"
                        >
                          Copy
                        </button>
                      )}
                      <pre
                        className={
                          isCodeInput
                            ? "m-0 overflow-x-auto bg-transparent p-5 text-sm leading-relaxed font-mono !border-0 !ring-0 !outline-none !shadow-none"
                            : "m-0 overflow-x-auto bg-transparent p-5 text-sm leading-relaxed font-mono text-[#123249] !border-0 !ring-0 !outline-none !shadow-none"
                        }
                      >
                        {codeChildren}
                      </pre>
                    </div>
                  );
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          <div className="mt-14 pt-6 border-t border-slate-100 dark:border-slate-800">
            <Link
              href={returnPath}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:brightness-105"
            >
              <span aria-hidden="true">←</span>
              {`Return to ${returnLabel}`}
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
