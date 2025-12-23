import Header from "../Header/Header.tsx";
import type {LayoutProps} from "./LayoutProps.ts";

export function Layout({children}: Readonly<LayoutProps>) {
    return (<div className="min-h-screen bg-base-200">
        <Header
            user={null}
            onLogout={() => {
                console.log("Logout clicked");
            }}
        />
        <main className="container mx-auto p-4">
            {children}
        </main>
    </div>);
}