import {Button} from "../../../ui/Button/Button.tsx";
import type {NoteCardProps} from "./NoteCardProps.ts";
import {TagBadge} from "../../tags/TagBadge/TagBadge.tsx";

export function NoteCard(props: Readonly<NoteCardProps>) {
    return (<div className="card card-bordered bg-base-100 shadow-xl">
        {/* Header */}
        <div className="card-body p-4">
            <div className="flex items-center justify-between">
                <h3 className="card-title text-lg font-semibold">
                    {props.note.title}
                </h3>
                {/* Tags section */}
                {props.note.tags && props.note.tags.length > 0 && (<div className="mt-4 flex flex-wrap gap-2">
                        {props.note.tags.map((tag) => (<TagBadge
                                key={tag}
                                tag={tag}
                                color="primary"
                                removable={false}
                                onClick={() => console.log("Tag clicked:", tag)}
                                onRemove={() => {
                                }}
                            />))}
                    </div>)}


                <div className="flex gap-2">
                    <Button
                        label="Edit"
                        variant="ghost"
                        size="sm"
                        onClick={() => props.onEdit(props.note.id)}
                    />
                    <Button
                        label="Delete"
                        variant="ghost"
                        size="sm"
                        onClick={() => props.onDelete(props.note.id)}
                    />
                </div>
            </div>
            {/* Content */}
            <div className="mt-3 text-sm text-base-content cursor-pointer"
                 onClick={() => props.onClick(props.note.id)}>
                {props.note.content ?? "No content available."}
            </div>
        </div>
    </div>);
}