import {Button} from "../../../ui/Button/Button.tsx";
import type {NoteCardProps} from "./NoteCardProps.ts";
import {TagBadge} from "../../tags/TagBadge/TagBadge.tsx";

/**
 * NoteCard
 *
 * A presentational component that renders a summary view of a note.
 * It displays the note title, associated tags, metadata (author and creation date),
 * and action buttons for editing and deleting the note.
 *
 * The layout is structured as follows:
 * - Title and action buttons are displayed in a single horizontal row.
 * - Tags (if present) are rendered below the title.
 * - Metadata is displayed at the bottom of the card.
 *
 * This component is intentionally non-clickable as a whole; only the action
 * buttons trigger interactions.
 *
 *
 * @param props - The properties passed to the NoteCard component.
 * @param props.note - The note data containing id, title, tags, author, and creation date.
 * @param props.onEdit - Callback invoked when the Edit button is clicked.
 * @param props.onDelete - Callback invoked when the Delete button is clicked.
 *
 * @returns A JSX element representing a single note card.
 *
 * @example
 * ```tsx
 * <NoteCard
 *   note={{
 *     id: "1",
 *     title: "Learning React",
 *     tags: ["react", "typescript"],
 *     author: "Rohit Sharma",
 *     createdAt: "2026-01-01"
 *   }}
 *   onEdit={(id) => console.log("Edit note:", id)}
 *   onDelete={(id) => console.log("Delete note:", id)}
 * />
 * ```
 */

export function NoteCard(props: Readonly<NoteCardProps>) {
    const {note, onEdit, onDelete} = props;

    return (<div className="card card-bordered bg-base-100 shadow-xl">
            <div className="card-body p-4">

                {/* Row 1: Title + Actions */}
                <div className="flex items-center justify-between">
                    <h3 className="card-title text-lg font-semibold">
                        {note.title}
                    </h3>

                    <div className="flex gap-2">
                        <Button
                            label="Edit"
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(note.id)}
                        />
                        <Button
                            label="Delete"
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(note.id)}
                        />
                    </div>
                </div>

                {/* Row 2: Tags */}
                {note.tags.length > 0 && (<div className="mt-2 flex flex-wrap gap-2">
                        {note.tags.map((tag) => (<TagBadge
                                key={tag}
                                tag={tag}
                                color="primary"
                                removable={false}
                                onClick={() => {
                                }}
                                onRemove={() => {
                                }}
                            />))}
                    </div>)}

                {/* Row 3: Metadata */}
                <div className="mt-2 flex justify-between text-sm text-gray-500">
                    <span>By {note.author}</span>
                    <span>{note.createdAt}</span>
                </div>

            </div>
        </div>);
}
