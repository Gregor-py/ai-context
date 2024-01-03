export const getGenerateExamplePrompt = (word: string) => {
    return `
Please, write 5 sentences with the German word: ${word} and write the same sentence but in Ukrainian language. 
You have to cling onto all the rules, regulations of the grammar and other sides of the languages.
The sentences should be interesting, the word should be used correctly, and the sentences should be grammatically correct.

    
## Format
Mark the word in bold using a html tag "<b></b>" in the German text and translation. 
Do not write anything beside the sentences except the sentence and translation. 
Write the sentence and translation in the following json format {"sentences": [{"sentence": "Here is the sentence", "translation": "Here is the ukrainian text"}]}  
Wrap all json in this tag "<json></json"

!! Do not forget to wrap the word in the sentence with html tag "<b></b>"
    `
}