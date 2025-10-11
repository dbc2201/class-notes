import type {BadgeProps} from "./BadgeProps.ts";

/**
 * A reusable Badge component that displays text and an optional remove button.
 */
export const Badge = ({
    text,
    variant = 'primary',
    removable = false,
    onRemove
}: BadgeProps) => {

    // Note: The 'color' prop from BadgeProps is ignored in favor of the 'variant'
    // prop, which aligns with DaisyUI's class-based styling.
    const badgeClasses = [
        'badge',
        `badge-${variant}`,
        'gap-2' // Adds a small gap between text and the remove button
    ].join(' ');

    return (
        <div className={badgeClasses}>
            <span>{text}</span>
            {removable && (
                <button onClick={onRemove} className="btn btn-ghost btn-xs">
                    ✕
                </button>
            )}
        </div>
    );
};