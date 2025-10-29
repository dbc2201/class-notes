export default interface HeaderProps{
    user: User | null;
    onLogout: () => void;
}
interface User{
    name: string,
}
