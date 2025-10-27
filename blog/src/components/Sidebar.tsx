import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const categories = [
  "Latest",
  "Tech News",
  "AI & ML",
  "Backend",
  "System Design",
];

interface SidebarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  isMobile?: boolean;
}

export const Sidebar = ({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  isMobile = false,
}: SidebarProps) => {
  return (
    <aside className={`w-full bg-card flex flex-col h-full ${!isMobile ? 'border border-border rounded-lg' : ''}`}>
      <div className="p-6 border-b border-border">
        <h1 className="text-3xl font-bold mb-2 font-sans">
          Thoughtful
        </h1>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Insights shaping tomorrow’s work—by those building it today.
        </p>
      </div>

      <div className="p-6 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-9 text-sm"
          />
        </div>
      </div>

      <nav className="flex-1 p-6">
        <h2 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
          Categories
        </h2>
        <ul className="space-y-0.5">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => onCategoryChange(category)}
                className={`w-full text-left block py-2 px-3 text-sm rounded-md transition-colors ${
                  activeCategory === category
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
