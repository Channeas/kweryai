import { Provider, ProviderKey } from "@/types/Provider";
import { OpenaiProvider } from "./openai";
import { getSelectedProvider } from "@/worker/storage/selectedProvider";

// Due to the way service workers work, this will almost always be empty
// Still, it can improve performance in a handful of cases
const cachedProviders: Map<ProviderKey, Provider> = new Map();

export async function getProvider(
    providerKey?: ProviderKey
): Promise<Provider> {
    const selectedProvider = providerKey || (await getSelectedProvider());

    const storedProvider = cachedProviders.get(selectedProvider);
    if (storedProvider) {
        return storedProvider;
    }

    let initializedProvider: Provider;
    switch (selectedProvider) {
        case "openai":
            initializedProvider = new OpenaiProvider();
            break;
    }

    cachedProviders.set(selectedProvider, initializedProvider);

    return initializedProvider;
}
