<template>
    <div>
        <!-- TODO: Cluster messages from the same sender -->
        <ConversationMessage
            v-for="(message, index) of conversation.messages"
            :key="message.text"
            :message="message"
            :noTopMargin="index === 0"
        />
    </div>
</template>

<script lang="ts" setup>
import { Conversation } from "@/types/Conversation";
import ConversationMessage from "./ConversationMessage.vue";

defineProps<{
    conversation: Conversation;
}>();
</script>

<style></style>
