import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SimpleCursor } from "@/components/SimpleCursor";
import { NavigationMenu } from "@/components/NavigationMenu";
import { FeedbackButton } from "@/components/FeedbackButton";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SelectDevicePage from "./pages/SelectDevicePage";
import DeviceRemotePage from "./pages/DeviceRemotePage";
import ErrorSelectionPage from "./pages/ErrorSelectionPage";
import ErrorDetailPage from "./pages/ErrorDetailPage";
import AdminPanel from "./pages/AdminPanel";
import { TVControlProvider } from "./context/TVControlContext";

const queryClient = new QueryClient();

export default function App() {
  const [panelBtnFromRemote, setPanelBtnFromRemote] = useState<number | null>(
    null,
  );

  // Global initialization
  useEffect(() => {
    // Disable context menu on right click for more immersive experience
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

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
                  {/* Navigation Menu */}
                  <NavigationMenu />

                  {/* Toast Notifications */}
                  <Toaster />
                  <Sonner />

                  {/* Main Application Routes */}
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
                </div>
              </BrowserRouter>
            </TooltipProvider>
          </QueryClientProvider>
        </TVControlProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
