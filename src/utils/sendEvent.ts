import { Event, EventResponse } from "@/types/Event";

export default async function sendEvent(event: Event): Promise<EventResponse> {
    const response = await chrome.runtime.sendMessage({
        isEvent: true,
        eventBody: event
    });

    return response;
}
