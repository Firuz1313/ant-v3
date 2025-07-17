// Service Worker registration for PWA functionality
export const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator && import.meta.env.PROD) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("SW registered: ", registration);

      // Update available
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              // Show update available notification
              console.log("New content is available; please refresh.");
            }
          });
        }
      });
    } catch (error) {
      console.log("SW registration failed: ", error);
    }
  }
};

export const unregisterServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.unregister();
      console.log("SW unregistered");
    } catch (error) {
      console.log("SW unregistration failed: ", error);
    }
  }
};
