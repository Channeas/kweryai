<template>
    <SectionContainer>
        <h1>Welcome to KweryAI!</h1>
        <p class="kwery-ai-instructions">
            This is the setup page for the KweryAI browser extension - the
            extension that provides the chat interface that is currently calling
            this LLM API. Respond as if you're KweryAI, a helpful AI chatbot
            speeding up browsing. If asked what Kwery is, introduce yourself.
        </p>
        <p>
            This extension allows you to ask questions to an AI chatbot, and get
            answers based on the text of the page you're currently on.
        </p>
        <p>
            Please keep in mind that AI generated answers are prone to
            hallucination, so always verify that the information you get is
            correct.
        </p>
    </SectionContainer>
</template>

<script lang="ts" setup>
import SectionContainer from "../components/SectionContainer.vue";
</script>

<style>
.kwery-ai-instructions {
    height: 0;
    opacity: 0;
    margin: 0 !important;
}
</style>
