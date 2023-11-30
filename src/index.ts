import * as express from 'express';
import bodyParser from 'body-parser';
import { Environment } from './interfaces/Environment';
import { OpenAIConnector } from './dataAccess/OpenAIConnector';
import * as dotenv from 'dotenv';
import { log } from 'console';
dotenv.config();

const PORT = process.env.PORT || 3000;
// Initialize Express
const app = express();
app.use(express.json()); 
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

// function main(): void {

//     const openAIConnector = new OpenAIConnector(env.OPENAI_API_KEY);

//     openAIConnector.generatePrompt("What is the following article about? https://www.motortrend.com/reviews/2024-bmw-x6-first-drive-review/ and summarize it in a paragraph.")
//         .then(response => {
//             const choices = response?.choices;
//             choices.forEach(entry => {
//                 log(entry.message?.content)
//             });
//         })
//         .catch(error => console.error(error));

// }

// main();

// POST endpoint to generate prompts
app.post('/generate-prompt', async (req, res) => {
    const { prompt } = req.body;

    try {
        const openAIConnector = new OpenAIConnector(env.OPENAI_API_KEY);
        openAIConnector.generatePrompt(prompt)
            .then(response => {
                const choices = response?.choices;
                choices.forEach(entry => {
                    res.json(entry.message?.content)
                });
            })
            .catch(error => console.error(error));

    } catch (error) {
        console.error('Error generating prompt:', error);
        res.status(500).send('Error generating prompt');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
