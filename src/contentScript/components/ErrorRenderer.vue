<template>
    <div v-if="oldestErrorMessage" class="kwery-error-renderer">
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
    padding: 20px;
    gap: 10px;

    /* TODO: Use variable */
    border-radius: 5px 5px 0 0;

    /* TODO: Rework colors */
    background-color: #fef2f2;
}

.kwery-error-renderer-left {
    display: flex;
    align-items: center;
    gap: 10px;
}

.kwery-error-renderer-message {
    text-align: left;
    margin: 0;

    /* TODO: Set this using a variable */
    font-size: 14px;

    /* TODO: Rework */
    line-height: 1.3;

    /* TODO: Rework colors */
    color: #991b1b;
}

.kwery-error-renderer-remove-button {
    height: 28px;
    width: 28px;
    padding: 4px;
    border: none;
    background-color: transparent;
    cursor: pointer;

    /* TODO: Use variable */
    border-radius: 3px;

    /* TODO: Add universal transition */
    transition: 0.3s;
}

.kwery-error-renderer-remove-button:hover {
    /* TODO: Rework colors */
    background-color: #fcdada;
}

.kwery-error-renderer-icon-container {
    height: 20px;
    widows: 20px;
}

.kwery-error-renderer-icon {
    height: 20px;
    width: 20px;
    color: #f87171;
}
</style>
