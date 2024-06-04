import { Event } from "@/types/Event";
import handleEvent from "./handleEvent";
import openWelcomePage from "./utils/openWelcomePage";

console.log("Service worker works");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.isEvent) {
        handleEvent(message.eventBody as Event, sender, sendResponse);
        return true;
    }
});

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === "install") {
        openWelcomePage();
    }
});
