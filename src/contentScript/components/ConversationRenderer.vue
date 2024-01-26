<template>
    <div>
        <!-- TODO: Cluster messages from the same sender -->
        <ConversationMessage
            v-for="(message, index) of conversation.messages"
            :key="message.text"
            :message="message"
            :noTopMargin="index === 0"
            :shouldClusterWithAbove="
                index !== 0 &&
                conversation.messages[index - 1].sentByUser ===
                    message.sentByUser
            "
            :shouldClusterWithBelow="
                !!conversation.messages[index + 1] &&
                conversation.messages[index + 1].sentByUser ===
                    message.sentByUser
            "
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
