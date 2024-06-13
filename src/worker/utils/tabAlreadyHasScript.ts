export default async function tabAlreadyHasScript(tabId: number) {
    try {
        const response = await chrome.tabs.sendMessage(tabId, {
            type: "ping"
        });

        return response && response.active;
    } catch {
        return false;
    }
}
