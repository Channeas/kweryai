const package_json = require("../package.json");

module.exports = function addPackageDataToManifest(manifestAsBuffer) {
    const originalManifest = JSON.parse(manifestAsBuffer.toString());

    let name = package_json.name;
    if (process.env.NODE_ENV === "development") {
        name = `DEV: ${package_json.name}`;
    }

    // Fill some properties of the extension manifest using package.json data
    const modifiedManifest = {
        name,
        version: package_json.version,
        description: package_json.description,
        ...originalManifest
    };

    return JSON.stringify(modifiedManifest, null, 4);
};
