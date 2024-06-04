export default function openWelcomePage() {
    chrome.tabs.create({
        url: "welcome.html"
    });
}
