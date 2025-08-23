import { Button } from "@/components/ui/button";
import cryptoLogo from "@/assets/crypto-logo.png";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={cryptoLogo} alt="CryptoICO" className="w-10 h-10 animate-float" />
          <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            CryptoICO
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#tokenomics" className="text-foreground hover:text-primary transition-colors">
            Tokenomics
          </a>
          <a href="#roadmap" className="text-foreground hover:text-primary transition-colors">
            Roadmap
          </a>
          <a href="#team" className="text-foreground hover:text-primary transition-colors">
            Team
          </a>
          <a href="#faq" className="text-foreground hover:text-primary transition-colors">
            FAQ
          </a>
          <Button variant="outline" size="sm">
            Whitepaper
          </Button>
        </nav>
        
        <Button 
          variant="hero" 
          size="lg" 
          className="hidden md:flex"
          onClick={() => window.location.href = '/wallet-auth'}
        >
          Join Presale
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