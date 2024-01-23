<template>
    <div @click="changeToggleValue" class="kwery-chat-toggle">
        <div v-if="model" class="kwery-icon-container">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="kwery-toggle-icon"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
            </svg>
        </div>
        <div v-else class="kwery-icon-container">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="kwery-toggle-icon"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                />
            </svg>
        </div>
    </div>
</template>

<script lang="ts" setup>
const model = defineModel({ default: false });

function changeToggleValue() {
    model.value = !model.value;
}
</script>

<style scoped>
.kwery-chat-toggle {
    height: 50px;
    width: 50px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 1000000000000000000000000000000000000000000000000000000000000000000000000;
}

.kwery-icon-container {
    height: 24px;
    width: 24px;
}

.kwery-toggle-icon {
    height: 24px;
    width: 24px;
    color: #000;
}
</style>
