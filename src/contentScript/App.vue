<template>
    <ChatWindow
        v-if="showChat"
        @addMessage="addMessage"
        :conversation="textConversation"
    />

    <ChatToggle v-model="showChat" />
</template>

<script setup lang="ts">
import { Conversation } from "@/types/Conversation";
import { reactive, ref } from "vue";
import ChatWindow from "./components/ChatWindow.vue";
import ChatToggle from "./components/ChatToggle.vue";

const showChat = ref(false);

function addMessage(text: string) {
    textConversation.messages.push({
        text,
        sentByUser: true
    });
}

// TODO: Store conversations based on the current tab?
const textConversation: Conversation = reactive({
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
        },
        {
            text: "Also how many members are there?",
            sentByUser: true
        },
        {
            text: "Slow down bucko",
            sentByUser: false
        },
        {
            text: "One question at a time",
            sentByUser: false
        },
        {
            text: "It was founded by Robert Zubrin",
            sentByUser: false
        },
        {
            text: "On Earth",
            sentByUser: false
        },
        {
            text: "The member count is not stated on this page however",
            sentByUser: false
        }
    ]
});
</script>

<style scoped>
/* TODO: Add inter? */
</style>
