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

window.document.title = "Welcome to Kwery AI!";
</script>

<style>
.kwery-welcome-container {
    max-width: 600px;
    margin: auto;
    padding: 30px;
}

.kwery-welcome-container h1,
.kwery-welcome-container h2 {
    margin: 0;
}

.kwery-welcome-container p {
    font-size: 16px;
    margin: 12px 0;
}

.kwery-welcome-container li {
    font-size: 16px;
}

.kwery-welcome-content {
    max-width: 600px;
    margin: auto;
}
</style>
