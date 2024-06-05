import {
    getExtensionTabIds,
    removeExtensionTabIds
} from "@/worker/storage/extensionTabIds";

export default async function sendMessageToExtensionTabs(message: unknown) {
    const extensionTabIds = await getExtensionTabIds();

    const brokenTabIds = [];
    for (const tabId of extensionTabIds) {
        try {
            await chrome.tabs.sendMessage(tabId, message);
        } catch {
            // Due to some problems with the build process, .push for some reason crashes the service worker
            // As such, I use unshift instead. The order does not matter
            brokenTabIds.unshift(tabId);
        }
    }

    await removeExtensionTabIds(brokenTabIds);
}
