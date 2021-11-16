import { getBreakpointCss } from "./utils";

describe(getBreakpointCss, () => {
  it("uses string values directly", () => {
    const fn = jest.fn((value) => ({ border: value }));

    const result = getBreakpointCss("blue", fn);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("blue");
    expect(result).toEqual({ border: "blue" });
  });

  it("uses number values directly", () => {
    const fn = jest.fn((value) => ({ margin: value }));

    const result = getBreakpointCss(5, fn);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(5);
    expect(result).toEqual({ margin: 5 });
  });

  it("returns an empty object for undefined values", () => {
    const fn = jest.fn((value) => ({ border: value }));

    const result = getBreakpointCss(undefined, fn);

    expect(fn).toHaveBeenCalledTimes(0);
    expect(result).toEqual({});
  });

  describe("object input value handling", () => {
    it("callback called once for each key", () => {
      const fn = jest.fn();

      getBreakpointCss({ default: "1rem", xs: "2rem" }, fn);

      expect(fn).toHaveBeenCalledTimes(2);
      expect(fn).toHaveBeenCalledWith("1rem");
      expect(fn).toHaveBeenCalledWith("2rem");
    });

    it("generates expected css for each breakpoint", () => {
      const fn = jest.fn((value) => ({ fontSize: value }));

      const result = getBreakpointCss(
        {
          default: "1rem",
          xs: "2rem",
          sm: "3rem",
          md: "4rem",
          lg: "5rem",
          xl: "6rem",
          xxl: "7rem",
        },
        fn,
      );

      expect(result).toMatchInlineSnapshot(`
        Object {
          "&": Object {
            "fontSize": "1rem",
          },
          "@media screen and (min-width: 1024px)": Object {
            "fontSize": "4rem",
          },
          "@media screen and (min-width: 1200px)": Object {
            "fontSize": "5rem",
          },
          "@media screen and (min-width: 1440px)": Object {
            "fontSize": "6rem",
          },
          "@media screen and (min-width: 1600px)": Object {
            "fontSize": "7rem",
          },
          "@media screen and (min-width: 480px)": Object {
            "fontSize": "2rem",
          },
          "@media screen and (min-width: 768px)": Object {
            "fontSize": "3rem",
          },
        }
      `);
    });
  });
});
