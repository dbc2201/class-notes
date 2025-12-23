import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ThemeToggle from "./ThemeToggle";

describe("ThemeToggle component", () => {
    it("renders the theme toggle checkbox", () => {
        render(<ThemeToggle />);

        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeInTheDocument();
    });

    it("checkbox is unchecked by default", () => {
        render(<ThemeToggle />);

        const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
        expect(checkbox.checked).toBe(false);
    });

    it("toggles checkbox state on click", () => {
        render(<ThemeToggle />);

        const checkbox = screen.getByRole("checkbox") as HTMLInputElement;

        fireEvent.click(checkbox);
        expect(checkbox.checked).toBe(true);

        fireEvent.click(checkbox);
        expect(checkbox.checked).toBe(false);
    });

    it("has theme-controller class and synthwave value", () => {
        render(<ThemeToggle />);

        const checkbox = screen.getByRole("checkbox") as HTMLInputElement;

        expect(checkbox).toHaveClass("theme-controller");
        expect(checkbox.value).toBe("synthwave");
    });

    it("renders both sun and moon icons", () => {
        render(<ThemeToggle />);

        const icons = document.querySelectorAll("svg");
        expect(icons.length).toBe(2);
    });
});
