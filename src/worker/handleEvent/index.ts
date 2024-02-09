import { Event, EventResponse } from "@/types/Event";
import handleGetCompletion from "./handleGetCompletion";
import handleSetApiKey from "./handleSetApiKey";

type ResponseCallback = (response?: EventResponse) => void;

export default async function handleEvent(
    event: Event,
    sender: chrome.runtime.MessageSender,
    sendResponse: ResponseCallback
) {
    console.log("Message received", event, sender, sendResponse);

    const response = await routeEventToHandler(event);
    if (response) {
        sendResponse(response);
    } else {
        sendResponse();
    }
}

async function routeEventToHandler(event: Event): Promise<EventResponse> {
    switch (event.type) {
        case "getCompletion":
            return await handleGetCompletion(event);
        case "setApiKey":
            return await handleSetApiKey(event);
    }

    // TODO: Throw error if there was no matching event?
}
