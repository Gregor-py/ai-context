'use client'
import {useEffect, useState} from "react";
import {limit, onSnapshot, orderBy, query, updateDoc} from "@firebase/firestore";
import {ExamplesListType, firestoreCollections, SentenceType} from "@/firebase";
import {ScrollText, WholeWordIcon} from "lucide-react";
import {Heading} from "@/components/heading";
import {ExamplesList} from "@/components/examples-list";
import {useAuth} from "@/hooks/useAuth";
import {Sentence} from "@/components/sentence";
import { Button } from "@/components/ui/button";
import axios from "axios";

const MySentencesPage = () => {
    const [sentences, setSentences] = useState<SentenceType[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const {userRef} = useAuth()

    const exportData = async () => {
        setIsLoading(true)
        const response = await axios.post('/api/export-sentences', {sentences});
        navigator.clipboard.writeText(response.data);
        setIsLoading(false)
    }

    const clearAll = async () => {
        if (userRef) {
            updateDoc(userRef, {sentences: []})
        }
    }

    useEffect(() => {
        if (userRef) {
            const unsubscribe = onSnapshot(userRef, (querySnapshot) => {
                if (querySnapshot.exists()) {
                    setSentences(querySnapshot.data().sentences as SentenceType[])
                }
            })
        }
    }, [userRef])

    return (
        <div>
            <Heading
                title={'My sentences'}
                description={'A list with yuour own sentences'}
                icon={ScrollText}
                iconColor={'text-red-500'}
                bgColor={'bg-red-100'}
            />
            <div className={'p-4 flex gap-5'}>
                <Button disabled={isLoading} onClick={exportData} className={'w-1/2'}>Copy anki txt</Button>
                <Button onClick={clearAll} variant={'destructive'} className={'w-1/2'}>Clear all</Button>
            </div>
            <div className={'space-y-4 p-4'}>
                {sentences && sentences.map((sentence, id) => (
                    <Sentence key={sentence.sentence} sentence={sentence.sentence} translation={sentence.translation} type={'preview'}/>
                ))}
            </div>
        </div>
    )
}

export default MySentencesPage