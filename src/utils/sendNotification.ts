export default function sendNotification(
    title: string,
    message: string,
    iconUrl: string = "/icons/kweryai128.png"
) {
    chrome.notifications.create("", {
        iconUrl,
        message,
        title,
        type: "basic"
    });
}
