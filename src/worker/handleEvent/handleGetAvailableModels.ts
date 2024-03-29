import {
    GetAvailableModelsEvent,
    GetAvailableModelsEventResponse,
    EventStatus
} from "@/types/Event";

import { getProvider } from "../aiProviders";
import getErrorAsString from "@/utils/getErrorAsString";

export default async function handleGetAvailableModels(
    event: GetAvailableModelsEvent
): Promise<GetAvailableModelsEventResponse> {
    const status: EventStatus = {
        success: false
    };

    const requestedProvider = event.content?.provider;

    const eventResponse: GetAvailableModelsEventResponse = {
        type: "getAvailableModels",
        status
    };

    try {
        const provider = await getProvider(requestedProvider);

        eventResponse.response = { models: await provider.listModels() };

        status.success = true;
    } catch (error) {
        console.warn(error);
        status.message =
            getErrorAsString(error) || "Unable to get available models";
    }

    return eventResponse;
}
