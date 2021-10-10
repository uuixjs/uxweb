import { execSync } from "child_process";
import decompress from "decompress";
import {
  ensureDir,
  existsSync,
  readdir,
  readFileSync,
  removeSync,
} from "fs-extra";
import path from "path";

// set async timeout to 60sec to give decompress plenty of time in slow Jenkins
jest.setTimeout(60000);

describe("test build output", () => {
  /**
   * Scratch directory to allow testing a clean package distributable
   */
  const tempDir = path.resolve(
    __dirname,
    `.temp-build-${process.env.GIT_COMMIT}`,
  );
  /**
   * Output from `yarn pack`
   */
  const zipFile = path.join(tempDir, "package.zip");
  /**
   * Output from unzipping `pack`ed tarball
   */
  const unzipped = path.join(tempDir, "package");
  /**
   * Convenience method for reading from the clean package contents
   */
  function fileString(name: string): string {
    return readFileSync(`${unzipped}/${name}`).toString();
  }

  beforeAll(async () => {
    ensureDir(tempDir);
    // pack distributable to ensure proper distribution config
    execSync(`yarn pack --filename ${zipFile}`, {
      cwd: path.resolve(__dirname, ".."),
    });
    // ensure there are no leftover artifacts from previous runs
    removeSync(unzipped);
    // unzip packed distributable to access contents in "clean" location
    await decompress(zipFile, tempDir);
  });

  afterAll(() => {
    removeSync(tempDir);
  });

  describe("Bundled package", () => {
    it("exports the same root files", async () => {
      const files = await readdir(unzipped);
      expect(files.sort()).toMatchInlineSnapshot(`
      Array [
        "README.md",
        "css",
        "package.json",
        "scss",
      ]
    `);
    });

    it("exports the expected scss files", async () => {
      expect(existsSync(`${unzipped}/scss/base.scss`)).toBe(true);
      expect(existsSync(`${unzipped}/scss/functional.scss`)).toBe(true);
      expect(existsSync(`${unzipped}/scss/functional-minus-base.scss`)).toBe(
        true,
      );
      expect(existsSync(`${unzipped}/scss/variables.scss`)).toBe(true);
    });

    it("exports the expected css files", async () => {
      expect(existsSync(`${unzipped}/css/base.css`)).toBe(true);
      expect(existsSync(`${unzipped}/css/base-fallback.css`)).toBe(true);
      expect(existsSync(`${unzipped}/css/functional.css`)).toBe(true);
      expect(existsSync(`${unzipped}/css/functional-fallback.css`)).toBe(true);
      expect(existsSync(`${unzipped}/css/functional-minus-base.css`)).toBe(
        true,
      );
      expect(
        existsSync(`${unzipped}/css/functional-minus-base-fallback.css`),
      ).toBe(true);
    });

    describe("css/", () => {
      const cssBuildVariations = ["", "-fallback"] as const;

      // Substrings we can search in output files to confirm content is included
      const Css = {
        reset: "font-size:100%;font:inherit;vertical-align:baseline",
        variables: "--color-background-alt",
        baseTheming: ".tw-root--theme-light",
        functional: "tw-mg-1",
        buttons: "tw-button",
        // for testing css custom properties fallback generation
        "-modern": "body{background-color:var(--color-background-body);",
        "-fallback":
          "body{background-color:#0e0e10;background-color:var(--color-background-body);",
      };

      describe("base", () => {
        cssBuildVariations.forEach((variation) => {
          describe(variation, () => {
            it.each`
              name                | match                          | expected
              ${"css reset"}      | ${Css.reset}                   | ${true}
              ${"css variables"}  | ${Css.variables}               | ${true}
              ${"base theming"}   | ${Css.baseTheming}             | ${true}
              ${"functional css"} | ${Css.functional}              | ${false}
              ${"buttons css"}    | ${Css.buttons}                 | ${false}
              ${"variable css"}   | ${Css[variation || "-modern"]} | ${true}
            `("$name included: $expected", ({ match, expected }) => {
              expect(
                fileString(`css/base${variation}.css`).includes(match),
              ).toBe(expected);
            });
          });
        });
      });

      describe("functional", () => {
        cssBuildVariations.forEach((variation) => {
          describe(variation, () => {
            it.each`
              name                | match                          | expected
              ${"css reset"}      | ${Css.reset}                   | ${true}
              ${"css variables"}  | ${Css.variables}               | ${true}
              ${"base theming"}   | ${Css.baseTheming}             | ${true}
              ${"functional css"} | ${Css.functional}              | ${true}
              ${"buttons css"}    | ${Css.buttons}                 | ${true}
              ${"variable css"}   | ${Css[variation || "-modern"]} | ${true}
            `("$name included: $expected", ({ match, expected }) => {
              expect(
                fileString(`css/functional${variation}.css`).includes(match),
              ).toBe(expected);
            });
          });
        });
      });
    });
  });
});
