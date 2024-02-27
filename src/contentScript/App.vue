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
import sendEvent from "@/utils/sendEvent";

const showChat = ref(true);

async function addMessage(text: string) {
    textConversation.messages.push({
        text,
        sentByUser: true
    });

    await setConversation();

    // TODO: Debounce - wait with this if a user starts typing a new message right away
    await getCompletion();
}

const textConversation: Conversation = reactive({
    messages: []
});

async function getConversation() {
    const response = await sendEvent({ type: "getConversation" });
    if (response.type === "getConversationResponse") {
        textConversation.messages = response.response.conversation.messages;
    }
}

async function setConversation() {
    await sendEvent({
        type: "setConversation",
        content: { conversation: textConversation }
    });
}

async function getCompletion() {
    // TODO: Error handling
    const response = await sendEvent({
        type: "getCompletion",
        content: {
            conversation: textConversation,
            pageContext: document.body.innerText
        }
    });

    if (response.type === "getCompletionResponse") {
        textConversation.messages.push({
            text: response.response.completion,
            sentByUser: false
        });
    }

    await setConversation();
}

getConversation();
</script>

<style scoped>
/* TODO: Add inter? */
</style>
