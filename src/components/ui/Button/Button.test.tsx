import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './Button';

describe('Button Component', () => {
    it('should render the button with default props', () => {
        render(<Button>Click Me</Button>);

        const buttonElement = screen.getByRole('button', { name: /click me/i });

        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass('btn', 'btn-primary', 'btn-md');
        expect(buttonElement).not.toBeDisabled();
        expect(buttonElement).toHaveAttribute('type', 'button');
    });

    it('should render label correctly', () => {
        render(
            <Button>
                <span>Submit</span>
            </Button>
        );

        const buttonElement = screen.getByRole('button');
        const childElement = screen.getByText('Submit');

        expect(buttonElement).toContainElement(childElement);
    });

    it('should apply variant and size classes correctly', () => {
        render(
            <Button variant="secondary" size="lg">
                Large Button
            </Button>
        );

        const buttonElement = screen.getByRole('button', { name: /large button/i });

        expect(buttonElement).toHaveClass('btn-secondary');
        expect(buttonElement).toHaveClass('btn-lg');
    });

    it('should call the onClick handler when clicked', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Clickable</Button>);

        const buttonElement = screen.getByRole('button', { name: /clickable/i });
        fireEvent.click(buttonElement);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should be disabled when the disabled prop is true', () => {
        render(<Button disabled>Disabled Button</Button>);

        const buttonElement = screen.getByRole('button', { name: /disabled button/i });

        expect(buttonElement).toBeDisabled();
    });

    it('should not call onClick handler when disabled', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick} disabled>
            Disabled
        </Button>);

        const buttonElement = screen.getByRole('button', { name: /disabled/i });
        fireEvent.click(buttonElement);

        expect(handleClick).not.toHaveBeenCalled();
    });

    it('should have the correct type attribute', () => {
        render(<Button type="submit">Submit</Button>);
        const buttonElement = screen.getByRole('button', { name: /submit/i });
        expect(buttonElement).toHaveAttribute('type', 'submit');
    });
});