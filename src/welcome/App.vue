<template>
    <div class="kwery-welcome-container">
        <IconLoader />
        <WelcomeSection />
        <StartSection />
        <OpenSection />
    </div>
</template>

<script lang="ts" setup>
import IconLoader from "./components/IconLoader.vue";
import OpenSection from "./sections/OpenSection.vue";
import StartSection from "./sections/StartSection.vue";
import WelcomeSection from "./sections/WelcomeSection.vue";
import debugLog from "@/utils/debugLog";

debugLog("Welcome app created");

window.document.title = "Welcome to Kwery AI!";
</script>

<style>
@import "../variables.css";

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    background-color: var(--kwery-color-background-primary);
    color: var(--kwery-color-text-primary);
}

.kwery-welcome-container {
    max-width: 600px;
    margin: auto;
    padding: var(--kwery-whitespace-huge);
}

.kwery-welcome-container h1,
.kwery-welcome-container h2 {
    margin: 0;
}

.kwery-welcome-container p {
    font-size: 16px;
    margin: var(--kwery-whitespace-medium) 0;
}

.kwery-welcome-container li {
    font-size: var(--kwery-whitespace-large);
}

.kwery-welcome-content {
    max-width: 600px;
    margin: auto;
}
</style>
