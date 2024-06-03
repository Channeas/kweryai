<template>
    <div class="kwery-settings-api-key-section">
        <!-- TODO: Remove OpenAI from the label when adding more providers -->
        <label>OpenAI API key</label>
        <InputField v-model="apiKey" :placeholder="placeholder" />

        <div class="kwery-settings-api-key-buttons">
            <StandardButton
                @click="handleSave"
                :style="'primary'"
                :disabled="saveButtonDisabled"
            >
                Save key
            </StandardButton>
            <StandardButton
                @click="handleClear"
                :disabled="clearButtonDisabled"
                :style="'danger'"
                >Clear key</StandardButton
            >
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

import InputField from "@/components/forms/InputField.vue";
import StandardButton from "@/components/forms/StandardButton.vue";

const props = defineProps<{
    placeholder?: string;
}>();

const apiKey = ref<string>();

const saveButtonDisabled = computed(
    () => !apiKey.value || apiKey.value.length == 0
);

const clearButtonDisabled = computed(() => !props.placeholder);

const emit = defineEmits<{
    saveApiKey: [string];
    clearApiKey: [];
}>();

function handleSave() {
    if (apiKey.value) {
        emit("saveApiKey", apiKey.value);
        apiKey.value = "";
    }
}

function handleClear() {
    emit("clearApiKey");
}
</script>

<style scoped>
.kwery-settings-api-key-section {
    display: flex;
    flex-direction: column;
    gap: var(--kwery-whitespace-small);
}

.kwery-settings-api-key-buttons {
    display: flex;
    gap: var(--kwery-whitespace-large);
    padding-top: var(--kwery-whitespace-small);
}

.kwery-settings-api-key-buttons button {
    flex: 1;
}
</style>
