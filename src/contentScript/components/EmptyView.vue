<template>
    <div class="kwery-empty-view">
        <ConversationMessage
            noTopMargin
            fullWidth
            shouldClusterWithBelow
            :message="message1"
        />
        <ConversationMessage
            fullWidth
            shouldClusterWithAbove
            :message="message2"
        />

        <button @click="openWelcomePage" class="kwery-get-started-button">
            Get started
        </button>
    </div>
</template>

<script lang="ts" setup>
import sendEvent from "@/utils/sendEvent";
import ConversationMessage from "./ConversationMessage.vue";

const message1 = {
    text: 'Hello there, welcome to Kwery AI! For instructions on how to get started, please click the "Get started" button below',
    sentByUser: false
};
const message2 = {
    text: "Alternatively, you can head over to the settings directly by clicking the cog icon at the top of this chat window",
    sentByUser: false
};

function openWelcomePage() {
    sendEvent({ type: "openWelcomePage" });
}
</script>

<style scoped>
.kwery-empty-view {
    flex: 1;
    padding: var(--kwery-whitespace-large);
}

.kwery-get-started-button {
    padding: var(--kwery-whitespace-small);
    padding: var(--kwery-button-whitespace);
    cursor: pointer;
    background-color: var(--kwery-color-primary);
    color: var(--kwery-color-text-opposite);
    border: none;
    border-radius: var(--kwery-border-radius-small);
    transition: var(--kwery-transition);
    box-shadow: var(--kwery-shadow-1);
}

.kwery-get-started-button:hover {
    background-color: var(--kwery-color-primary-shade-1);
}

.kwery-get-started-button:active {
    background-color: var(--kwery-color-primary-shade-2);
}
</style>
