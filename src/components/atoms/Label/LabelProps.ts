// src/components/atoms/Label/LabelProps.ts
import type {ReactNode} from "react";

export type LabelSize = "sm" | "md" | "lg";

export interface LabelProps {
    /** id of the input this label is associated with */
    htmlFor?: string;

    /** label text */
    children: ReactNode;

    /** show required asterisk */
    required?: boolean;

    /** visual size */
    size?: LabelSize;

    /** disabled appearance */
    disabled?: boolean;

    /** extra tailwind classes */
    className?: string;
}
