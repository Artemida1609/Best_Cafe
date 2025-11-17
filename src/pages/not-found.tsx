import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="font-serif text-6xl font-bold text-foreground">{t("notFound.title")}</h1>
        <p className="text-xl text-muted-foreground">{t("notFound.message")}</p>
        <Link href="/">
          <Button>{t("notFound.back")}</Button>
        </Link>
      </div>
    </div>
  );
}
