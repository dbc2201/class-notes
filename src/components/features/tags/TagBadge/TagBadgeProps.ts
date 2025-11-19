export default interface TagBadgeProps {
    tag: string | Tag
    removable: boolean
    onRemove: () => void
    onClick: () => void
    color: string
}

export interface Tag {
    name: string
}