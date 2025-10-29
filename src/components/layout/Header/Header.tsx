import type HeaderProps from "./HeaderProps.ts";

export default function Header(props: HeaderProps) {

    return (
        <>

            <header className="navbar bg-base-100 shadow-lg">
                <div className="flex-none navbar-start">
                    <a className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             className="inline-block h-5 w-5 stroke-current">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </a>
                </div>
                <div className="flex-1 navbar-center">
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="flex-none navbar-end">
                    <button className="btn btn-square btn-ghost" onClick={props.onLogout}>
                        <img src={`https://placehold.co/24x24?text=${props.user?.name.charAt(0)}`} alt=""/>
                    </button>
                </div>
            </header>

        </>
    );
};