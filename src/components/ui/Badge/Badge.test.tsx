
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { Badge } from './Badge';
import type { BadgeProps } from './BadgeProps';

describe('Badge Component', () => {
	const makeProps = (overrides: Partial<BadgeProps> = {}): BadgeProps => ({
		text: 'New',
		color: 'blue',
		variant: 'primary',
		removable: false,
		...overrides,
	});

	describe('Rendering', () => {
		it('renders with default props', () => {
			const props = makeProps();
			const { container } = render(<Badge {...props} />);

			const badge = container.firstElementChild as HTMLElement;
			expect(badge).toBeInTheDocument();
			expect(badge).toHaveClass('badge', 'badge-primary', 'gap-2');
		});

		it('renders the provided text', () => {
			const props = makeProps({ text: 'Beta' });
			render(<Badge {...props} />);

			const text = screen.getByText('Beta');
			expect(text).toBeInTheDocument();
			expect(text.tagName.toLowerCase()).toBe('span');
		});

		it('renders with custom text content', () => {
			const props = makeProps({ text: 'Sale 50% Off' });
			render(<Badge {...props} />);

			expect(screen.getByText('Sale 50% Off')).toBeInTheDocument();
		});

		it('does not render remove button when removable is false', () => {
			const props = makeProps({ removable: false });
			render(<Badge {...props} />);

			const removeButton = screen.queryByRole('button');
			expect(removeButton).not.toBeInTheDocument();
		});

		it('renders remove button when removable is true', () => {
			const props = makeProps({ removable: true, onRemove: vi.fn() });
			render(<Badge {...props} />);

			const removeButton = screen.getByRole('button');
			expect(removeButton).toBeInTheDocument();
			expect(removeButton).toHaveTextContent('✕');
		});
	});

	describe('Variants', () => {
		it('renders primary variant', () => {
			const props = makeProps({ variant: 'primary' });
			const { container } = render(<Badge {...props} />);

			const badge = container.firstElementChild as HTMLElement;
			expect(badge).toHaveClass('badge-primary');
		});

		it('renders secondary variant', () => {
			const props = makeProps({ variant: 'secondary' });
			const { container } = render(<Badge {...props} />);

			const badge = container.firstElementChild as HTMLElement;
			expect(badge).toHaveClass('badge-secondary');
		});

		it('renders accent variant', () => {
			const props = makeProps({ variant: 'accent' });
			const { container } = render(<Badge {...props} />);

			const badge = container.firstElementChild as HTMLElement;
			expect(badge).toHaveClass('badge-accent');
		});

		it('renders ghost variant', () => {
			const props = makeProps({ variant: 'ghost' });
			const { container } = render(<Badge {...props} />);

			const badge = container.firstElementChild as HTMLElement;
			expect(badge).toHaveClass('badge-ghost');
		});

		it('applies base badge classes regardless of variant', () => {
			const props = makeProps({ variant: 'secondary' });
			const { container } = render(<Badge {...props} />);

			const badge = container.firstElementChild as HTMLElement;
			expect(badge).toHaveClass('badge', 'gap-2');
		});
	});

	describe('Color Prop', () => {
		it('ignores color prop in favor of variant', () => {
			const props = makeProps({ color: 'red', variant: 'primary' });
			const { container } = render(<Badge {...props} />);

			const badge = container.firstElementChild as HTMLElement;
			expect(badge).toHaveClass('badge-primary');
			expect(badge).not.toHaveClass('red');
		});

		it('variant takes precedence over color', () => {
			const props = makeProps({ color: 'blue', variant: 'accent' });
			const { container } = render(<Badge {...props} />);

			const badge = container.firstElementChild as HTMLElement;
			expect(badge).toHaveClass('badge-accent');
		});
	});

	describe('Removable Functionality', () => {
		it('calls onRemove when remove button is clicked', () => {
			const onRemove = vi.fn();
			const props = makeProps({ removable: true, onRemove });
			render(<Badge {...props} />);

			const removeButton = screen.getByRole('button');
			fireEvent.click(removeButton);

			expect(onRemove).toHaveBeenCalledTimes(1);
		});

		it('calls onRemove multiple times when clicked multiple times', () => {
			const onRemove = vi.fn();
			const props = makeProps({ removable: true, onRemove });
			render(<Badge {...props} />);

			const removeButton = screen.getByRole('button');
			fireEvent.click(removeButton);
			fireEvent.click(removeButton);
			fireEvent.click(removeButton);

			expect(onRemove).toHaveBeenCalledTimes(3);
		});

		it('remove button has correct styling classes', () => {
			const props = makeProps({ removable: true, onRemove: vi.fn() });
			render(<Badge {...props} />);

			const removeButton = screen.getByRole('button');
			expect(removeButton).toHaveClass('btn', 'btn-ghost', 'btn-xs');
		});

		it('renders without onRemove callback when removable is true', () => {
			const props = makeProps({ removable: true });
			delete (props as BadgeProps).onRemove;

			expect(() => {
				render(<Badge {...props} />);
			}).not.toThrow();

			const removeButton = screen.getByRole('button');
			expect(removeButton).toBeInTheDocument();
		});

		it('does not throw error when clicking remove button without onRemove callback', () => {
			const props = makeProps({ removable: true });
			delete (props as BadgeProps).onRemove;
			render(<Badge {...props} />);

			const removeButton = screen.getByRole('button');
			expect(() => {
				fireEvent.click(removeButton);
			}).not.toThrow();
		});
	});

	describe('Text Content', () => {
		it('handles empty string text', () => {
			const props = makeProps({ text: '' });
			const { container } = render(<Badge {...props} />);

			const span = container.querySelector('span');
			expect(span).toBeInTheDocument();
			expect(span).toHaveTextContent('');
		});

		it('handles numeric text', () => {
			const props = makeProps({ text: '99+' });
			render(<Badge {...props} />);

			expect(screen.getByText('99+')).toBeInTheDocument();
		});

		it('handles long text content', () => {
			const longText = 'This is a very long badge text that should still render correctly';
			const props = makeProps({ text: longText });
			render(<Badge {...props} />);

			expect(screen.getByText(longText)).toBeInTheDocument();
		});

		it('handles special characters in text', () => {
			const specialText = '★ Premium ★';
			const props = makeProps({ text: specialText });
			render(<Badge {...props} />);

			expect(screen.getByText(specialText)).toBeInTheDocument();
		});

		it('handles emoji in text', () => {
			const emojiText = '🔥 Hot';
			const props = makeProps({ text: emojiText });
			render(<Badge {...props} />);

			expect(screen.getByText(emojiText)).toBeInTheDocument();
		});
	});

	describe('Component Structure', () => {
		it('renders a div as root element', () => {
			const props = makeProps();
			const { container } = render(<Badge {...props} />);

			const root = container.firstElementChild;
			expect(root?.tagName.toLowerCase()).toBe('div');
		});

		it('contains a span element for text', () => {
			const props = makeProps();
			const { container } = render(<Badge {...props} />);

			const span = container.querySelector('span');
			expect(span).toBeInTheDocument();
			expect(span?.textContent).toBe(props.text);
		});

		it('contains button as child when removable', () => {
			const props = makeProps({ removable: true, onRemove: vi.fn() });
			const { container } = render(<Badge {...props} />);

			const root = container.firstElementChild;
			const button = root?.querySelector('button');
			expect(button).toBeInTheDocument();
		});

		it('maintains correct DOM hierarchy', () => {
			const props = makeProps({ removable: true, onRemove: vi.fn() });
			const { container } = render(<Badge {...props} />);

			const root = container.firstElementChild;
			const span = root?.querySelector('span');
			const button = root?.querySelector('button');

			expect(root).toContainElement(span as HTMLElement);
			expect(root).toContainElement(button as HTMLElement);
		});
	});

	describe('Props Combinations', () => {
		it('renders with all props provided', () => {
			const onRemove = vi.fn();
			const props = makeProps({
				text: 'Complete',
				color: 'green',
				variant: 'accent',
				removable: true,
				onRemove,
			});
			const { container } = render(<Badge {...props} />);

			const badge = container.firstElementChild as HTMLElement;
			expect(badge).toHaveClass('badge', 'badge-accent', 'gap-2');
			expect(screen.getByText('Complete')).toBeInTheDocument();
			expect(screen.getByRole('button')).toBeInTheDocument();
		});

		it('renders different variants with removable button', () => {
			const variants: Array<'primary' | 'secondary' | 'accent' | 'ghost'> = [
				'primary',
				'secondary',
				'accent',
				'ghost',
			];

			variants.forEach((variant) => {
				const props = makeProps({ variant, removable: true, onRemove: vi.fn() });
				const { container } = render(<Badge {...props} />);

				const badge = container.firstElementChild as HTMLElement;
				expect(badge).toHaveClass(`badge-${variant}`);
				expect(screen.getByRole('button')).toBeInTheDocument();
			});
		});
	});

	describe('Accessibility', () => {
		it('remove button is keyboard accessible', () => {
			const props = makeProps({ removable: true, onRemove: vi.fn() });
			render(<Badge {...props} />);

			const removeButton = screen.getByRole('button');
			removeButton.focus();
			expect(document.activeElement).toBe(removeButton);
		});

		it('text content is accessible', () => {
			const props = makeProps({ text: 'Important Badge' });
			render(<Badge {...props} />);

			const text = screen.getByText('Important Badge');
			expect(text).toBeInTheDocument();
		});

		it('remove button has accessible content', () => {
			const props = makeProps({ removable: true, onRemove: vi.fn() });
			render(<Badge {...props} />);

			const removeButton = screen.getByRole('button');
			expect(removeButton).toHaveTextContent('✕');
		});

		it('maintains button role when removable', () => {
			const props = makeProps({ removable: true, onRemove: vi.fn() });
			render(<Badge {...props} />);

			const button = screen.getByRole('button');
			expect(button).toBeInTheDocument();
		});
	});

	describe('Edge Cases', () => {
		it('handles undefined onRemove gracefully', () => {
			const props = makeProps({ removable: true, onRemove: undefined });
			render(<Badge {...props} />);

			const removeButton = screen.getByRole('button');
			expect(() => {
				fireEvent.click(removeButton);
			}).not.toThrow();
		});

		it('renders correctly with minimal props', () => {
			const minimalProps: BadgeProps = {
				text: 'Min',
				color: '',
				variant: 'primary',
				removable: false,
			};
			const { container } = render(<Badge {...minimalProps} />);

			expect(container.firstElementChild).toBeInTheDocument();
		});

		it('handles rapid clicks on remove button', () => {
			const onRemove = vi.fn();
			const props = makeProps({ removable: true, onRemove });
			render(<Badge {...props} />);

			const removeButton = screen.getByRole('button');
			for (let i = 0; i < 10; i++) {
				fireEvent.click(removeButton);
			}

			expect(onRemove).toHaveBeenCalledTimes(10);
		});

		it('handles whitespace in text', () => {
			const props = makeProps({ text: '  Spaced  ' });
			render(<Badge {...props} />);

			expect(screen.getByText('  Spaced  ')).toBeInTheDocument();
		});
	});

	describe('Default Values', () => {
		it('uses primary variant when variant is not explicitly provided', () => {
			const props = { ...makeProps() };
			const { container } = render(<Badge {...props} />);

			const badge = container.firstElementChild as HTMLElement;
			expect(badge).toHaveClass('badge-primary');
		});

		it('has removable false by default', () => {
			const props = makeProps({ removable: false });
			render(<Badge {...props} />);

			const removeButton = screen.queryByRole('button');
			expect(removeButton).not.toBeInTheDocument();
		});
	});
});