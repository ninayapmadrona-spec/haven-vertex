import { usePreviewMode } from "@/lib/sanity/usePreviewMode";

/**
 * Shown only when visiting the site with ?preview=1. Lets Nina confirm
 * she's looking at unpublished draft content from Sanity, and exit back
 * to the normal published site with one click.
 */
export const PreviewBanner = () => {
  const { isPreview, exitPreview } = usePreviewMode();

  if (!isPreview) return null;

  return (
    <div className="fixed top-0 inset-x-0 z-[100] bg-ink text-white text-sm py-2 px-4 flex items-center justify-center gap-4">
      <span>
        <strong>Preview mode</strong> — showing unpublished changes from Sanity.
      </span>
      <button
        onClick={exitPreview}
        className="underline underline-offset-2 hover:text-white/80 transition-smooth"
      >
        Exit preview
      </button>
    </div>
  );
};
