<template>
    <div class="kwery-settings-model-section">
        <label>AI model (loaded dynamically, some will not work)</label>

        <SelectDropdown
            v-model="selectedModelOption"
            :options="availableModels"
            :disabled="!hasApiKeyForProvider"
        />
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

import sendEvent from "@/utils/sendEvent";

import SelectDropdown from "@/components/forms/SelectDropdown.vue";

type ModelOption = {
    key: string;
    label: string;
};

const selectedModel = defineModel<string>();

watch(selectedModel, () => {
    if (selectedModel.value) {
        selectedModelOption.value = {
            key: selectedModel.value,
            label: selectedModel.value
        };
    }
});

const selectedModelOption = ref<ModelOption>();

watch(selectedModelOption, () => {
    if (selectedModelOption.value) {
        selectedModel.value = selectedModelOption.value.key;
    }
});

const availableModels = ref<ModelOption[]>([]);

const emit = defineEmits<{
    addError: [string];
}>();

async function getAvailableModels() {
    const response = await sendEvent({
        type: "getAvailableModels"
    });

    const defaultErrorMessage = "Unable to load available models";
    if (response.type !== "getAvailableModels") {
        emit("addError", defaultErrorMessage);
        return;
    }

    if (!(response.status.success && response.response)) {
        emit("addError", response.status.message || defaultErrorMessage);
        return;
    }

    const models = response.response.models.map((modelString) => ({
        key: modelString,
        label: modelString
    }));

    availableModels.value = models;
}

const props = defineProps<{ hasApiKeyForProvider: boolean }>();

watch(
    () => props.hasApiKeyForProvider,
    () => {
        if (props.hasApiKeyForProvider) {
            getAvailableModels();
        }
    }
);
</script>

<style scoped>
.kwery-settings-model-section {
    display: flex;
    flex-direction: column;
    gap: var(--kwery-whitespace-small);
}

.kwery-settings-model-section label {
    font-size: 14px;
}
</style>
