<template>
    <div class="kwery-settings-provider-section">
        <label>AI provider</label>
        <SelectDropdown
            v-model="selectedProviderOption"
            description="Select a provider"
            :options="providerOptions"
        />
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { ProviderKey } from "@/types/Provider";
import SelectDropdown from "@/components/forms/SelectDropdown.vue";

type ProviderOption = {
    key: ProviderKey;
    label: string;
};

const providerOptions = ref<ProviderOption[]>([
    {
        key: "openai",
        label: "OpenAI"
    }
    // {
    //     key: "antropic",
    //     label: "Antropic"
    // },
    // {
    //     key: "cohere",
    //     label: "Cohere"
    // },
    // {
    //     key: "mistral",
    //     label: "Mistral"
    // }
]);

const providerOptionsMappedToKey: Partial<Record<ProviderKey, ProviderOption>> =
    Object.fromEntries(
        providerOptions.value.map((option) => [option.key, option])
    );

const selectedProviderOption = ref<ProviderOption>();

const selectedProviderKey = defineModel<ProviderKey>();

// React to changes to the passed provider key
watch(selectedProviderKey, () => {
    if (selectedProviderKey.value) {
        selectedProviderOption.value =
            providerOptionsMappedToKey[selectedProviderKey.value];
    }
});

// Emit local changes
watch(selectedProviderOption, () => {
    if (
        selectedProviderOption.value &&
        selectedProviderOption.value.key !== selectedProviderKey.value
    ) {
        selectedProviderKey.value = selectedProviderOption.value.key;
    }
});
</script>

<style scoped>
.kwery-settings-provider-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

label {
    font-size: 14px;
}
</style>
