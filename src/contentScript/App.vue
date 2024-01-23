<template>
    <ChatWindow v-if="showChat" />

    <ChatToggle v-model="showChat" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import ChatWindow from "./components/ChatWindow.vue";
import ChatToggle from "./components/ChatToggle.vue";

const showChat = ref(false);
</script>

<style scoped>
/* TODO: Add inter? */
</style>
