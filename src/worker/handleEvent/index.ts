import { Event, EventResponse } from "@/types/Event";

import handleClearApiKey from "./handleClearApiKey";
import handleGetCompletion from "./handleGetCompletion";
import handleGetConversation from "./handleGetConversation";
import handleGetSettings from "./handleGetSettings";
import handleSetApiKey from "./handleSetApiKey";
import handleSetConversation from "./handleSetConversation";
import handleSetSettings from "./handleSetSettings";

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
        case "clearApiKey":
            return await handleClearApiKey(event);
        case "getCompletion":
            return await handleGetCompletion(event);
        case "getConversation":
            return await handleGetConversation(event, sender);
        case "getSettings":
            return await handleGetSettings();
        case "setApiKey":
            return await handleSetApiKey(event);
        case "setConversation":
            return await handleSetConversation(event, sender);
        case "setSettings":
            return await handleSetSettings(event);
    }

    // TODO: Throw error if there was no matching event?
}
