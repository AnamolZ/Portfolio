import { useParams, Link } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { TopNavigation } from "@/components/TopNavigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { blogPostsData } from "@/data/blogPosts";
import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
const BlogPost = () => {
  const { id } = useParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const post = blogPostsData.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <TopNavigation 
          onMenuClick={() => setIsMobileMenuOpen(true)}
          showMenuButton={true}
        />
        <main className="flex-1 flex items-center justify-center min-h-[80vh]">
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
    <div className="min-h-screen bg-background">
      <TopNavigation 
        onMenuClick={() => setIsMobileMenuOpen(true)}
        showMenuButton={true}
      />

      {/* Mobile Sidebar Sheet */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <Sidebar
            searchQuery=""
            onSearchChange={() => {}}
            activeCategory={post.category}
            onCategoryChange={() => {}}
            isMobile={true}
          />
        </SheetContent>
      </Sheet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-8 max-w-7xl mx-auto">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-20">
              <Sidebar
                searchQuery=""
                onSearchChange={() => {}}
                activeCategory={post.category}
                onCategoryChange={() => {}}
                isMobile={false}
              />
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all posts
            </Link>

            <article className="max-w-4xl">
              <div className="mb-6">
                <Badge variant="secondary" className="mb-4">
                  {post.category}
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight font-sans">
                {post.title}
              </h1>

              {post.author && (
                <div className="flex items-center gap-3 mb-8 pb-8 border-b border-border">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{post.author.name}</p>
                    <p className="text-sm text-muted-foreground">{post.author.role}</p>
                  </div>
                </div>
              )}

              <div className="relative mb-10 overflow-hidden rounded-lg aspect-[16/9]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none prose-a:text-accent hover:prose-a:underline prose-img:rounded-lg prose-img:border prose-img:border-border prose-img:mx-auto prose-img:max-w-full prose-img:h-auto prose-img:w-full md:prose-img:w-[720px] lg:prose-img:w-[800px]">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
              </div>
            </article>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPost;
