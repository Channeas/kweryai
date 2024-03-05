import { Conversation } from "./Conversation";
import { Settings } from "./Settings";

export type EventStatus = {
    success: boolean;
    message?: string;
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

export type Event =
    | GetCompletionEvent
    | GetConversationEvent
    | GetSettingsEvent
    | SetApiKeyEvent
    | SetConversationEvent;

export type EventResponse =
    | GetCompletionEventResponse
    | GetConversationEventResponse
    | GetSettingsEventResponse
    | SetApiKeyEventResponse
    | SetConversationEventResponse;
