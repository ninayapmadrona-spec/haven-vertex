export const Footer = () => (
  <footer className="py-12 border-t border-border/60">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-3">
        <div><p className="font-serif text-2xl font-semibold">Haven Vertex</p><p className="text-xs text-muted-foreground mt-1">Website Management • Virtual Assistance • Digital Support</p></div>
      </div>
      <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Haven Vertex. All rights reserved.</p>
    </div>
  </footer>
);
