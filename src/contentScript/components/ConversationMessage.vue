<template>
    <div
        class="kwery-conversation-message-container"
        :class="{
            'kwery-message-align-left': !message.sentByUser,
            'kwery-message-align-right': message.sentByUser,
            'kwery-message-no-top-margin': noTopMargin,
            'kwery-message-no-bottom-margin': noBottomMargin,
            'kwery-message-cluster-with-above': shouldClusterWithAbove,
            'kwery-message-cluster-with-below': shouldClusterWithBelow,
            'kwery-message-full-width': fullWidth
        }"
    >
        <p
            class="kwery-conversation-message"
            :class="{ 'kwery-message-from-user': message.sentByUser }"
        >
            <span v-for="line in messageLines" :key="line">
                {{ line }}
                <br />
            </span>
        </p>
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { Message } from "@/types/Conversation";

const props = defineProps<{
    message: Message;
    noTopMargin?: boolean;
    noBottomMargin?: boolean;
    shouldClusterWithAbove?: boolean;
    shouldClusterWithBelow?: boolean;
    fullWidth?: boolean;
}>();

const messageLines = computed((): string[] => {
    if (!(props.message && props.message.text)) return [];

    return props.message.text.split("\n");
});
</script>

<style scoped>
.kwery-conversation-message-container {
    display: flex;
    margin: var(--kwery-whitespace-large) 0;
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
    margin-top: var(--kwery-whitespace-small);
}

.kwery-message-cluster-with-below {
    margin-bottom: var(--kwery-whitespace-small);
}

.kwery-conversation-message {
    display: inline-block;
    max-width: 85%;
    text-align: left;
    margin: 0 !important;
    padding: var(--kwery-whitespace-small);
    border-radius: var(--kwery-whitespace-tiny);
    word-break: break-word;
    line-height: 1.5;
    background-color: var(--kwery-color-background-gray-shade-1);
}

.kwery-message-full-width .kwery-conversation-message {
    max-width: 100%;
    width: 100%;
}

.kwery-message-from-user {
    background-color: var(--kwery-color-primary);
    color: var(--kwery-color-text-opposite);
}
</style>
