import { X } from "lucide-react";

const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  closeOnOverlay = true,
}) => {
  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-3xl",
    xl: "max-w-6xl",
    full: "max-w-[95vw]",
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlay) {
      onClose?.();
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/50
        p-4
        backdrop-blur-sm
        animate-in
        fade-in
        duration-200
      "
      onMouseDown={handleOverlayClick}
    >
      <div
        className={`
          relative
          w-full
          ${sizes[size]}
          max-h-[calc(100vh-2rem)]
          overflow-hidden
          rounded-2xl
          border
          border-border-subtle
          bg-surface-card
          shadow-2xl
          animate-in
          zoom-in-95
          duration-200
          flex
          flex-col
        `}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="
            flex
            shrink-0
            items-start
            justify-between
            gap-4
            border-b
            border-border-subtle
            px-5
            py-4
          "
        >
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-text-primary">{title}</h2>

            {description && (
              <p className="mt-1 text-sm leading-5 text-text-muted">
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              text-text-muted
              transition
              hover:bg-surface-elevated
              hover:text-text-primary
            "
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            className="
              flex
              shrink-0
              items-center
              justify-end
              gap-3
              border-t
              border-border-subtle
              bg-surface-elevated/40
              px-5
              py-4
            "
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
