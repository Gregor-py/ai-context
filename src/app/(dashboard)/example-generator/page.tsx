"use client";

import * as z from "zod"

import {Heading} from "@/components/heading";
import {WholeWordIcon} from "lucide-react";
import {useForm} from "react-hook-form";
import {formSchema} from "./constans";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import axios from "axios";
import {useEffect, useState} from "react";
import {collection, limit, onSnapshot, orderBy, query} from "@firebase/firestore";
import {db, ExamplesListType, firestoreCollections} from "@/firebase";
import {ExamplesList} from "@/components/examples-list";


export default function ExampleGeneratorPage() {
    const [examplesLists, setExamplesLists] = useState<ExamplesListType[] | null>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            word: ""
        }
    });

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const response = await axios.post('/api/example-generator', {word: values.word});
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(query(firestoreCollections.examplesLists, orderBy('timestamp', 'desc'), limit(10)), (querySnapshot) => {
            const aiRequestsArray: ExamplesListType[] = [];
            querySnapshot.forEach(doc => {
                aiRequestsArray.push({...doc.data() as ExamplesListType})
            })

            setExamplesLists(aiRequestsArray);
        })
    }, [])

    return (
        <div>
            <Heading
                title={'Example generator'}
                description={'Generate your own personal examples of how to use a particular word'}
                icon={WholeWordIcon}
                iconColor={'text-green-500'}
                bgColor={'bg-green-100'}
            />
            <div className={'px-4 lg:px-8'}>
                <div>
                    <Form {...form} >
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className={'rounded-lg border w-full p-4 px-3 md:px6 focus-within:shadow-sm grid grid-cols-12 gap-2'}
                        >
                            <FormField name={'word'} render={({field}) => (
                                <FormItem className={'col-span-12 lg:col-span-10'}>
                                    <FormControl className={'m-0 p-0'}>
                                        <Input className={'border-0 outline-none focus-visible:ring-transparent'}
                                               disabled={isLoading} placeholder={'Word'} {...field}/>
                                    </FormControl>
                                </FormItem>
                            )}/>
                            <Button className={'col-span-12 lg:col-span-2 w-full'}
                                    disabled={isLoading}>Generate</Button>
                        </form>
                    </Form>
                </div>
                <div className={'space-y-10 mt-4'}>
                    {examplesLists && examplesLists.map((examplesList, id) => (
                        <ExamplesList key={examplesList.timestamp} word={examplesList.word}
                                      sentences={examplesList.sentences} timestamp={examplesList.timestamp}/>
                    ))}
                </div>
            </div>
        </div>
    )
}