<template>
    <div class="kwery-settings">
        <ErrorRenderer ref="errorRenderer" absolutePositioning />

        <!-- TODO: Enable this when there are more providers available -->
        <ProviderSection v-model="selectedProviderKey" v-if="false" />

        <ApiKeySection
            @clearApiKey="clearApiKey"
            @saveApiKey="saveApiKey"
            :placeholder="placeholderApiKeyForProvider"
        />
    </div>
</template>

<script setup lang="ts">
import { ProviderKey } from "@/types/Provider";
import { ApiKeysObject, SettingsToUpdate } from "@/types/Settings";

import { computed, nextTick, ref, watch } from "vue";

import sendEvent from "@/utils/sendEvent";

import ErrorRenderer from "@/components/ErrorRenderer.vue";
import ProviderSection from "./sections/ProviderSection.vue";
import ApiKeySection from "./sections/ApiKeySection.vue";

const errorRenderer = ref();

function addError(message: string) {
    // TODO: Handle falsy condition
    if (errorRenderer.value) {
        errorRenderer.value.addError(message);
    }
}

const hasLoadedSettings = ref(false);

const selectedProviderKey = ref<ProviderKey>();

watch(selectedProviderKey, () => {
    if (!hasLoadedSettings.value) {
        return;
    }

    updateSettings({ provider: selectedProviderKey.value });
});

const placeholderApiKeys = ref<ApiKeysObject>();

const placeholderApiKeyForProvider = computed(() => {
    if (!selectedProviderKey.value || !placeholderApiKeys.value) {
        return "";
    }
    return placeholderApiKeys.value[selectedProviderKey.value] || "";
});

async function clearApiKey() {
    if (!selectedProviderKey.value) {
        return;
    }

    const response = await sendEvent({
        type: "clearApiKey",
        content: {
            provider: selectedProviderKey.value
        }
    });

    if (!response.status.success) {
        addError(response.status.message || "Unable to clear API key");
        return;
    }

    await loadSettings();
}

async function saveApiKey(newApiKey: string) {
    const response = await sendEvent({
        type: "setApiKey",
        content: {
            apiKey: newApiKey
        }
    });

    if (!response.status.success) {
        addError(response.status.message || "Unable to save API key");
    }

    // TODO: Show success notification

    await loadSettings();
}

async function loadSettings() {
    // TODO: Remove this reset?
    hasLoadedSettings.value = false;

    const settingsEvent = await sendEvent({
        type: "getSettings"
    });

    const errorMessage = "Unable to load settings";

    const { type, status } = settingsEvent;
    if (type !== "getSettingsResponse" || !status.success) {
        addError(status.message || errorMessage);
        return;
    }

    const { response: initialSettings } = settingsEvent;

    if (!initialSettings) {
        addError(errorMessage);
        return;
    }

    selectedProviderKey.value = initialSettings.provider;
    placeholderApiKeys.value = initialSettings.obfuscatedApiKeys;

    nextTick(() => (hasLoadedSettings.value = true));
}

loadSettings();

async function updateSettings(keysToUpdate: SettingsToUpdate) {
    await sendEvent({
        type: "setSettings",
        content: keysToUpdate
    });
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;

    /* TODO: Remove? */
    min-height: 400px;
}
</style>

<style scoped>
.kwery-settings {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
}
</style>
