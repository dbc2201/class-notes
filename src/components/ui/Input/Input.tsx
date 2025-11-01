import {useId} from "react";
import type {InputProps} from "./InputProps.ts";

/**
 * A reusable and accessible input component with a label and error message display.
 * All props are strictly required to ensure consistency.
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
 * />
 */
export function Input(props: InputProps) {

	const id = useId();

	return (
		<div>
			<label htmlFor={id} className="label w-full p-[12px]">
				<span className="label-text">{props.label}</span>
			</label>

			<input
				id={id}
				type={props.type}
				value={props.value}
				onChange={props.onChange}
				placeholder={props.placeholder}
				disabled={props.disabled}
				required={props.required}
				className="input input-bordered block"
			/>

			{props.error && (<span className="text-error text-sm">{props.error}</span>)}
		</div>
	);
}
