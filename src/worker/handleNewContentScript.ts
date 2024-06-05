import { addExtensionTabIds } from "@/worker/storage/extensionTabIds";

export default async function handleNewContentScript(
    sender: chrome.runtime.MessageSender
) {
    if (sender.tab?.id) {
        await addExtensionTabIds(sender.tab.id);
    }
}
