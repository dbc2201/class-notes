import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { Card } from './Card';

describe('Card Component', () => {
	const defaultProps = {
		children: null as unknown as never,
		className: '',
		onClick: () => {},
		bordered: false,
		shadow: false,
		cardTitle: 'Example Card',
		cardBody: 'This is the body of the card, where content resides.',
		cardButtonLabel: 'Learn More',
	};

	describe('Rendering', () => {
		it('renders the card container with base classes', () => {
			const { container } = render(<Card {...defaultProps} />);

			const root = container.firstElementChild as HTMLElement | null;
			expect(root).toBeInTheDocument();
			expect(root).toHaveClass('card');
			expect(root).toHaveClass('bg-base-100');
		});

		it('renders the title in an h2 with class "card-title"', () => {
			render(<Card {...defaultProps} />);

			const heading = screen.getByRole('heading', { level: 2, name: defaultProps.cardTitle });
			expect(heading).toBeInTheDocument();
			expect(heading).toHaveClass('card-title');
			expect(heading).toHaveTextContent(defaultProps.cardTitle);
		});

		it('renders the body text inside a paragraph', () => {
			render(<Card {...defaultProps} />);

			const bodyPara = screen.getByText(defaultProps.cardBody);
			expect(bodyPara.tagName.toLowerCase()).toBe('p');
			expect(bodyPara).toHaveTextContent(defaultProps.cardBody);
		});

		it('renders an action area aligned to the end', () => {
			const { container } = render(<Card {...defaultProps} />);

			const actions = container.querySelector('.card-actions');
			expect(actions).toBeInTheDocument();
			expect(actions).toHaveClass('justify-end');
		});

		it('renders the Button with the provided label', () => {
			render(<Card {...defaultProps} />);

			const button = screen.getByRole('button', { name: defaultProps.cardButtonLabel });
			expect(button).toBeInTheDocument();
			expect(button).toHaveClass('btn', 'btn-primary', 'btn-md');
		});
	});

	describe('Styling Props', () => {
		it('applies bordered class when bordered prop is true', () => {
			const { container } = render(<Card {...defaultProps} bordered={true} />);

			const root = container.firstElementChild as HTMLElement | null;
			expect(root).toHaveClass('card-bordered');
		});

		it('does not apply bordered class when bordered prop is false', () => {
			const { container } = render(<Card {...defaultProps} bordered={false} />);

			const root = container.firstElementChild as HTMLElement | null;
			expect(root).not.toHaveClass('card-bordered');
		});

		it('applies shadow class when shadow prop is true', () => {
			const { container } = render(<Card {...defaultProps} shadow={true} />);

			const root = container.firstElementChild as HTMLElement | null;
			expect(root).toHaveClass('shadow-xl');
		});

		it('does not apply shadow class when shadow prop is false', () => {
			const { container } = render(<Card {...defaultProps} shadow={false} />);

			const root = container.firstElementChild as HTMLElement | null;
			expect(root).not.toHaveClass('shadow-xl');
		});

		it('applies custom className along with default classes', () => {
			const { container } = render(
				<Card {...defaultProps} className="custom-card-class" />
			);

			const root = container.firstElementChild as HTMLElement | null;
			expect(root).toHaveClass('card', 'bg-base-100', 'custom-card-class');
		});

		it('applies multiple styling props together', () => {
			const { container } = render(
				<Card
					{...defaultProps}
					bordered={true}
					shadow={true}
					className="my-custom-class"
				/>
			);

			const root = container.firstElementChild as HTMLElement | null;
			expect(root).toHaveClass(
				'card',
				'card-bordered',
				'bg-base-100',
				'shadow-xl',
				'my-custom-class'
			);
		});
	});

	describe('Content Variations', () => {
		it('renders with different title text', () => {
			render(<Card {...defaultProps} cardTitle="Custom Title" />);

			const heading = screen.getByRole('heading', { level: 2, name: 'Custom Title' });
			expect(heading).toBeInTheDocument();
		});

		it('renders with different body text', () => {
			const customBody = 'This is a custom body text for testing.';
			render(<Card {...defaultProps} cardBody={customBody} />);

			const bodyPara = screen.getByText(customBody);
			expect(bodyPara).toBeInTheDocument();
		});

		it('renders with different button label', () => {
			render(<Card {...defaultProps} cardButtonLabel="Read More" />);

			const button = screen.getByRole('button', { name: 'Read More' });
			expect(button).toBeInTheDocument();
		});

		it('renders with empty strings without crashing', () => {
			render(<Card {...defaultProps} cardTitle="" cardBody="" cardButtonLabel="" />);

			const { container } = render(<Card {...defaultProps} />);
			expect(container.firstElementChild).toBeInTheDocument();
		});
	});

	describe('Interactions', () => {
		it('calls onClick handler when card button is clicked', () => {
			const handleClick = vi.fn();
			render(<Card {...defaultProps} onClick={handleClick} />);

			const button = screen.getByRole('button', { name: defaultProps.cardButtonLabel });
			fireEvent.click(button);

			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		it('calls onClick multiple times when button is clicked multiple times', () => {
			const handleClick = vi.fn();
			render(<Card {...defaultProps} onClick={handleClick} />);

			const button = screen.getByRole('button', { name: defaultProps.cardButtonLabel });
			fireEvent.click(button);
			fireEvent.click(button);
			fireEvent.click(button);

			expect(handleClick).toHaveBeenCalledTimes(3);
		});

		it('works without onClick handler', () => {
			const props = { ...defaultProps };
			delete (props as any).onClick;

			expect(() => {
				render(<Card {...props} />);
			}).not.toThrow();
		});
	});

	describe('Structure and Layout', () => {
		it('contains card-body wrapper', () => {
			const { container } = render(<Card {...defaultProps} />);

			const cardBody = container.querySelector('.card-body');
			expect(cardBody).toBeInTheDocument();
		});

		it('maintains correct DOM hierarchy', () => {
			const { container } = render(<Card {...defaultProps} />);

			const root = container.firstElementChild;
			const cardBody = root?.querySelector('.card-body');
			const actions = root?.querySelector('.card-actions');

			expect(root).toContainElement(cardBody);
			expect(cardBody).toContainElement(actions);
		});
	});

	describe('Accessibility', () => {
		it('has accessible heading for screen readers', () => {
			render(<Card {...defaultProps} />);

			const heading = screen.getByRole('heading', { level: 2 });
			expect(heading).toHaveAccessibleName(defaultProps.cardTitle);
		});

		it('has accessible button for screen readers', () => {
			render(<Card {...defaultProps} />);

			const button = screen.getByRole('button');
			expect(button).toHaveAccessibleName(defaultProps.cardButtonLabel);
		});

		it('button is keyboard accessible', () => {
			const handleClick = vi.fn();
			render(<Card {...defaultProps} onClick={handleClick} />);

			const button = screen.getByRole('button', { name: defaultProps.cardButtonLabel });
			button.focus();
			expect(document.activeElement).toBe(button);
		});
	});
});
