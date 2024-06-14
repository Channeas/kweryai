<template>
    <div
        v-if="oldestErrorMessage"
        class="kwery-error-renderer"
        :class="{ 'kwery-error-renderer-absolute': absolutePositioning }"
    >
        <div class="kwery-error-renderer-left">
            <div class="kwery-error-renderer-icon-container">
                <!-- TODO: Move to a separate file? -->
                <svg
                    class="kwery-error-renderer-icon"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                        clip-rule="evenodd"
                    />
                </svg>
            </div>

            <p class="kwery-error-renderer-message">{{ oldestErrorMessage }}</p>
        </div>

        <button @click="removeError" class="kwery-error-renderer-remove-button">
            <!-- TODO: Move to a separate file? -->
            <svg
                class="kwery-error-renderer-icon"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
            >
                <path
                    d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                />
            </svg>
        </button>
    </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from "vue";

defineProps<{
    absolutePositioning?: boolean;
}>();

const errorMessages: string[] = reactive([]);

const oldestErrorMessage = computed(
    () => errorMessages.length && errorMessages[0]
);

function addError(message: string) {
    errorMessages.push(message);
}

function removeError() {
    errorMessages.shift();
}

defineExpose({ addError });
</script>

<style scoped>
.kwery-error-renderer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--kwery-whitespace-large);
    gap: var(--kwery-whitespace-medium);

    border-radius: var(--kwery-border-radius-medium)
        var(--kwery-border-radius-medium) 0 0;

    background-color: var(--kwery-color-background-red);
}

.kwery-error-renderer-absolute {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}

.kwery-error-renderer-left {
    display: flex;
    align-items: center;
    gap: var(--kwery-whitespace-medium);
}

.kwery-error-renderer-message {
    word-break: break-word;
    text-align: left;
    margin: 0;

    /* TODO: Rework */
    line-height: 1.3;

    color: var(--kwery-color-red-shade-1);
}

.kwery-error-renderer-remove-button {
    height: 28px;
    width: 28px;
    padding: var(--kwery-whitespace-tiny);
    border: none;
    border-radius: var(--kwery-border-radius-small);
    background-color: transparent;
    cursor: pointer;
    transition: var(--kwery-transition);
}

.kwery-error-renderer-remove-button:hover {
    background-color: var(--kwery-color-background-red-shade-1);
}

.kwery-error-renderer-icon-container {
    height: 20px;
    width: 20px;
}

.kwery-error-renderer-icon {
    height: 20px;
    width: 20px;
    color: var(--kwery-color-red-shade-light-2);
}
</style>
