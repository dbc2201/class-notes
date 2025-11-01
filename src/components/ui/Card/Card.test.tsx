import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Card} from './Card';

describe('Card Component', () => {
	const baseProps = {
		children: null as unknown as never,
		className: '',
		onClick: () => {},
		bordered: false,
		shadow: false,
		cardTitle: 'Example Card',
		cardBody: 'This is the body of the card, where content resides.',
		cardButtonLabel: 'Learn More',
	};

	it('renders the card container with expected classes', () => {
		const {container} = render(<Card {...baseProps} />);

		const root = container.firstElementChild as HTMLElement | null;
		expect(root).toBeInTheDocument();
		expect(root).toHaveClass('card');
		expect(root).toHaveClass('card-bordered');
		expect(root).toHaveClass('bg-base-100');
		expect(root).toHaveClass('shadow-xl');
	});

	it('renders the title in an h2 with class "card-title"', () => {
		render(<Card {...baseProps} />);

		const heading = screen.getByRole('heading', {level: 2, name: baseProps.cardTitle});
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveClass('card-title');
	});

	it('renders the body text inside a paragraph', () => {
		render(<Card {...baseProps} />);

		const bodyPara = screen.getByText(baseProps.cardBody);
		expect(bodyPara.tagName.toLowerCase()).toBe('p');
	});

	it('renders an action area aligned to the end', () => {
		const {container} = render(<Card {...baseProps} />);

		const actions = container.querySelector('.card-actions');
		expect(actions).toBeInTheDocument();
		expect(actions).toHaveClass('justify-end');
	});

	it('renders the Button with the provided label and default classes', () => {
		render(<Card {...baseProps} />);

		const button = screen.getByRole('button', {name: baseProps.cardButtonLabel});
		expect(button).toBeInTheDocument();
		// Button component defaults: btn, btn-primary, btn-md
		expect(button).toHaveClass('btn');
		expect(button).toHaveClass('btn-primary');
		expect(button).toHaveClass('btn-md');
	});
});
