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
    padding: 8px;

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
</style>
