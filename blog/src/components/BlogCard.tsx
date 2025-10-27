import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

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
}

export const BlogCard = ({
  id,
  image,
  thumbnail,
  category,
  title,
  description,
  author,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <article className="group cursor-pointer border border-border rounded-lg p-4 hover:border-accent/50 transition-colors bg-card">
        <div className="relative mb-3 overflow-hidden rounded-lg bg-muted aspect-[16/10]">
          <img
            src={thumbnail || image}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs font-normal px-2 py-0.5">
              {category}
            </Badge>
          </div>

          <h2 className="text-xl font-semibold leading-snug group-hover:text-accent transition-colors font-sans">
            {title}
          </h2>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{description}</p>

          {author && (
            <div className="flex items-center gap-2.5 pt-1">
              <img
                src={author.avatar}
                alt={author.name}
                className="w-7 h-7 rounded-full"
              />
              <div className="text-xs">
                <p className="font-medium">{author.name}</p>
                <p className="text-muted-foreground">{author.role}</p>
              </div>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};
