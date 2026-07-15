import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "zudoku/icons";

type ZoomableImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

/**
 * Drop-in replacement for the default markdown `img`. Renders the image inline,
 * constrained to the content width, and opens a full-size lightbox overlay on
 * click (above all content). Close with click, the × button, or Escape.
 */
export default function ZoomableImage({
  src,
  alt,
  className,
  ...props
}: ZoomableImageProps) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);

    // Lock background scroll while the overlay is open.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        {...props}
        onClick={() => setOpen(true)}
        className={`cursor-zoom-in rounded-md ${className ?? ""}`.trim()}
      />

      {open && typeof document !== "undefined"
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={alt || "Náhled obrázku"}
              onClick={close}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            >
              <button
                type="button"
                onClick={close}
                aria-label="Zavřít náhled"
                className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              >
                <X className="size-6" />
              </button>

              <figure
                className="flex max-h-full max-w-full flex-col items-center gap-3"
                onClick={(event) => event.stopPropagation()}
              >
                <img
                  src={src}
                  alt={alt}
                  className="max-h-[90vh] max-w-[95vw] cursor-zoom-out rounded-md object-contain shadow-2xl"
                  onClick={close}
                />
                {alt ? (
                  <figcaption className="max-w-[95vw] text-center text-sm text-white/80">
                    {alt}
                  </figcaption>
                ) : null}
              </figure>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}