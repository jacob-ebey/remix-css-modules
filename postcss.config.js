let path = require("path");
let fsp = require("fs/promises");

module.exports = {
  plugins: [
    require("postcss-modules")({
      getJSON: async (cssFilename, json, outputFilename) => {
        console.log(cssFilename, json, outputFilename);
        await fsp
          .mkdir(path.dirname(outputFilename), { recursive: true })
          .catch(() => {});
        await fsp.writeFile(
          `${outputFilename.replace(/\.css$/, ".json")}`,
          JSON.stringify(json)
        );
      },
    }),
  ],
};
