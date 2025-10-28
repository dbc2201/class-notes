import type {ButtonProps} from "./ButtonProps.ts";

export const Button = ({
    label,
    variant = 'primary',
    size = 'md',
    disabled = false,
    onClick,
    type = 'button'
}: ButtonProps) => {

    const classNames = [
        'btn',
        `btn-${variant}`,
        `btn-${size}`
    ].join(' ');

    return (
        <button type={type} disabled={disabled} onClick={onClick} className={classNames}>
            {label}
        </button>
    );
};