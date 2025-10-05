import { Button } from "@/components/ui/button";
import vcoinLogo from "@/assets/new-logo.png";
import WalletAuthButton from './WalletAuthButton';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img src={vcoinLogo} alt="VCoin" className="w-10 h-10 animate-float" />
          <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            VCoin
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/projects" className="text-foreground hover:text-primary transition-colors">
            Projects
          </Link>
          <Link to="/how-it-works" className="text-foreground hover:text-primary transition-colors">
            How it Works
          </Link>
          <Link to="/for-investors" className="text-foreground hover:text-primary transition-colors">
            Investors
          </Link>
          <Link to="/for-founders" className="text-foreground hover:text-primary transition-colors">
            Entrepreneurs
          </Link>
          <Link to="/vcoin-token" className="text-foreground hover:text-primary transition-colors">
            Token
          </Link>
          <Link to="/roadmap" className="text-foreground hover:text-primary transition-colors">
            Roadmap
          </Link>
          <Link to="/whitepaper" className="text-foreground hover:text-primary transition-colors">
            Whitepaper
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <WalletAuthButton />
          <Button 
            variant="hero" 
            size="lg" 
            className="hidden md:flex"
            asChild
          >
            <Link to="/projects">Explore Projects</Link>
          </Button>
        </div>
        
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