import { SetApiKeyEvent, SetApiKeyEventResponse } from "@/types/Event";

import { setApiKey } from "../storage/apiKey";

export default async function handleSetApiKey(
    event: SetApiKeyEvent
): Promise<SetApiKeyEventResponse> {
    console.log("setApiKey", event);

    // TODO: Validate API key

    await setApiKey(event.content.apiKey);

    return {
        type: "setApiKeyResponse",
        response: {
            isKeyValid: true
        }
    };
}
