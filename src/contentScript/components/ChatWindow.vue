<template>
    <div class="kwery-chat-window">
        <ChatHeader />
        <ErrorRenderer ref="errorRenderer" />
        <ConversationRenderer
            :conversation="conversation"
            :isLoading="isLoading"
        />
        <ChatInput @submit="(text) => emit('addMessage', text)" />
    </div>
</template>

<script lang="ts" setup>
import { Conversation } from "@/types/Conversation";
import ConversationRenderer from "./ConversationRenderer.vue";
import ChatHeader from "./ChatHeader.vue";
import ChatInput from "./ChatInput.vue";
import ErrorRenderer from "@/components/ErrorRenderer.vue";
import { ref } from "vue";

const errorRenderer = ref();

function addError(message: string) {
    // TODO: Handle falsy condition
    if (errorRenderer.value) {
        errorRenderer.value.addError(message);
    }
}

// TODO: Possibly migrate the conversation prop to a model
defineProps<{
    conversation: Conversation;

    // TODO: Use a store for this
    isLoading: boolean;
}>();

const emit = defineEmits<{
    addMessage: [message: string];
}>();

defineExpose({
    addError
});
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
    bottom: 100px;
    right: 20px;
    width: 350px;
    height: 450px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
    z-index: 2147483647;
}
</style>
