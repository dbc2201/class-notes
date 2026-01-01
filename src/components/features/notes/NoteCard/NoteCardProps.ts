export interface Note {
    id: string;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    tag: string[];
}

export interface NoteCardProps {
    note: Note;
    onEdit: (noteId: string) => void;
    onDelete: (noteId: string) => void;
    onClick: (noteId: string) => void;
}