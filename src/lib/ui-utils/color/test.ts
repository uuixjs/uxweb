import { formatColor } from ".";

describe("formatHexColor", () => {
  it("adds a hex character prefix", () => {
    const result = formatColor("ffaa00");
    expect(result).toBe("#ffaa00");
  });

  it("adds a hex character prefix to three character codes", () => {
    const result = formatColor("aaa");
    expect(result).toBe("#aaa");
  });

  it("adds a hex character prefix to uppercase codes", () => {
    const result = formatColor("FA9");
    expect(result).toBe("#FA9");
  });

  it("does not add a prefix if it already exists", () => {
    const result = formatColor("#ffaa00");
    expect(result).toBe("#ffaa00");
  });

  it("does not add a prefix to invalid hex codes", () => {
    const result = formatColor("ff00qq");
    expect(result).toBe("ff00qq");
  });

  it("returns unmodified string when invalid color is provided", () => {
    const result = formatColor("this is not a color");
    expect(result).toBe("this is not a color");
  });

  it("returns unmodified string when rgb color provided", () => {
    const result = formatColor("rgb(255,255,255)");
    expect(result).toBe("rgb(255,255,255)");
  });

  it("returns unmodified string when hsl color provided", () => {
    const result = formatColor("hsl(100,50%,50%)");
    expect(result).toBe("hsl(100,50%,50%)");
  });

  it("does not modify strings containing hex codes", () => {
    const result = formatColor("The value #FFFFFF represents white.");
    expect(result).toBe("The value #FFFFFF represents white.");
  });
});
