import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, User } from "lucide-react";

interface Author {
  name: string;
  role: string;
  avatar: string;
}

interface BlogCardProps {
  id: string;
  image: string;
  thumbnail?: string;
  category: string;
  title: string;
  description: string;
  author?: Author;
  featured?: boolean;
}

export const BlogCard = ({
  id,
  image,
  thumbnail,
  category,
  title,
  description,
  author,
  featured = false,
}: BlogCardProps) => {
  if (featured) {
    return (
      <Link to={`/blog/${id}`} className="block group">
        <article className="relative overflow-hidden rounded-3xl bg-card border border-border shadow-custom-lg hover:shadow-custom-xl transition-smooth">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
              <img
                src={thumbnail || image}
                alt={title}
                loading="eager"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>

            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <Badge 
                className="bg-badge-brown text-badge-brown-foreground border-0 w-fit mb-6 px-4 py-1.5 text-sm font-medium"
              >
                {category}
              </Badge>

              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-4 group-hover:text-primary transition-smooth">
                {title}
              </h2>

              <p className="text-muted-foreground leading-relaxed text-base lg:text-lg mb-8 line-clamp-3">
                {description}
              </p>

              <div className="flex items-center justify-between">
                {author && (
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={author.avatar}
                        alt={author.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-border"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{author.name}</p>
                      <p className="text-xs text-muted-foreground">{author.role}</p>
                    </div>
                  </div>
                )}
                
                <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link to={`/blog/${id}`} className="block group h-full">
      <article className="h-full flex flex-col overflow-hidden rounded-2xl bg-card border border-border shadow-custom-md hover:shadow-custom-lg hover:border-primary/20 transition-smooth">
        <div className="relative overflow-hidden aspect-[16/10]">
          <img
            src={thumbnail || image}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <Badge 
            className="absolute top-4 right-4 bg-badge-brown text-badge-brown-foreground border-0 shadow-custom-md px-3 py-1 text-xs font-medium"
          >
            {category}
          </Badge>
        </div>

        <div className="flex flex-col flex-1 p-6">
          <h2 className="text-xl font-bold leading-tight mb-3 group-hover:text-primary transition-smooth line-clamp-2">
            {title}
          </h2>

          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2 flex-1">
            {description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            {author ? (
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-9 h-9 rounded-full object-cover border border-border"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">{author.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{author.role}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <User className="w-3.5 h-3.5" />
                <span>Anonymous</span>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
};
