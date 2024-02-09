import { GetCompletionEvent, GetCompletionEventResponse } from "@/types/Event";

export default async function handleGetCompletion(
    event: GetCompletionEvent
): Promise<GetCompletionEventResponse> {
    console.log("handleGetCompletion", event.content);

    // TODO: Implement completions

    return {
        type: "getCompletionResponse",
        response: {
            completion: "response 4242"
        }
    };
}
