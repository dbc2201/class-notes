import type {ButtonProps} from "./ButtonProps.ts";

/**
 * Renders a reusable button that applies variant and size CSS classes.
 *
 * @param props - Component props containing `label`, `variant`, `size`, `type`, `disabled`, and `onClick`.
 * @returns The rendered button element.
 *
 * @example
 * <Button
 *   label="Submit"
 *   variant="primary"
 *   size="md"
 *   type="button"
 *   disabled={false}
 *   onClick={() => handleSubmit()}
 * />
 */
export function Button(props: ButtonProps) {
	const variant = props.variant ?? 'primary';
	const size = props.size ?? 'md';
	const classNames = [
		'btn',
		`btn-${variant}`,
		`btn-${size}`
	].join(' ');

	return (
		<button type={props.type} disabled={props.disabled} onClick={props.onClick} className={classNames}>
			{props.label}
		</button>
	);
}