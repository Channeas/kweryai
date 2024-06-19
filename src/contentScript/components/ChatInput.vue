<template>
    <div class="kwery-chat-input">
        <form @submit.prevent="handleSubmit">
            <!-- TODO: Switch to an auto-resizing textarea? -->
            <input
                v-model="message"
                ref="inputField"
                class="kwery-chat-input-field"
                placeholder="Ask away..."
                autocomplete="off"
                spellcheck="false"
                :disabled="inputDisabled"
            />
            <button
                :disabled="!messageHasContent || inputDisabled"
                type="submit"
                class="kwery-chat-input-submit-button"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="kwery-chat-input-submit-icon"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                    />
                </svg>
            </button>
        </form>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";

const props = defineProps<{
    inputDisabled: boolean;
}>();

const emit = defineEmits<{
    submit: [text: string];
}>();

const message = ref("");
const messageHasContent = computed(() => message.value && message.value.trim());

const inputField = ref<HTMLInputElement>();

function handleSubmit() {
    if (!messageHasContent.value) {
        return;
    }

    emit("submit", message.value.trim());
    message.value = "";
    inputField.value?.blur();
}

// Focusing right away scrolls to the bottom of the page. nextTick is too soon as well
const arbitraryFocusDelayInMilliseconds = 100;
onMounted(() =>
    setTimeout(
        () => !props.inputDisabled && inputField?.value?.focus(),
        arbitraryFocusDelayInMilliseconds
    )
);
</script>

<style scoped>
.kwery-chat-input form {
    position: relative;
    display: flex;
    align-items: center;
}

.kwery-chat-input-field {
    /* Unique padding due to the height of the input field */
    /* The total height should be 44px (button is 28px + 8px whitespace * 2) */
    /* Also, the reason I don't set this height in a parent container is that clicking anywhere */
    /* in the bottom part of the chat should focus the input field. Using padding allows for  */
    /* this to be handled purely by CSS */
    padding: calc(var(--kwery-whitespace-large) - 2px);

    padding-left: var(--kwery-whitespace-large);
    padding-right: 40px;

    border-radius: 0 0 var(--kwery-border-radius-medium)
        var(--kwery-border-radius-medium);

    background-color: var(--kwery-color-background-gray);
    color: var(--kwery-color-text-primary) !important;

    width: 100%;
    outline: none;
    border: none;
    margin: 0 !important;
    font-size: var(--kwery-font-size);
}

.kwery-chat-input-submit-button {
    position: absolute;
    right: var(--kwery-whitespace-small);
    padding: var(--kwery-whitespace-tiny);
    height: 28px;
    width: 28px;
    background-color: transparent !important;
    cursor: pointer;
    border: none;
    border-radius: var(--kwery-border-radius-small);
    transition: var(--kwery-transition);
}

.kwery-chat-input-submit-button:hover:not([disabled]) {
    background-color: var(--kwery-color-background-blue) !important;
}

.kwery-chat-input-submit-icon {
    height: 20px;
    width: 20px;

    color: var(--kwery-color-primary);
    transition: var(--kwery-transition);
}

.kwery-chat-input-field:disabled,
.kwery-chat-input-submit-button:disabled {
    opacity: 0.5;
    cursor: default;
}
</style>
