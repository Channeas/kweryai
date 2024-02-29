import {
    SetConversationEvent,
    SetConversationEventResponse,
    EventStatus
} from "@/types/Event";

import { setConversation } from "../storage/conversation";
import getErrorAsString from "@/utils/getErrorAsString";

export default async function handleSetConversation(
    event: SetConversationEvent,
    sender: chrome.runtime.MessageSender
): Promise<SetConversationEventResponse> {
    const status: EventStatus = {
        success: false
    };

    const conversationId = sender?.tab?.id?.toString();
    if (conversationId) {
        try {
            await setConversation(conversationId, event.content.conversation);
            status.success = true;
        } catch (error) {
            console.error("Unable to save conversation", error, sender);
            status.message =
                getErrorAsString(error) || "Unable to save conversation";
        }
    }

    return {
        type: "setConversationResponse",
        status
    };
}
