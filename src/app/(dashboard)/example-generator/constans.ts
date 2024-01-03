import * as z from 'zod'

export const formSchema = z.object({
    word: z.string().min(1, {
        message: 'Prompt is required'
    })
})