"use client";

import * as z from "zod"

import {Heading} from "@/components/heading";
import {Brackets, WholeWordIcon} from "lucide-react";
import {useForm} from "react-hook-form";
import {pasteJsonSchema} from "./constans";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function PasteJsonPage() {
    const router = useRouter()
    const form = useForm<z.infer<typeof pasteJsonSchema>>({
        resolver: zodResolver(pasteJsonSchema),
        defaultValues: {
            jsonMessage: ""
        }
    });

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof pasteJsonSchema>) => {
        console.log(values.jsonMessage)
        const response = await axios.post('/api/paste-json', {jsonMessage: values.jsonMessage});
        router.push('/example-generator')
    }

    return (
        <div>
            <Heading
                title={'Paste json'}
                description={'Paste json with your own sentences'}
                icon={Brackets}
                iconColor={'text-yellow-500'}
                bgColor={'bg-yellow-100'}
            />
            <div className={'px-4 lg:px-8'}>
                <div>
                    <Form {...form} >
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className={'rounded-lg border w-full p-4 px-3 md:px6 focus-within:shadow-sm grid grid-cols-12 gap-2'}
                        >
                            <FormField name={'jsonMessage'} render={({field}) => (
                                <FormItem className={'col-span-12 lg:col-span-10'}>
                                    <FormControl className={'m-0 p-0'}>
                                        <Input className={'border-0 outline-none focus-visible:ring-transparent'}
                                               disabled={isLoading} placeholder={'Your json'} {...field}/>
                                    </FormControl>
                                </FormItem>
                            )}/>
                            <Button className={'col-span-12 lg:col-span-2 w-full'}
                                    disabled={isLoading}>Generate</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}