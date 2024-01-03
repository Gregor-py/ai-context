import {Button} from "@/components/ui/button";
import {FilePlus, Menu, ScrollText} from "lucide-react";
import parse from 'html-react-parser';
import {useAuth} from "@/hooks/useAuth";
import {arrayUnion, updateDoc} from "@firebase/firestore";
import {useState} from "react";
import {SentenceType} from "@/firebase"
import {EditableElement} from "@/components/editable-element";

type SentenceComponent = SentenceType & {
    type: 'preview' | 'edit'
}

export const Sentence = ({sentence, translation, type}: SentenceComponent) => {
    const [loading, setLoading] = useState(false);
    const {userRef} = useAuth()
    if (!userRef) {
        return null;
    }

    const addSentence = async () => {
        setLoading(true)
        await updateDoc(userRef, {
            sentences: arrayUnion({sentence, translation})
        })
        setLoading(false)
    }

    return (
        <div className={'flex items-center gap-3'}>
            {type === 'edit'
                ? <Button
                    onClick={addSentence}
                    disabled={loading} variant={'ghost'} size={'icon'}
                    className={'h-16 w-16 bg-green-100'}
                >
                    <FilePlus className={'text-green-500 w-10 h-10'}/>
                </Button>
                : <ScrollText className={'text-green-500 w-10 h-10'}/>
            }
            <div className={'space-y-1 text-lg'}>
                <div className={'bg-green-300 px-3 rounded-md'}>{parse(sentence)}</div>
                <div className={'bg-yellow-300 px-3 rounded-md'}>{parse(translation)}</div>

                {/*<EditableElement initialContent={parsedSentence} firestoreFieldName={'sentence'} className={'bg-green-300 px-3 rounded-md'}/>*/}
            </div>
        </div>
    )
}