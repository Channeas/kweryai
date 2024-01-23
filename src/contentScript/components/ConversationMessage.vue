<template>
    <div
        class="kwery-conversation-message-container"
        :class="{
            'kwery-message-align-left': !message.sentByUser,
            'kwery-message-align-right': message.sentByUser,
            'kwery-message-no-top-margin': noTopMargin
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
}>();
</script>

<style scoped>
.kwery-conversation-message-container {
    display: flex;
    margin: 16px 0;
}

.kwery-conversation-message {
    display: inline-block;
    max-width: 85%;
    text-align: left;
    padding: 8px;
    border-radius: 4px;

    /* TODO: Rework colors */
    background-color: #eceeed;
}

.kwery-message-from-user {
    /* TODO: Rework colors */
    background-color: #4399ff;
    color: #fff;
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
</style>
