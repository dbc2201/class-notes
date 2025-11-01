import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {vi} from 'vitest';
import {Input} from './Input';

describe('Input Component', () => {
	const makeProps = (overrides: Partial<Parameters<typeof Input>[0]> = {}) => ({
		label: 'Full Name',
		type: 'text' as const,
		value: '',
		onChange: vi.fn(),
		placeholder: 'John Doe',
		disabled: false,
		required: true, ...overrides,
	});

	it('renders label and associates it with the input via id/htmlFor', () => {
		const props = makeProps();
		render(<Input {...props} />);

		const input = screen.getByLabelText(props.label);
		expect(input).toBeInTheDocument();
		expect(input).toHaveClass('input', 'input-bordered', 'block');
	});

	it('applies basic attributes: type, placeholder, required', () => {
		const props = makeProps({type: 'email', placeholder: 'you@example.com', required: true});
		render(<Input {...props} />);

		const input = screen.getByLabelText(props.label);
		expect(input).toHaveAttribute('type', 'email');
		expect(input).toHaveAttribute('placeholder', 'you@example.com');
		expect(input).toBeRequired();
		expect(input).not.toBeDisabled();
	});

	it('calls onChange with the new value when user types', () => {
		const onChange = vi.fn();
		const props = makeProps({onChange});
		render(<Input {...props} />);

		const input = screen.getByLabelText(props.label);
		fireEvent.change(input, {target: {value: 'Alice'}});

		expect(onChange).toHaveBeenCalledTimes(1);
		const eventArg = onChange.mock.calls[0][0];
		expect(eventArg).toBeDefined();
		expect((eventArg.target as HTMLInputElement).value).toBe('Alice');
	});

	it('shows error message when error prop is provided', () => {
		const props = makeProps({error: 'This field is required'});
		render(<Input {...props} />);

		const errorEl = screen.getByText('This field is required');
		expect(errorEl).toBeInTheDocument();
		expect(errorEl).toHaveClass('text-error', 'text-sm');
	});

	it('supports number inputs and values', () => {
		const props = makeProps({type: 'number', value: 42, label: 'Age', placeholder: '0'});
		render(<Input {...props} />);

		const input = screen.getByLabelText('Age') as HTMLInputElement;
		expect(input).toHaveAttribute('type', 'number');
		// jest-dom understands number values for type="number"
		expect(input).toHaveValue(42);
	});

	it('is disabled when disabled prop is true and does not call onChange', () => {
		const onChange = vi.fn();
		const props = makeProps({disabled: true, onChange});
		render(<Input {...props} />);

		const input = screen.getByLabelText(props.label);
		expect(input).toBeDisabled();

		fireEvent.change(input, {target: {value: 'Bob'}});
		expect(onChange).not.toHaveBeenCalled();
	});

	it('is not required when required is false', () => {
		const props = makeProps({required: false});
		render(<Input {...props} />);

		const input = screen.getByLabelText(props.label);
		expect(input).not.toBeRequired();
	});
});
