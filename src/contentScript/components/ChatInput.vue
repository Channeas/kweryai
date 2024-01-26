<template>
    <div class="kwery-chat-input">
        <form @submit.prevent="handleSubmit">
            <!-- TODO: Switch to an auto-resizing textarea? -->
            <input
                v-model="message"
                class="kwery-chat-input-field"
                placeholder="Ask away..."
            />
            <button
                :disabled="!messageHasContent"
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
import { computed, ref } from "vue";

const emit = defineEmits<{
    submit: [text: string];
}>();

const message = ref("");
const messageHasContent = computed(() => !!message.value);

function handleSubmit() {
    if (!messageHasContent.value) {
        return;
    }

    emit("submit", message.value);

    message.value = "";
}
</script>

<style scoped>
.kwery-chat-input form {
    position: relative;
    display: flex;
    align-items: center;
}

.kwery-chat-input-field {
    /* TODO: Consistency */
    padding: 20px;
    padding-right: 50px;

    /* TODO: Use variables */
    border-radius: 0 0 5px 5px;

    /* TODO: Rework colors */
    background-color: #f5f5f5;

    width: 100%;
    outline: none;
    border: none;
}

.kwery-chat-input-field::placeholder {
    /* TODO: Rework colors */
    color: unset;
}

.kwery-chat-input-submit-button {
    border: none;
    position: absolute;
    right: 16px;
    padding: 4px;
}

.kwery-chat-input-submit-icon {
    height: 24px;
    width: 24px;

    /* TODO: Rework colors */
    color: #4399ff;

    /* TODO: Add universal transition */
    transition: 0.3s;
}

.kwery-chat-input-submit-button:disabled .kwery-chat-input-submit-icon {
    opacity: 0.5;
}
</style>
