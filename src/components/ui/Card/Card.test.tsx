import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";

// vi.mock('../../../components/ui/Button/Button.tsx', () => ({
//   Button: ({ label }: { label: string }) => (
//     <button>{label}</button>
//   ),
// }));

import { Card } from "./Card.tsx";

describe('Card component', () => {
  const defaultProps = {
    cardTitle: 'Example Card',
    cardBody: 'This is the card body content',
    cardButtonLabel: 'Learn more',
  };

  it('should render the card container', () => {
    const { container } = render(<Card {...defaultProps} />);

    const card = container.querySelector('.card');

    expect(card).toBeInTheDocument();
  });

  it('should render the card title', () => {
    render(<Card {...defaultProps} />);
    expect(
      screen.getByRole('heading', { name: /example card/i })
    ).toBeInTheDocument();
  });

  it('should render card body text', () => {
    render(<Card {...defaultProps} />);

    expect(screen.getByText(defaultProps.cardBody)).toBeInTheDocument();
  });

  it('should render the button correctly', () => {
    render(<Card {...defaultProps} />);

    expect(
      screen.getByRole("button", { name: /learn more/i })
    ).toBeInTheDocument();
  });
});
