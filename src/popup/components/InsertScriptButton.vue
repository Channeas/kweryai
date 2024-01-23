<template>
    <button @click="insertScript">Insert script</button>
</template>

<script setup lang="ts">
async function insertScript() {
    const currentTab = await getCurrentTab();

    if (!(currentTab && currentTab.id)) {
        return;
    }

    if (await tabAlreadyHasScript(currentTab.id)) {
        return;
    }

    await chrome.scripting.executeScript({
        target: { tabId: currentTab.id },
        files: ["js/script.js", "js/chunk-vendors.js"]
    });
}

async function getCurrentTab(): Promise<chrome.tabs.Tab> {
    return (
        await chrome.tabs.query({ active: true, lastFocusedWindow: true })
    )[0];
}

async function tabAlreadyHasScript(tabId: number) {
    try {
        const response = await chrome.tabs.sendMessage(tabId, {
            type: "ping"
        });

        return response && response.active;
    } catch {
        return false;
    }
}
</script>
