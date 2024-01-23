<template>
    <div class="kwery-chat-window">
        <HelloWorld
            message="Welcome To Your New Vue.js + TypeScript Chrome Extension!"
        />
    </div>
</template>

<script lang="ts" setup>
import HelloWorld from "../../components/HelloWorld.vue";
</script>

<style>
.kwery-chat-window {
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
