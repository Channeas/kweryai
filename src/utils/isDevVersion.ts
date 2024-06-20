export default function isDevVersion(): boolean {
    const { name } = chrome.runtime.getManifest();
    return name?.startsWith("DEV: ");
}
