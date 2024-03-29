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

    /* Tailwind shadow */
    box-shadow:
        0 1px 3px 0 #0000001a,
        0 1px 2px -1px #0000001a;

    /* TODO: Rework colors */
    background-color: #fff;
    border: 1px solid #d1d5db;
}

.select-options-container,
.select-option:last-child {
    /* TODO: Standardize */
    border-radius: 0 0 3px 3px;
}

.select-option {
    width: 100%;
    border: none;
    padding: 8px;
    text-align: left;
    cursor: pointer;

    /* TODO: Rework colors */
    background-color: #fff;

    /* TODO: Add universal transition */
    transition: 0.1s;
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
./types
