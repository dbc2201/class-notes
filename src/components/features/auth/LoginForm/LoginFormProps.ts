export default interface LoginFormProps {
    onLogin: (credentials: LoginCredentials) => void
    onError: (error: string) => void
    isLoading: boolean
    cardTitle: string
    cardButtonLabel: string
    error: string;
}

interface LoginCredentials {
    email: string
    password: string
}