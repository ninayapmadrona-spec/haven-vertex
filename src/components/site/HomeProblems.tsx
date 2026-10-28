import { useState } from "react";
import { Link } from "react-router-dom";
import { openCalendly, useCalendly } from "@/lib/calendly";
import { useFinalCtaContact } from "@/lib/sanity/hooks";
import "./home.css";

type Seg = { id: string; tab: string; stat: string; probs: [string, string][] };

const SEGS: Seg[] = [
  {
    id: "owners", tab: "Business owners",
    stat: "Around 1 in 4 small business owners say marketing is too complex or they do not have the time.",
    probs: [
      ["You are unsure what to do first", "I pick the next sensible steps for your site and your Google presence, then do them."],
      ["You have no time to update the website", "Hand it over. Changes go live within a business day."],
      ["Past marketing brought no results", "Simple monthly reports show what is working, so you stop guessing."],
      ["Your site is out of date and nobody owns it", "A monthly check keeps pages, forms, backups and plugins in order."],
      ["You juggle several freelancers", "One dependable person for the website, content and admin."],
    ],
  },
  {
    id: "food", tab: "Restaurants and cafes",
    stat: "More than half of mobile visitors leave a page that takes over 3 seconds to load.",
    probs: [
      ["The menu is a PDF or out of date", "A real, searchable menu page that matches what you serve today."],
      ["The site is slow or awkward on phones", "Speed and mobile fixes, so hungry people do not give up."],
      ["Hours or phone number are wrong online", "Your site and listings match, and are checked every month."],
      ["Booking or ordering is hard to find", "One clear button to book or order, within seconds of landing."],
      ["No time for specials and social posts", "Specials published, graphics made in Canva, posts scheduled."],
    ],
  },
  {
    id: "clubs", tab: "Clubs and RSLs",
    stat: "Volunteer club administrators average around 14 unpaid hours a week.",
    probs: [
      ["Volunteers spend their nights on the website", "I take the updates, so volunteers can focus on members."],
      ["Events, fixtures and results are out of date", "Weekly updates, so the site is where members look first."],
      ["Sign-up and membership forms confuse people", "Clear forms with automatic replies, sent to the right person."],
      ["News gets lost across email, Facebook and WhatsApp", "One simple flow: site, newsletter and socials say the same thing."],
      ["The committee changes and nobody knows the logins", "Access documented and kept safe, with one steady point of contact."],
    ],
  },
  {
    id: "clinics", tab: "Clinics",
    stat: "Nearly 60% of healthcare website visitors are on a phone.",
    probs: [
      ["Patients cannot see how to book", "The same clear booking step on every page, for new and existing patients."],
      ["Practitioner and service pages are thin", "Pages that answer what patients ask: who, what, where and what to expect."],
      ["The site is hard to use on a phone", "A clean mobile layout with big, easy buttons."],
      ["Location, hours and parking are unclear", "A page for each location with the details people need before they arrive."],
      ["Front desk staff are buried in admin", "Inbox, scheduling and content tasks handled, with no patient records touched."],
    ],
  },
  {
    id: "shops", tab: "Small shops",
    stat: "48% of small business owners say they lack the time and resources to build a website.",
    probs: [
      ["Customers cannot find you on Google", "On-page and local SEO, so people nearby find your shop."],
      ["Products and prices are out of date", "New products, photos and prices uploaded fast."],
      ["No time for social posts and email", "Graphics, posts and newsletters made and scheduled for you."],
      ["The store is slow or hard to buy from", "Speed and checkout checks on Shopify or WooCommerce."],
      ["Ads cost too much", "Steady content and search work that keeps bringing visitors in."],
    ],
  },
];

export const HomeProblems = () => {
  const [i, setI] = useState(0);
  useCalendly();
  const { content: contact } = useFinalCtaContact();
  const url = contact.calendlyUrl;

  return (
    <section className="hv hv-problems container py-16 lg:py-24" aria-labelledby="home-problems-heading">
      <p className="hv-eyebrow">Does this sound like you?</p>
      <h2 id="home-problems-heading" className="max-w-[20ch] text-balance font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
        The website problems that <em style={{ fontStyle: "normal", opacity: 0.55 }}>cost you customers</em>.
      </h2>
      <p className="mt-4 max-w-[60ch] text-lg text-muted-foreground">Pick your type of business. Here is what usually goes wrong, and what I do about it.</p>

      <div className="hv-ptabs" role="tablist" aria-label="Type of business">
        {SEGS.map((s, k) => (
          <button key={s.id} type="button" role="tab" id={`pt-${s.id}`} aria-selected={k === i} aria-controls={`pp-${s.id}`} onClick={() => setI(k)}>{s.tab}</button>
        ))}
      </div>

      {SEGS.map((s, k) => (
        <div key={s.id} id={`pp-${s.id}`} role="tabpanel" aria-labelledby={`pt-${s.id}`} hidden={k !== i} className="hv-ppanel">
          <div className="hv-pgrid">
            <div className="hv-phead"><span>The problem</span><span>How I fix it</span></div>
            {s.probs.map(([p, f], n) => (
              <div key={p} className="hv-prow" style={{ ["--n" as string]: n }}>
                <h3 className="font-serif">{p}</h3>
                <p>{f}</p>
              </div>
            ))}
          </div>
          <p className="hv-pstat">{s.stat}</p>
        </div>
      ))}

      <div className="hv-pcta">
        <a href={url} onClick={openCalendly(url)} target="_blank" rel="noopener noreferrer" className="hv-pill">Book a free call</a>
        <Link to="/services" className="font-semibold text-primary underline underline-offset-4">See services and prices</Link>
      </div>
      <p className="hv-psrc">
        Figures from <a href="https://www.owner.com/blog/common-restaurant-website-mistakes" target="_blank" rel="noopener noreferrer">Owner.com</a>, <a href="https://www.brightlocal.com/research/smb-report-who-owns-marketing/" target="_blank" rel="noopener noreferrer">BrightLocal</a>, <a href="https://unlockhealth.com/?p=3937" target="_blank" rel="noopener noreferrer">Unlock Health</a>, <a href="https://tidyhq.com/blog/sport-administration-is-broken" target="_blank" rel="noopener noreferrer">TidyHQ</a> and <a href="https://smallbusinessmajority.org/sites/default/files/research-reports/small-businesses-face-obstacles-opportunities-growing-online-presence.pdf" target="_blank" rel="noopener noreferrer">Small Business Majority</a>. Several are US studies.
      </p>
    </section>
  );
};
