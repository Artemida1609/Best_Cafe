import { Instagram, Facebook, Twitter } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-foreground text-background py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* About */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4" data-testid="text-footer-brand">
              Best Cafe
            </h3>
            <p className="text-background/80 leading-relaxed" data-testid="text-footer-description">
              {t("footer.description")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t("footer.navigation")}</h4>
            <nav className="space-y-2">
              <button
                onClick={() => scrollToSection("home")}
                className="block text-background/80 hover:text-background transition-colors"
                data-testid="footer-link-home"
              >
                {t("nav.home")}
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block text-background/80 hover:text-background transition-colors"
                data-testid="footer-link-about"
              >
                {t("nav.about")}
              </button>
              <button
                onClick={() => scrollToSection("menu")}
                className="block text-background/80 hover:text-background transition-colors"
                data-testid="footer-link-menu"
              >
                {t("nav.menu")}
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="block text-background/80 hover:text-background transition-colors"
                data-testid="footer-link-gallery"
              >
                {t("nav.gallery")}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block text-background/80 hover:text-background transition-colors"
                data-testid="footer-link-contact"
              >
                {t("nav.contact")}
              </button>
            </nav>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t("footer.follow")}</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background/10 p-3 rounded-lg hover:bg-background/20 transition-colors text-background"
                aria-label="Instagram"
                data-testid="link-instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background/10 p-3 rounded-lg hover:bg-background/20 transition-colors text-background"
                aria-label="Facebook"
                data-testid="link-facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background/10 p-3 rounded-lg hover:bg-background/20 transition-colors text-background"
                aria-label="Twitter"
                data-testid="link-twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-background/20 pt-8 text-center text-background/70">
          <p data-testid="text-copyright">
            {t("footer.copyright", { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
