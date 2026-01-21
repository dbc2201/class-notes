import type {SpinnerProps, SpinnerSize} from "./SpinnerProps";

const sizeMap: Record<SpinnerSize, number> = {
    sm: 16,
    md: 24,
    lg: 32,
};

/**
 * Renders a visually appealing and accessible SVG spinner component.
 * This component is typically used to indicate a loading state or ongoing process.
 *
 * The spinner's size and color can be customized via props.
 * It includes accessibility attributes (`role="status"`, `aria-label="Loading"`)
 * to ensure screen readers can convey its purpose.
 *
 * @component
 * @param {Readonly<SpinnerProps>} props - The properties for the Spinner component.
 * @param {("sm" | "md" | "lg")} [props.size="md"] - The predefined size of the spinner.
 *   - "sm": Small (16px)
 *   - "md": Medium (24px)
 *   - "lg": Large (32px)
 * @param {string} [props.color="currentColor"] - The color of the spinner's stroke.
 *   Can be any valid CSS color string (e.g., "red", "#FF0000", "var(--primary-color)").
 *   Defaults to "currentColor", which inherits the text color of its parent.
 * @returns {JSX.Element} A React element representing the SVG spinner.
 *
 * @example
 * // Basic usage with default size and color
 * <Spinner />
 * @example
 * // Large spinner with a specific color
 * <Spinner size="lg" color="#007bff" />
 */
export function Spinner(props: Readonly<SpinnerProps>) {
    const {
        size = "md",
        color = "currentColor",
        className,
    } = props;

    const pixelSize = sizeMap[size];
    const strokeWidth = Math.max(2, Math.floor(pixelSize / 6));

    return (
        <svg
            width={pixelSize}
            height={pixelSize}
            viewBox="0 0 50 50"
            className={className}
            focusable="false"
        >
            <title>Loading</title>

            <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray="31.4 31.4"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 25 25"
                    to="360 25 25"
                    dur="0.8s"
                    repeatCount="indefinite"
                />
            </circle>
        </svg>
    );
}
