import { getSelectedProvider } from "@/worker/storage/selectedProvider";
import { getObfuscatedApiKeys } from "@/worker/storage/apiKey";

export default async function hasProviderAndApiKey() {
    const provider = await getSelectedProvider();
    if (!provider) return false;

    const { [provider]: apiKeyForProvider } = await getObfuscatedApiKeys([
        provider
    ]);

    return !!apiKeyForProvider;
}
