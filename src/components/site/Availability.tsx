import { availabilityText, AVAILABILITY } from "@/lib/availability";
import "./home.css";

export const Availability = () => (
  <span className="hv-avail" data-status={AVAILABILITY.status}>
    <i aria-hidden="true" />
    {availabilityText()}
  </span>
);
