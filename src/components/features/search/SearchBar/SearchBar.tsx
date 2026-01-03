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
            <div className="relative w-full" role="search" aria-label="Search">

                {/* Search icon */}
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
  <svg
      className="h-[1em] opacity-50"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
  >
    <g
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="2.5"
        fill="none"
        stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
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
                        aria-label="Clear search"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-base-content z-10"
                    >
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                             height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M6 18 17.94 6M18 18 6.06 6"/>
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}
