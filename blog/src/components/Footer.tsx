import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border mt-auto bg-card/50">
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-muted-foreground flex items-center gap-1.5">
            © 2025 All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
