import { Event } from "@/types/Event";
import handleEvent from "./handleEvent";
import handleNewContentScript from "./handleNewContentScript";
import handleStorageChanges from "./handleStorageChanges";
import insertContentScript from "./utils/insertContentScript";
import openWelcomePage from "./utils/openWelcomePage";
import getCurrentTab from "@/utils/getCurrentTab";
import tabAlreadyHasScript from "./utils/tabAlreadyHasScript";
import getWelcomePageUrl from "@/utils/getWelcomePageUrl";

console.log("Service worker works");

chrome.action.onClicked.addListener(async (tab) => {
    if (!tab?.id) return;
    await insertContentScript(tab.id, tab.url);
});

const contextMenuInsertId = "insertKweryAI";
chrome.contextMenus.create({
    documentUrlPatterns: ["*://*/*", getWelcomePageUrl()],
    id: contextMenuInsertId,
    title: "Insert KweryAI chat"
});

chrome.contextMenus.onClicked.addListener(async ({ menuItemId }, tab) => {
    switch (menuItemId) {
        case contextMenuInsertId:
            if (!tab?.id) break;
            await insertContentScript(tab.id, tab.url);
            break;
    }
});

chrome.omnibox.setDefaultSuggestion({ description: "Ask using KweryAI" });

chrome.omnibox.onInputEntered.addListener(async (text) => {
    const currentTab = await getCurrentTab();
    if (!currentTab?.id) return;

    // This is checked by insertContentScript as well
    // However, here there should be no notification if the tab already has the chat inserted
    const chatAlreadyInserted = await tabAlreadyHasScript(currentTab.id);
    if (!chatAlreadyInserted) {
        await insertContentScript(currentTab.id, currentTab.url);
    }

    if (!text) return;

    chrome.tabs.sendMessage(currentTab.id, {
        type: "addMessageFromOmnibox",
        text
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.isEvent) {
        handleEvent(message.eventBody as Event, sender, sendResponse);
        return true;
    }

    if (message.isContentScriptSetup) {
        handleNewContentScript(sender);
    }
});

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === "install") {
        openWelcomePage();
    }
});

chrome.storage.local.onChanged.addListener(async (changes) => {
    handleStorageChanges(changes);
});
