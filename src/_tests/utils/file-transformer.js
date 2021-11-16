const cssjson = require("cssjson");
const sass = require("node-sass");

const moduleTemplate = `
    "use strict";

    Object.defineProperty(exports, "__esModule", {
       value: true
    });

    exports.default = %s;
`;

const getPackageFileUrl = (url) => {
  let formatted = url;
  formatted = formatted.replace(/^~/, "");

  if (!url.endsWith(".scss")) {
    formatted = formatted + ".scss";
  }

  return require.resolve(formatted);
};

/**
 * It is possible for the transformed scss file to be cached and result in
 * unexpected test results after changing a file. If this occurs, there are
 * two options:
 *
 * - Run jest with the `--no-cache` flag to ignore the cached file, or
 * - Run jest with the `--clear-cache` flag to reset the cache
 */
module.exports = {
  process(src, path, config) {
    const sassConfig = {
      data: src,
      file: path,
      importer: (url) => {
        if (url === "variables") {
          return {
            file: require.resolve("lib/ui-scss-compat/variables.scss"),
          };
        }

        if (url.match(/^(~)?twitch-core-ui-/)) {
          return {
            file: getPackageFileUrl(url),
          };
        }
      },
    };

    const textCSS = String(sass.renderSync(sassConfig).css);
    return moduleTemplate.replace(
      "%s",
      JSON.stringify(cssjson.toJSON(textCSS)),
    );
  },
};
