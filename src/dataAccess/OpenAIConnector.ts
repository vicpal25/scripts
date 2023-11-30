import { log } from 'console';
import OpenAI from 'openai';

export class OpenAIConnector {
    private apiKey: string;
    private openai: OpenAI;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.openai = new OpenAI({
            apiKey: this.apiKey
        });
    }

    async generatePrompt(prompt: string, model: string = "gpt-3.5-turbo", maxTokens: number = 150): Promise<OpenAI.Chat.ChatCompletion> {
        try {
            const chatCompletion = await this.openai.chat.completions.create({
                messages: [{ role: 'user', content: prompt }],
                model: 'gpt-3.5-turbo',
              });

            return chatCompletion;

        } catch (error) {
            log("Error calling the OpenAI API:", error);
            throw error;
        }
    }

    // Other methods to interact with different OpenAI endpoints
}
