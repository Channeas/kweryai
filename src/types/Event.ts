import { Conversation } from "./Conversation";

export type GetCompletionEvent = {
    type: "getCompletion";
    content: {
        text: string;
    };
};

export type GetCompletionEventResponse = {
    type: "getCompletionResponse";
    response: {
        completion: string;
    };
};

export type GetConversationEvent = {
    type: "getConversation";
};

export type GetConversationEventResponse = {
    type: "getConversationResponse";
    response: {
        conversation: Conversation;
    };
};

export type SetApiKeyEvent = {
    type: "setApiKey";
    content: {
        apiKey: string;
    };
};

export type SetApiKeyEventResponse = {
    type: "setApiKeyResponse";
    response: {
        isKeyValid: boolean;
    };
};

export type SetConversationEvent = {
    type: "setConversation";
    content: {
        conversation: Conversation;
    };
};

export type SetConversationEventResponse = {
    type: "setConversationResponse";
    response: {
        success: boolean;
    };
};

export type Event =
    | GetCompletionEvent
    | GetConversationEvent
    | SetApiKeyEvent
    | SetConversationEvent;

export type EventResponse =
    | GetCompletionEventResponse
    | GetConversationEventResponse
    | SetApiKeyEventResponse
    | SetConversationEventResponse;
