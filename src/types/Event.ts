import { Conversation } from "./Conversation";
import { Settings, SettingsToUpdate } from "./Settings";
import { ProviderKey } from "./Provider";

export type EventStatus = {
    success: boolean;
    message?: string;
};

export type ClearApiKeyEvent = {
    type: "clearApiKey";
    content: {
        provider?: ProviderKey;
        clearAll?: boolean;
    };
};

export type ClearApiKeyEventResponse = {
    type: "clearApiKey";
    status: EventStatus;
};

export type GetAvailableModelsEvent = {
    type: "getAvailableModels";
    content?: {
        // If no provider is passed, the currently selected provider is used
        provider?: ProviderKey;
    };
};

export type GetAvailableModelsEventResponse = {
    type: "getAvailableModels";
    status: EventStatus;
    response?: {
        models: string[];
    };
};

export type GetCompletionEvent = {
    type: "getCompletion";
    content: {
        conversation: Conversation;
        pageContext: string;
    };
};

export type GetCompletionEventResponse = {
    type: "getCompletionResponse";
    // TODO: Directly return the completion in response?
    response: {
        completion?: string;
    };
    status: EventStatus;
};

export type GetConversationEvent = {
    type: "getConversation";
};

export type GetConversationEventResponse = {
    type: "getConversationResponse";
    // TODO: Directly return the conversation in response?
    response: {
        conversation: Conversation;
    };
    status: EventStatus;
};

export type GetSettingsEvent = {
    type: "getSettings";
};

export type GetSettingsEventResponse = {
    type: "getSettingsResponse";
    response?: Settings;
    status: EventStatus;
};

export type SetApiKeyEvent = {
    type: "setApiKey";
    content: {
        apiKey: string;
    };
};

export type SetApiKeyEventResponse = {
    type: "setApiKeyResponse";
    status: EventStatus;
};

export type SetConversationEvent = {
    type: "setConversation";
    content: {
        conversation: Conversation;
    };
};

export type SetConversationEventResponse = {
    type: "setConversationResponse";
    status: EventStatus;
};

export type SetSettingsEvent = {
    type: "setSettings";
    content: SettingsToUpdate;
};

export type SetSettingsEventResponse = {
    type: "setSettings";
    status: EventStatus;
};

export type Event =
    | ClearApiKeyEvent
    | GetAvailableModelsEvent
    | GetCompletionEvent
    | GetConversationEvent
    | GetSettingsEvent
    | SetApiKeyEvent
    | SetConversationEvent
    | SetSettingsEvent;

export type EventResponse =
    | ClearApiKeyEventResponse
    | GetAvailableModelsEventResponse
    | GetCompletionEventResponse
    | GetConversationEventResponse
    | GetSettingsEventResponse
    | SetApiKeyEventResponse
    | SetConversationEventResponse
    | SetSettingsEventResponse;
