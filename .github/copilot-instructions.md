# GitHub Copilot Instructions for Class Notes App

## Project Overview

This is a modern class notes application built with React 19, Vite, TypeScript, TailwindCSS v4, and DaisyUI. The project serves as a comprehensive learning platform for mastering React development through Test-Driven Development (TDD).

## Tech Stack

- **React 19**: Latest UI library with modern React features
- **Vite**: Next-generation frontend build tool
- **TypeScript 5**: Type-safe JavaScript
- **TailwindCSS v4**: Utility-first CSS framework
- **DaisyUI**: TailwindCSS component library
- **Vitest**: Vite-native testing framework
- **React Testing Library**: React component testing
- **Storybook**: Component documentation and development
- **ESLint**: Code linting

## Project Structure

```
src/
├── components/          # All React components
│   ├── ui/             # Reusable UI components (Button, Card, Input, Badge)
│   ├── layout/         # Layout components (Header, Footer, Sidebar)
│   └── features/       # Feature-specific components
├── tests/              # Test files (mirrors component structure)
│   └── ui/             # UI component tests
├── stories/            # Storybook stories
├── assets/             # Static assets
└── main.tsx            # Application entry point
```

### Component Organization

- Each component lives in its own directory under `/src/components/[category]/[ComponentName]/`
- Component directory contains:
  - `ComponentName.tsx` - Main component file
  - `ComponentNameProps.ts` - TypeScript interface for props
  - `ComponentName.test.tsx` - Component tests (co-located with component)
  - `ComponentName.stories.tsx` - Storybook stories
- Tests may also be in `/src/tests/[category]/[ComponentName]/` directory

## Coding Standards

### TypeScript

- Use TypeScript for all files
- Define interfaces for all component props in separate `[ComponentName]Props.ts` files
- Use strict TypeScript configuration
- Prefer `type` for unions and primitives, `interface` for object shapes
- Use `?.` optional chaining and `??` nullish coalescing

### React Components

- Use **function components** (not arrow functions for exported components)
- Export named components: `export function ComponentName() {}`
- Use destructuring for props, but keep the full props object for clarity
- Use React 19 features when appropriate
- Use JSDoc comments for component documentation with `@example` tags

Example component structure:
```typescript
import type { ButtonProps } from "./ButtonProps.ts";

/**
 * Button - Reusable UI button component
 *
 * @param {ButtonProps} props - Component props
 * @returns {JSX.Element} Rendered component
 *
 * @example
 * <Button
 *   label="Submit"
 *   variant="primary"
 *   size="md"
 *   onClick={() => handleSubmit()}
 * />
 */
export function Button(props: ButtonProps) {
  const variant = props.variant ?? 'primary';
  const size = props.size ?? 'md';
  // ... implementation
}
```

### Styling

- Use **TailwindCSS v4** utility classes exclusively
- Use **DaisyUI** component classes (e.g., `btn`, `card`, `input`)
- Build dynamic class names using arrays and `.join(' ')`
- Use DaisyUI variants: `btn-primary`, `btn-secondary`, etc.
- Size variants: `btn-sm`, `btn-md`, `btn-lg`

Example:
```typescript
const classNames = [
  'btn',
  `btn-${variant}`,
  `btn-${size}`
].join(' ');
```

### File Naming

- Component files: PascalCase (e.g., `Button.tsx`, `UserProfile.tsx`)
- Test files: PascalCase with `.test.tsx` suffix (e.g., `Button.test.tsx`)
- Props files: PascalCase with `Props.ts` suffix (e.g., `ButtonProps.ts`)
- Story files: PascalCase with `.stories.tsx` suffix
- Other files: camelCase (e.g., `setupTests.ts`)

## Test-Driven Development (TDD)

This project strictly follows the **Red-Green-Refactor** TDD cycle:

1. 🔴 **RED**: Write a failing test first
2. 🟢 **GREEN**: Write minimal code to make the test pass
3. 🔵 **REFACTOR**: Improve code quality while keeping tests green
4. ♻️ **REPEAT**: Continue the cycle

### Testing Standards

- **Always write tests before implementation** when adding new features
- Use **Vitest** as the test runner
- Use **React Testing Library** for component testing
- Use **@testing-library/user-event** for user interactions
- Follow the **Arrange-Act-Assert (AAA)** pattern

Example test structure:
```typescript
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Button } from "../../../components/ui/Button/Button.tsx";

describe('Button component', () => {
  it('should render correctly with label', () => {
    // Arrange
    render(<Button label="Click me" />);

    // Act
    const buttonElement = screen.getByRole('button', { name: /click me/i });

    // Assert
    expect(buttonElement).toBeInTheDocument();
  });
});
```

### Testing Best Practices

- Use descriptive test names starting with "should"
- Use semantic queries in order of preference:
  1. `getByRole` (most preferred)
  2. `getByLabelText`
  3. `getByPlaceholderText`
  4. `getByText`
  5. `getByTestId` (last resort)
- Always use async/await with user events
- Mock functions with `vi.fn()` (not `jest.fn()`)
- Test user interactions, not implementation details
- Include tests for: default props, variants, interactions, disabled state, accessibility

## Development Workflows

### Running the Project

```bash
npm install              # Install dependencies
npm run dev              # Start development server (http://localhost:5173)
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
npm run test             # Run tests in watch mode
npm run test:watch       # Run tests with watch mode
npm run storybook        # Start Storybook on port 6006
```

### Making Changes

1. Pick a component from the issues/milestones
2. Create a feature branch: `feature/component-name`
3. **Write tests first** (TDD approach)
4. Implement the component
5. Ensure all tests pass: `npm run test -- --run`
6. Lint your code: `npm run lint`
7. Commit with conventional commits format
8. Create a pull request

### Conventional Commits

Use conventional commit format:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example: `feat(ui): implement Button component with tests`

## Common Patterns

### Props Interface Pattern

```typescript
// ButtonProps.ts
export interface ButtonProps {
  label?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
}
```

### Default Props Pattern

Use nullish coalescing for default values:
```typescript
const variant = props.variant ?? 'primary';
const size = props.size ?? 'md';
```

### Class Name Building Pattern

```typescript
const classNames = [
  'base-class',
  `modifier-${variant}`,
  props.disabled && 'disabled-class',
  props.className
].filter(Boolean).join(' ');
```

## Anti-Patterns to Avoid

❌ **Don't** use arrow functions for main component exports
❌ **Don't** use inline styles - use Tailwind classes
❌ **Don't** use `jest.fn()` - use `vi.fn()` from Vitest
❌ **Don't** test implementation details - test user behavior
❌ **Don't** use `getByTestId` unless absolutely necessary
❌ **Don't** commit code without tests
❌ **Don't** skip the TDD cycle

## Educational Focus

This project is designed for learning React development. When suggesting code:
- Prioritize clarity and readability over clever solutions
- Include comments for complex logic
- Follow consistent patterns throughout the codebase
- Write comprehensive tests that serve as documentation
- Use modern React 19 features appropriately

## AI Assistant Guidelines

When helping with this project:
1. **Always suggest writing tests first** when adding new features
2. Follow the established component structure and naming conventions
3. Use the project's tech stack (don't suggest alternatives)
4. Provide complete, working code examples
5. Include both component and test code when suggesting new components
6. Follow the TDD cycle: test first, then implementation
7. Respect the educational nature of the project
8. Use TypeScript strictly - don't suggest JavaScript alternatives
9. Use Vitest syntax, not Jest syntax
10. Generate DaisyUI-compatible styles, not custom CSS
