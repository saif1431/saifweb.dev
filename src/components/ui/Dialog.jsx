import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { HiX } from "react-icons/hi";

const Dialog = ({ open, onClose, title, children }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const overlayRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (open) setShouldRender(true);
  }, [open]);

  useGSAP(
    () => {
      if (!shouldRender || !overlayRef.current || !panelRef.current) return;

      if (open) {
        gsap.fromTo(overlayRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 });
        gsap.fromTo(
          panelRef.current,
          { autoAlpha: 0, y: 24, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.3, ease: "power3.out" }
        );
      } else {
        gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.2 });
        gsap.to(panelRef.current, {
          autoAlpha: 0,
          y: 24,
          scale: 0.96,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => setShouldRender(false),
        });
      }
    },
    { dependencies: [open, shouldRender], revertOnUpdate: true }
  );

  useEffect(() => {
    if (!open) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-background/85 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface border border-border rounded-2xl shadow-2xl"
      >
        <div className="sticky top-0 flex items-center justify-between p-6 pb-4 bg-surface border-b border-border">
          <h3 id="dialog-title" className="text-xl font-semibold text-foreground pr-8">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label="Close dialog"
          >
            <HiX className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 pt-4">{children}</div>
      </div>
    </div>
  );
};

export default Dialog;
