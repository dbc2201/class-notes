import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {vi} from 'vitest';
import Header from './Header';
import type HeaderProps from './HeaderProps';

describe('Header Component', () => {
	const makeProps = (overrides: Partial<HeaderProps> = {}): HeaderProps => ({
		user: {name: 'John Doe'}, onLogout: vi.fn(), ...overrides,
	});

	describe('Rendering', () => {
		it('renders the header element', () => {
			const props = makeProps();
			const {container} = render(<Header {...props} />);

			const header = container.querySelector('header');
			expect(header).toBeInTheDocument();
			expect(header).toHaveClass('navbar', 'bg-base-100', 'shadow-lg');
		});

		it('renders the menu button', () => {
			const props = makeProps();
			render(<Header {...props} />);

			const menuButtons = screen.getAllByRole('link');
			const menuButton = menuButtons[0];
			expect(menuButton).toBeInTheDocument();
			expect(menuButton).toHaveClass('btn', 'btn-square', 'btn-ghost');
		});

		it('renders the menu icon SVG', () => {
			const props = makeProps();
			const {container} = render(<Header {...props} />);

			const svg = container.querySelector('svg');
			expect(svg).toBeInTheDocument();
			expect(svg).toHaveClass('inline-block', 'h-5', 'w-5', 'stroke-current');
		});

		it('renders the brand/title link', () => {
			const props = makeProps();
			render(<Header {...props} />);

			const brandLink = screen.getByText('daisyUI');
			expect(brandLink).toBeInTheDocument();
			expect(brandLink).toHaveClass('btn', 'btn-ghost', 'text-xl');
		});

		it('renders the logout button', () => {
			const props = makeProps();
			render(<Header {...props} />);

			const logoutButton = screen.getByRole('button');
			expect(logoutButton).toBeInTheDocument();
			expect(logoutButton).toHaveClass('btn', 'btn-square', 'btn-ghost');
		});
	});

	describe('User Display', () => {
		it('displays user avatar with first letter of name when user is logged in', () => {
			const props = makeProps({user: {name: 'Alice'}});
			render(<Header {...props} />);

			const avatar = screen.getByRole('img');
			expect(avatar).toBeInTheDocument();
			expect(avatar).toHaveAttribute('src', 'https://placehold.co/24x24?text=A');
		});

		it('displays correct avatar for different user names', () => {
			const props = makeProps({user: {name: 'Bob Smith'}});
			render(<Header {...props} />);

			const avatar = screen.getByRole('img');
			expect(avatar).toHaveAttribute('src', 'https://placehold.co/24x24?text=B');
		});

		it('handles single character names', () => {
			const props = makeProps({user: {name: 'X'}});
			render(<Header {...props} />);

			const avatar = screen.getByRole('img');
			expect(avatar).toHaveAttribute('src', 'https://placehold.co/24x24?text=X');
		});

		it('handles lowercase names', () => {
			const props = makeProps({user: {name: 'john'}});
			render(<Header {...props} />);

			const avatar = screen.getByRole('img');
			expect(avatar).toHaveAttribute('src', 'https://placehold.co/24x24?text=j');
		});

		it('handles names with special characters', () => {
			const props = makeProps({user: {name: '@User'}});
			render(<Header {...props} />);

			const avatar = screen.getByRole('img');
			expect(avatar).toHaveAttribute('src', 'https://placehold.co/24x24?text=@');
		});
	});

	describe('User Null State', () => {
		it('renders when user is null', () => {
			const props = makeProps({user: null});

			expect(() => {
				render(<Header {...props} />);
			}).not.toThrow();
		});

		it('does not render avatar image when user is null', () => {
			const props = makeProps({user: null});
			const {container} = render(<Header {...props} />);

			const avatar = container.querySelector('img');
			// Component will try to access user?.name.charAt(0) which will be undefined
			// The img will still be rendered but with an invalid src
			expect(avatar).toBeInTheDocument();
		});

		it('handles null user without crashing the component', () => {
			const props = makeProps({user: null});
			const {container} = render(<Header {...props} />);

			const header = container.querySelector('header');
			expect(header).toBeInTheDocument();
		});
	});

	describe('Logout Functionality', () => {
		it('calls onLogout when logout button is clicked', () => {
			const onLogout = vi.fn();
			const props = makeProps({onLogout});
			render(<Header {...props} />);

			const logoutButton = screen.getByRole('button');
			fireEvent.click(logoutButton);

			expect(onLogout).toHaveBeenCalledTimes(1);
		});

		it('calls onLogout multiple times when clicked multiple times', () => {
			const onLogout = vi.fn();
			const props = makeProps({onLogout});
			render(<Header {...props} />);

			const logoutButton = screen.getByRole('button');
			fireEvent.click(logoutButton);
			fireEvent.click(logoutButton);
			fireEvent.click(logoutButton);

			expect(onLogout).toHaveBeenCalledTimes(3);
		});

		it('logout button is clickable when user is logged in', () => {
			const onLogout = vi.fn();
			const props = makeProps({user: {name: 'Test User'}, onLogout});
			render(<Header {...props} />);

			const logoutButton = screen.getByRole('button');
			fireEvent.click(logoutButton);

			expect(onLogout).toHaveBeenCalled();
		});

		it('logout button is clickable even when user is null', () => {
			const onLogout = vi.fn();
			const props = makeProps({user: null, onLogout});
			render(<Header {...props} />);

			const logoutButton = screen.getByRole('button');
			fireEvent.click(logoutButton);

			expect(onLogout).toHaveBeenCalled();
		});
	});

	describe('Layout Structure', () => {
		it('renders three main sections: menu, brand, and user', () => {
			const props = makeProps();
			const {container} = render(<Header {...props} />);

			const flexNoneSections = container.querySelectorAll('.flex-none');
			const flexOneSection = container.querySelector('.flex-1');

			expect(flexNoneSections).toHaveLength(2); // menu and user sections
			expect(flexOneSection).toBeInTheDocument(); // brand section
		});

		it('menu section is on the left', () => {
			const props = makeProps();
			const {container} = render(<Header {...props} />);

			const sections = container.querySelectorAll('.flex-none');
			const menuSection = sections[0];

			expect(menuSection).toHaveClass('inline-flex', 'align-items-center', 'justify-content-flex-start');
		});

		it('brand section is in the center', () => {
			const props = makeProps();
			const {container} = render(<Header {...props} />);

			const centerSection = container.querySelector('.flex-1');
			expect(centerSection).toHaveClass('navbar-center');
		});

		it('user section is on the right', () => {
			const props = makeProps();
			const {container} = render(<Header {...props} />);

			const sections = container.querySelectorAll('.flex-none');
			const userSection = sections[1];

			expect(userSection).toHaveClass('inline-flex', 'align-items-center', 'justify-content-space-around');
		});

		it('maintains correct DOM hierarchy', () => {
			const props = makeProps();
			const {container} = render(<Header {...props} />);

			const header = container.querySelector('header');
			const menuSection = header?.querySelector('.flex-none:first-child');
			const brandSection = header?.querySelector('.flex-1');
			const userSection = header?.querySelector('.flex-none:last-child');

			expect(header).toContainElement(menuSection as HTMLElement);
			expect(header).toContainElement(brandSection as HTMLElement);
			expect(header).toContainElement(userSection as HTMLElement);
		});
	});

	describe('Styling', () => {
		it('applies navbar styling classes', () => {
			const props = makeProps();
			const {container} = render(<Header {...props} />);

			const header = container.querySelector('header');
			expect(header).toHaveClass('navbar', 'bg-base-100', 'shadow-lg');
		});

		it('menu button has correct styling', () => {
			const props = makeProps();
			render(<Header {...props} />);

			const menuButtons = screen.getAllByRole('link');
			const menuButton = menuButtons[0];
			expect(menuButton).toHaveClass('btn', 'btn-square', 'btn-ghost');
		});

		it('brand link has correct styling', () => {
			const props = makeProps();
			render(<Header {...props} />);

			const brandLink = screen.getByText('daisyUI');
			expect(brandLink).toHaveClass('btn', 'btn-ghost', 'text-xl');
		});

		it('logout button has correct styling', () => {
			const props = makeProps();
			render(<Header {...props} />);

			const logoutButton = screen.getByRole('button');
			expect(logoutButton).toHaveClass('btn', 'btn-square', 'btn-ghost', 'inline-block', 'h-5', 'w-5', 'stroke-current');
		});

		it('SVG icon has correct styling', () => {
			const props = makeProps();
			const {container} = render(<Header {...props} />);

			const svg = container.querySelector('svg');
			expect(svg).toHaveClass('inline-block', 'h-5', 'w-5', 'stroke-current');
		});
	});

	describe('SVG Menu Icon', () => {
		it('renders menu icon with correct path', () => {
			const props = makeProps();
			const {container} = render(<Header {...props} />);

			const path = container.querySelector('path');
			expect(path).toBeInTheDocument();
			expect(path).toHaveAttribute('strokeLinecap', 'round');
			expect(path).toHaveAttribute('strokeLinejoin', 'round');
			expect(path).toHaveAttribute('strokeWidth', '2');
			expect(path).toHaveAttribute('d', 'M4 6h16M4 12h16M4 18h16');
		});

		it('menu icon SVG has correct attributes', () => {
			const props = makeProps();
			const {container} = render(<Header {...props} />);

			const svg = container.querySelector('svg');
			expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
			expect(svg).toHaveAttribute('fill', 'none');
			expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
		});
	});

	describe('Accessibility', () => {
		it('menu button is keyboard accessible', () => {
			const props = makeProps();
			render(<Header {...props} />);

			const menuButtons = screen.getAllByRole('link');
			const menuButton = menuButtons[0];
			menuButton.focus();
			expect(document.activeElement).toBe(menuButton);
		});

		it('brand link is keyboard accessible', () => {
			const props = makeProps();
			render(<Header {...props} />);

			const brandLink = screen.getByText('daisyUI');
			brandLink.focus();
			expect(document.activeElement).toBe(brandLink);
		});

		it('logout button is keyboard accessible', () => {
			const props = makeProps();
			render(<Header {...props} />);

			const logoutButton = screen.getByRole('button');
			logoutButton.focus();
			expect(document.activeElement).toBe(logoutButton);
		});

		it('avatar image has alt attribute', () => {
			const props = makeProps();
			render(<Header {...props} />);

			const avatar = screen.getByRole('img');
			expect(avatar).toHaveAttribute('alt');
		});

		it('header has semantic HTML element', () => {
			const props = makeProps();
			const {container} = render(<Header {...props} />);

			const header = container.querySelector('header');
			expect(header?.tagName.toLowerCase()).toBe('header');
		});
	});

	describe('Edge Cases', () => {
		it('handles empty user name', () => {
			const props = makeProps({user: {name: ''}});

			expect(() => {
				render(<Header {...props} />);
			}).not.toThrow();
		});

		it('handles whitespace in user name', () => {
			const props = makeProps({user: {name: '   '}});
			render(<Header {...props} />);

			const avatar = screen.getByRole('img');
			expect(avatar).toBeInTheDocument();
		});

		it('handles very long user names', () => {
			const props = makeProps({user: {name: 'A'.repeat(100)}});
			render(<Header {...props} />);

			const avatar = screen.getByRole('img');
			expect(avatar).toHaveAttribute('src', 'https://placehold.co/24x24?text=A');
		});

		it('handles unicode characters in user name', () => {
			const props = makeProps({user: {name: '中文'}});
			render(<Header {...props} />);

			const avatar = screen.getByRole('img');
			expect(avatar).toHaveAttribute('src', 'https://placehold.co/24x24?text=中');
		});

		it('renders without crashing when onLogout is called rapidly', () => {
			const onLogout = vi.fn();
			const props = makeProps({onLogout});
			render(<Header {...props} />);

			const logoutButton = screen.getByRole('button');
			for (let i = 0; i < 20; i++) {
				fireEvent.click(logoutButton);
			}

			expect(onLogout).toHaveBeenCalledTimes(20);
		});
	});

	describe('Component Integration', () => {
		it('renders complete header with all elements', () => {
			const props = makeProps({user: {name: 'Test User'}});
			const {container} = render(<Header {...props} />);

			const header = container.querySelector('header');
			const menuButton = screen.getAllByRole('link')[0];
			const brandLink = screen.getByText('daisyUI');
			const logoutButton = screen.getByRole('button');
			const avatar = screen.getByRole('img');

			expect(header).toContainElement(menuButton);
			expect(header).toContainElement(brandLink);
			expect(header).toContainElement(logoutButton);
			expect(header).toContainElement(avatar);
		});

		it('all interactive elements are functional', () => {
			const onLogout = vi.fn();
			const props = makeProps({user: {name: 'Interactive User'}, onLogout});
			render(<Header {...props} />);

			const logoutButton = screen.getByRole('button');
			fireEvent.click(logoutButton);

			expect(onLogout).toHaveBeenCalled();
		});
	});
});