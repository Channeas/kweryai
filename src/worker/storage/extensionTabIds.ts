export async function getExtensionTabIds(): Promise<Set<number>> {
    const { extensionTabIdsArray } = await chrome.storage.session.get(
        "extensionTabIdsArray"
    );

    if (!extensionTabIdsArray) return new Set();

    return new Set(extensionTabIdsArray);
}

// TODO: Prevent data corruption if this is called in parallel
async function setExtensionTabIds(extensionTabIds: Set<number>) {
    await chrome.storage.session.set({
        extensionTabIdsArray: Array.from(extensionTabIds)
    });
}

export async function addExtensionTabIds(idsToAdd: number | number[]) {
    const extensionTabIds = await getExtensionTabIds();

    if (typeof idsToAdd === "number") {
        extensionTabIds.add(idsToAdd);
    } else {
        idsToAdd.map((value) => extensionTabIds.add(value));
    }

    await setExtensionTabIds(extensionTabIds);
}

export async function removeExtensionTabIds(idsToAdd: number | number[]) {
    const extensionTabIds = await getExtensionTabIds();

    if (typeof idsToAdd === "number") {
        extensionTabIds.delete(idsToAdd);
    } else {
        idsToAdd.map((value) => extensionTabIds.delete(value));
    }

    await setExtensionTabIds(extensionTabIds);
}
