import type {ButtonProps} from "./ButtonProps.ts";

/**
 * Button - Reusable UI button component
 *
 * @param {ButtonProps} props - Component props
 * @returns {JSX.Element} Rendered component
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