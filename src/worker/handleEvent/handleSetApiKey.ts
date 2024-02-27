import { SetApiKeyEvent, SetApiKeyEventResponse } from "@/types/Event";

import { setApiKey } from "../storage/apiKey";
import { getProvider } from "../aiProviders";

export default async function handleSetApiKey(
    event: SetApiKeyEvent
): Promise<SetApiKeyEventResponse> {
    const provider = await getProvider();

    const { apiKey } = event.content;
    const isKeyValid = await provider.validateApiKey(apiKey);
    if (isKeyValid) {
        await setApiKey(event.content.apiKey);
    }

    return {
        type: "setApiKeyResponse",
        response: {
            isKeyValid
        }
    };
}
