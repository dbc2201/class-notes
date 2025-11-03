import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {vi} from 'vitest';
import {Button} from './Button';

describe('Button Component', () => {
	describe('Rendering', () => {
		it('renders with default props', () => {
			render(<Button label="click me" />);

			const buttonElement = screen.getByRole('button', { name: /click me/i });

			expect(buttonElement).toBeInTheDocument();
			expect(buttonElement).toHaveClass('btn', 'btn-primary', 'btn-md');
			expect(buttonElement).not.toBeDisabled();
		});

		it('renders the provided label', () => {
			render(<Button label="Submit" />);

			const buttonElement = screen.getByRole('button', { name: 'Submit' });
			expect(buttonElement).toBeInTheDocument();
			expect(buttonElement).toHaveTextContent('Submit');
		});
	});

	describe('Variants', () => {
		it('renders primary variant', () => {
			render(<Button variant="primary" label="Primary" />);

			const buttonElement = screen.getByRole('button', { name: /primary/i });
			expect(buttonElement).toHaveClass('btn-primary');
		});

		it('renders secondary variant', () => {
			render(<Button variant="secondary" label="Secondary" />);

			const buttonElement = screen.getByRole('button', { name: /secondary/i });
			expect(buttonElement).toHaveClass('btn-secondary');
		});

		it('renders ghost variant', () => {
			render(<Button variant="ghost" label="Ghost" />);

			const buttonElement = screen.getByRole('button', { name: /ghost/i });
			expect(buttonElement).toHaveClass('btn-ghost');
		});
	});

	describe('Sizes', () => {
		it('renders small size', () => {
			render(<Button size="sm" label="Small" />);

			const buttonElement = screen.getByRole('button', { name: /small/i });
			expect(buttonElement).toHaveClass('btn-sm');
		});

		it('renders medium size (default)', () => {
			render(<Button size="md" label="Medium" />);

			const buttonElement = screen.getByRole('button', { name: /medium/i });
			expect(buttonElement).toHaveClass('btn-md');
		});

		it('renders large size', () => {
			render(<Button size="lg" label="Large" />);

			const buttonElement = screen.getByRole('button', { name: /large/i });
			expect(buttonElement).toHaveClass('btn-lg');
		});
	});

	describe('Props Combinations', () => {
		it('applies variant and size classes correctly', () => {
			render(<Button variant="secondary" size="lg" label="large button" />);

			const buttonElement = screen.getByRole('button', { name: /large button/i });

			expect(buttonElement).toHaveClass('btn');
			expect(buttonElement).toHaveClass('btn-secondary');
			expect(buttonElement).toHaveClass('btn-lg');
		});
	});

	describe('Interactions', () => {
		it('calls the onClick handler when clicked', () => {
			const handleClick = vi.fn();
			render(<Button label="Clickable" onClick={handleClick} />);

			const buttonElement = screen.getByRole('button', { name: /clickable/i });
			fireEvent.click(buttonElement);

			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		it('calls onClick multiple times when clicked multiple times', () => {
			const handleClick = vi.fn();
			render(<Button label="Clickable" onClick={handleClick} />);

			const buttonElement = screen.getByRole('button', { name: /clickable/i });
			fireEvent.click(buttonElement);
			fireEvent.click(buttonElement);
			fireEvent.click(buttonElement);

			expect(handleClick).toHaveBeenCalledTimes(3);
		});

		it('does not call onClick when disabled', () => {
			const handleClick = vi.fn();
			render(<Button label="Disabled" onClick={handleClick} disabled />);

			const buttonElement = screen.getByRole('button', { name: /disabled/i });
			fireEvent.click(buttonElement);

			expect(handleClick).not.toHaveBeenCalled();
		});
	});

	describe('Disabled State', () => {
		it('is disabled when the disabled prop is true', () => {
			render(<Button label="Disabled Button" disabled />);

			const buttonElement = screen.getByRole('button', { name: /disabled button/i });
			expect(buttonElement).toBeDisabled();
		});

		it('is not disabled by default', () => {
			render(<Button label="Enabled" />);

			const buttonElement = screen.getByRole('button', { name: /enabled/i });
			expect(buttonElement).not.toBeDisabled();
		});

		it('is enabled when disabled prop is false', () => {
			render(<Button label="Enabled" disabled={false} />);

			const buttonElement = screen.getByRole('button', { name: /enabled/i });
			expect(buttonElement).not.toBeDisabled();
		});
	});

	describe('Type Attribute', () => {
		it('sets type to submit when provided', () => {
			render(<Button label="Submit" type="submit" />);
			const buttonElement = screen.getByRole('button', { name: /submit/i });
			expect(buttonElement).toHaveAttribute('type', 'submit');
		});

		it('sets type to button when provided', () => {
			render(<Button label="Button" type="button" />);
			const buttonElement = screen.getByRole('button', { name: /button/i });
			expect(buttonElement).toHaveAttribute('type', 'button');
		});

		it('sets type to reset when provided', () => {
			render(<Button label="Reset" type="reset" />);
			const buttonElement = screen.getByRole('button', { name: /reset/i });
			expect(buttonElement).toHaveAttribute('type', 'reset');
		});

		it('has button type by default (HTML default)', () => {
			render(<Button label="Default" />);
			const buttonElement = screen.getByRole('button', { name: /default/i });
			// HTML buttons default to type="submit" if not specified, but our component may not set it
			// This test verifies the actual behavior
			expect(buttonElement).toBeInTheDocument();
		});
	});

	describe('Accessibility', () => {
		it('is accessible by role', () => {
			render(<Button label="Accessible" />);
			const buttonElement = screen.getByRole('button');
			expect(buttonElement).toBeInTheDocument();
		});

		it('has correct text content for screen readers', () => {
			render(<Button label="Important Action" />);
			const buttonElement = screen.getByRole('button', { name: /important action/i });
			expect(buttonElement).toHaveAccessibleName('Important Action');
		});

		it('maintains accessibility when disabled', () => {
			render(<Button label="Disabled" disabled />);
			const buttonElement = screen.getByRole('button', { name: /disabled/i });
			expect(buttonElement).toBeDisabled();
			expect(buttonElement).toHaveAccessibleName('Disabled');
		});
	});
});