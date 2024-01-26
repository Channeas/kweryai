<template>
    <div
        class="kwery-conversation-message-container"
        :class="{
            'kwery-message-align-left': !message.sentByUser,
            'kwery-message-align-right': message.sentByUser,
            'kwery-message-no-top-margin': noTopMargin,
            'kwery-message-no-bottom-margin': noBottomMargin,
            'kwery-message-cluster-with-above': shouldClusterWithAbove,
            'kwery-message-cluster-with-below': shouldClusterWithBelow
        }"
    >
        <div
            class="kwery-conversation-message"
            :class="{ 'kwery-message-from-user': message.sentByUser }"
        >
            {{ message.text }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Message } from "@/types/Conversation";

defineProps<{
    message: Message;
    noTopMargin?: boolean;
    noBottomMargin?: boolean;
    shouldClusterWithAbove?: boolean;
    shouldClusterWithBelow?: boolean;
}>();
</script>

<style scoped>
.kwery-conversation-message-container {
    display: flex;
    margin: 16px 0;
}

.kwery-message-align-left {
    justify-content: start;
}
.kwery-message-align-right {
    justify-content: end;
}

.kwery-message-no-top-margin {
    margin-top: 0;
}

.kwery-message-no-bottom-margin {
    margin-bottom: 0;
}

.kwery-message-cluster-with-above {
    margin-top: 8px;
}

.kwery-message-cluster-with-below {
    margin-bottom: 8px;
}

.kwery-conversation-message {
    display: inline-block;
    max-width: 85%;
    text-align: left;
    padding: 8px;
    border-radius: 4px;
    word-break: break-word;

    /* TODO: Rework colors */
    background-color: #eceeed;
}

.kwery-message-from-user {
    /* TODO: Rework colors */
    background-color: #4399ff;
    color: #fff;
}
</style>
