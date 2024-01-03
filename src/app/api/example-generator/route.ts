import {NextResponse} from "next/server";
import {OpenAI} from "openai";
import {getGenerateExamplePrompt} from "./templates";
import {extractJson} from "@/app/api/example-generator/extractJson";
import {addDoc, serverTimestamp} from "@firebase/firestore";
import {firestoreCollections} from "@/firebase";

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY
const openai = new OpenAI({
    apiKey: apiKey,
});

export async function POST(
    req: Request,
) {
    try {
        const body = await req.json();
        const {word} = body;
        const prompt = getGenerateExamplePrompt(word);

        // if (!user) {
        //     return new NextResponse("Unauthorized", {status: 401});
        // }

        if (!apiKey) {
            return new NextResponse("OpenAI API Key not configured.", {status: 500});
        }

        if (!prompt) {
            return new NextResponse("Prompt are required", {status: 400});
        }

        // const freeTrial = await checkApiLimit();
        // console.log('messages', messages)

        // if (!freeTrial) {
        //     return new NextResponse("Free trial has expired.", {status: 403});
        // }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{role: 'user', content: prompt}]
        });
        const message = response.choices[0].message.content
        // const message = 'Here is you sentence   <json>{"sentences": [{"sentence": "Das ist ein Geheimnis.", "translation": "Це таємниця."}, {"sentence": "Er hat ein Geheimnis behalten.", "translation": "Він зберіг секрет."}]}</json> dasfsdaf'


        if (!message) {
            return new NextResponse("No response", {status: 400});
        }

        const extractedJson = extractJson(message)

        if (!extractedJson) {
            return new NextResponse("Something went wrong", {status: 400});
        }

        const sentences =extractedJson['sentences']

        await addDoc(firestoreCollections.examplesLists, {
            word: word,
            sentences: sentences,
            timestamp: serverTimestamp()
        });


        return new NextResponse("OK", {status: 200})
        // return NextResponse.json(message)
    } catch (error) {
        console.log('[CONVERSATION_ERROR]', error);
        return new NextResponse("Internal Error", {status: 500});
    }
}
