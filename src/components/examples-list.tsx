import parse from "html-react-parser";
import {ExamplesListType} from "@/firebase";
import { Sentence } from "./sentence";

export const ExamplesList = ({sentences, word}: ExamplesListType) => {
    return (
        <div className={''}>
            <h3 className={'text-3xl font-bold mb-6'}>{word}</h3>
            <div className={'space-y-4'}>
                {sentences.map(sentence => (
                    <Sentence key={sentence.sentence} type={'edit'} sentence={sentence.sentence} translation={sentence.translation}/>
                ))}
            </div>
        </div>
    )
}