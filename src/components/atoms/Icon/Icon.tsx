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

/**
 * A component for displaying SVG icons.
 * It renders an icon from a predefined list based on the `name` prop.
 *
 * @param {Readonly<IconProps>} props The properties for the Icon component.
 * @param {string} props.name The name of the icon to display. Must be a key in the `icons` record.
 * @param {IconSize} [props.size="md"] The size of the icon. Defaults to 'md'.
 * @param {string} [props.color="currentColor"] The CSS color of the icon. Defaults to 'currentColor'.
 * @param {string} [props.className] Additional CSS classes to apply to the SVG element.
 * @returns {JSX.Element | null} The rendered SVG icon as a React element, or `null` if the icon `name` is not found.
 */
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
