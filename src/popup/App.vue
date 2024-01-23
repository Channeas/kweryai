<template>
    <div>
        <HelloWorld
            message="Welcome To Your New Vue.js + TypeScript Chrome Extension!"
        />
        <InsertScriptButton />
    </div>
</template>

<script setup lang="ts">
import HelloWorld from "../components/HelloWorld.vue";
import InsertScriptButton from "./components/InsertScriptButton.vue";
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}
</style>
