import {NextResponse} from "next/server";
import {OpenAI} from "openai";
import {extractJson} from "@/app/api/example-generator/extractJson";
import {addDoc, serverTimestamp} from "@firebase/firestore";
import {firestoreCollections} from "@/firebase";

export async function POST(
    req: Request,
) {
    try {
        const body = await req.json();
        const {jsonMessage} = body;

        if (!jsonMessage) {
            return new NextResponse("No response", {status: 400});
        }

        const extractedJson = extractJson(jsonMessage)

        if (!extractedJson) {
            return new NextResponse("Something went wrong", {status: 400});
        }

        const sentences =extractedJson['sentences']

        await addDoc(firestoreCollections.examplesLists, {
            word: 'JSON PASTE',
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
