<template>
    <div class="kwery-chat-header">
        <button
            class="kwery-chat-header-button kwery-chat-header-settings-button"
            @click="openSettings"
        >
            <svg
                class="kwery-chat-header-button-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                />
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </svg>
        </button>
        <p class="kwery-chat-header-title">KweryAI</p>
        <button
            class="kwery-chat-header-button kwery-chat-header-close-button"
            @click="closeChat"
        >
            <svg
                class="kwery-chat-header-button-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                />
            </svg>
        </button>
    </div>
</template>

<script lang="ts" setup>
import sendEvent from "@/utils/sendEvent";

const emit = defineEmits<{ closeChat: [] }>();

function openSettings() {
    sendEvent({ type: "openSettingsPage" });
}

function closeChat() {
    emit("closeChat");
}
</script>

<style scoped>
.kwery-chat-header {
    color: var(--kwery-color-text-opposite);
    padding: var(--kwery-whitespace-medium);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
    box-sizing: border-box;
    background-color: var(--kwery-color-primary);
    border-radius: var(--kwery-border-radius-medium)
        var(--kwery-border-radius-medium) 0 0;
}

.kwery-chat-header-title {
    margin: 0;
    font-size: var(--kwery-font-size);
    font-weight: 700;
    cursor: default;
    user-select: none;
}

.kwery-chat-header-button {
    border: 0;
    margin: 0;
    padding: var(--kwery-whitespace-tiny);
    background-color: transparent;
    color: var(--kwery-color-text-opposite);
    position: absolute;
    height: 28px;
    width: 28px;
    cursor: pointer;
    border-radius: var(--kwery-border-radius-small);
    transition: var(--kwery-transition);
}

.kwery-chat-header-button:hover {
    background-color: var(--kwery-color-primary-light-1);
}

.kwery-chat-header-button:active {
    background-color: var(--kwery-color-primary-light-2);
}

.kwery-chat-header-settings-button {
    left: var(--kwery-whitespace-small);
}

.kwery-chat-header-close-button {
    right: var(--kwery-whitespace-small);
}

.kwery-chat-header-button-icon {
    height: 20px;
    width: 20px;
}
</style>
