import type {DropdownProps} from "./DropdownProps.ts";

export function Dropdown(props: Readonly<DropdownProps>) {
    return (<div className="dropdown">
        {/*Trigger*/}
        <button type="button" className="btn">
            {props.trigger}
        </button>
        {/*Menu*/}
        <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box">
            {props.items.map((item) => (<li key={item.value}>
                    <button
                        type="button"
                        className="w-full text-left"
                        onClick={item.onClick}
                    >
                        {item.label}
                    </button>
                </li>))}

        </ul>
    </div>);
}