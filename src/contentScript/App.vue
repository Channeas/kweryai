<template>
    <ChatWindow v-if="showChat" />

    <ExtensionToggle v-model="showChat" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import ChatWindow from "./components/ChatWindow.vue";
import ExtensionToggle from "./components/ExtensionToggle.vue";

const showChat = ref(false);
</script>

<style scoped>
/* TODO: Add inter? */
</style>
