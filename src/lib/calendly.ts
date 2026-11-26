// Booking widget (zcal). File and export names are kept from the old
// Calendly setup so every "Book a free call" button keeps working unchanged.
import { useEffect } from "react";

export const BOOKING_URL = "https://zcal.co/i/Pip1z_aX";
const EMBED_SRC = "https://static.zcal.co/embed/v1/embed.js";
const MODAL_ID = "hv-booking-modal";

/** Any old Calendly link (e.g. still saved in Sanity) is swapped for zcal. */
export const toBookingUrl = (url?: string) =>
  !url || url.includes("calendly.com") ? BOOKING_URL : url;

const loadEmbed = () => {
  // Re-inserting the script makes zcal scan the page for the new widget.
  document.querySelectorAll(`script[src="${EMBED_SRC}"]`).forEach((s) => s.remove());
  const s = document.createElement("script");
  s.src = EMBED_SRC;
  s.async = true;
  document.body.appendChild(s);
};

const closeModal = () => {
  document.getElementById(MODAL_ID)?.remove();
  document.body.style.overflow = "";
  document.removeEventListener("keydown", onKey);
};

const onKey = (e: KeyboardEvent) => {
  if (e.key === "Escape") closeModal();
};

const openModal = (url: string) => {
  closeModal();
  const overlay = document.createElement("div");
  overlay.id = MODAL_ID;
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Book a free discovery call");
  overlay.style.cssText =
    "position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(30,10,45,.6);backdrop-filter:blur(4px)";

  const panel = document.createElement("div");
  panel.style.cssText =
    "position:relative;width:100%;max-width:1000px;height:min(760px,92vh);overflow:auto;background:#fff;border-radius:20px;box-shadow:0 30px 80px rgba(30,10,45,.35)";

  const close = document.createElement("button");
  close.type = "button";
  close.setAttribute("aria-label", "Close");
  close.textContent = "×";
  close.style.cssText =
    "position:absolute;top:10px;right:14px;z-index:2;width:36px;height:36px;border:0;border-radius:50%;background:#4A1A6B;color:#fff;font-size:22px;line-height:36px;cursor:pointer";
  close.onclick = closeModal;

  const widget = document.createElement("div");
  widget.className = "zcal-inline-widget";
  widget.style.cssText = "min-height:100%;padding:8px";
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "10-Min FREE Discovery Call - Schedule a meeting";
  widget.appendChild(link);

  panel.append(close, widget);
  overlay.appendChild(panel);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";
  document.addEventListener("keydown", onKey);
  loadEmbed();
};

/** Kept for compatibility; zcal loads only when a booking button is clicked. */
export const useCalendly = () => {
  useEffect(() => closeModal, []);
};

/** Opens the zcal booking popup; falls back to the link's new tab otherwise. */
export const openCalendly = (url: string) => (e: React.MouseEvent) => {
  if (typeof window === "undefined" || e.metaKey || e.ctrlKey || e.shiftKey) return;
  e.preventDefault();
  openModal(toBookingUrl(url));
};
