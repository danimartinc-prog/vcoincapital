import { Button } from "@/components/ui/button";
import vcoinLogo from "@/assets/new-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: "Twitter", icon: "🐦", href: "https://x.com/vcoincapital" },
    { name: "Discord", icon: "💬", href: "https://discord.com/channels/@vcoincapital" },
    { name: "Instagram", icon: "📷", href: "https://www.instagram.com/vcoincapital/" },
    { name: "Medium", icon: "📰", href: "#" }
  ];

  const quickLinks = [
    { name: "Whitepaper", href: "/whitepaper" },
    { name: "Tokenomics", href: "/vcoin-token#tokenomics" },
    { name: "Roadmap", href: "/roadmap" },
    { name: "FAQ", href: "/#faq" }
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Risk Disclosure", href: "#" }
  ];

  return (
    <footer className="bg-background/95 backdrop-blur-md border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={vcoinLogo} alt="VCoin" className="w-8 h-8" />
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                VCoin
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Where entrepreneurs and investors meet. Fuel innovation with smart funding solutions powered by VCoin.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10 hover:text-primary transition-colors"
                  asChild
                >
                  <a href={social.href} aria-label={social.name}>
                    <span className="text-lg">{social.icon}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-primary">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4 text-primary">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest updates on VCoin and new project launches
            </p>
            <div className="space-y-2">
              <input 
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button variant="default" size="sm" className="w-full">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} VCoin. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with ❤️ for the future of startups
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;