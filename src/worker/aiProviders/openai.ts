import { Conversation } from "@/types/Conversation";
import { ApiKeyStatus, Provider } from "@/worker/_types/Provider";

import { getApiKey } from "@/worker/storage/apiKey";
import { getSelectedModel } from "../storage/selectedModel";
import getErrorAsString from "@/utils/getErrorAsString";

const providerKey = "openai";

export class OpenaiProvider implements Provider {
    async getCompletion(conversation: Conversation, pageContext: string) {
        const model = await getSelectedModel(providerKey);
        const messages = this.parseMessages(conversation, pageContext);

        const requestBody = {
            temperature: 1,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            messages,
            model
        };

        const apiKey = await getApiKey();

        const response = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            }
        );

        const parsedResponse = await response.json();

        if (parsedResponse.error) {
            throw new Error(
                parsedResponse.error.message || "Unable to get completion"
            );
        }

        const completion = parsedResponse.choices?.[0]?.message?.content;
        if (!completion) {
            throw new Error(
                `Unable to get completion - please make sure the ${model} model returns text completions`
            );
        }

        return completion;
    }

    async listModels(passedApiKey?: string) {
        const apiKey = passedApiKey || (await getApiKey());

        const response = await fetch("https://api.openai.com/v1/models", {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        });

        const parsedResponse = await response.json();
        if (parsedResponse.error) {
            throw new Error(parsedResponse.error.message);
        }

        const allModels: { id: string }[] = parsedResponse.data;
        return allModels.map((model) => model.id);
    }

    async validateApiKey(apiKeyToTest?: string) {
        const keyStatus: ApiKeyStatus = {
            valid: false
        };

        try {
            const models = await this.listModels(apiKeyToTest);
            keyStatus.valid = models.length > 0;
        } catch (error) {
            // TODO: Respond with the error message
            console.warn(
                "Ran into error while trying to validate api key",
                error
            );

            keyStatus.message =
                getErrorAsString(error) || "API key does not work";
        }

        return keyStatus;
    }

    private parseMessages(conversation: Conversation, context: string) {
        const parsedMessages = conversation.messages.map((message) => ({
            content: message.text,
            role: message.sentByUser ? "user" : "assistant"
        }));

        // TODO: Possibly move to a config file
        const systemMessage = {
            content: `You are a question and answer system. Your job is to succinctly and accurately answer questions based on a context that is given to you. Do not use facts or knowledge that is not part of the given context. If the answer is not in the context, respond with "I cannot tell based on the text on this page"\nDo not make assumptions, everything in your answer has to be explicitly stated in the context.\n\nAnswer the most recent user message. Unless the message says otherwise, respond in at most 3 sentences.\n\nContext: "${context}"`,
            role: "system"
        };

        parsedMessages.unshift(systemMessage);

        return parsedMessages;
    }
}
