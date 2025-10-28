import { useId } from "react";
import type { InputProps } from "./InputProps.ts";

/**
 * A reusable, controlled Input component for forms.
 * It accepts props to manage its state and appearance.
 */
export default function Input(props: InputProps) {
    const {
        label,
        type = "text",
        value,
        onChange,
        placeholder,
        error,
        disabled = false,
        required = false,
    } = props;
    const id = useId();

    const inputClasses = [
        "input",
        "input-bordered",
        "w-full",
        error ? "input-error" : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className="form-control w-full max-w-xs">
            <label htmlFor={id} className="label">
                <span className="label-text">{label}</span>
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                className={inputClasses}
            />
            {error && <span className="text-error text-sm mt-1">{error}</span>}
        </div>
    );
}
