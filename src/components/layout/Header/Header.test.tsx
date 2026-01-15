import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Header from "./Header";

describe("Header component", () => {
    const mockLogout = vi.fn();

    const defaultProps = {
        user: { name: "Karuna" },
        onLogout: mockLogout,
    };

    it("renders the navbar container", () => {
        render(<Header {...defaultProps} />);
        expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    it("renders the app title", () => {
        render(<Header {...defaultProps} />);
        expect(screen.getByText("daisyUI")).toBeInTheDocument();
    });

    it("renders the hamburger menu link", () => {
        render(<Header {...defaultProps} />);
        const menuLink = screen.getAllByRole("link")[0];
        expect(menuLink).toHaveAttribute("href", "/");
    });

    it("renders profile button", () => {
        render(<Header {...defaultProps} />);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("shows the first letter of the user's name in profile image", () => {
        render(<Header {...defaultProps} />);
        const profileImg = screen.getByAltText("Karuna profile");
        expect(profileImg).toHaveAttribute(
            "src",
            expect.stringContaining("K")
        );
    });

    it("uses fallback text when user is undefined", () => {
        render(<Header onLogout={mockLogout} />);
        expect(screen.getByAltText("User profile")).toBeInTheDocument();
    });

    it("calls onLogout when profile button is clicked", () => {
        render(<Header {...defaultProps} />);
        const profileButton = screen.getByRole("button");

        fireEvent.click(profileButton);

        expect(mockLogout).toHaveBeenCalledOnce();
    });
});
