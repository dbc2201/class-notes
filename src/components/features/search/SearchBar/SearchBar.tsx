import {Input} from "../../../ui/Input/Input";
import type {SearchBarProps} from "./SearchBarProps";

/**
 * A specialized search bar component that provides a consistent search experience.
 * It features a search icon for visual affordance and a clear button that appears
 * when there is input, allowing users to easily reset the search query.
 *
 * @param {Readonly<SearchBarProps>} props - The properties for the SearchBar component.
 * @param {string} props.value - The current string value of the search input.
 * @param {string} props.placeholder - The placeholder text to display when the input is empty.
 * @param {(value: string) => void} props.onChange - Callback that receives the new value whenever the user types.
 * @param {() => void} props.onClear - Callback that is triggered when the user clicks the clear button.
 * @returns {JSX.Element} The rendered search bar component.
 *
 * @example
 * const [searchTerm, setSearchTerm] = useState('');
 *
 * <SearchBar
 *   value={searchTerm}
 *   onChange={setSearchTerm}
 *   onClear={() => setSearchTerm('')}
 *   placeholder="Search for items..."
 * />
 */
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
