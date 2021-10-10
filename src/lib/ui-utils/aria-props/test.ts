import { getAriaProps } from ".";

describe("getAriaProps", () => {
  it("returns only aria props", () => {
    const props = {
      label: "Some button",
      message: "Some message",
      "aria-label": "Some button",
      "aria-describedby": "id",
      role: "button",
    };

    expect(getAriaProps(props)).toStrictEqual({
      "aria-label": "Some button",
      "aria-describedby": "id",
      role: "button",
    });
  });
});
