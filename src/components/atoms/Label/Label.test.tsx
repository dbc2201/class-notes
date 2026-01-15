import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import {Label} from "./Label";

describe("Label Atom", () => {
    it("renders the label text correctly", () => {
        render(<Label htmlFor="email">Email Address</Label>);

        expect(screen.getByText("Email Address")).toBeInTheDocument();
    });

    it("applies the htmlFor attribute correctly", () => {
        render(<Label htmlFor="email">Email</Label>);

        const label = screen.getByText("Email");
        expect(label).toHaveAttribute("for", "email");
    });

    it("shows required indicator when required prop is true", () => {
        render(
            <Label htmlFor="email" required>
                Email
            </Label>
        );

        expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("does not show required indicator when required is false", () => {
        render(<Label htmlFor="email">Email</Label>);

        expect(screen.queryByText("*")).not.toBeInTheDocument();
    });
});