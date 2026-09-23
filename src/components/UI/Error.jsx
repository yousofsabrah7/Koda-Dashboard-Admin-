import { AlertTriangle, RefreshCw } from "lucide-react";

const ErrorState = ({
  title = "Something went wrong",
  message = "We couldn't load the data. Please try again.",
  onRetry,
  retryText = "Try Again",
  fullPage = false,
}) => {
  return (
    <div
      className={`
        flex w-full items-center justify-center
        ${fullPage ? "min-h-[70vh]" : "py-16"}
      `}
    >
      <div className="flex w-full max-w-md flex-col items-center px-6 text-center">
        <div
          className="
            flex size-16 items-center justify-center
            rounded-2xl border border-accent/20
            bg-accent-light text-accent
          "
        >
          <AlertTriangle size={28} strokeWidth={1.8} />
        </div>

        <div className="mt-5">
          <h3 className="text-lg font-bold text-text-primary">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-text-secondary">
            {message}
          </p>
        </div>

        {/* Action */}
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="
              mt-6 inline-flex h-10 items-center gap-2
              rounded-xl border border-border-subtle
              bg-surface-card px-4
              text-sm font-medium text-text-primary
              transition-all duration-200
              hover:border-accent
              hover:bg-accent-light
              hover:text-accent
              active:scale-[0.98]
            "
          >
            <RefreshCw size={15} strokeWidth={2} />
            {retryText}
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;