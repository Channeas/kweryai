<template>
    <!-- -kwery-root is to initialize css variables inside the shadow DOM -->
    <div class="kwery-chat-window kwery-root">
        <ChatHeader @closeChat="emit('closeChat')" />
        <ErrorRenderer ref="errorRenderer" />
        <EmptyView v-if="!hasCompletedSetup" />
        <ConversationRenderer
            v-else
            :conversation="conversation"
            :isLoading="isLoading"
        />
        <ChatInput
            @submit="(text) => emit('addMessage', text)"
            :inputDisabled="!hasCompletedSetup"
        />
    </div>
</template>

<script lang="ts" setup>
import { Conversation } from "@/types/Conversation";
import ConversationRenderer from "./ConversationRenderer.vue";
import ChatHeader from "./ChatHeader.vue";
import ChatInput from "./ChatInput.vue";
import EmptyView from "./EmptyView.vue";
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
    hasCompletedSetup: boolean;

    // TODO: Use a store for this
    isLoading: boolean;
}>();

const emit = defineEmits<{
    addMessage: [message: string];
    closeChat: [];
}>();

defineExpose({
    addError
});
</script>

<style scoped>
.kwery-chat-window {
    font-size: var(--kwery-font-size);
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: var(--kwery-color-text-primary);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;

    position: fixed;
    bottom: 100px;
    right: 20px;
    width: 350px;
    height: 450px;
    background-color: var(--kwery-color-background-primary);
    border-radius: var(--kwery-border-radius-medium);
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
    z-index: 2147483647;
}
</style>
