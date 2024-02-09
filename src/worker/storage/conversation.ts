import { Conversation } from "@/types/Conversation";

export async function getConversation(
    id: string
): Promise<Conversation | undefined> {
    const key = createKeyFromId(id);

    const { [key]: conversation } = await chrome.storage.session.get(key);
    if (conversation) {
        return JSON.parse(conversation) as Conversation;
    }

    return;
}

export async function setConversation(id: string, conversation: Conversation) {
    const key = createKeyFromId(id);

    await chrome.storage.session.set({
        [key]: JSON.stringify(conversation)
    });
}

function createKeyFromId(id: string) {
    return `conversation-${id}`;
}
