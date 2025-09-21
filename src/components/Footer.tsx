import { Button } from "@/components/ui/button";
import vcoinLogo from "@/assets/vcoin-logo.png";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: t('footer.social.twitter'), icon: "🐦", href: "#" },
    { name: t('footer.social.discord'), icon: "💬", href: "#" },
    { name: t('footer.social.telegram'), icon: "📱", href: "#" },
    { name: t('footer.social.medium'), icon: "📰", href: "#" }
  ];

  const quickLinks = [
    { name: t('footer.links.whitepaper'), href: "#" },
    { name: t('footer.links.tokenomics'), href: "#tokenomics" },
    { name: t('footer.links.roadmap'), href: "#roadmap" },
    { name: "FAQ", href: "#faq" }
  ];

  const legalLinks = [
    { name: t('footer.links.privacyPolicy'), href: "#" },
    { name: t('footer.links.termsOfService'), href: "#" },
    { name: t('footer.links.riskDisclosure'), href: "#" }
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
              {t('footer.subtitle')}
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
            <h3 className="font-semibold mb-4 text-primary">{t('common.quickLinks')}</h3>
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
            <h3 className="font-semibold mb-4 text-primary">{t('common.legal')}</h3>
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
            <h3 className="font-semibold mb-4 text-primary">{t('footer.subscribe')}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('footer.subscribeSubtitle')}
            </p>
            <div className="space-y-2">
              <input 
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button variant="default" size="sm" className="w-full">
                {t('footer.subscribeButton')}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              {t('footer.copyright', { year: currentYear })}
            </p>
            <p className="text-sm text-muted-foreground">
              {t('footer.builtWith')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;