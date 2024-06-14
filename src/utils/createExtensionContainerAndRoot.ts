export default function createExtensionContainerAndRoot() {
    const extensionRoot = document.createElement("div");
    extensionRoot.setAttribute("id", "kwery-extension-root");
    const shadow = extensionRoot.attachShadow({ mode: "open" });

    const extensionContainer = document.createElement("div");
    extensionContainer.setAttribute("id", "kwery-extension-container");
    shadow.appendChild(extensionContainer);

    const styleSheet = document.createElement("link");
    styleSheet.setAttribute("rel", "stylesheet");
    styleSheet.setAttribute("href", chrome.runtime.getURL("css/script.css"));
    shadow.appendChild(styleSheet);

    return {
        extensionContainer,
        extensionRoot
    };
}
