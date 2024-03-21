<template>
    <button
        @click="(clickEvent) => $emit('click', clickEvent)"
        class="kwery-standard-button"
        :class="{
            'kwery-primary-button': style === 'primary',
            'kwery-danger-button': style === 'danger'
        }"
        :disabled="disabled"
    >
        <slot></slot>
    </button>
</template>

<script lang="ts" setup>
type ButtonStyles = "primary" | "danger";

defineEmits<{
    click: [Event];
}>();

defineProps<{
    disabled?: boolean;
    style?: ButtonStyles;
}>();
</script>

<style scoped>
.kwery-standard-button {
    padding: 8px;
    cursor: pointer;

    /* TODO: Add universal transition */
    transition: 0.3s;

    /* Tailwind shadow */
    box-shadow:
        0 1px 3px 0 #0000001a,
        0 1px 2px -1px #0000001a;

    /* TODO: Standardize */
    border-radius: 3px;

    /* TODO: Rework colors */
    background-color: #fff;
    border: 1px solid #d1d5db;
}

.kwery-standard-button:disabled {
    opacity: 0.5;
}

.kwery-primary-button {
    /* TODO: Rework colors */
    /* background-color: #4399ff; */
    background-color: #0ea5e9;
    color: #fff;
}

.kwery-primary-button:hover:not([disabled]) {
    /* .kwery-primary-button:hover:not(:disabled) { */
    /* TODO: Rework colors */
    background-color: #0284c7;
}

.kwery-danger-button {
    /* TODO: Rework colors */
    background-color: #ef4444;
    color: #fff;
}

.kwery-danger-button:hover:not([disabled]) {
    /* TODO: Rework colors */
    background-color: #dc2626;
}
</style>
