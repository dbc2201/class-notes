export interface BadgeProps {
	text: string,
	color: string,
	variant: 'primary' | 'secondary' | 'accent' | 'ghost',
	removable: boolean,
	onRemove?: () => void
}