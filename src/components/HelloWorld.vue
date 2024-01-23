<template>
    <div class="hello">
        <h1>{{ message }}</h1>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    message: string;
}>();

console.log(props.message);
</script>

<style scoped>
h1 {
    margin: 40px 0 20px 0;
    font-size: 24px;
    font-weight: 700;
    line-height: normal;
    color: #2c3e50;
}
</style>
