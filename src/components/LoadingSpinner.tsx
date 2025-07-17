import { useLanguage } from "@/context/LanguageContext";

export function LoadingSpinner() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
        </div>
        <p className="text-muted-foreground">
          {language === "ru" ? "Загрузка..." : "Loading..."}
        </p>
      </div>
    </div>
  );
}
