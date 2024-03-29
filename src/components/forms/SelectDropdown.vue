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
    padding: 8px;
    text-align: left;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;

    /* Tailwind shadow */
    box-shadow:
        0 1px 3px 0 #0000001a,
        0 1px 2px -1px #0000001a;

    /* TODO: Standardize */
    border-radius: 3px;

    /* TODO: Rework colors */
    background-color: #fff;
    border: 1px solid #d1d5db;

    /* TODO: Add universal transition */
    transition: 0.3s;
}

.select-dropdown-toggle-button:hover {
    /* TODO: Rework colors */
    background-color: #f3f4f6;
}

.select-dropdown-toggle-button:disabled {
    cursor: not-allowed;
}

.select-dropdown-toggle-chevron {
    height: 20px;
    width: 20px;
    pointer-events: none;

    /* TODO: Rework colors */
    color: #9ca3af;

    /* TODO: Add universal transition */
    transition: 0.3s;
}

.select-dropdown-open .select-dropdown-toggle-chevron {
    rotate: 180deg;
}
</style>
