import { readdirSync, statSync } from "fs";
import { join } from "path";
import * as main from "./index";

describe("Main index file", () => {
  it("public exports match snapshot", () => {
    const result = Object.keys(main).sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" }),
    );
    expect(result).toMatchSnapshot();
  });

  /**
   * Quick and dirty unit test to give us a warning in case we add a
   * folder in the 'components' dir and don't also add a public export
   * with a name matching the name of the added folder.
   */
  it("is not missing public exports for component folders", async () => {
    const p = join(__dirname, "components");
    const topFolders = getFolders(p);

    // List of folders and sub-folders, lower case, no spaces or special chars
    const topAndSubFolders = topFolders
      .reduce((all, f) => {
        const subfolders = getFolders(join(p, f));
        return [...all, ...subfolders];
      }, topFolders)
      .map((f) => f.toLowerCase().replace(/-|_/g, ""))
      .filter((n, i, self) => self.indexOf(n) === i);

    // List of exported components that match folder names, lower case, no spaces or special chars
    const componentExports = Object.keys(main)
      .map((n) => n.toLowerCase())
      .filter((n) => topAndSubFolders.includes(n));

    const foldersWithNoExports = topAndSubFolders
      .filter((n) => !componentExports.includes(n))
      .sort();

    expect(foldersWithNoExports).toMatchInlineSnapshot(`
      Array [
        "components",
        "composedcards",
        "dialogs",
        "error",
        "form",
        "halo",
        "hint",
        "label",
        "legend",
        "notifications",
        "required",
        "snapshots",
        "statusbutton",
        "utils",
        "verticalnavigationgroupheader",
        "verticalnavigationitembase",
      ]
    `);
  });
});

function getFolders(p: string) {
  return readdirSync(p).filter((f) => statSync(join(p, f)).isDirectory());
}
