<template>
    <button
        @click="changeToggleValue"
        class="kwery-chat-toggle kwery-root"
        tabindex="0"
    >
        <img v-if="iconURL" :src="iconURL" />
        <div class="kwery-shadow-container"></div>
    </button>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const model = defineModel({ default: false });

function changeToggleValue() {
    model.value = !model.value;
}

const iconURL = ref(chrome.runtime.getURL("icons/kweryai64.png"));
</script>

<style scoped>
.kwery-chat-toggle {
    height: 64px;
    width: 64px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 2147483645;
    border: none !important;
    background-color: transparent !important;
    transition: var(--kwery-transition);
}

.kwery-chat-toggle:hover {
    transform: scale(1.05);
}

.kwery-chat-toggle:active {
    transform: scale(0.95);
}

.kwery-chat-toggle img {
    height: 64px;
    width: 64px;
    z-index: 2147483647;
}

/* Since the icon doesn't take up the full size, this makes sure there is no gap between the shadow and the icon*/
.kwery-shadow-container {
    height: 56px;
    width: 56px;
    position: absolute;
    top: 4px;
    left: 4px;
    box-shadow: 0px 2px 10px 4px rgba(0, 0, 0, 0.25);
    z-index: 2147483646;
}

.kwery-chat-toggle,
.kwery-shadow-container,
.kwery-chat-toggle img {
    border-radius: 50%;
}
</style>
