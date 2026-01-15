import {useEffect, useState} from "react";
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
 * Displays a user profile image when `src` is provided.
 * Falls back to initials or a placeholder when the image is missing or fails to load.
 *
 * @param {Readonly<AvatarProps>} props - Avatar properties
 * @returns {React.ReactNode} Rendered avatar
 *
 * @example
 * <Avatar src="https://example.com/avatar.jpg" alt="User Avatar" />
 *
 * @example
 * <Avatar size="lg" fallback="JD" />
 *
 * @example
 * <Avatar src="https://example.com/avatar.jpg" className="my-avatar" />
 *
 * @example
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

    const [hasError, setHasError] = useState(false);

    // Reset error state when image source changes
    useEffect(() => {
        setHasError(false);
    }, [src]);

    const pixelSize = sizeMap[size];
    const showImage = Boolean(src) && !hasError;

    // IMAGE RENDER
    if (showImage) {
        return (
            <img
                src={src}
                alt={alt}
                width={pixelSize}
                height={pixelSize}
                className={className}
                onError={(e) => {
                    // prevent infinite error loop
                    e.currentTarget.onerror = null;
                    setHasError(true);
                }}
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
                backgroundColor: "#e5e7eb",
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
