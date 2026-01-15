import type {AvatarProps, AvatarSize} from "./AvatarProps";

const sizeMap: Record<AvatarSize, number> = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
    xl: 72,
};

/**
 * Renders an Avatar component.
 *
 * This component displays a user's avatar, either from an image URL or a text fallback.
 * It supports various predefined sizes and custom styling via `className`.
 *
 * @param {Readonly<AvatarProps>} props - The properties for the Avatar component.
 * @returns {JSX.Element} The rendered Avatar component.
 *
 * @example
 * // Basic usage with an image
 * <Avatar src="https://example.com/avatar.jpg" alt="User Avatar" />
 *
 * @example
 * // Avatar with a specific size and fallback text
 * <Avatar size="lg" fallback="JD" />
 *
 * @example
 * // Avatar with custom class
 * <Avatar src="https://example.com/avatar.jpg" className="my-custom-avatar" />
 *
 * @example
 * // Avatar with no src and no fallback (will show '?')
 * <Avatar size="sm" />
 */

export function Avatar(props: Readonly<AvatarProps>) {
    const {
        src,
        alt = "Avatar",
        size = "md",
        fallback,
        className,
    } = props;

    const pixelSize = sizeMap[size];

    // IMAGE RENDER
    if (src) {
        return (
            <img
                src={src}
                alt={alt}
                width={pixelSize}
                height={pixelSize}
                className={className}
                style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                }}
            />
        );
    }

    // FALLBACK RENDER
    return (
        <div
            aria-label={alt}
            className={className}
            style={{
                width: pixelSize,
                height: pixelSize,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#e5e7eb", // neutral gray
                color: "#374151",
                fontWeight: 600,
                fontSize: Math.floor(pixelSize / 2.5),
                userSelect: "none",
            }}
        >
            {fallback?.slice(0, 2).toUpperCase() ?? "?"}
        </div>
    );
}
