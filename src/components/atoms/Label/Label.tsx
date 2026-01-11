// src/components/atoms/Label/Label.tsx
import type {LabelProps} from "./LabelProps";

const sizeClasses: Record<NonNullable<LabelProps["size"]>, string> = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
};

/**
 * A form label component that supports various sizes, required indicators, and disabled states.
 * @see LabelProps
 * @example
 * <Label htmlFor="email" size="lg">
 *   Email Address
 * </Label>
 */
export default function Label({
                                  htmlFor,
                                  children,
                                  required,
                                  size = "md",
                                  disabled,
                                  className,
                              }: Readonly<LabelProps>) {
    return (
        <label
            htmlFor={htmlFor}
            className={[
                "block font-medium text-slate-700 dark:text-slate-300",
                sizeClasses[size],
                disabled && "opacity-50 cursor-not-allowed",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {children}

            {required && (
                <>
                    {/* Screen readers only */}
                    <span className="sr-only">(required)</span>

                    {/* Visual required indicator */}
                    <span
                        aria-hidden="true"
                        className="ml-1 text-red-500"
                    >
                *
                </span>
                </>


            )}
        </label>
    );
}
