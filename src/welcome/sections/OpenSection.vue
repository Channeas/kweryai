<template>
    <SectionContainer>
        <h2>How do I open the KweryAI chat window?</h2>
        <p>There are four different ways to open the KweryAI chat window.</p>
        <p>
            The simplest is to click the KweryAI extension icon (the robot shown
            above). To see the extension icon, you first have to click the
            "Extensions" button in the top right of your browser window, which
            should be shown in the form of a puzzle icon. While you're there,
            you might want to pin the extension for easy access.
        </p>

        <p>The other ways are:</p>

        <ul>
            <li>
                Right click on almost any page, and click "Insert KweryAI chat"
            </li>
            <li>
                Use the shortcut, which is Ctrl + Q or Cmd + Q by default (but
                can be changed on
                <a
                    @click="openShortcutsPage"
                    href="chrome://extensions/shortcuts"
                    target="_blank"
                    >chrome://extensions/shortcuts</a
                >)
            </li>
            <li>
                Start typing "kwery" in the address bar (omnibox) at the top of
                your browser window, and then press tab to select the KweryAI
                extension as the intented target. When you keep typing, you
                should see "Ask using KweryAI". When you submit your query, it
                will be inserted directly into the KweryAI chat
            </li>
        </ul>
    </SectionContainer>
</template>

<script lang="ts" setup>
import SectionContainer from "../components/SectionContainer.vue";

function openShortcutsPage(event: MouseEvent) {
    // Linking to chrome://extensions/shortcuts doesn't work for me - the page isn't opened
    // However, if it does work in some cases, it's best to still prevent the default link behavior
    event.preventDefault();

    chrome.tabs.create({
        url: "chrome://extensions/shortcuts"
    });
}
</script>

<style></style>
