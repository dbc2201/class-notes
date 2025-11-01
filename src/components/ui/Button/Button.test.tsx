import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button label="click me" />);

    const buttonElement = screen.getByRole('button', { name: /click me/i });

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('btn', 'btn-primary', 'btn-md');
    expect(buttonElement).not.toBeDisabled();
    // No default `type` is set in the component; it should not have the attribute unless provided
    expect(buttonElement).not.toHaveAttribute('type');
  });

  it('renders the provided label', () => {
    render(<Button label="Submit" />);

    const buttonElement = screen.getByRole('button', { name: 'Submit' });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Submit');
  });

  it('applies variant and size classes correctly', () => {
    render(<Button variant="secondary" size="lg" label="large button" />);

    const buttonElement = screen.getByRole('button', { name: /large button/i });

    expect(buttonElement).toHaveClass('btn');
    expect(buttonElement).toHaveClass('btn-secondary');
    expect(buttonElement).toHaveClass('btn-lg');
  });

  it('calls the onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button label="Clickable" onClick={handleClick} />);

    const buttonElement = screen.getByRole('button', { name: /clickable/i });
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when the disabled prop is true', () => {
    render(<Button label="Disabled Button" disabled />);

    const buttonElement = screen.getByRole('button', { name: /disabled button/i });
    expect(buttonElement).toBeDisabled();
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Button label="Disabled" onClick={handleClick} disabled />);

    const buttonElement = screen.getByRole('button', { name: /disabled/i });
    fireEvent.click(buttonElement);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('sets the type attribute when provided', () => {
    render(<Button label="Submit" type="submit" />);
    const buttonElement = screen.getByRole('button', { name: /submit/i });
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });
});