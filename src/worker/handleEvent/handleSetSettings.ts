import {
    SetSettingsEvent,
    SetSettingsEventResponse,
    EventStatus
} from "@/types/Event";

import getErrorAsString from "@/utils/getErrorAsString";
import {
    getSelectedProvider,
    setSelectedProvider
} from "../storage/selectedProvider";
import { setSelectedModel } from "../storage/selectedModel";

export default async function handleSetSettings(
    event: SetSettingsEvent
): Promise<SetSettingsEventResponse> {
    const status: EventStatus = { success: false };

    try {
        const settingsToUpdate = event.content;

        if (settingsToUpdate.provider) {
            await setSelectedProvider(settingsToUpdate.provider);
        }

        if (settingsToUpdate.model) {
            const provider =
                settingsToUpdate.provider || (await getSelectedProvider());
            await setSelectedModel(provider, settingsToUpdate.model);
        }

        status.success = true;
    } catch (error) {
        status.message =
            getErrorAsString(error) || "Unable to get conversation";
    }

    return {
        type: "setSettings",
        status
    };
}
