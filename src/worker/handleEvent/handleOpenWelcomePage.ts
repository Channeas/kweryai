import { OpenWelcomePageEventResponse, EventStatus } from "@/types/Event";

import getErrorAsString from "@/utils/getErrorAsString";
import openWelcomePage from "../utils/openWelcomePage";

export default async function handleOpenWelcomePage(): Promise<OpenWelcomePageEventResponse> {
    const status: EventStatus = {
        success: false
    };

    try {
        openWelcomePage();

        status.success = true;
    } catch (error) {
        status.message =
            getErrorAsString(error) || "Unable to open welcome page";
    }

    return {
        type: "openWelcomePageResponse",
        status
    };
}
