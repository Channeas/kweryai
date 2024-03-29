import {
    ClearApiKeyEvent,
    ClearApiKeyEventResponse,
    EventStatus
} from "@/types/Event";

import { clearAllApiKeys, clearSingleApiKey } from "../storage/apiKey";
import getErrorAsString from "@/utils/getErrorAsString";

export default async function handleClearApiKey(
    event: ClearApiKeyEvent
): Promise<ClearApiKeyEventResponse> {
    const status: EventStatus = {
        success: false
    };

    const { clearAll, provider } = event.content;

    try {
        if (!(clearAll || provider)) {
            throw new Error(
                "Either a provider or `clearAll: true` is required to clear API keys"
            );
        }

        if (clearAll) {
            await clearAllApiKeys();
        } else if (provider) {
            await clearSingleApiKey(provider);
        }

        status.success = true;
    } catch (error) {
        const errorMessageSuffix = clearAll
            ? "s"
            : ` for provider "${provider}"`;

        status.message =
            getErrorAsString(error) ||
            `Unable to clear API key${errorMessageSuffix}`;
    }

    return {
        type: "clearApiKey",
        status
    };
}
