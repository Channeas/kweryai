<template>
    <div v-if="showDrawer" class="extension-drawer">
        <HelloWorld
            message="Welcome To Your New Vue.js + TypeScript Chrome Extension!"
        />
    </div>

    <ExtensionToggle v-model="showDrawer" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import HelloWorld from "../components/HelloWorld.vue";
import ExtensionToggle from "./components/ExtensionToggle.vue";

const showDrawer = ref(false);
</script>

<style scoped>
.extension-drawer {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 20px;
    position: fixed;
    bottom: 90px;
    right: 20px;
    width: 300px;
    height: 400px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
    z-index: 1000000000000000000000000000000000000000000000000000000000000000000000000;
}
</style>
