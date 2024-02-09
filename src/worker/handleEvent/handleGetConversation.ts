import { Conversation } from "@/types/Conversation";
import {
    GetConversationEvent,
    GetConversationEventResponse
} from "@/types/Event";

import { getConversation } from "../storage/conversation";

export default async function handleGetConversation(
    event: GetConversationEvent,
    sender: chrome.runtime.MessageSender
): Promise<GetConversationEventResponse> {
    let conversation = createEmptyConversation();

    const conversationId = sender?.tab?.id?.toString();
    if (conversationId) {
        const storedConversation = await getConversation(conversationId);
        if (storedConversation) {
            conversation = storedConversation;
        }
    }

    return {
        type: "getConversationResponse",
        response: {
            conversation
        }
    };
}

function createEmptyConversation(): Conversation {
    return {
        messages: []
    };
}
