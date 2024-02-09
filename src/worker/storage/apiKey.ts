export async function setApiKey(apiKey: string) {
    await chrome.storage.local.set({
        kweryOpenaiApiKey: apiKey
    });
}

export async function getApiKey() {
    const { kweryOpenaiApiKey: apiKey } =
        await chrome.storage.local.get("kweryOpenaiApiKey");
    return apiKey;
}
