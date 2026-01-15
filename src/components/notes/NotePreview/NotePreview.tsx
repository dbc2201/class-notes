import type {NotePreviewProps} from "./NotePreviewProps.ts";

/**
 * Renders a preview of the note content.
 *
 * This component processes the note content by truncating it to a specified length
 * and wrapping it in a container with line-clamping styles to ensure it fits within the UI.
 *
 * @param props - The component properties.
 * @param props.content - The text content of the note. Defaults to an empty string if null or undefined.
 * @returns The rendered note preview element.
 */
export function NotePreview(props: Readonly<NotePreviewProps>) {
    const contents = props.content ?? "";

    return (
        <div className="line-clamp-3 text-base-content">
            <p>
                {contents}
            </p>
        </div>
    );
}