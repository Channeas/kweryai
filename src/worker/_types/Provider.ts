import { Conversation } from "@/types/Conversation";

export type ProviderKey = "openai";

export type ApiKeyStatus = {
    valid: boolean;
    message?: string;
};

export abstract class Provider {
    abstract getCompletion(
        conversation: Conversation,
        pageContext: string
    ): Promise<string>;
    abstract listModels(): Promise<string[]>;
    abstract validateApiKey(apiKey?: string): Promise<ApiKeyStatus>;
}
