import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";
import {
  MessageCircle,
  X,
  Send,
  Star,
  Mail,
  MessageSquare,
  ExternalLink,
} from "lucide-react";

export function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t, language } = useLanguage();

  const handleSubmit = async () => {
    // Здес�� можно добавить отправку на сервер
    console.log("Feedback submitted:", { rating, message, email });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
      setRating(0);
      setMessage("");
      setEmail("");
    }, 2000);
  };

  const openTelegram = () => {
    window.open("https://t.me/antsupport_bot", "_blank");
  };

  const openEmail = () => {
    const subject = encodeURIComponent("ANT Support - Обратная связь");
    const body = encodeURIComponent(
      `Здравствуйте!\n\nОписание проблемы или предложения:\n\n\nС уважением,\nПользователь ANT Support`,
    );
    window.open(`mailto:support@ant.ru?subject=${subject}&body=${body}`);
  };

  return (
    <>
      {/* Feedback Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className={`w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </Button>
      </motion.div>

      {/* Feedback Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              className="fixed bottom-24 right-6 z-40 w-96 max-w-[90vw]"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Card className="bg-background/95 backdrop-blur-md border border-border shadow-2xl">
                {!isSubmitted ? (
                  <>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold text-foreground flex items-center">
                        <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                        {language === "ru" ? "Обратная связь" : "Feedback"}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {language === "ru"
                          ? "Поделитесь мнением или сообщите о проблеме"
                          : "Share your feedback or report an issue"}
                      </p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Quick Contact Options */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={openTelegram}
                          className="flex-1"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Telegram
                          <ExternalLink className="h-3 w-3 ml-2" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={openEmail}
                          className="flex-1"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                          <ExternalLink className="h-3 w-3 ml-2" />
                        </Button>
                      </div>

                      {/* Rating */}
                      <div>
                        <label className="text-sm font-medium text-foreground block mb-2">
                          {language === "ru" ? "Оценка" : "Rating"}
                        </label>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setRating(star)}
                              className="p-1 transition-colors"
                            >
                              <Star
                                className={`h-6 w-6 ${
                                  star <= rating
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-gray-300"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="text-sm font-medium text-foreground block mb-2">
                          {language === "ru" ? "Сообщение" : "Message"}
                        </label>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder={
                            language === "ru"
                              ? "Опишите вашу проблему или предложение..."
                              : "Describe your issue or suggestion..."
                          }
                          className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground resize-none h-20 text-sm"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="text-sm font-medium text-foreground block mb-2">
                          {language === "ru"
                            ? "Email (необ��зательно)"
                            : "Email (optional)"}
                        </label>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={
                            language === "ru"
                              ? "ваш@email.com"
                              : "your@email.com"
                          }
                          className="text-sm"
                        />
                      </div>

                      {/* Submit Button */}
                      <Button
                        onClick={handleSubmit}
                        className="w-full bg-primary hover:bg-primary/90"
                        disabled={!message.trim()}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        {language === "ru" ? "Отправить" : "Send"}
                      </Button>
                    </CardContent>
                  </>
                ) : (
                  <CardContent className="text-center py-8">
                    <div className="text-green-500 mb-3">
                      <MessageCircle className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {language === "ru" ? "Спасибо!" : "Thank you!"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {language === "ru"
                        ? "Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время."
                        : "Your message has been sent. We'll get back to you soon."}
                    </p>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
