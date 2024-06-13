export default async function insertScript(tabId: number) {
    if (await tabAlreadyHasScript(tabId)) {
        return;
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
