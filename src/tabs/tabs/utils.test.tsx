import { isTabItemsLayoutEqual, labelIsEqual } from "./utils";

describe("isTabItemsLayoutEqual", () => {
  it("compares labels", () => {
    const result = isTabItemsLayoutEqual(
      [{ label: "Label" }],
      [{ label: "Foobar" }],
    );
    expect(result).toBe(false);
  });

  it("compres array lengths", () => {
    const result = isTabItemsLayoutEqual(
      [{ label: "Label" }],
      [{ label: "Label" }, { label: "Foobar" }],
    );
    expect(result).toBe(false);
  });

  it("ignores other attributes like title", () => {
    const result = isTabItemsLayoutEqual(
      [{ label: "Label", title: "Foo" }],
      [{ label: "Label", title: "Bar" }],
    );
    expect(result).toBe(true);
  });
});

describe("labelIsEqual", () => {
  it("Compares equal strings", () => {
    const result = labelIsEqual("Foo", "Foo");
    expect(result).toBe(true);
  });

  it("Compares different strings", () => {
    const result = labelIsEqual("Foo", "Bar");
    expect(result).toBe(false);
  });

  it("Compares equal arrays", () => {
    const result = labelIsEqual(["Foo", "Bar"], ["Foo", "Bar"]);
    expect(result).toBe(true);
  });

  it("Compares different arrays", () => {
    const result = labelIsEqual(["Foo", "Bar"], ["Foo", "Baaaaaz"]);
    expect(result).toBe(false);
  });

  it("Compares strings and arrays", () => {
    const result = labelIsEqual("Foo Bar", ["Foo", "Bar"]);
    expect(result).toBe(false);
  });

  it("Compares strings and undefined", () => {
    const result = labelIsEqual("Foo Bar", undefined);
    expect(result).toBe(false);
  });
});
