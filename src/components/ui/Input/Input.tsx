import {useId} from "react";
import type {InputProps} from "./InputProps.ts";

/**
 * A reusable and accessible input component with a label and error message display. It ensures that
 * the `onChange` event does not fire when the input is disabled, providing a more robust and
 * predictable behavior.  All props are strictly required to ensure consistency.
 *
 * @param {InputProps} props - The properties for the Input component.
 * @returns {JSX.Element} The rendered input field with its label and optional error message.
 *
 * @example
 * const [name, setName] = useState('');
 * const [error, setError] = useState('');
 *
 * // Basic usage
 * <Input
 *   label="Full Name"
 *   type="text"
 *   value={name}
 *   onChange={(e) => setName(e.target.value)}
 *   placeholder="John Doe"
 *   required={true}
 *   disabled={false}
 *   error={error}
 *   className="my-custom-class" // Add extra classes via className.
 *   hideLabel={true} // Set hideLabel to true to hide the label.
 * />
 */
export function Input(props: Readonly<InputProps>) {

    const id = useId();

    return (
        <div>
            {!props.hideLabel && props.label && (
                <label htmlFor={id} className="label w-full p-[12px]">
                    <span className="label-text">{props.label}</span>
                </label>
            )}

            <input
                id={id}
                type={props.type}
                value={
                    typeof props.value === "string" || typeof props.value === "number"
                        ? props.value
                        : ""
                }
                onChange={(e) => {
                    // Prevent onChange from firing when the input is disabled.
                    if (!props.disabled) {
                        props.onChange(e);
                    }
                }}
                placeholder={props.placeholder}
                disabled={props.disabled}
                required={props.required}
                aria-label={props.ariaLabel}
                className={`input input-bordered block w-full ${props.className ?? ""}`}
            />

            {props.error && (
                <span className="text-error text-sm">{props.error}</span>
            )}
        </div>
    );
}
