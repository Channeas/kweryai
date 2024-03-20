<template>
    <div class="kwery-settings">
        <!-- TODO: Enable this when there are more providers available -->
        <ProviderSection v-model="selectedProviderKey" v-if="false" />
    </div>
</template>

<script setup lang="ts">
import { ProviderKey } from "@/types/Provider";
import { SettingsToUpdate } from "@/types/Settings";

import { nextTick, ref, watch } from "vue";

import sendEvent from "@/utils/sendEvent";
import ProviderSection from "./sections/ProviderSection.vue";

const hasLoadedSettings = ref(false);

const selectedProviderKey = ref<ProviderKey>();

watch(selectedProviderKey, () => {
    if (!hasLoadedSettings.value) {
        return;
    }

    updateSettings({ provider: selectedProviderKey.value });
});

async function loadSettings() {
    const settingsEvent = await sendEvent({
        type: "getSettings"
    });

    const { type, status } = settingsEvent;
    if (type !== "getSettingsResponse" || !status.success) {
        // TODO: Handle error messages
        return;
    }

    const { response: initialSettings } = settingsEvent;

    if (!initialSettings) {
        // TODO: Show an error message?
        return;
    }

    selectedProviderKey.value = initialSettings.provider;

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
}
</style>
