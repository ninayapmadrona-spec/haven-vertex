import { Link } from "react-router-dom";
import { setViewMode } from "@/lib/viewMode";
import "./home.css";

const scrollTo = (id: string) => () => {
  setViewMode("classic");
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export const HomeChoose = () => (
  <section className="hv container pb-4 pt-2" aria-labelledby="choose-heading">
    <h2 id="choose-heading" className="font-serif text-3xl leading-[1.05] text-balance sm:text-4xl">Browse it <em style={{ fontStyle: "normal", opacity: 0.55 }}>your way</em>.</h2>
    <p className="mt-3 max-w-[50ch] text-lg text-muted-foreground">Scroll through the site like normal, or order your support plan on a kiosk. Same services either way.</p>
    <div className="hv-choose">
      <button type="button" className="hv-choice" onClick={scrollTo("home-services-heading")}>
        <span className="k">Classic</span>
        <span className="t font-serif">Read the website</span>
        <span className="d">See services, recent work and how it works, one scroll at a time.</span>
        <span className="go">Keep scrolling <b>↓</b></span>
      </button>
      <Link to="/kiosk" className="hv-choice hv-choice-dark" onClick={() => setViewMode("kiosk")}>
        <span className="k">Kiosk</span>
        <span className="t font-serif">Build your plan</span>
        <span className="d">Tap big tiles, swipe between categories and see your starting price as you go.</span>
        <span className="go">Touch to start <b>+</b></span>
      </Link>
    </div>
  </section>
);
