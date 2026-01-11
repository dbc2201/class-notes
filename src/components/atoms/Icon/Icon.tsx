import type {IconProps, IconSize} from "./IconProps";
import type {ReactNode} from "react";

const sizeMap: Record<IconSize, number> = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
};

const icons: Record<string, ReactNode> = {
    search: (
        <path
            d="M21 21l-4.35-4.35m1.6-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
        />
    ),
    close: (
        <path
            d="M6 18L18 6M6 6l12 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
        />
    ),
};

export function Icon(props: Readonly<IconProps>) {
    const {
        name,
        size = "md",
        color = "currentColor",
        className,
    } = props;

    const icon = icons[name];
    if (!icon) return null;

    const pixelSize = sizeMap[size];

    return (
        <svg
            width={pixelSize}
            height={pixelSize}
            viewBox="0 0 24 24"
            fill="none"
            color={color}
            aria-hidden="true"
            className={className}
        >
            {icon}
        </svg>
    );
}
