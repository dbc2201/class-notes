export type IconSize = "sm" | "md" | "lg" | "xl";

export interface IconProps {
    name: string;
    size?: IconSize;
    color?: string;
    className?: string;
}