import {useEffect, useState} from "react";
import {TiptapEditor} from "@/components/tiptap-editor";

interface EditableElement {
    initialContent: string;
    firestoreFieldName: string;
    className?: string;
}

export const EditableElement = ({initialContent, firestoreFieldName, className}: EditableElement) => {
    const [content, setContent] = useState<string | null>(null);

    useEffect(() => {
        setContent(initialContent);
    }, [initialContent])

    if (!content) {
        return null
    }

    return <TiptapEditor onChange={(reachText) => setContent(reachText)} content={content} />
}