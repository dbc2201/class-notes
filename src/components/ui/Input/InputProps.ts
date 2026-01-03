import type {ChangeEvent} from "react";

/* ---------------- BASE PROPS ---------------- */

interface BaseInputProps {
    type: 'text' | 'email' | 'password' | 'number';
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    error?: string;
    disabled: boolean;
    required: boolean;
    className?: string;
}

/* ---------------- VARIANT 1 ---------------- */

/* Label VISIBLE */

interface InputWithVisibleLabel extends BaseInputProps {
    hideLabel?: false;
    label: string;
    ariaLabel?: string;
}

/* ---------------- VARIANT 2 ---------------- */

/* Label HIDDEN */

interface InputWithHiddenLabel extends BaseInputProps {
    hideLabel: true;
    ariaLabel: string;
    label?: string;
}

/* ---------------- FINAL TYPE ---------------- */

export type InputProps =
    | InputWithVisibleLabel
    | InputWithHiddenLabel;
