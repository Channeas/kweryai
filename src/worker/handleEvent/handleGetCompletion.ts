import {
    GetCompletionEvent,
    GetCompletionEventResponse,
    EventStatus
} from "@/types/Event";

import { getProvider } from "../aiProviders";
import getErrorAsString from "@/utils/getErrorAsString";

export default async function handleGetCompletion(
    event: GetCompletionEvent
): Promise<GetCompletionEventResponse> {
    const status: EventStatus = {
        success: false
    };

    const { conversation, pageContext } = event.content;

    const response = {
        completion: ""
    };

    try {
        const provider = await getProvider();

        response.completion = await provider.getCompletion(
            conversation,
            pageContext
        );
        status.success = true;
    } catch (error) {
        status.message = getErrorAsString(error) || "Unable to get completion";
    }

    return {
        type: "getCompletionResponse",
        response,
        status
    };
}
