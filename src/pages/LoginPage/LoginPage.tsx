import {LoginForm} from "../../components/features/auth/LoginForm/LoginForm.tsx";

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