import {
    SetApiKeyEvent,
    SetApiKeyEventResponse,
    EventStatus
} from "@/types/Event";

import { setApiKey } from "../storage/apiKey";
import { getProvider } from "../aiProviders";
import getErrorAsString from "@/utils/getErrorAsString";

export default async function handleSetApiKey(
    event: SetApiKeyEvent
): Promise<SetApiKeyEventResponse> {
    const status: EventStatus = {
        success: false
    };

    try {
        const provider = await getProvider();

        const { apiKey } = event.content;
        const isKeyValid = await provider.validateApiKey(apiKey);
        if (isKeyValid) {
            await setApiKey(event.content.apiKey);
            status.success = true;
        } else {
            // TODO: Get error message from the provider
            status.message = "API key does not work";
        }
    } catch (error) {
        status.message = getErrorAsString(error) || "Unable to set API key";
    }

    return {
        type: "setApiKeyResponse",
        status
    };
}
