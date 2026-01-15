import {useEffect} from "react";
import {LoginForm} from "../../components/features/auth/LoginForm/LoginForm.tsx";

/**
 * LoginPage
 *
 * This page component renders the login screen of the application.
 * It provides a centered layout and hosts the LoginForm component.
 *
 * Responsibilities:
 * - Display the login form in a centered layout
 * - Act as a container for authentication-related UI
 *
 * Notes:
 * - This component does not accept any props.
 * - Authentication logic and routing are intentionally excluded.
 */

export function LoginPage() {

    // Step 1: Dummy login handler
    const handleLogin = () => {
        // later: API call, auth context, redirect
        console.log("Login Clicked");
    }
    // Step 2: Dummy error handler
    const handleError = () => {
        console.error("Login Failed");
    }
    useEffect(() => {
        console.log("LoginPage Mounted");
    }, []);
    return (<div className="min-h-screen flex items-center justify-center bg-base-200">
        <LoginForm
            cardTitle="Login"
            cardButtonLabel="Sign In"
            isLoading={false}
            error=""
            onLogin={handleLogin}
            onError={handleError}
        />
    </div>);
}