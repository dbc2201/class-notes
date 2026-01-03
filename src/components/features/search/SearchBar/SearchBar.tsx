import {Input} from "../../../ui/Input/Input";
import type {SearchBarProps} from "./SearchBarProps";

export function SearchBar(props: Readonly<SearchBarProps>) {
    return (
        <div className="w-full max-w-sm">
            <div className="relative w-full">

                {/* Search icon */}
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
  🔍
</span>

                {/* Input */}
                <Input
                    hideLabel
                    type="text"
                    value={props.value}
                    placeholder={props.placeholder}
                    disabled={false}
                    required={false}
                    className="pl-10 pr-10"
                    onChange={(e) => props.onChange(e.target.value)}
                />

                {/* Clear button */}
                {props.value && (
                    <button
                        type="button"
                        onClick={props.onClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white z-10"
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
}
