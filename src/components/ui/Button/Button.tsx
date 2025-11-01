import type {ButtonProps} from "./ButtonProps.ts";

/**
 * Renders a reusable button that applies variant and size CSS classes.
 *
 * @param props - Component props containing `label`, `variant`, `size`, `type`, `disabled`, and `onClick`.
 * @returns The rendered button element.
 */
export default function Button(props: ButtonProps) {
    const classNames = [
        'btn',
        `btn-${props.variant}`,
        `btn-${props.size}`
    ].join(' ');

    return (
        <button type={props.type} disabled={props.disabled} onClick={props.onClick} className={classNames}>
            {props.label}
        </button>
    );
};