<template>
    <div v-if="iconURL" class="kwery-icon-loader">
        <img :src="iconURL" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const iconURL = ref(chrome.runtime.getURL("icons/kweryai128.png"));
</script>

<style>
.kwery-icon-loader {
    text-align: center;
}
</style>
