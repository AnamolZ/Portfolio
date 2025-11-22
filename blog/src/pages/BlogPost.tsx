import { useParams, Link } from "react-router-dom";
import { ArrowLeft} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { TopNavigation } from "@/components/TopNavigation";
import { Footer } from "@/components/Footer";
import { blogPostsData } from "@/data/blogPosts";

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPostsData.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <TopNavigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Post not found</h1>
            <Link to="/" className="text-accent hover:underline">
              Go back to home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopNavigation />

      <div className="w-full px-4 sm:px-6 lg:px-10 py-10 flex-1">
        <main className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to all posts
          </Link>

          <article>
            <h1 className="text-3xl md:text-5xl lg:text-4xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {post.author && (
              <div className="flex items-center justify-between gap-4 mb-8 pb-8 border-b border-border">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-14 h-14 rounded-full border-2 border-border shadow-lg"
                  />
                  <div>
                    <p className="font-semibold text-lg">{post.author.name}</p>
                    <p className="text-sm text-muted-foreground">{post.author.role}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="relative mb-12 overflow-hidden rounded-3xl aspect-[16/8] shadow-custom-xl">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none markdown-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  p: ({ node, ...props }: any) => (
                    <p
                      className="text-base md:text-lg leading-[1.75] text-foreground/90 my-5"
                      {...props}
                    />
                  ),
                  h1: ({ node, ...props }: any) => (
                    <h1
                      className="text-3xl md:text-4xl font-bold mt-10 mb-5 pb-2 border-b-2 border-border"
                      {...props}
                    />
                  ),
                  h2: ({ node, ...props }: any) => (
                    <h2
                      className="text-2xl md:text-3xl font-bold mt-10 mb-4 pb-2 border-b border-border"
                      {...props}
                    />
                  ),
                  h3: ({ node, ...props }: any) => (
                    <h3
                      className="text-xl md:text-2xl font-semibold mt-8 mb-3"
                      {...props}
                    />
                  ),
                  h4: ({ node, ...props }: any) => (
                    <h4
                      className="text-lg md:text-xl font-semibold mt-6 mb-2"
                      {...props}
                    />
                  ),
                  ul: ({ node, ...props }: any) => (
                    <ul
                      className="list-disc pl-6 my-5 space-y-2 text-foreground/90"
                      {...props}
                    />
                  ),
                  ol: ({ node, ...props }: any) => (
                    <ol
                      className="list-decimal pl-6 my-5 space-y-2 text-foreground/90"
                      {...props}
                    />
                  ),
                  li: ({ node, ...props }: any) => (
                    <li
                      className="text-base md:text-lg leading-relaxed pl-1"
                      {...props}
                    />
                  ),
                  strong: ({ node, ...props }: any) => (
                    <strong
                      className="font-semibold text-foreground"
                      {...props}
                    />
                  ),
                  em: ({ node, ...props }: any) => (
                    <em
                      className="italic text-foreground"
                      {...props}
                    />
                  ),
                  a: ({ node, ...props }: any) => (
                    <a className="text-primary hover:underline font-medium transition-colors" {...props} />
                  ),
                  blockquote: ({ node, ...props }: any) => (
                    <blockquote
                      className="border-l-4 border-border bg-muted/30 pl-5 pr-4 py-3 my-5 text-muted-foreground italic rounded-r"
                      {...props}
                    />
                  ),
                  code: ({ node, inline, ...props }: any) =>
                    inline ? (
                      <code
                        className="bg-muted px-1.5 py-0.5 rounded text-[0.9em] font-mono text-foreground border border-border"
                        {...props}
                      />
                    ) : (
                      <code
                        className="block bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono border border-border my-5"
                        {...props}
                      />
                    ),
                  pre: ({ node, ...props }: any) => (
                    <pre
                      className="bg-muted rounded-lg overflow-hidden my-5 border border-border"
                      {...props}
                    />
                  ),
                  table: ({ node, ...props }: any) => (
                    <div className="overflow-x-auto my-5">
                      <table
                        className="min-w-full border-collapse border border-border"
                        {...props}
                      />
                    </div>
                  ),
                  thead: ({ node, ...props }: any) => (
                    <thead className="bg-muted" {...props} />
                  ),
                  th: ({ node, ...props }: any) => (
                    <th
                      className="border border-border px-4 py-2 text-left font-semibold"
                      {...props}
                    />
                  ),
                  td: ({ node, ...props }: any) => (
                    <td
                      className="border border-border px-4 py-2"
                      {...props}
                    />
                  ),
                  tr: ({ node, ...props }: any) => (
                    <tr className="hover:bg-muted/50 transition-colors" {...props} />
                  ),
                  img: ({ node, ...props }: any) => (
                    <img
                      className="w-full h-auto object-contain rounded-lg border border-border my-6 shadow-sm"
                      {...props}
                    />
                  ),
                  hr: ({ node, ...props }: any) => (
                    <hr className="border-t border-border my-8" {...props} />
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </article>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPost;
