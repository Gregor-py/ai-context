import * as z from 'zod'

export const pasteJsonSchema = z.object({
    jsonMessage: z.string().min(1, {
        message: 'json is required'
    })
})