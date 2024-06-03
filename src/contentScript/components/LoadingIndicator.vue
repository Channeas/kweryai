<template>
    <div class="kwery-loading-indicator">
        <div class="kwery-loading-indicator-dot"></div>
        <div class="kwery-loading-indicator-dot"></div>
        <div class="kwery-loading-indicator-dot"></div>
    </div>
</template>

<script lang="ts" setup></script>

<style>
.kwery-loading-indicator {
    display: flex;
    gap: var(--kwery-whitespace-tiny);
    margin-top: var(--kwery-whitespace-large);
}

.kwery-loading-indicator-dot {
    height: 8px;
    width: 8px;
    border-radius: 10000px;
    opacity: 0.4;
    animation: loading-pulse 1.25s infinite;
    background-color: var(--kwery-color-primary);
}

.kwery-loading-indicator-dot:nth-child(2) {
    animation-delay: 0.25s;
}

.kwery-loading-indicator-dot:nth-child(3) {
    animation-delay: 0.5s;
}

@keyframes loading-pulse {
    0% {
        opacity: 0.4;
    }

    30% {
        opacity: 1;
    }

    60% {
        opacity: 0.4;
    }

    100% {
        opacity: 0.4;
    }
}
</style>
