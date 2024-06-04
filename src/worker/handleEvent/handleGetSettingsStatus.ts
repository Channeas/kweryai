import { SettingsStatus } from "@/types/Settings";
import { GetSettingsStatusEventResponse, EventStatus } from "@/types/Event";

import getErrorAsString from "@/utils/getErrorAsString";
import { getSelectedProvider } from "@/worker/storage/selectedProvider";
import { getObfuscatedApiKeys } from "@/worker/storage/apiKey";

export default async function handleGetSettings(): Promise<GetSettingsStatusEventResponse> {
    const status: EventStatus = {
        success: false
    };

    let response: SettingsStatus | undefined;

    try {
        const provider = await getSelectedProvider();
        const { [provider]: apiKeyForProvider } = await getObfuscatedApiKeys([
            provider
        ]);

        response = {
            hasCompletedSetup: !!apiKeyForProvider
        };

        status.success = true;
    } catch (error) {
        status.message =
            getErrorAsString(error) ||
            "Unable to get the settings status. If you have not configured the extension, please click the cog icon at the top of this chat window";
    }

    return {
        type: "getSettingsStatusResponse",
        status,
        response
    };
}
