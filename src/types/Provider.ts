import { Conversation } from "@/types/Conversation";

export const allProviderKeys = ["openai"] as const;

export type ProviderKey = (typeof allProviderKeys)[number];

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
