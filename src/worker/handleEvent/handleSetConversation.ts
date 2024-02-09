import {
    SetConversationEvent,
    SetConversationEventResponse
} from "@/types/Event";

import { setConversation } from "../storage/conversation";

export default async function handleSetConversation(
    event: SetConversationEvent,
    sender: chrome.runtime.MessageSender
): Promise<SetConversationEventResponse> {
    let success = false;

    const conversationId = sender?.tab?.id?.toString();
    if (conversationId) {
        try {
            await setConversation(conversationId, event.content.conversation);
            success = true;
        } catch (error) {
            console.warn("Unable to save conversation", error, sender);
        }
    }

    return {
        type: "setConversationResponse",
        response: {
            success
        }
    };
}
