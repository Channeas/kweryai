import { GetCompletionEvent, GetCompletionEventResponse } from "@/types/Event";
import { getProvider } from "../aiProviders";

export default async function handleGetCompletion(
    event: GetCompletionEvent
): Promise<GetCompletionEventResponse> {
    console.log("handleGetCompletion", event.content);

    const { conversation, pageContext } = event.content;

    const provider = await getProvider();
    const completion = await provider.getCompletion(conversation, pageContext);

    return {
        type: "getCompletionResponse",
        response: {
            completion
        }
    };
}
