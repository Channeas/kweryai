import { ProviderKey } from "./Provider";

export type ApiKeysObject = Partial<Record<ProviderKey, string>>;

export type Settings = {
    model: string;
    provider: ProviderKey;
    obfuscatedApiKeys: ApiKeysObject;
};

export type SettingsToUpdate = Partial<Settings>;
