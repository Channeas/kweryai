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

export type Event = GetCompletionEvent | SetApiKeyEvent;
export type EventResponse = GetCompletionEventResponse | SetApiKeyEventResponse;
