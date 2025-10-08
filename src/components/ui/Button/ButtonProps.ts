import type {ReactNode} from "react";

export interface ButtonProps {
    children: ReactNode,
    variant: 'primary' | 'secondary' | 'ghost',
    size: 'sm' | 'md' | 'lg',
    disabled: boolean,
    onclick: () => void,
    type: 'button' | 'submit' | 'reset'
}