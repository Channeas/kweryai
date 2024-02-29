import { Conversation } from "@/types/Conversation";
import {
    GetConversationEvent,
    GetConversationEventResponse,
    EventStatus
} from "@/types/Event";

import { getConversation } from "../storage/conversation";
import getErrorAsString from "@/utils/getErrorAsString";

export default async function handleGetConversation(
    event: GetConversationEvent,
    sender: chrome.runtime.MessageSender
): Promise<GetConversationEventResponse> {
    const status: EventStatus = {
        success: false
    };

    let conversation = createEmptyConversation();

    try {
        const conversationId = sender?.tab?.id?.toString();
        if (conversationId) {
            // TODO: Implement error handling
            const storedConversation = await getConversation(conversationId);
            if (storedConversation) {
                conversation = storedConversation;
            }
        }

        status.success = true;
    } catch (error) {
        status.message =
            getErrorAsString(error) || "Unable to get conversation";
    }

    return {
        type: "getConversationResponse",
        response: {
            conversation
        },
        status
    };
}

function createEmptyConversation(): Conversation {
    return {
        messages: []
    };
}
