import { Button } from "@/components/ui/button";
import cryptoLogo from "@/assets/crypto-logo.png";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={cryptoLogo} alt="VCoin" className="w-10 h-10 animate-float" />
          <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            VCoin
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="/projects" className="text-foreground hover:text-primary transition-colors">
            Proyectos
          </a>
          <a href="/how-it-works" className="text-foreground hover:text-primary transition-colors">
            Cómo funciona
          </a>
          <a href="/for-investors" className="text-foreground hover:text-primary transition-colors">
            Inversores
          </a>
          <a href="/for-founders" className="text-foreground hover:text-primary transition-colors">
            Emprendedores
          </a>
          <a href="/vcoin-token" className="text-foreground hover:text-primary transition-colors">
            Token
          </a>
        </nav>
        
        <Button 
          variant="hero" 
          size="lg" 
          className="hidden md:flex"
          onClick={() => window.location.href = '/projects'}
        >
          Explorar proyectos
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