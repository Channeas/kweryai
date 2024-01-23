const package_json = require("../package.json");

module.exports = function getOutputDirectory(environment) {
    if (environment === "production") {
        return `builds/${package_json.name}-v${package_json.version}`;
    }

    return "dist";
};
