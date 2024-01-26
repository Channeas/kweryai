<template>
    <div class="kwery-chat-window">
        <ConversationRenderer :conversation="conversation" />
        <ChatInput @submit="(text) => emit('addMessage', text)" />
    </div>
</template>

<script lang="ts" setup>
import { Conversation } from "@/types/Conversation";
import ConversationRenderer from "./ConversationRenderer.vue";
import ChatInput from "./ChatInput.vue";

// TODO: Possibly migrate the conversation prop to a model
defineProps<{
    conversation: Conversation;
}>();

const emit = defineEmits<{
    addMessage: [message: string];
}>();
</script>

<style scoped>
.kwery-chat-window {
    font-size: 14px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;

    position: fixed;
    bottom: 90px;
    right: 20px;
    width: 350px;
    height: 450px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
    z-index: 1000000000000000000000000000000000000000000000000000000000000000000000000;
}
</style>
