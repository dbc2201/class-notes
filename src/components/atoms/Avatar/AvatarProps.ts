export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps {
    src?: string;
    alt?: string;
    size?: AvatarSize;
    fallback?: string; // initials OR single char OR icon text
    className?: string;
}
