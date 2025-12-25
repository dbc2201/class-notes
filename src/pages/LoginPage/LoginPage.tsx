import {LoginForm} from "../../components/features/auth/LoginForm/LoginForm.tsx";

/**
 * LoginPage
 *
 * This page component is responsible for rendering the user login screen.
 * It provides a centered layout for the LoginForm component and serves as
 * the entry point for user authentication.
 *
 * The LoginPage itself does not manage authentication logic directly.
 * Instead, it delegates user interaction handling to the LoginForm component
 * via callback props. Authentication state management and redirection
 * are handled in higher-level contexts or routing logic.
 *
 * Responsibilities:
 * - Display the login form in a centered layout
 * - Pass required props to the LoginForm component
 * - Serve as a container for future authentication flow integration
 *
 * Notes:
 * - This component does not accept any props.
 * - Routing, authentication context, and redirection are intentionally
 *   excluded at this stage and will be added in later phases.
 *
 * @returns {JSX.Element} The rendered LoginPage component.
 */

export function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <LoginForm
                cardTitle="Login"
                cardButtonLabel="Sign In"
                isLoading={false}
                error=""
                onLogin={()=>{}}
                onError={()=>{}}
            />
        </div>
    );
}