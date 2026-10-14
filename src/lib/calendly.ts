import { useEffect } from "react";

const CSS_ID = "calendly-widget-css";
const JS_ID = "calendly-widget-script";

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (opts: { url: string }) => void };
  }
}

export const useCalendly = () => {
  useEffect(() => {
    if (!document.getElementById(CSS_ID)) {
      const link = document.createElement("link");
      link.id = CSS_ID;
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }
    if (!document.getElementById(JS_ID)) {
      const s = document.createElement("script");
      s.id = JS_ID;
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);
};

export const openCalendly = (url: string) => (e: React.MouseEvent) => {
  if (typeof window !== "undefined" && window.Calendly) {
    e.preventDefault();
    window.Calendly.initPopupWidget({ url });
  }
};
