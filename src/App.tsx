import { useEffect, useState, Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IconSprite } from "@/components/IconSprite";
import { PerformanceDisplay } from "@/components/PerformanceMonitor";
import { useAdaptivePerformance } from "@/lib/resourcePreloader";
import { MagicCursor } from "@/components/MagicCursor";

import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load heavy components for better performance
const SelectDevicePage = lazy(() => import("./pages/SelectDevicePage"));
const DeviceRemotePage = lazy(() => import("./pages/DeviceRemotePage"));
const ErrorSelectionPage = lazy(() => import("./pages/ErrorSelectionPage"));
const ErrorDetailPage = lazy(() => import("./pages/ErrorDetailPage"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
// Import non-heavy components normally to avoid export issues
import { NavigationMenu } from "@/components/NavigationMenu";
import { FeedbackButton } from "@/components/FeedbackButton";
import { TVControlProvider } from "./context/TVControlContext";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const queryClient = new QueryClient();

export default function App() {
  const [panelBtnFromRemote, setPanelBtnFromRemote] = useState<number | null>(
    null,
  );
  const { isLowPerformance, featureFlags } = useAdaptivePerformance();

  // Global initialization with performance optimizations
  useEffect(() => {
    // Disable context menu on right click for more immersive experience
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);

    // Register Service Worker for PWA
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    }

    // Apply performance-based CSS classes
    document.body.classList.toggle("low-performance", isLowPerformance);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [isLowPerformance]);

  // Virtual remote control handler
  function handleRemoteButton(key: string) {
    if (["1", "2", "3", "4", "5"].includes(key)) {
      setPanelBtnFromRemote(Number(key));
    }
    // Handle OK button
    if (key === "ok") {
      setPanelBtnFromRemote((prev) => prev); // trigger re-render
      window.dispatchEvent(new CustomEvent("virtual-remote-ok"));
    }
  }

  return (
    <LanguageProvider>
      <ThemeProvider>
        <TVControlProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <BrowserRouter>
                <div className="relative">
                  {/* SVG Icon Sprite for performance */}
                  <IconSprite />

                  {/* Navigation Menu */}
                  <NavigationMenu />

                  {/* Feedback Button */}
                  <FeedbackButton />

                  {/* Toast Notifications */}
                  <Toaster />
                  <Sonner />

                  {/* Performance Monitor (dev only) */}
                  <PerformanceDisplay />

                  {/* Magic Cursor disabled */}

                  {/* Main Application Routes */}
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      {/* Homepage - Device Selection */}
                      <Route path="/" element={<Index />} />

                      {/* Legacy route for device selection */}
                      <Route
                        path="/select-device"
                        element={<SelectDevicePage />}
                      />

                      {/* Device Remote Control Interface */}
                      <Route
                        path="/device/:deviceId"
                        element={
                          <DeviceRemotePage
                            panelBtnFromRemote={panelBtnFromRemote}
                            onRemoteButton={handleRemoteButton}
                          />
                        }
                      />

                      {/* Error Selection Page */}
                      <Route
                        path="/:deviceId/error-select"
                        element={<ErrorSelectionPage />}
                      />

                      {/* Error Detail Page */}
                      <Route
                        path="/:deviceId/error/:errorKey/:subKey?"
                        element={<ErrorDetailPage />}
                      />

                      {/* Admin Panel */}
                      <Route path="/admin" element={<AdminPanel />} />

                      {/* 404 Not Found - Must be last */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </div>
              </BrowserRouter>
            </TooltipProvider>
          </QueryClientProvider>
        </TVControlProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
