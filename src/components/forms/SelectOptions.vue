<template>
    <div class="select-options-container" :style="{ 'max-height': maxHeight }">
        <button
            v-for="option of options"
            :key="option.key"
            @click="$emit('selected', option)"
            class="select-option"
            :class="{
                'select-option-hightlighted':
                    highlightedOption && highlightedOption.key === option.key
            }"
        >
            {{ option.label }}
        </button>
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import { SelectOption } from "./types";

const props = withDefaults(
    defineProps<{
        options: SelectOption[];
        highlightedOption?: SelectOption;
        numberOfVisibleOptions?: number;
    }>(),
    { numberOfVisibleOptions: 4 }
);

defineEmits<{
    selected: [option: SelectOption];
}>();

const maxHeight = computed(() => {
    const optionHeightInPixels = 32;
    return `${optionHeightInPixels * props.numberOfVisibleOptions}px`;
});

/* TODO: Keyboard selection */
</script>

<style scoped>
.select-options-container {
    width: calc(100% - 2px);
    position: absolute;
    overflow-y: auto;
    box-shadow: var(--kwery-shadow-1);
    background-color: var(--kwery-color-background-primary);
    border: var(--kwery-border);
}

.select-options-container,
.select-option:last-child {
    /* TODO: Standardize */
    border-radius: 0 0 var(--kwery-border-radius-small)
        var(--kwery-border-radius-small);
}

.select-option {
    width: 100%;
    border: none;
    padding: var(--kwery-whitespace-small);
    text-align: left;
    cursor: pointer;
    background-color: var(--kwery-color-background-primary);
    transition: var(--kwery-transition-fast);
}

.select-option-hightlighted {
    /* TODO: Rework colors - make this darker? */
    background-color: #f3f4f6;
}

.select-option:hover {
    /* TODO: Rework colors */
    background-color: #f3f4f6;
}
</style>
