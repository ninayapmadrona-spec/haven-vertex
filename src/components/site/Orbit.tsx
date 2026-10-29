import "./orbit.css";

// A small glowing star that travels around the edge of the screen.
export const Orbit = () => (
  <div className="hv-orbit" aria-hidden="true">
    <i style={{ ["--d" as string]: "0s" }} />
    <i style={{ ["--d" as string]: "-0.08s" }} />
    <i style={{ ["--d" as string]: "-0.16s" }} />
    <i style={{ ["--d" as string]: "-0.24s" }} />
    <i style={{ ["--d" as string]: "-0.32s" }} />
  </div>
);
