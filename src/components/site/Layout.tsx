import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

// Scrolls to the top of the page whenever the route changes, since the
// browser otherwise preserves scroll position across client-side navigations.
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Shared shell for every page: Navbar + Footer stay mounted while the
// individual page content (the <Outlet />) swaps on navigation.
export const Layout = () => (
  <>
    <ScrollToTop />
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);
