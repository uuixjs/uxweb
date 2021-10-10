/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */
import globby from "globby";
import path from "path";
import fs from "fs";

const BUILD_DIR = path.join(__dirname, "..");
const BUILD_OUTPUTS = ["android", "build", "css", "ios", "json", "scss"];

/**
 * The purpose of this test is to verify the output of tokens while making
 * changes to the functionality. This test is intended only for use in local
 * development, and its snapshot is ignored by version control.
 *
 * To use the test, remove the `.skip` method and run the test before
 * making changes to functionaliy to create a snapshot. Subsequent tests will
 * show changes to the output which can be helpful with debugging.
 */
describe("bundled package", () => {
  it.skip("exports the same files", () => {
    const files = globby.sync(BUILD_OUTPUTS, { cwd: BUILD_DIR }).sort();
    files.forEach((file) => {
      const contents = fs.readFileSync(file, "utf-8");
      expect(contents).toMatchSnapshot();
    });
  });
});
