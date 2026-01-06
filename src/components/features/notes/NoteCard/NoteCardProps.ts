export interface Note {
    id: string;
    title: string;
    author: string;
    createdAt: string;
    tags: string[];
}

export interface NoteCardProps {
    note: Note;
    onEdit: (noteId: string) => void;
    onDelete: (noteId: string) => void;
}
