import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './Button';

describe('Button Component', () => {
    it('should render the button with default props', () => {
        render(<Button label="Click Me" />);

        const buttonElement = screen.getByRole('button', { name: /click me/i });

        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass('btn', 'btn-primary', 'btn-md');
        expect(buttonElement).not.toBeDisabled();
        expect(buttonElement).toHaveAttribute('type', 'button');
    });


    it('should render label correctly', () => {
        render(<Button label="Submit" />);

        const buttonElement = screen.getByRole('button');
        const childElement = screen.getByText(/submit/i);

        expect(buttonElement).toContainElement(childElement);
    });

    it('should apply variant and size classes correctly', () => {
        render(
            <Button label="Large Button" variant="secondary" size="lg">
            </Button>
        );

        const buttonElement = screen.getByRole('button');

        expect(buttonElement).toHaveClass('btn-secondary');
        expect(buttonElement).toHaveClass('btn-lg');
    });

    it('should call the onClick handler when clicked', () => {
        const handleClick = vi.fn();
        render(<Button label="Clickable" onClick={handleClick} />);

        const buttonElement = screen.getByRole('button', { name: /clickable/i });
        fireEvent.click(buttonElement);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should be disabled when the disabled prop is true', () => {
        render(<Button label="Disabled Button" disabled />);

        const buttonElement = screen.getByRole('button', { name: /disabled button/i });

        expect(buttonElement).toBeDisabled();
    });

    it('should not call onClick handler when disabled', () => {
        const handleClick = vi.fn();
        render(<Button label="Disabled" onClick={handleClick} disabled />);

        const buttonElement = screen.getByRole('button', { name: /disabled/i });
        fireEvent.click(buttonElement);

        expect(handleClick).not.toHaveBeenCalled();
    });

    it('should have the correct type attribute', () => {
        render(<Button label="Submit" type="submit" />);
        const buttonElement = screen.getByRole('button', { name: /submit/i });
        expect(buttonElement).toHaveAttribute('type', 'submit');
    });
});