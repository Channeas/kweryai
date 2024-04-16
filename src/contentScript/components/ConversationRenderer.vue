<template>
    <div ref="renderer" class="kwery-conversation-renderer">
        <div class="kwery-conversation-renderer-list">
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

        <LoadingIndicator v-if="isLoading" />
    </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref, toRefs, watch } from "vue";
import { Conversation } from "@/types/Conversation";
import ConversationMessage from "./ConversationMessage.vue";
import LoadingIndicator from "./LoadingIndicator.vue";

const props = defineProps<{
    conversation: Conversation;

    // TODO: Use a store for this
    isLoading: boolean;
}>();

const renderer = ref<HTMLDivElement>();

function jumpToBottomAfterNextTick() {
    nextTick(() => {
        if (renderer.value) {
            renderer.value.scrollTop = renderer.value.scrollHeight;
        }
    });
}

onMounted(() => jumpToBottomAfterNextTick());
watch(props.conversation, () => jumpToBottomAfterNextTick(), {
    deep: true
});

const refs = toRefs(props);
watch(refs.isLoading, (isLoading) => isLoading && jumpToBottomAfterNextTick());
</script>

<style scoped>
.kwery-conversation-renderer {
    overflow-y: auto;
    padding: 20px;
    flex: 1;
}
</style>
