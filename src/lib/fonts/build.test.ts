import globby from "globby";
import { resolve } from "path";

const FONTS_DIR = resolve(__dirname, "../fonts");

describe("package", () => {
  it("exports the same fonts", () => {
    expect(globby.sync("*", { cwd: FONTS_DIR }).sort()).toMatchSnapshot();
  });
});
