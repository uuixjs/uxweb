/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */
import { execSync } from "child_process";
import globby from "globby";
import path from "path";

const { renderSync } = require("sass-extract");

const BUILD_DIR = path.join(__dirname, "..");
const BUILD_OUTPUTS = ["android", "build", "css", "ios", "json", "scss"];

describe("bundled package", () => {
  it("exports the same files", () => {
    expect(
      globby.sync(BUILD_OUTPUTS, { cwd: BUILD_DIR }).sort(),
    ).toMatchSnapshot();
  });

  it("dark and light token keys match in SCSS output", () => {
    const scssThemeObj = renderSync({
      file: path.join(BUILD_DIR, "scss/themes.scss"),
    });

    const darkTokens = Object.keys(
      scssThemeObj.vars.global["$theme-dark"].value,
    ).sort();

    const lightTokens = Object.keys(
      scssThemeObj.vars.global["$theme-light"].value,
    ).sort();

    expect(lightTokens).toEqual(darkTokens);
  });

  it("dark and light tokens match in JSON outputs", () => {
    const comboObj = require(path.join(BUILD_DIR, "json/all.json"));
    const darkThemeObj = require(path.join(BUILD_DIR, "json/light.json"));
    const lightThemeObj = require(path.join(BUILD_DIR, "json/dark.json"));

    const [standaloneDarkTokens, standaloneDarkValues] = Object.entries(
      darkThemeObj,
    );
    const [comboDarkTokens, comboDarkValues] = Object.entries(comboObj.dark);
    const [standaloneLightTokens, standaloneLightValues] = Object.entries(
      lightThemeObj,
    );
    const [comboLightTokens, comboLightValues] = Object.entries(comboObj.light);

    // ensure token names match everywhere
    expect(standaloneDarkTokens).toEqual(standaloneLightTokens);
    expect(comboDarkTokens).toEqual(comboLightTokens);
    expect(standaloneLightTokens).toEqual(comboLightTokens);
    expect(standaloneDarkTokens).toEqual(comboDarkTokens);

    // ensure token values match between standalone and combo outputs
    expect(standaloneDarkValues).toEqual(comboDarkValues);
    expect(standaloneLightValues).toEqual(comboLightValues);
  });

  it("TypeScript intermediate output passes typecheck", () => {
    // get absolute path so that tests can be run from multiple package and root
    const configPath = path.resolve(__dirname, "../tsconfig.build.json");
    expect(() => execSync(`yarn tsc --noEmit -p ${configPath}`)).not.toThrow();
  });
});
