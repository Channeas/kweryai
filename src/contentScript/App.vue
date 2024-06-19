<template>
    <ChatWindow
        v-if="showChat"
        @addMessage="addMessage"
        @closeChat="showChat = false"
        :conversation="textConversation"
        :isLoading="isGettingCompletion"
        :hasCompletedSetup="hasCompletedSetup"
        ref="chatWindow"
    />

    <ChatToggle v-model="showChat" />
</template>

<script setup lang="ts">
import { Conversation } from "@/types/Conversation";
import { reactive, ref } from "vue";
import ChatWindow from "./components/ChatWindow.vue";
import ChatToggle from "./components/ChatToggle.vue";
import sendEvent from "@/utils/sendEvent";
import sendSetupMessage from "@/utils/sendSetupMessage";

const showChat = ref(true);

const chatWindow = ref();

const textConversation: Conversation = reactive({
    messages: []
});
let hasLoadedConversation = false;
let initialMessage: string;

function addError(errorMessage: string) {
    if (chatWindow.value) {
        chatWindow.value.addError(errorMessage);
    }

    // TODO: Cache errors, to be shown when the chat window is reopened?
    // TODO: Also update the icon to show that an error has been encountered
}

const isGettingCompletion = ref(false);

async function addMessage(text: string) {
    textConversation.messages.push({
        text,
        sentByUser: true
    });

    await setConversation();

    isGettingCompletion.value = true;

    // TODO: Debounce - wait with this if a user starts typing a new message right away
    await getCompletion();

    isGettingCompletion.value = false;
}

async function addMessageAfterSetup(text: string) {
    if (!hasLoadedConversation) {
        initialMessage = text;
        return;
    }

    await addMessage(text);
}

async function getConversation() {
    const response = await sendEvent({ type: "getConversation" });
    if (response.type === "getConversationResponse") {
        textConversation.messages = response.response.conversation.messages;

        hasLoadedConversation = true;
        if (initialMessage) {
            await addMessage(initialMessage);
        }
    }
}

async function setConversation() {
    await sendEvent({
        type: "setConversation",
        content: { conversation: textConversation }
    });
}

const hasCompletedSetup = ref(true);

async function getSettingsStatus() {
    const returnedEvent = await sendEvent({ type: "getSettingsStatus" });

    if (
        returnedEvent.type !== "getSettingsStatusResponse" ||
        !returnedEvent.status.success
    ) {
        addError(
            returnedEvent.status.message ||
                "Unable to get the settings status. If you have not configured the extension, please click the cog icon at the top of this chat window"
        );
        return;
    }

    if (!returnedEvent.response?.hasCompletedSetup) {
        hasCompletedSetup.value = false;
    }
}

async function getCompletion() {
    const returnedEvent = await sendEvent({
        type: "getCompletion",
        content: {
            conversation: textConversation,
            pageContext: document.body.innerText
        }
    });

    const { type } = returnedEvent;
    if (type !== "getCompletionResponse") {
        return;
    }

    const { status } = returnedEvent;
    if (!status.success) {
        addError(status.message || "Unable to get completion");
        return;
    }

    const { response } = returnedEvent;
    if (!response.completion) {
        addError("Unable to get completion, no value returned");
        return;
    }

    textConversation.messages.push({
        text: response.completion,
        sentByUser: false
    });

    await setConversation();
}

async function performSetup() {
    sendSetupMessage();
    getSettingsStatus();
    getConversation();
}

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "openChat") {
        if (!showChat.value) showChat.value = true;
        return;
    }

    if (
        message.type === "addMessageFromOmnibox" &&
        typeof message.text === "string"
    ) {
        if (!showChat.value) showChat.value = true;

        addMessageAfterSetup(message.text);
        return;
    }

    if (message.type === "settingsStatusChanged" && message.hasCompletedSetup) {
        hasCompletedSetup.value = true;
    }
});

performSetup();
</script>

<style>
/* TODO: Add inter? */
@import "../variables.css";
</style>
