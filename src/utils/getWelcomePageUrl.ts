export default function getWelcomePageUrl(): string {
    return `chrome-extension://${chrome.runtime.id}/welcome.html`;
}
