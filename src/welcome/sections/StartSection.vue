<template>
    <SectionContainer>
        <h2>Getting started</h2>
        <p>
            Before you can start using the Kwery AI extension, you need to
            configure which AI model and API key you want to use. To do this,
            click the “Configure Kwery AI” button below to go to the settings
            page.
        </p>

        <div class="kwery-start-button-container">
            <!-- TODO: Figure out transitions here - perhaps the same as for the chat toggle icon? -->
            <button @click="openSettings" class="kwery-start-configure-button">
                Configure Kwery AI
            </button>
        </div>

        <p>
            <b>Please note:</b> At present this is just a small side project
            with no backend, so you have to bring your own API key to use the
            extension.
        </p>
        <p>
            The benefit of this is that you only pay for what you use, and you
            pay that directly to the AI provider. If there is demand for it, I
            might create a subscription-based version of the extension down the
            line, removing the need for you to use your own API key.
        </p>
    </SectionContainer>
</template>

<script lang="ts" setup>
import SectionContainer from "../components/SectionContainer.vue";
import sendEvent from "@/utils/sendEvent";

function openSettings() {
    sendEvent({ type: "openSettingsPage" });
}
</script>

<style>
.kwery-start-button-container {
    text-align: center;
    margin: 18px 0;
}

.kwery-start-configure-button {
    font-size: 16px;
    padding: 12px 16px;
    cursor: pointer;

    /* TODO: Add universal transition */
    transition: 0.3s;

    /* Tailwind shadow */
    box-shadow:
        0 1px 3px 0 #0000001a,
        0 1px 2px -1px #0000001a;

    /* TODO: Standardize */
    border-radius: 3px;

    /* TODO: Rework colors */
    background-color: #fff;
    border: 1px solid #d1d5db;

    /* TODO: Rework colors */
    background-color: #4399ff;
    color: #fff;
}

.kwery-start-configure-button:hover {
    /* TODO: Rework colors */
    background-color: #107dff;
}
.kwery-start-configure-button:active {
    /* TODO: Rework colors */
    background-color: #0064dc;
}
</style>
