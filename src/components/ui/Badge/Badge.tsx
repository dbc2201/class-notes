import type {BadgeProps} from "./BadgeProps.ts";

/**
 * Badge - A reusable badge that displays text with DaisyUI variant styling and an optional remove button.
 *
 * @param {BadgeProps} props - Component props
 * @returns {JSX.Element} Rendered component
 *
 * @example
 * <Badge text="New" variant="primary" removable onRemove={() => console.log('removed')} />
 */
export function Badge(props: Readonly<BadgeProps>) {
    const variant = props.variant ?? 'primary';
    const removable = props.removable ?? false;
    // Note: The 'color' prop from BadgeProps is ignored in favor of the 'variant'
    // prop, which aligns with DaisyUI's class-based styling.
    const badgeClasses = ['badge', `badge-${variant}`, 'gap-2'].join(' ');

    return (
        <div className={badgeClasses}>
            <span className="whitespace-pre-wrap">{props.text}</span>
            {removable && (<button onClick={props.onRemove} className="btn btn-ghost btn-xs">
                ✕
            </button>)}
        </div>
    );
}