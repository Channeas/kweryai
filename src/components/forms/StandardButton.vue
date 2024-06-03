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
    cursor: pointer;
    padding: var(--kwery-whitespace-small);
    transition: var(--kwery-transition);
    background-color: var(--kwery-color-background-primary);
    border-radius: var(--kwery-border-radius-small);
    border: var(--kwery-border);
    box-shadow: var(--kwery-shadow-1);
}

.kwery-standard-button:disabled {
    opacity: 0.5;
    cursor: default;
}

.kwery-primary-button {
    background-color: var(--kwery-color-primary);
    color: var(--kwery-color-text-opposite);
}

.kwery-primary-button:hover:not([disabled]) {
    background-color: var(--kwery-color-primary-shade-1);
}

.kwery-primary-button:active:not([disabled]) {
    background-color: var(--kwery-color-primary-shade-2);
}

.kwery-danger-button {
    background-color: var(--kwery-color-red);
    color: var(--kwery-color-text-opposite);
}

.kwery-danger-button:hover:not([disabled]) {
    background-color: var(--kwery-color-red-shade-1);
}

.kwery-danger-button:active:not([disabled]) {
    background-color: var(--kwery-color-red-shade-2);
}
</style>
