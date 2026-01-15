import {useState} from "react";
import type {AvatarProps, AvatarSize} from "./AvatarProps";

const sizeMap: Record<AvatarSize, number> = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
    xl: 72,
};

export function Avatar(props: Readonly<AvatarProps>) {
    const {
        src,
        alt = "Avatar",
        size = "md",
        fallback,
        className,
    } = props;

    const [hasError, setHasError] = useState(false);

    const pixelSize = sizeMap[size];

    const showImage = src && !hasError;

    // IMAGE RENDER (only if no error)
    if (showImage) {
        return (
            <img
                src={src}
                alt={alt}
                width={pixelSize}
                height={pixelSize}
                className={className}
                onError={() => setHasError(true)}
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
