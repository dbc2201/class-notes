import React, {useId, useState} from "react";

/**
 * A self-contained, non-reusable example of an Input component.
 * It manages its own state and does not accept props.
 */
export const Input = () => {
    const id = useId();
    const [value, setValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (<div className="form-control w-full max-w-xs">
        <label htmlFor={id} className="label">
            <span className="label-text">Sample Label</span>
        </label>
        <input
            id={id}
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="Type something here..."
            disabled={true}
            required={true}
            className="input input-bordered w-full input-error"
        />
        <span
            className="text-error text-sm"
        ></span>
    </div>);
};