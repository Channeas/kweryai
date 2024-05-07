<template>
    <input
        v-model="inputValue"
        :placeholder="placeholder"
        class="kwery-input-field"
    />
</template>

<script lang="ts" setup>
const inputValue = defineModel<string>();

defineProps<{
    placeholder?: string;
}>();
</script>

<style scoped>
.kwery-input-field {
    height: 37px;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    padding: var(--kwery-whitespace-small);
    background-color: var(--kwery-color-background-primary);
    box-shadow: var(--kwery-shadow-1);
    border: var(--kwery-border);
    border-radius: var(--kwery-border-radius-small);
}
</style>
