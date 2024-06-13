export default async function getCurrentTab(): Promise<chrome.tabs.Tab> {
    return (
        await chrome.tabs.query({ active: true, lastFocusedWindow: true })
    )[0];
}
