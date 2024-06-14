import sendNotification from "@/utils/sendNotification";
import tabAlreadyHasScript from "./tabAlreadyHasScript";
import getWelcomePageUrl from "@/utils/getWelcomePageUrl";

export default async function insertScript(tabId: number, tabUrl?: string) {
    if (!tabId) return;

    const isWelcomePage = tabUrl === getWelcomePageUrl();
    if (isWelcomePage) {
        await chrome.tabs.sendMessage(tabId, {
            type: "showChatOnWelcomePage"
        });

        // This is only relevant if the chat has already been inserted
        await chrome.tabs.sendMessage(tabId, {
            type: "openChat"
        });

        return;
    }

    const chatAlreadyInserted = await tabAlreadyHasScript(tabId);
    if (chatAlreadyInserted) {
        await chrome.tabs.sendMessage(tabId, {
            type: "openChat"
        });

        sendNotification(
            "Unable to insert chat again",
            "This page should already have the KweryAI chat inserted. If you cannot find it, please try reloading the page and then inserting again"
        );
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
