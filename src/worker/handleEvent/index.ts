import { Event, EventResponse } from "@/types/Event";

import handleGetCompletion from "./handleGetCompletion";
import handleSetApiKey from "./handleSetApiKey";
import handleGetConversation from "./handleGetConversation";
import handleSetConversation from "./handleSetConversation";

type ResponseCallback = (response?: EventResponse) => void;

export default async function handleEvent(
    event: Event,
    sender: chrome.runtime.MessageSender,
    sendResponse: ResponseCallback
) {
    console.log("Message received", event, sender, sendResponse);

    const response = await routeEventToHandler(event, sender);
    if (response) {
        sendResponse(response);
    } else {
        sendResponse();
    }
}

async function routeEventToHandler(
    event: Event,
    sender: chrome.runtime.MessageSender
): Promise<EventResponse> {
    switch (event.type) {
        case "getCompletion":
            return await handleGetCompletion(event);
        case "getConversation":
            return await handleGetConversation(event, sender);
        case "setApiKey":
            return await handleSetApiKey(event);
        case "setConversation":
            return await handleSetConversation(event, sender);
    }

    // TODO: Throw error if there was no matching event?
}
