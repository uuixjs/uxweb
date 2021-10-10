import { getMarginStyles, getPaddingStyles } from ".";

describe(getMarginStyles, () => {
  it("returns empty object when value is undefined", () => {
    expect(getMarginStyles({})).toEqual({});
    expect(getMarginStyles({ margin: undefined })).toEqual({});
  });

  describe("padding shorthand", () => {
    it("works for numeric value", () => {
      expect(getMarginStyles({ margin: 5 })).toEqual({
        marginBottom: "5rem;",
        marginLeft: "5rem;",
        marginRight: "5rem;",
        marginTop: "5rem;",
      });
    });

    it("works for auto", () => {
      expect(getMarginStyles({ margin: "auto" })).toEqual({
        marginBottom: "auto",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
      });
    });
  });

  describe("explicit directions", () => {
    it("works for top", () => {
      expect(getMarginStyles({ margin: { top: 0 } })).toEqual({
        marginTop: "0",
      });
    });

    it("works for right", () => {
      expect(getMarginStyles({ margin: { right: 0.5 } })).toEqual({
        marginRight: "0.5rem;",
      });
    });

    it("works for bottom", () => {
      expect(getMarginStyles({ margin: { bottom: 1 } })).toEqual({
        marginBottom: "1rem;",
      });
    });

    it("works for left", () => {
      expect(getMarginStyles({ margin: { left: 2 } })).toEqual({
        marginLeft: "2rem;",
      });
    });

    it("works for x", () => {
      expect(getMarginStyles({ margin: { x: 3 } })).toEqual({
        marginLeft: "3rem;",
        marginRight: "3rem;",
      });
    });

    it("works for y", () => {
      expect(getMarginStyles({ margin: { y: 4 } })).toEqual({
        marginBottom: "4rem;",
        marginTop: "4rem;",
      });
    });

    it("works for combination", () => {
      expect(
        getMarginStyles({
          margin: { top: 0, bottom: 1, left: "auto" },
        }),
      ).toEqual({
        marginBottom: "1rem;",
        marginLeft: "auto",
        marginTop: "0",
      });
    });

    it("throws when x and a horizontal direction are combined", () => {
      expect(() => getMarginStyles({ margin: { x: 0, left: 0 } })).toThrow();
      expect(() => getMarginStyles({ margin: { x: 1, right: 1 } })).toThrow();
    });

    it("throws when y and a vertical direction are combined", () => {
      expect(() => getMarginStyles({ margin: { y: 0, top: 0 } })).toThrow();
      expect(() => getMarginStyles({ margin: { y: 1, bottom: 1 } })).toThrow();
    });
  });
});

// all logic paths covered by getMarginStyles tests, just verifying key change
describe(getPaddingStyles, () => {
  it("returns empty string when value is undefined", () => {
    expect(getPaddingStyles({})).toEqual({});
    expect(getPaddingStyles({ padding: undefined })).toEqual({});
  });

  it("works for padding shorthand", () => {
    expect(getPaddingStyles({ padding: 5 })).toEqual({
      paddingBottom: "5rem;",
      paddingLeft: "5rem;",
      paddingRight: "5rem;",
      paddingTop: "5rem;",
    });
  });
});
