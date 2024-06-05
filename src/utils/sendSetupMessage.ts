export default async function sendSetupMessage(): Promise<boolean> {
    const response = await chrome.runtime.sendMessage({
        isContentScriptSetup: true
    });

    return !!response;
}
