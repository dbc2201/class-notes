import Header from "../Header/Header.tsx";
import type {LayoutProps} from "./LayoutProps.ts";

/**
 * The main layout component for the application.
 *
 * This component wraps the application content with a consistent structure,
 * including a header and a main content area.
 *
 * @param props - The component props.
 * @param props.children - The child components to render within the main content area.
 * @returns The rendered layout structure.
 */
export function Layout({children}: Readonly<LayoutProps>) {
    return (<div className="min-h-screen bg-base-200">
        <Header
            user={null}
            onLogout={() => {

            }}
        />
        <main className="container mx-auto p-4">
            {children}
        </main>
    </div>);
}