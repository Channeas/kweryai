import { SetApiKeyEvent, SetApiKeyEventResponse } from "@/types/Event";

export default async function handleSetApiKey(
    event: SetApiKeyEvent
): Promise<SetApiKeyEventResponse> {
    console.log("setApiKey", event);

    // TODO: Validate API key

    await chrome.storage.local.set({
        kweryOpenaiApiKey: event.content.apiKey
    });

    return {
        type: "setApiKeyEventResponse",
        response: {
            isKeyValid: true
        }
    };
}

export async function getApiKey() {
    const apiKey = await chrome.storage.local.get("kweryOpenaiApiKey");
    return apiKey;
}
