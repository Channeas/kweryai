<template>
    <ChatWindow v-if="showChat" :conversation="textConversation" />

    <ChatToggle v-model="showChat" />
</template>

<script setup lang="ts">
import { Conversation } from "@/types/Conversation";
import { ref } from "vue";
import ChatWindow from "./components/ChatWindow.vue";
import ChatToggle from "./components/ChatToggle.vue";

const showChat = ref(false);

// TODO: Store conversations based on the current tab?
const textConversation: Conversation = {
    messages: [
        {
            text: "When did the Mars Society start?",
            sentByUser: true
        },
        {
            text: "The Mars Society was founded in August 1998.",
            sentByUser: false
        },
        {
            text: "Okay, who founded it?",
            sentByUser: true
        },
        {
            text: "And where?",
            sentByUser: true
        }
    ]
};
</script>

<style scoped>
/* TODO: Add inter? */
</style>
