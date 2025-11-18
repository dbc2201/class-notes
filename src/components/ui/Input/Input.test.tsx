import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { Input } from './Input';
import type { InputProps } from './InputProps';

describe('Input Component', () => {
	const makeProps = (overrides: Partial<InputProps> = {}): InputProps => ({
		label: 'Full Name',
		type: 'text',
		value: '',
		onChange: vi.fn(),
		placeholder: 'John Doe',
		disabled: false,
		required: true ,
		...overrides,
	});

	describe('Rendering', () => {
		it('renders label and associates it with the input via id/htmlFor', () => {
			const props = makeProps();
			render(<Input {...props} />);

			const input = screen.getByLabelText(props.label);
			expect(input).toBeInTheDocument();
			expect(input).toHaveClass('input', 'input-bordered', 'block');
		});

		it('renders label with correct text', () => {
			const props = makeProps({ label: 'Email Address' });
			render(<Input {...props} />);

			const label = screen.getByText('Email Address');
			expect(label).toBeInTheDocument();
			expect(label).toHaveClass('label-text');
		});

		it('renders with initial value', () => {
			const props = makeProps({ value: 'Initial Value' });
			render(<Input {...props} />);

			const input = screen.getByLabelText(props.label) as HTMLInputElement;
			expect(input).toHaveValue('Initial Value');
		});

		it('does not render error message when error prop is not provided', () => {
			const props = makeProps();
			render(<Input {...props} />);

			const errorEl = screen.queryByText(/error/i);
			expect(errorEl).not.toBeInTheDocument();
		});

		it('renders with unique id for each instance', () => {
			const props1 = makeProps({ label: 'First Name' });
			const props2 = makeProps({ label: 'Last Name' });

			const { container: container1 } = render(<Input {...props1} />);
			const { container: container2 } = render(<Input {...props2} />);

			const input1 = container1.querySelector('input');
			const input2 = container2.querySelector('input');

			expect(input1?.id).toBeDefined();
			expect(input2?.id).toBeDefined();
			expect(input1?.id).not.toBe(input2?.id);
		});
	});

	describe('Input Types', () => {
		it('renders text input type', () => {
			const props = makeProps({ type: 'text' });
			render(<Input {...props} />);

			const input = screen.getByLabelText(props.label);
			expect(input).toHaveAttribute('type', 'text');
		});

		it('renders email input type', () => {
			const props = makeProps({ type: 'email', label: 'Email' });
			render(<Input {...props} />);

			const input = screen.getByLabelText('Email');
			expect(input).toHaveAttribute('type', 'email');
		});

		it('renders password input type', () => {
			const props = makeProps({ type: 'password', label: 'Password' });
			render(<Input {...props} />);

			const input = screen.getByLabelText('Password');
			expect(input).toHaveAttribute('type', 'password');
		});

		it('renders number input type', () => {
			const props = makeProps({ type: 'number', label: 'Age' });
			render(<Input {...props} />);

			const input = screen.getByLabelText('Age');
			expect(input).toHaveAttribute('type', 'number');
		});

		it('supports number inputs with numeric values', () => {
			const props = makeProps({ type: 'number', value: 42, label: 'Age', placeholder: '0' });
			render(<Input {...props} />);

			const input = screen.getByLabelText('Age') as HTMLInputElement;
			expect(input).toHaveAttribute('type', 'number');
			expect(input).toHaveValue(42);
		});

		it('supports number inputs with string representation of numbers', () => {
			const props = makeProps({ type: 'number', value: '25', label: 'Age' });
			render(<Input {...props} />);

			const input = screen.getByLabelText('Age') as HTMLInputElement;
			expect(input).toHaveValue(25);
		});
	});

	describe('Attributes', () => {
		it('applies placeholder attribute', () => {
			const props = makeProps({ placeholder: 'Enter your name' });
			render(<Input {...props} />);

			const input = screen.getByLabelText(props.label);
			expect(input).toHaveAttribute('placeholder', 'Enter your name');
		});

		it('applies all basic attributes together', () => {
			const props = makeProps({
				type: 'email',
				placeholder: 'you@example.com',
				required: true,
			});
			render(<Input {...props} />);

			const input = screen.getByLabelText(props.label);
			expect(input).toHaveAttribute('type', 'email');
			expect(input).toHaveAttribute('placeholder', 'you@example.com');
			expect(input).toBeRequired();
			expect(input).not.toBeDisabled();
		});

		it('is required when required prop is true', () => {
			const props = makeProps({ required: true });
			render(<Input {...props} />);

			const input = screen.getByLabelText(props.label);
			expect(input).toBeRequired();
		});

		it('is not required when required prop is false', () => {
			const props = makeProps({ required: false });
			render(<Input {...props} />);

			const input = screen.getByLabelText(props.label);
			expect(input).not.toBeRequired();
		});
	});

	describe('Interactions', () => {
		it('calls onChange with the new value when user types', () => {
			const onChange = vi.fn();
			const props = makeProps({ onChange, value: '' });
			const { rerender } = render(<Input {...props} />);

			const input = screen.getByLabelText(props.label);
			fireEvent.change(input, { target: { value: 'Alice' } });

			expect(onChange).toHaveBeenCalledTimes(1);
			const eventArg = onChange.mock.calls[0][0];
			expect(eventArg).toBeDefined();
			expect(eventArg.target.value).toBe('Alice'); // Assert on the event data

			// Then, simulate the parent component updating the state and re-rendering
			rerender(<Input {...props} value="Alice" />);
			expect((input as HTMLInputElement).value).toBe('Alice'); // Assert the DOM is updated
		});

		it('calls onChange multiple times for multiple inputs', () => {
			const onChange = vi.fn();
			const { rerender } = render(<Input {...makeProps({ onChange, value: '' })} />);

			const input = screen.getByLabelText('Full Name');
			fireEvent.change(input, { target: { value: 'A' } });
			rerender(<Input {...makeProps({ onChange, value: 'A' })} />);
			fireEvent.change(input, { target: { value: 'Al' } });
			rerender(<Input {...makeProps({ onChange, value: 'Al' })} />);
			fireEvent.change(input, { target: { value: 'Alice' } });
			rerender(<Input {...makeProps({ onChange, value: 'Alice' })} />);

			expect(onChange).toHaveBeenCalledTimes(3);
		});

		it('handles typing in email input', () => {
			const onChange = vi.fn();
			const props = makeProps({ type: 'email', onChange, label: 'Email', value: '' });
			const { rerender } = render(<Input {...props} />);

			const input = screen.getByLabelText('Email');
			fireEvent.change(input, { target: { value: 'test@example.com' } });

			expect(onChange).toHaveBeenCalledTimes(1);
			rerender(<Input {...props} value="test@example.com" />);
			expect((input as HTMLInputElement).value).toBe('test@example.com');
		});

		it('handles typing in password input', () => {
			const onChange = vi.fn();
			const props = makeProps({ type: 'password', onChange, label: 'Password', value: '' });
			const { rerender } = render(<Input {...props} />);

			const input = screen.getByLabelText('Password');
			fireEvent.change(input, { target: { value: 'secret123' } });

			expect(onChange).toHaveBeenCalledTimes(1);
			rerender(<Input {...props} value="secret123" />);
			expect((input as HTMLInputElement).value).toBe('secret123');
		});

		it('handles typing in number input', () => {
			const onChange = vi.fn();
			const props = makeProps({ type: 'number', onChange, label: 'Age', value: '' });
			const { rerender } = render(<Input {...props} />);

			const input = screen.getByLabelText('Age');
			fireEvent.change(input, { target: { value: '25' } });

			expect(onChange).toHaveBeenCalledTimes(1);
			rerender(<Input {...props} value="25" />);
			expect((input as HTMLInputElement).value).toBe('25');
		});

		it('supports focus and blur events', () => {
			const props = makeProps();
			render(<Input {...props} />);

			const input = screen.getByLabelText(props.label);
			input.focus();
			expect(document.activeElement).toBe(input);

			input.blur();
			expect(document.activeElement).not.toBe(input);
		});
	});

	describe('Disabled State', () => {
		it('is disabled when disabled prop is true', () => {
			const props = makeProps({ disabled: true });
			render(<Input {...props} />);

			const input = screen.getByLabelText(props.label);
			expect(input).toBeDisabled();
		});

		it('is not disabled when disabled prop is false', () => {
			const props = makeProps({ disabled: false });
			render(<Input {...props} />);

			const input = screen.getByLabelText(props.label);
			expect(input).not.toBeDisabled();
		});

		it('does not call onChange when disabled', () => {
			const onChange = vi.fn();
			const props = makeProps({ disabled: true, onChange });
			render(<Input {...props} />);

			const input = screen.getByLabelText(props.label);
			fireEvent.change(input, { target: { value: 'Bob' } });

			expect(onChange).not.toHaveBeenCalled();
		});

		it('cannot be focused when disabled', () => {
			const props = makeProps({ disabled: true });
			render(<Input {...props} />);

			const input = screen.getByLabelText(props.label);
			input.focus();
			expect(document.activeElement).not.toBe(input);
		});
	});

	describe('Error Handling', () => {
		it('shows error message when error prop is provided', () => {
			const props = makeProps({ error: 'This field is required' });
			render(<Input {...props} />);

			const errorEl = screen.getByText('This field is required');
			expect(errorEl).toBeInTheDocument();
			expect(errorEl).toHaveClass('text-error', 'text-sm');
		});

		it('shows custom error messages', () => {
			const props = makeProps({ error: 'Email format is invalid' });
			render(<Input {...props} />);

			const errorEl = screen.getByText('Email format is invalid');
			expect(errorEl).toBeInTheDocument();
		});

		it('does not show error message when error prop is undefined', () => {
			const props = makeProps({ error: undefined });
			render(<Input {...props} />);

			const errorContainer = screen.queryByText(/error/i);
			expect(errorContainer).not.toBeInTheDocument();
		});

		it('does not show error message when error prop is empty string', () => {
			const props = makeProps({ error: '' });
			render(<Input {...props} />);

			const container = screen.getByLabelText(props.label).parentElement;
			const errorSpan = container?.querySelector('.text-error');
			expect(errorSpan).not.toBeInTheDocument();
		});

		it('updates error message dynamically', () => {
			const props = makeProps({ error: 'Initial error' });
			const { rerender } = render(<Input {...props} />);

			expect(screen.getByText('Initial error')).toBeInTheDocument();

			rerender(<Input {...props} error="Updated error" />);
			expect(screen.getByText('Updated error')).toBeInTheDocument();
			expect(screen.queryByText('Initial error')).not.toBeInTheDocument();
		});
	});

	describe('Accessibility', () => {
		it('associates label with input using htmlFor and id', () => {
			const props = makeProps();
			const { container } = render(<Input {...props} />);

			const label = container.querySelector('label');
			const input = container.querySelector('input');

			expect(label?.getAttribute('for')).toBe(input?.getAttribute('id'));
		});

		it('is accessible by label text', () => {
			const props = makeProps({ label: 'Username' });
			render(<Input {...props} />);

			const input = screen.getByLabelText('Username');
			expect(input).toBeInTheDocument();
		});

		it('provides accessible name via label', () => {
			const props = makeProps({ label: 'Email Address' });
			render(<Input {...props} />);

			const input = screen.getByLabelText('Email Address');
			expect(input).toHaveAccessibleName('Email Address');
		});

		it('indicates required state for screen readers', () => {
			const props = makeProps({ required: true });
			render(<Input {...props} />);

			const input = screen.getByLabelText(props.label);
			expect(input).toBeRequired();
		});

		it('indicates disabled state for screen readers', () => {
			const props = makeProps({ disabled: true });
			render(<Input {...props} />);

			const input = screen.getByLabelText(props.label);
			expect(input).toBeDisabled();
		});
	});

	describe('Edge Cases', () => {
		it('handles empty string value', () => {
			const props = makeProps({ value: '' });
			render(<Input {...props} />);

			const input = screen.getByLabelText(props.label) as HTMLInputElement;
			expect(input).toHaveValue('');
		});

		it('handles zero as numeric value', () => {
			const props = makeProps({ type: 'number', value: 0, label: 'Count' });
			render(<Input {...props} />);

			const input = screen.getByLabelText('Count') as HTMLInputElement;
			expect(input).toHaveValue(0);
		});

		it('handles very long text values', () => {
			const longText = 'a'.repeat(1000);
			const props = makeProps({ value: longText });
			render(<Input {...props} />);

			const input = screen.getByLabelText(props.label) as HTMLInputElement;
			expect(input).toHaveValue(longText);
		});

		it('handles special characters in value', () => {
			const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
			const props = makeProps({ value: specialChars });
			render(<Input {...props} />);

			const input = screen.getByLabelText(props.label) as HTMLInputElement;
			expect(input).toHaveValue(specialChars);
		});
	});
});
