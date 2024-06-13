import sendNotification from "@/utils/sendNotification";

export default async function insertScript(tabId: number, tabUrl?: string) {
    if (!tabId) return;

    if (await tabAlreadyHasScript(tabId)) {
        return;
    }

    if (tabUrl) {
        const isChromePage = tabUrl?.startsWith("chrome://");
        if (isChromePage) {
            sendNotification(
                "Unable to insert chat",
                "Unfortunately KweryAI does not work on Chrome pages"
            );
            return;
        }
    }

    await chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["js/script.js", "js/chunk-vendors.js"]
    });
}

async function tabAlreadyHasScript(tabId: number) {
    try {
        const response = await chrome.tabs.sendMessage(tabId, {
            type: "ping"
        });

        return response && response.active;
    } catch {
        return false;
    }
}
