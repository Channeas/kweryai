import isDevVersion from "./isDevVersion";

export default async function debugLog(message: string, ...info: unknown[]) {
    if (isDevVersion() || (await isDebugEnabled())) {
        console.log("DEBUG:", message, ...info);
    }
}

async function isDebugEnabled(): Promise<boolean> {
    const { debug } = await chrome.storage.local.get("debug");
    return !!debug;
}
