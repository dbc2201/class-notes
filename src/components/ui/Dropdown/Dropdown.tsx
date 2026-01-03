import type {DropdownProps} from "./DropdownProps.ts";

/**
 * A generic Dropdown component that renders a trigger button and a list of menu items.
 *
 * This component utilizes CSS classes (likely from a UI library like DaisyUI) to handle the display logic.
 *
 * @param props - The configuration properties for the dropdown.
 * @param props.trigger - The content (text or ReactNode) to be displayed inside the trigger button.
 * @param props.items - An array of menu items to display. Each item requires a `label`, `value`, and `onClick` handler.
 * @returns A JSX element representing the dropdown structure.
 */
export function Dropdown(props: Readonly<DropdownProps>) {
    const positionClass=props.position
        ? `dropdown-${props.position}`
        :'dropdown-bottom';

    return (<div className={`dropdown ${positionClass}`}>
        {/*Trigger*/}
        <button type="button" className="btn" tabIndex={0}>
            {props.trigger}
        </button>
        {/*Menu*/}
        <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box" tabIndex={-1}>
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