// Filename: pages/api/export-data.ts
import {NextResponse} from "next/server";

export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json();
        const {sentences} = body;
        let string = '';

        // @ts-ignore
        sentences.forEach((sentence) => {
            string += sentence.sentence + '\t' + sentence.translation + '\n';
        });

        return NextResponse.json(string);
    } catch (error) {
        console.error('[EXPORT_DATA_ERROR]', error);
        return new NextResponse("Internal Error", {status: 500});
    }
}
