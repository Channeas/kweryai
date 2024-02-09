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

    const response = await sendEvent({
        type: "setConversation",
        content: { conversation: textConversation }
    });

    // TODO: Deal with failure
    console.log(response);
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

getConversation();
</script>

<style scoped>
/* TODO: Add inter? */
</style>
