export default async function waitForChatReady(
    tabId: number
): Promise<boolean> {
    const maxRetries = 20;
    const retryDelayInMilliseconds = 50;
    let retries = 0;

    while (retries < maxRetries) {
        const response = await chrome.tabs.sendMessage(tabId, {
            type: "isChatReady"
        });
        if (response?.ready) return true;

        retries++;
        await new Promise((resolve) =>
            setTimeout(resolve, retryDelayInMilliseconds)
        );
    }

    return false;
}
