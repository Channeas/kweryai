<template>
    <div ref="renderer" class="kwery-conversation-renderer">
        <!-- TODO: Improve key -->
        <!-- TODO: Add transition -->
        <ConversationMessage
            v-for="(message, index) of conversation.messages"
            :key="message.text"
            :message="message"
            :noTopMargin="index === 0"
            :noBottomMargin="index === conversation.messages.length - 1"
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
import { nextTick, onMounted, ref, watch } from "vue";
import { Conversation } from "@/types/Conversation";
import ConversationMessage from "./ConversationMessage.vue";

const props = defineProps<{
    conversation: Conversation;
}>();

const renderer = ref<HTMLDivElement>();

function jumpToBottom() {
    if (renderer.value) {
        renderer.value.scrollTop = renderer.value.scrollHeight;
    }
}

onMounted(() => jumpToBottom());
watch(props.conversation.messages, () => nextTick(() => jumpToBottom()), {
    deep: true
});
</script>

<style scoped>
.kwery-conversation-renderer {
    overflow-y: auto;
    padding: 20px;
}
</style>
