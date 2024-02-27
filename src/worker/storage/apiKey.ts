export async function getApiKey(): Promise<string> {
    const { kweryOpenaiApiKey: apiKey } =
        await chrome.storage.local.get("kweryOpenaiApiKey");
    return apiKey;
}

export async function setApiKey(apiKey: string) {
    await chrome.storage.local.set({
        kweryOpenaiApiKey: apiKey
    });
}
