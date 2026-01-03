import { Button } from "../../../ui/Button/Button.tsx";
import type { NoteCardProps } from "./NoteCardProps.ts";
import { TagBadge } from "../../tags/TagBadge/TagBadge.tsx";

/**
 * A component that displays a single note card with title, tags, metadata,
 * and action buttons.
 */
export function NoteCard(props: Readonly<NoteCardProps>) {
    const { note, onEdit, onDelete } = props;

    return (
        <div className="card card-bordered bg-base-100 shadow-xl">
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
                {note.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                        {note.tags.map((tag) => (
                            <TagBadge
                                key={tag}
                                tag={tag}
                                color="primary"
                                removable={false}
                                onClick={() => {}}
                                onRemove={() => {}}
                            />
                        ))}
                    </div>
                )}

                {/* Row 3: Metadata */}
                <div className="mt-2 flex justify-between text-sm text-gray-500">
                    <span>By {note.author}</span>
                    <span>{note.createdAt}</span>
                </div>

            </div>
        </div>
    );
}
