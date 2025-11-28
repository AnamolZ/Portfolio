import { Sidebar } from "@/components/Sidebar";
import { BlogCard } from "@/components/BlogCard";
import { TopNavigation } from "@/components/TopNavigation";
import { Footer } from "@/components/Footer";
import { blogPostsData } from "@/data/blogPosts";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const POSTS_PER_PAGE = 6;

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchQuery = searchParams.get("search") || "";
  const categoryFilter = searchParams.get("category") || "";
  const currentPage = parseInt(searchParams.get("page") || "1");

  const filteredPosts = useMemo(() => {
    const filtered = blogPostsData.filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.author?.name.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

      const matchesCategory =
        categoryFilter === "" ||
        categoryFilter === "Latest" ||
        post.category.toLowerCase() === categoryFilter.toLowerCase();

      return matchesSearch && matchesCategory;
    });

    return filtered.sort((a, b) => {
      const aIsLatest = a.category.toLowerCase() === "latest";
      const bIsLatest = b.category.toLowerCase() === "latest";

      if (aIsLatest && !bIsLatest) return -1;
      if (!aIsLatest && bIsLatest) return 1;
      return 0;
    });
  }, [searchQuery, categoryFilter]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  const handleSearchChange = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    setSearchParams(params);
  };

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category && category !== "Latest") {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    params.set("page", "1");
    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopNavigation
        onMenuClick={() => setIsMobileMenuOpen(true)}
        showMenuButton={true}
      />

      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <Sidebar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            activeCategory={categoryFilter || "Latest"}
            onCategoryChange={(category) => {
              handleCategoryChange(category);
              setIsMobileMenuOpen(false);
            }}
            isMobile={true}
          />
        </SheetContent>
      </Sheet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="flex gap-8 max-w-7xl mx-auto">
          <div className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24">
              <Sidebar
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                activeCategory={categoryFilter || "Latest"}
                onCategoryChange={handleCategoryChange}
                isMobile={false}
              />
            </div>
          </div>

          <main className="flex-1 min-w-0">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-32">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">No articles found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <p className="text-muted-foreground mt-2">
                    Explore in-depth coverage, expert insights, and timely updates on everything happening in tech.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                  {paginatedPosts.map((post, index) => (
                    <div
                      key={post.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <BlogCard {...post} />
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-20">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                            className={
                              currentPage === 1
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer hover:bg-accent/50 transition-smooth"
                            }
                          />
                        </PaginationItem>

                        {[...Array(totalPages)].map((_, index) => {
                          const page = index + 1;
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          ) {
                            return (
                              <PaginationItem key={page}>
                                <PaginationLink
                                  onClick={() => handlePageChange(page)}
                                  isActive={currentPage === page}
                                  className="cursor-pointer transition-smooth"
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          } else if (
                            page === currentPage - 2 ||
                            page === currentPage + 2
                          ) {
                            return (
                              <PaginationItem key={page}>
                                <PaginationEllipsis />
                              </PaginationItem>
                            );
                          }
                          return null;
                        })}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              handlePageChange(Math.min(totalPages, currentPage + 1))
                            }
                            className={
                              currentPage === totalPages
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer hover:bg-accent/50 transition-smooth"
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
