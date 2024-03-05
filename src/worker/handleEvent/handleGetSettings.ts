import { Settings } from "@/types/Settings";
import { GetSettingsEventResponse, EventStatus } from "@/types/Event";

import getErrorAsString from "@/utils/getErrorAsString";
import { getSelectedProvider } from "@/worker/storage/selectedProvider";
import { getSelectedModel } from "@/worker/storage/selectedModel";
import { getObfuscatedApiKeys } from "@/worker/storage/apiKey";

export default async function handleGetSettings(): Promise<GetSettingsEventResponse> {
    const status: EventStatus = {
        success: false
    };

    let response: Settings | undefined;

    try {
        const provider = await getSelectedProvider();
        const model = await getSelectedModel(provider);
        const obfuscatedApiKeys = await getObfuscatedApiKeys();

        response = {
            provider,
            model,
            obfuscatedApiKeys
        };

        status.success = true;
    } catch (error) {
        status.message = getErrorAsString(error) || "Unable to get settings";
    }

    return {
        type: "getSettingsResponse",
        status,
        response
    };
}
