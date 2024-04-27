const package_json = require("../package.json");

module.exports = function addPackageDataToManifest(manifestAsBuffer) {
    const originalManifest = JSON.parse(manifestAsBuffer.toString());

    let name = originalManifest.name || package_json.name;
    if (process.env.NODE_ENV === "development") {
        name = `DEV: ${name}`;
    }

    // Fill some properties of the extension manifest using package.json data
    const modifiedManifest = {
        version: package_json.version,
        description: package_json.description,
        ...originalManifest,
        name
    };

    return JSON.stringify(modifiedManifest, null, 4);
};
