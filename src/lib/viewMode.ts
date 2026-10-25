// Remembers whether the visitor prefers the classic site or the kiosk.
export type ViewMode = "classic" | "kiosk";
const KEY = "hv-view-mode";
export const getViewMode = (): ViewMode | null => {
  try { const v = localStorage.getItem(KEY); return v === "kiosk" || v === "classic" ? v : null; } catch { return null; }
};
export const setViewMode = (m: ViewMode) => { try { localStorage.setItem(KEY, m); } catch { /* ignore */ } };
