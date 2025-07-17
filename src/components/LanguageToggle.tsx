import { memo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

function LanguageToggleComponent() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className="relative w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/40 hover:bg-accent/80 transition-all duration-200"
      aria-label={`Switch to ${language === "ru" ? "English" : "Russian"}`}
    >
      <div className="flex items-center justify-center">
        <Globe className="w-5 h-5 text-muted-foreground mr-1" />
        <span className="text-xs font-semibold text-foreground">
          {language.toUpperCase()}
        </span>
      </div>
    </Button>
  );
}

export const LanguageToggle = memo(LanguageToggleComponent);
