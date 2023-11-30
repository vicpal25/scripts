import { Environment } from './interfaces/Environment';
import { OpenAIConnector } from './dataAccess/OpenAIConnector';
import * as dotenv from 'dotenv';
import { log } from 'console';
dotenv.config();

//Load .env variables
function getEnvironmentVariables(): Environment {
    if (!process.env.OPENAI_API_DAVINCI_URL || !process.env.OPENAI_API_KEY) {
        throw new Error("Required environment variable is missing");
    }

    return {
        OPENAI_API_DAVINCI_URL: process.env.OPENAI_API_DAVINCI_URL,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY
    };
}

const env = getEnvironmentVariables();

function main(): void {

    const openAIConnector = new OpenAIConnector(env.OPENAI_API_KEY);

    openAIConnector.generatePrompt("What is the following article about? https://www.motortrend.com/reviews/2024-bmw-x6-first-drive-review/ and summarize it in a paragraph.")
        .then(response => {
            const choices = response?.choices;
            choices.forEach(entry => {
                log(entry.message?.content)
            });
        })
        .catch(error => console.error(error));

}

main();
