import {render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import {vi} from 'vitest';
import {Button} from "../../../components/ui/Button/Button.tsx";

describe('Button component', () => {
	it('should render correctly with label', () => {
		// Arrange
		render(<Button>Click me</Button>);

		// Act
		const buttonElement = screen.getByRole('button', {name: /click me/i});

		// Assert
		expect(buttonElement).toBeInTheDocument();
	});

	it('should apply default classes when no props are provided', () => {
		// Arrange
		render(<Button>Default</Button>);

		// Act
		const buttonElement = screen.getByRole('button', {name: /default/i});

		// Assert
		expect(buttonElement).toHaveClass('btn', 'btn-primary', 'btn-md');
	});

	it('should apply variant and size classes correctly', () => {
		// Arrange
		render(<Button variant="secondary" size="lg">Styled Button</Button>);

		// Act
		const buttonElement = screen.getByRole('button', {name: /styled button/i});

		// Assert
		expect(buttonElement).toHaveClass('btn-secondary', 'btn-lg');
		expect(buttonElement).not.toHaveClass('btn-primary');
	});

	it('should call onClick handler when clicked', async () => {
		// Arrange
		const user = userEvent.setup();
		const handleClick = vi.fn();
		render(<Button onClick={handleClick}>Clickable</Button>);
		const buttonElement = screen.getByRole('button', {name: /clickable/i});

		// Act
		await user.click(buttonElement);

		// Assert
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('should be disabled and not clickable when disabled prop is true', async () => {
		// Arrange
		const user = userEvent.setup();
		const handleClick = vi.fn();
		render(<Button onClick={handleClick} disabled>Disabled</Button>);
		const buttonElement = screen.getByRole('button', {name: /disabled/i});

		// Act
		await user.click(buttonElement);

		// Assert
		expect(buttonElement).toBeDisabled();
		expect(handleClick).not.toHaveBeenCalled();
	});
});