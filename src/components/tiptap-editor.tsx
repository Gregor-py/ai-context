import {EditorContent, useEditor} from "@tiptap/react";
import {StarterKit} from "@tiptap/starter-kit";
import Document from '@tiptap/extension-document'
import Paragraph from "@tiptap/extension-paragraph";
import Text from '@tiptap/extension-text'

interface TiptapEditor {
    onChange: (reachText: string) => void;
    content: string;
}

export const TiptapEditor = ({onChange, content}: TiptapEditor) => {
    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text
        ],
        content: content,
        editorProps: {
            attributes: {
                class:"rounded-md border min-h-[150px] border-input"
            }
        },
        onUpdate({editor}) {
            onChange(editor.getHTML())
            console.log(editor.getHTML())
        }
    })

    return (
        <EditorContent editor={editor} />
    )
}