import { OpenSettingsPageEventResponse, EventStatus } from "@/types/Event";

import getErrorAsString from "@/utils/getErrorAsString";

export default async function handleOpenSettingsPage(): Promise<OpenSettingsPageEventResponse> {
    const status: EventStatus = {
        success: false
    };

    try {
        await chrome.runtime.openOptionsPage();

        status.success = true;
    } catch (error) {
        status.message =
            getErrorAsString(error) || "Unable to open settings page";
    }

    return {
        type: "openSettingsPageResponse",
        status
    };
}
