import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {vi} from 'vitest';
import {LoginForm} from './LoginForm';
import type LoginFormProps from './LoginFormProps';

describe('LoginForm Component', () => {
	const makeProps = (overrides: Partial<LoginFormProps> = {}): LoginFormProps => ({
		onLogin: vi.fn(),
		onError: vi.fn(),
		isLoading: false,
		cardTitle: 'Login',
		cardButtonLabel: 'Sign In',
		error: '', ...overrides,
	});

	describe('Rendering', () => {
		it('renders the login form card', () => {
			const props = makeProps();
			const {container} = render(<LoginForm {...props} />);

			const card = container.querySelector('.card');
			expect(card).toBeInTheDocument();
			expect(card).toHaveClass('card', 'card-bordered', 'bg-base-100', 'shadow-xl');
		});

		it('renders the card title', () => {
			const props = makeProps({cardTitle: 'Welcome Back'});
			render(<LoginForm {...props} />);

			const heading = screen.getByRole('heading', {level: 2, name: 'Welcome Back'});
			expect(heading).toBeInTheDocument();
			expect(heading).toHaveClass('card-title');
		});

		it('renders with different card titles', () => {
			const props = makeProps({cardTitle: 'User Login'});
			render(<LoginForm {...props} />);

			expect(screen.getByText('User Login')).toBeInTheDocument();
		});

		it('renders the card body', () => {
			const props = makeProps();
			const {container} = render(<LoginForm {...props} />);

			const cardBody = container.querySelector('.card-body');
			expect(cardBody).toBeInTheDocument();
		});

		it('renders the card actions section', () => {
			const props = makeProps();
			const {container} = render(<LoginForm {...props} />);

			const cardActions = container.querySelector('.card-actions');
			expect(cardActions).toBeInTheDocument();
			expect(cardActions).toHaveClass('justify-end');
		});
	});

	describe('Input Fields', () => {
		it('renders email input field', () => {
			const props = makeProps();
			render(<LoginForm {...props} />);

			const emailInput = screen.getByLabelText(/email/i);
			expect(emailInput).toBeInTheDocument();
			expect(emailInput).toHaveAttribute('type', 'email');
		});

		it('renders password input field', () => {
			const props = makeProps();
			render(<LoginForm {...props} />);

			const passwordInput = screen.getByLabelText(/password/i);
			expect(passwordInput).toBeInTheDocument();
			expect(passwordInput).toHaveAttribute('type', 'password');
		});

		it('email input has correct attributes', () => {
			const props = makeProps();
			render(<LoginForm {...props} />);

			const emailInput = screen.getByLabelText(/email/i);
			expect(emailInput).toHaveAttribute('type', 'email');
			expect(emailInput).not.toBeDisabled();
			expect(emailInput).not.toBeRequired();
		});

		it('password input has correct attributes', () => {
			const props = makeProps();
			render(<LoginForm {...props} />);

			const passwordInput = screen.getByLabelText(/password/i);
			expect(passwordInput).toHaveAttribute('type', 'password');
			expect(passwordInput).not.toBeDisabled();
			expect(passwordInput).not.toBeRequired();
		});

		it('both input fields start with empty values', () => {
			const props = makeProps();
			render(<LoginForm {...props} />);

			const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
			const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;

			expect(emailInput.value).toBe('');
			expect(passwordInput.value).toBe('');
		});

		it('renders inputs with Input component styling', () => {
			const props = makeProps();
			render(<LoginForm {...props} />);

			const emailInput = screen.getByLabelText(/email/i);
			const passwordInput = screen.getByLabelText(/password/i);

			expect(emailInput).toHaveClass('input', 'input-bordered', 'block');
			expect(passwordInput).toHaveClass('input', 'input-bordered', 'block');
		});
	});

	describe('Submit Button', () => {
		it('renders submit button with correct label', () => {
			const props = makeProps({cardButtonLabel: 'Login Now'});
			render(<LoginForm {...props} />);

			const button = screen.getByRole('button', {name: 'Login Now'});
			expect(button).toBeInTheDocument();
		});

		it('renders button with different labels', () => {
			const props = makeProps({cardButtonLabel: 'Sign In'});
			render(<LoginForm {...props} />);

			expect(screen.getByRole('button', {name: 'Sign In'})).toBeInTheDocument();
		});

		it('submit button has correct type attribute', () => {
			const props = makeProps();
			render(<LoginForm {...props} />);

			const button = screen.getByRole('button');
			expect(button).toHaveAttribute('type', 'submit');
		});

		it('submit button has correct styling classes', () => {
			const props = makeProps();
			render(<LoginForm {...props} />);

			const button = screen.getByRole('button');
			expect(button).toHaveClass('btn', 'btn-primary', 'btn-md');
		});

		it('submit button is not disabled by default', () => {
			const props = makeProps();
			render(<LoginForm {...props} />);

			const button = screen.getByRole('button');
			expect(button).not.toBeDisabled();
		});
	});

	describe('Error Handling', () => {
		it('displays error message when error prop is provided', () => {
			const props = makeProps({error: 'Invalid credentials'});
			render(<LoginForm {...props} />);

			const errorMessage = screen.getByText('Invalid credentials');
			expect(errorMessage).toBeInTheDocument();
			expect(errorMessage).toHaveClass('text-error', 'text-sm', 'mt-1');
		});

		it('does not display error message when error prop is empty', () => {
			const props = makeProps({error: ''});
			render(<LoginForm {...props} />);

			const errorContainer = screen.queryByText(/error/i);
			expect(errorContainer).not.toBeInTheDocument();
		});

		it('displays different error messages', () => {
			const props = makeProps({error: 'Network error occurred'});
			render(<LoginForm {...props} />);

			expect(screen.getByText('Network error occurred')).toBeInTheDocument();
		});

		it('updates error message dynamically', () => {
			const props = makeProps({error: 'First error'});
			const {rerender} = render(<LoginForm {...props} />);

			expect(screen.getByText('First error')).toBeInTheDocument();

			rerender(<LoginForm {...props} error="Second error"/>);
			expect(screen.getByText('Second error')).toBeInTheDocument();
			expect(screen.queryByText('First error')).not.toBeInTheDocument();
		});

		it('clears error message when error prop becomes empty', () => {
			const props = makeProps({error: 'Some error'});
			const {rerender} = render(<LoginForm {...props} />);

			expect(screen.getByText('Some error')).toBeInTheDocument();

			rerender(<LoginForm {...props} error=""/>);
			expect(screen.queryByText('Some error')).not.toBeInTheDocument();
		});

		it('error message has correct styling', () => {
			const props = makeProps({error: 'Test error'});
			render(<LoginForm {...props} />);

			const errorMessage = screen.getByText('Test error');
			expect(errorMessage.tagName.toLowerCase()).toBe('span');
			expect(errorMessage).toHaveClass('text-error', 'text-sm', 'mt-1');
		});
	});

	describe('Loading State', () => {
		it('accepts isLoading prop without throwing', () => {
			const props = makeProps({isLoading: true});

			expect(() => {
				render(<LoginForm {...props} />);
			}).not.toThrow();
		});

		it('renders normally when isLoading is true', () => {
			const props = makeProps({isLoading: true});
			render(<LoginForm {...props} />);

			expect(screen.getByRole('button')).toBeInTheDocument();
			expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
		});

		it('renders normally when isLoading is false', () => {
			const props = makeProps({isLoading: false});
			render(<LoginForm {...props} />);

			expect(screen.getByRole('button')).toBeInTheDocument();
		});
	});

	describe('Component Structure', () => {
		it('maintains correct DOM hierarchy', () => {
			const props = makeProps();
			const {container} = render(<LoginForm {...props} />);

			const card = container.querySelector('.card');
			const cardBody = card?.querySelector('.card-body');
			const cardTitle = cardBody?.querySelector('.card-title');
			const cardActions = cardBody?.querySelector('.card-actions');

			expect(card).toContainElement(cardBody as HTMLElement);
			expect(cardBody).toContainElement(cardTitle as HTMLElement);
			expect(cardBody).toContainElement(cardActions as HTMLElement);
		});

		it('renders inputs within card body', () => {
			const props = makeProps();
			const {container} = render(<LoginForm {...props} />);

			const cardBody = container.querySelector('.card-body');
			const emailInput = screen.getByLabelText(/email/i);
			const passwordInput = screen.getByLabelText(/password/i);

			expect(cardBody).toContainElement(emailInput);
			expect(cardBody).toContainElement(passwordInput);
		});

		it('renders button within card actions', () => {
			const props = makeProps();
			const {container} = render(<LoginForm {...props} />);

			const cardActions = container.querySelector('.card-actions');
			const button = screen.getByRole('button');

			expect(cardActions).toContainElement(button);
		});

		it('renders error message within card body', () => {
			const props = makeProps({error: 'Error message'});
			const {container} = render(<LoginForm {...props} />);

			const cardBody = container.querySelector('.card-body');
			const errorMessage = screen.getByText('Error message');

			expect(cardBody).toContainElement(errorMessage);
		});
	});

	describe('Props Integration', () => {
		it('accepts all required props without throwing', () => {
			const props = makeProps({
				onLogin: vi.fn(),
				onError: vi.fn(),
				isLoading: false,
				cardTitle: 'Test Login',
				cardButtonLabel: 'Submit',
				error: '',
			});

			expect(() => {
				render(<LoginForm {...props} />);
			}).not.toThrow();
		});

		it('renders with all props provided', () => {
			const props = makeProps({
				onLogin: vi.fn(),
				onError: vi.fn(),
				isLoading: true,
				cardTitle: 'Welcome',
				cardButtonLabel: 'Log In',
				error: 'Authentication failed',
			});

			render(<LoginForm {...props} />);

			expect(screen.getByText('Welcome')).toBeInTheDocument();
			expect(screen.getByRole('button', {name: 'Log In'})).toBeInTheDocument();
			expect(screen.getByText('Authentication failed')).toBeInTheDocument();
		});

		it('onLogin callback is provided but not called on render', () => {
			const onLogin = vi.fn();
			const props = makeProps({onLogin});
			render(<LoginForm {...props} />);

			expect(onLogin).not.toHaveBeenCalled();
		});

		it('onError callback is provided but not called on render', () => {
			const onError = vi.fn();
			const props = makeProps({onError});
			render(<LoginForm {...props} />);

			expect(onError).not.toHaveBeenCalled();
		});
	});

	describe('Accessibility', () => {
		it('email input is accessible by label', () => {
			const props = makeProps();
			render(<LoginForm {...props} />);

			const emailInput = screen.getByLabelText(/email/i);
			expect(emailInput).toHaveAccessibleName(/email/i);
		});

		it('password input is accessible by label', () => {
			const props = makeProps();
			render(<LoginForm {...props} />);

			const passwordInput = screen.getByLabelText(/password/i);
			expect(passwordInput).toHaveAccessibleName(/password/i);
		});

		it('submit button is accessible', () => {
			const props = makeProps({cardButtonLabel: 'Submit Form'});
			render(<LoginForm {...props} />);

			const button = screen.getByRole('button', {name: 'Submit Form'});
			expect(button).toHaveAccessibleName('Submit Form');
		});

		it('form heading is properly marked with heading role', () => {
			const props = makeProps({cardTitle: 'Login Form'});
			render(<LoginForm {...props} />);

			const heading = screen.getByRole('heading', {level: 2});
			expect(heading).toHaveTextContent('Login Form');
		});

		it('inputs are keyboard accessible', () => {
			const props = makeProps();
			render(<LoginForm {...props} />);

			const emailInput = screen.getByLabelText(/email/i);
			const passwordInput = screen.getByLabelText(/password/i);

			emailInput.focus();
			expect(document.activeElement).toBe(emailInput);

			passwordInput.focus();
			expect(document.activeElement).toBe(passwordInput);
		});

		it('button is keyboard accessible', () => {
			const props = makeProps();
			render(<LoginForm {...props} />);

			const button = screen.getByRole('button');
			button.focus();
			expect(document.activeElement).toBe(button);
		});
	});

	describe('Edge Cases', () => {
		it('handles empty cardTitle', () => {
			const props = makeProps({cardTitle: ''});
			render(<LoginForm {...props} />);

			const heading = screen.getByRole('heading', {level: 2});
			expect(heading).toHaveTextContent('');
		});

		it('handles empty cardButtonLabel', () => {
			const props = makeProps({cardButtonLabel: ''});
			render(<LoginForm {...props} />);

			const button = screen.getByRole('button');
			expect(button).toHaveTextContent('');
		});

		it('handles very long error messages', () => {
			const longError = 'This is a very long error message that should still display correctly without breaking the layout or causing any issues with the component rendering properly';
			const props = makeProps({error: longError});
			render(<LoginForm {...props} />);

			expect(screen.getByText(longError)).toBeInTheDocument();
		});

		it('handles special characters in title', () => {
			const props = makeProps({cardTitle: 'Login © 2024 ™'});
			render(<LoginForm {...props} />);

			expect(screen.getByText('Login © 2024 ™')).toBeInTheDocument();
		});

		it('handles special characters in error message', () => {
			const props = makeProps({error: 'Error: Invalid <email> & password!'});
			render(<LoginForm {...props} />);

			expect(screen.getByText('Error: Invalid <email> & password!')).toBeInTheDocument();
		});

		it('handles unicode characters in text', () => {
			const props = makeProps({cardTitle: '登录表单'});
			render(<LoginForm {...props} />);

			expect(screen.getByText('登录表单')).toBeInTheDocument();
		});
	});

	describe('Input Component Integration', () => {
		it('email Input component renders with correct props', () => {
			const props = makeProps();
			render(<LoginForm {...props} />);

			const emailInput = screen.getByLabelText(/email/i);
			expect(emailInput).toHaveAttribute('type', 'email');
			expect(emailInput).not.toBeDisabled();
			expect(emailInput).not.toBeRequired();
		});

		it('password Input component renders with correct props', () => {
			const props = makeProps();
			render(<LoginForm {...props} />);

			const passwordInput = screen.getByLabelText(/password/i);
			expect(passwordInput).toHaveAttribute('type', 'password');
			expect(passwordInput).not.toBeDisabled();
			expect(passwordInput).not.toBeRequired();
		});
	});

	describe('Button Component Integration', () => {
		it('Button component renders with correct variant', () => {
			const props = makeProps();
			render(<LoginForm {...props} />);

			const button = screen.getByRole('button');
			expect(button).toHaveClass('btn-primary');
		});

		it('Button component renders with correct type', () => {
			const props = makeProps();
			render(<LoginForm {...props} />);

			const button = screen.getByRole('button');
			expect(button).toHaveAttribute('type', 'submit');
		});
	});

	describe('Styling', () => {
		it('card has correct styling classes', () => {
			const props = makeProps();
			const {container} = render(<LoginForm {...props} />);

			const card = container.querySelector('.card');
			expect(card).toHaveClass('card', 'card-bordered', 'bg-base-100', 'shadow-xl');
		});

		it('card actions are aligned to the end', () => {
			const props = makeProps();
			const {container} = render(<LoginForm {...props} />);

			const cardActions = container.querySelector('.card-actions');
			expect(cardActions).toHaveClass('justify-end');
		});

		it('error message has correct styling', () => {
			const props = makeProps({error: 'Styled error'});
			render(<LoginForm {...props} />);

			const errorMessage = screen.getByText('Styled error');
			expect(errorMessage).toHaveClass('text-error', 'text-sm', 'mt-1');
		});
	});
});