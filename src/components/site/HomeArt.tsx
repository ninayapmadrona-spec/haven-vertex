// Small illustrated "screens" used in the home hero slider and services panel.
export const ART = [
  // Websites
  <div key="a1" className="hv-a1">
    <div className="hv-win">
      <div className="hv-bar"><b /><b /><b /></div>
      <div className="hv-body">
        <div className="hv-hd" />
        <div className="hv-ln" style={{ width: "85%" }} />
        <div className="hv-ln" style={{ width: "60%" }} />
        <div className="hv-btn" />
        <div className="hv-tiles"><i /><i /><i /></div>
      </div>
    </div>
    <div className="hv-tag">Page speed<b>96 / 100</b></div>
  </div>,
  // Automation
  <div key="a2" className="hv-a2">
    <svg viewBox="0 0 440 372" fill="none" aria-hidden="true">
      <path className="hv-flow" d="M104 70 C 200 70 170 186 250 186" stroke="#F6F1FF" strokeWidth="2" opacity=".7" />
      <path className="hv-flow" d="M104 300 C 200 300 170 186 250 186" stroke="#F6F1FF" strokeWidth="2" opacity=".7" />
      <path className="hv-flow" d="M330 186 L 380 186" stroke="#F6F1FF" strokeWidth="2" opacity=".7" />
    </svg>
    <div className="hv-node" style={{ left: 0, top: "14%" }}><s />New enquiry</div>
    <div className="hv-node" style={{ left: 0, bottom: "14%" }}><s />Form submitted</div>
    <div className="hv-node" style={{ left: "52%", top: "42%" }}><s />Auto reply</div>
    <div className="hv-node" style={{ right: 0, top: "42%" }}><s />CRM</div>
  </div>,
  // Content
  <div key="a3" className="hv-a3">
    <div className="hv-grid"><i /><i /><i /><i /><i /></div>
  </div>,
  // Support
  <div key="a4" className="hv-a4">
    <div className="hv-win">
      <div className="hv-bar"><b /><b /><b /></div>
      {[["55%", "09:12", true], ["70%", "09:40", true], ["45%", "10:05", true], ["60%", "Today", false], ["40%", "Today", false]].map(([w, t, d], i) => (
        <div key={i} className={`hv-row${d ? " done" : ""}`}>
          <span className="hv-ck">{d ? "✓" : ""}</span>
          <span className="hv-ln" style={{ maxWidth: w as string }} />
          <small>{t}</small>
        </div>
      ))}
    </div>
  </div>,
];
