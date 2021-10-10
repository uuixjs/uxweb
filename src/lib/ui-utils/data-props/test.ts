import { getDataProps, splitDataProps } from ".";

describe("getDataProps", () => {
  it("returns only props that start with data-", () => {
    const result = getDataProps({
      name: "Bob Ross",
      points: 123,
      ["data-test-selector"]: "my-example-string",
    });

    expect(result).toEqual({
      ["data-test-selector"]: "my-example-string",
    });
  });

  it("returns all props that start with data-", () => {
    const result = getDataProps({
      name: "Bob Ross",
      points: 123,
      ["data-test-selector"]: "my-test-selector",
      ["data-a-target"]: "my-a-target",
      ["data-foobar"]: "my-foobar",
    });

    expect(result).toEqual({
      ["data-test-selector"]: "my-test-selector",
      ["data-a-target"]: "my-a-target",
      ["data-foobar"]: "my-foobar",
    });
  });

  it("returns nothing when there are no matching data- props", () => {
    const result = getDataProps({
      name: "Bob Ross",
      points: 123,
      dataThing: "foobar",
    });

    expect(result).toEqual({});
  });
});

describe("splitDataProps", () => {
  it("correctly groups the non-data props", () => {
    const { nonDataProps } = splitDataProps({
      name: "Bob Ross",
      points: 123,
      ["data-test-selector"]: "my-test-selector",
      ["data-a-target"]: "my-a-target",
      ["data-foobar"]: "my-foobar",
    });

    expect(nonDataProps).toEqual({
      name: "Bob Ross",
      points: 123,
    });
  });

  it("correctly groups the data- props", () => {
    const { dataProps } = splitDataProps({
      name: "Bob Ross",
      points: 123,
      ["data-test-selector"]: "my-test-selector",
      ["data-a-target"]: "my-a-target",
      ["data-foobar"]: "my-foobar",
    });

    expect(dataProps).toEqual({
      ["data-test-selector"]: "my-test-selector",
      ["data-a-target"]: "my-a-target",
      ["data-foobar"]: "my-foobar",
    });
  });
});
