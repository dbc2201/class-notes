# 📝 Class Notes App

A modern, feature-rich class notes application built with React 19, Vite, TailwindCSS v4, and DaisyUI. This project
serves as a comprehensive learning platform for mastering React development through Test-Driven Development (TDD).

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Latest-646cff?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org/)

# 📚 Table of Contents

- [Overview](#-overview)
- [Learning Objectives](#-learning-objectives)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Development Workflow](#-development-workflow)
- [Contributing](#-contributing)
- [License](#-license)
- [Team](#-team)
- [Acknowledgements](#-acknowledgments)
- [Learning Resources](#-learning-resources)
- [Educational Philosophy](#-educational-philosophy)
- [Final Thoughts](#-final-thoughts)

## 🎯 Overview

Class Notes App is a comprehensive note-taking application designed for students to create, organize, and manage their
class notes efficiently. The application emphasizes learning React 19 fundamentals through hands-on development using
Test-Driven Development (TDD) methodology.

---

### Key Highlights

- 📱 Responsive design with TailwindCSS v4 and DaisyUI
- 🎨 Theme switching capability (light/dark modes)
- 📝 Rich text editing with Quill WYSIWYG editor
- 🏷️ Tag-based organization system
- 🔍 Powerful search functionality
- 💾 Local storage persistence (backend API integration planned)
- 🔐 Simple authentication system
- ✅ Built using TDD with Jest/Vitest and React Testing Library

---

## 🎓 Learning Objectives

### Phase 1: Foundations
- Understanding React's component-based architecture (CBA)
- State management with hooks (useState, useEffect, useReducer)
- Props and component composition
- Event handling and forms
- TailwindCSS v4 utility-first styling
- DaisyUI component integration

### Phase 2: Intermediate Concepts
- Custom hooks creation
- Context API for global state
- Local storage integration
- Form validation and error handling
- Conditional rendering patterns
- Component lifecycle understanding

### Phase 3: Advanced Patterns
- Test-Driven Development (TDD) workflow
- Component testing with Jest/Vitest
- React Testing Library best practices
- Performance optimization techniques
- Code organization and architecture
- Git collaboration workflows

---

## ✨ Features

### Core Features (MVP)
- ✅ **User Authentication**: Simple email/password login with local storage
- ✅ **CRUD Operations**: Create, Read, Update, Delete notes
- ✅ **Rich Text Editor**: Quill-based WYSIWYG editor for note content
- ✅ **Tag Management**: Create and assign tags to organize notes
- ✅ **Search Functionality**: Search notes by title, content, or tags
- ✅ **Theme Switching**: Toggle between light and dark themes
- ✅ **Responsive Design**: Mobile-first, works on all devices
- ✅ **Local Persistence**: All data stored in browser's local storage

### Future Enhancements
- 🔄 Backend API integration
- 📤 Export notes (PDF, Markdown)
- 📎 File attachments
- 🔗 Note sharing between users
- 📊 Analytics and statistics
- 🗂️ Folders/Categories
- ⭐ Favorite/Pin notes

---

## 🛠️ Tech Stack

### Core Technologies
- **React 19**: UI library with the latest improvements
- **Vite**: Next-generation frontend build tool
- **TypeScript**: Type-safe JavaScript
- **TailwindCSS v4**: Utility-first CSS framework
- **DaisyUI**: TailwindCSS component library

### Key Libraries
- **Quill**: Rich text WYSIWYG editor
- **React Router v7**: Client-side routing
- **date-fns**: Modern date utility library

### Development Tools
- **Jest**: Testing framework (initial phase)
- **Vitest**: Vite-native testing framework (migration phase)
- **React Testing Library**: React component testing
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Git**: Version control

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v22 or higher)
- npm or yarn or pnpm
- Git
- Code editor (WebStorm recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dbc2201/class-notes.git
   cd class-notes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

```bash
  npm run dev              # Start dev server
  npm run build            # Build for production
  npm run preview          # Preview production build
  npm run lint             # Run ESLint
```

---

## 🔄 Development Workflow

### TDD (Test-Driven Development) Cycle

This project follows the **Red-Green-Refactor** cycle:

```
1. 🔴 RED: Write a failing test
   ↓
2. 🟢 GREEN: Write minimal code to pass the test
   ↓
3. 🔵 REFACTOR: Improve code quality
   ↓
4. ♻️ REPEAT
```

### Step-by-Step Workflow

#### Step 1: Understand the Component
- Read the component specification
- Review component hierarchy and props
- Understand expected behavior and edge cases

#### Step 2: Write Tests First
```bash
# Create test file
touch src/__tests__/components/ui/Button.test.tsx
```

Example test structure:
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button Component', () => {
  it('should render with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

#### Step 3: Run Tests (Red Phase)
```bash
npm run test
# Tests should FAIL - this is expected!
```

#### Step 4: Implement Component (Green Phase)
```typescript
// src/components/ui/Button/Button.tsx
import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

#### Step 5: Run Tests Again (Green Phase)
```bash
npm run test
# Tests should PASS now!
```

#### Step 6: Refactor
- Improve code quality
- Extract reusable logic
- Add comments if needed
- Ensure tests still pass

#### Step 7: Commit Your Work
```bash
git add .
git commit -m "feat(ui): implement Button component with tests"
git push origin feature/button-component
```

#### Step 8: Create a Pull Request
- Follow the PR template
- Request code review
- Address feedback
- Merge when approved

---

## 🤝 Contributing

We welcome contributions from students and developers! Here's how you can contribute:

### For Students

1. **Pick a component** from the milestones/issues list
2. **Create a feature branch** following naming conventions
3. **Write tests first** (TDD approach)
4. **Implement the component**
5. **Ensure tests pass**
6. **Commit with conventional commits**
7. **Create a pull request**
8. **Request code review**
9. **Address feedback**
10. **Celebrate when merged! 🎉**

### For External Contributors

Thank you for your interest in contributing! Please follow these guidelines:

#### Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/class-notes-app.git
   ```
3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/dbc2201/class-notes.git
   ```
4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

#### Making Changes

1. **Follow the existing code style**
2. **Write tests for new features**
3. **Ensure all tests pass**
   ```bash
   npm run test
   npm run lint
   ```
4. **Update documentation** if needed
5. **Commit with conventional commits**

#### Submitting Changes

1. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
2. **Create a pull request** from your fork to the main repository
3. **Fill out the PR template**
4. **Wait for code review**
5. **Address review comments**
6. **Celebrate when merged! 🎉**

#### What We're Looking For

- 🐛 Bug fixes
- 📝 Documentation improvements
- ✨ New features (please discuss in issues first)
- ♿ Accessibility improvements
- 🎨 UI/UX enhancements
- ⚡ Performance optimizations
- ✅ Additional tests

#### Code of Conduct

- Be respectful and constructive
- Help others learn
- Focus on the code, not the person
- Assume good intentions
- Be patient with beginners

---

## 📄 License

This project is created for educational purposes. Feel free to use it for learning and teaching.

---

## 📞 Support

### For Students
- Create an issue in the repository
- Ask questions in pull request comments
- Schedule a review session with the instructor

### For External Contributors
- Check existing issues before creating new ones
- Read the contributing guide thoroughly
- Join discussions on issues and PRs
- Be patient and respectful

---

## 👥 Team

### Students
- **Rohit Sharma** ([@rohit3171999](https://github.com/rohit3171999))
- **Arnab Mandal** ([@Arnab-Mandal1](https://github.com/Arnab-Mandal1))

### Instructor
- **Divyansh Bhardwaj (dbc2201)** - Project Guide & Mentor

---

## 🙏 Acknowledgments

- React Team for React 19
- Vite Team for the amazing build tool
- TailwindCSS Team for the utility-first framework
- DaisyUI Team for beautiful components
- Quill Team for the rich text editor
- All contributors and supporters

---

## 📚 Learning Resources

### React 19
- [Official React Documentation](https://react.dev/)
- [React 19 Release Notes](https://react.dev/blog/2024/12/05/react-19)
- [React Hooks Reference](https://react.dev/reference/react)

### Testing
- [React Testing Library](https://testing-library.com/react)
- [Jest Documentation](https://jestjs.io/)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

### TailwindCSS & DaisyUI
- [TailwindCSS v4 Documentation](https://tailwindcss.com/)
- [DaisyUI Components](https://daisyui.com/components/)
- [DaisyUI Theme Controller](https://daisyui.com/components/theme-controller/)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### Git & GitHub
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)

### Best Practices
- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)
- [Airbnb React Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- [React Best Practices](https://react.dev/learn/thinking-in-react)

---

## 🎓 Educational Philosophy

This project is designed with the following educational principles:

### 1. **Learn by Doing**
- Hands-on coding from day one
- Build real, functional features
- Immediate feedback through testing

### 2. **Test-Driven Development**
- Write tests first, code second
- Build confidence through comprehensive testing
- Learn to think about edge cases early

### 3. **Progressive Complexity**
- Start simple, increase complexity gradually
- Build on previous knowledge
- Clear milestones and goals

### 4. **Collaborative Learning**
- Pair programming on complex features
- Code reviews for knowledge sharing
- Learn from each other's approaches

### 5. **Professional Practices**
- Real-world Git workflows
- Industry-standard tools and patterns
- Documentation and communication skills

### 6. **Foundation for Growth**
- Architecture designed for future enhancements
- Easy transition to backend integration
- Scalable patterns and practices

---

## 🏆 Final Thoughts

This project is more than just building a notes app. It's about:

- 🧠 **Learning** how to think like a developer
- 🛠️ **Building** real-world, professional-quality software
- 🤝 **Collaborating** effectively in a team
- 📚 **Understanding** best practices and patterns
- 🎯 **Achieving** tangible, portfolio-worthy results
- 💪 **Growing** your confidence as a React developer

Remember: **Everyone was a beginner once.** Embrace the challenge, learn from mistakes, help each other, and most importantly - enjoy the journey!

**Happy Coding! 🚀**

---
