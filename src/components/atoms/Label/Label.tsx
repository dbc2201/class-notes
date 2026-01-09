// src/components/atoms/Label/Label.tsx
import type {LabelProps} from "./LabelProps";

const sizeClasses: Record<NonNullable<LabelProps["size"]>, string> = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
};

export default function Label(props: Readonly<LabelProps>) {
    const size = props.size ?? "md";
    return (
        <label
            htmlFor={props.htmlFor}
            className={[
                "block font-medium text-slate-700 dark:text-slate-300",
                sizeClasses[size],
                props.disabled && "opacity-50 cursor-not-allowed",
                props.className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {props.children}

            {props.required && (
                <span
                    aria-hidden="true"
                    className="ml-1 text-red-500"
                >
          *
        </span>
            )}
        </label>
    );
}
