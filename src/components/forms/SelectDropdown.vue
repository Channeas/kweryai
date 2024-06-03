<template>
    <div
        class="select-dropdown"
        :class="{ 'select-dropdown-open': isOptionsVisible }"
    >
        <button
            @click="isOptionsVisible = !isOptionsVisible"
            class="select-dropdown-toggle-button"
            ref="toggleDropdownButton"
            :disabled="disabled"
        >
            {{ selectedOptionLabel }}

            <svg
                class="select-dropdown-toggle-chevron"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
            >
                <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                />
            </svg>
        </button>

        <SelectOptions
            v-if="isOptionsVisible"
            @selected="setSelectedOption"
            :options="options"
            :highlightedOption="selectedOption"
            :numberOfVisibleOptions="numberOfVisibleOptions"
        />
    </div>
</template>

<script lang="ts" setup>
import { SelectOption } from "./types";

import { computed, ref } from "vue";
import SelectOptions from "./SelectOptions.vue";

const props = withDefaults(
    defineProps<{
        description?: string;
        disabled?: boolean;
        numberOfVisibleOptions?: number;
        options: SelectOption[];
    }>(),
    { description: "Select an option" }
);

const selectedOption = defineModel<SelectOption>();

function setSelectedOption(newSelectedOption: SelectOption) {
    selectedOption.value = newSelectedOption;
}

const selectedOptionLabel = computed(() => {
    return (
        (selectedOption.value && selectedOption.value.label) ||
        props.description
    );
});

const isOptionsVisible = ref(false);

const toggleDropdownButton = ref<HTMLButtonElement>();

// Close the dropdown on outside clicks
document.addEventListener("click", (event) => {
    if (!isOptionsVisible.value) {
        return;
    }

    const isClickOnToggleButton = event.target === toggleDropdownButton.value;
    if (!isClickOnToggleButton) {
        // TODO: Abstract to a function
        isOptionsVisible.value = false;
    }
});

document.addEventListener("keyup", (keyupEvent) => {
    if (!isOptionsVisible.value) {
        return;
    }

    if (keyupEvent.key === "Escape") {
        isOptionsVisible.value = false;
    }
});

// TODO: Arrow navigation?
</script>

<style scoped>
.select-dropdown {
    position: relative;
}

.select-dropdown-toggle-button {
    width: 100%;
    padding: var(--kwery-whitespace-small);
    text-align: left;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
    background-color: var(--kwery-color-background-primary);
    box-shadow: var(--kwery-shadow-1);
    border: var(--kwery-border);
    border-radius: var(--kwery-border-radius-small);
    transition: var(--kwery-transition);
    color: var(--kwery-color-text-primary);
}

.select-dropdown-toggle-button:hover {
    background-color: var(--kwery-color-background-gray);
}

.select-dropdown-toggle-button:disabled {
    cursor: not-allowed;
}

.select-dropdown-toggle-chevron {
    height: 20px;
    width: 20px;
    pointer-events: none;
    transition: var(--kwery-transition);
}

.select-dropdown-open .select-dropdown-toggle-chevron {
    rotate: 180deg;
}
</style>
