import type {ReactNode} from "react";

export interface DropdownItems {
    label: string;
    value: string;
    onClick: () => void;
}

export interface DropdownProps {
    trigger: ReactNode;
    items: DropdownItems[];
    position?: "top" | "bottom" | "left" | "right";
}