import { SettingsStatus } from "@/types/Settings";
import { GetSettingsStatusEventResponse, EventStatus } from "@/types/Event";

import getErrorAsString from "@/utils/getErrorAsString";
import hasProviderAndApiKey from "@/worker/utils/hasProviderAndApiKey";

export default async function handleGetSettingsStatus(): Promise<GetSettingsStatusEventResponse> {
    const status: EventStatus = {
        success: false
    };

    let response: SettingsStatus | undefined;

    try {
        response = {
            hasCompletedSetup: await hasProviderAndApiKey()
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
