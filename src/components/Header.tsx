import { Button } from "@/components/ui/button";
import vcoinLogo from "@/assets/vcoin-logo.png";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img src={vcoinLogo} alt="VCoin" className="w-10 h-10 animate-float" />
          <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            VCoin
          </span>
        </a>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="/projects" className="text-foreground hover:text-primary transition-colors">
            Projects
          </a>
          <a href="/how-it-works" className="text-foreground hover:text-primary transition-colors">
            How it Works
          </a>
          <a href="/for-investors" className="text-foreground hover:text-primary transition-colors">
            Investors
          </a>
          <a href="/for-founders" className="text-foreground hover:text-primary transition-colors">
            Entrepreneurs
          </a>
          <a href="/vcoin-token" className="text-foreground hover:text-primary transition-colors">
            Token
          </a>
          <a href="/whitepaper" className="text-foreground hover:text-primary transition-colors">
            Whitepaper
          </a>
        </nav>
        
        <Button 
          variant="hero" 
          size="lg" 
          className="hidden md:flex"
          onClick={() => window.location.href = '/projects'}
        >
          Explore Projects
        </Button>
        
        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
      </div>
    </header>
  );
};

export default Header;