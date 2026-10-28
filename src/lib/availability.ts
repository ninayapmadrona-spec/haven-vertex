// Change `status` when your schedule fills up. Everything on the site follows it.
//  "open"     -> taking new clients
//  "limited"  -> shows how many spots are left
//  "waitlist" -> fully booked: buttons say "Join the waitlist"
export const AVAILABILITY: { status: "open" | "limited" | "waitlist"; spots: number } = {
  status: "limited",
  spots: 3,
};

export const availabilityText = () => {
  const a = AVAILABILITY;
  if (a.status === "waitlist") return "Fully booked right now. Join the waitlist.";
  if (a.status === "limited") return `Taking on ${a.spots} new ${a.spots === 1 ? "client" : "clients"} this month`;
  return "Taking on new clients";
};
export const isWaitlist = () => AVAILABILITY.status === "waitlist";
