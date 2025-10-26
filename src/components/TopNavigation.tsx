import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Menu } from "lucide-react";

interface TopNavigationProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export const TopNavigation = ({ onMenuClick, showMenuButton = false }: TopNavigationProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-6">
            {showMenuButton && (
              <button
                onClick={onMenuClick}
                className="lg:hidden p-2 hover:bg-accent/50 rounded-md transition-colors"
                aria-label="Toggle menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}
            
            <Link to="/" className="flex items-center">
              <div className="w-6 h-6 border-2 border-foreground rounded flex items-center justify-center font-bold text-sm">
                A
              </div>
            </Link>

            <nav className="flex items-center gap-4 sm:gap-6 text-sm">
              <Link to="/blog" className="hover:text-accent transition-colors">
                Home
              </Link>
              <Link to="/" className="hover:text-accent transition-colors">
                Portfolio
              </Link>
            </nav>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
