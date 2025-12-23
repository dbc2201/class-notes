import {Badge} from "../../../ui/Badge/Badge.tsx";
import type TagBadgeProps from "./TagBadgeProps.ts";

/**
 * TagBadge - Renders a Badge for a tag.
 *
 * Accepts either a string tag or a tag object and forwards handlers to the underlying
 * `Badge` UI component. Supports an optional remove handler and click handler.
 *
 * @param {TagBadgeProps} props - Component props
 * @returns {JSX.Element} Rendered component
 *
 * @example
 * <TagBadge tag="react" color="primary" removable onRemove={() => console.log('removed')} />
 *
 * @example
 * <TagBadge tag={{ id: '1', name: 'typescript' }} color="secondary" onClick={() => alert('clicked')} />
 */
export function TagBadge(props: Readonly<TagBadgeProps>) {
    const badgeText = typeof props.tag === 'string' ? props.tag : props.tag.name;
    return (
        <Badge
            text={badgeText}
            color={props.color}
            variant={"primary"}
            removable={props.removable}
            onRemove={props.onRemove}
            onClick={props.onClick}>
        </Badge>
    );
}