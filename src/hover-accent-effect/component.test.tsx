import { mount } from "enzyme";
import { HoverAccentEffect } from ".";
import { ScWrapper } from "./component";

describe("HoverAccentEffect", () => {
  it("Adds a style prop when color is set", () => {
    const wrapper = mount(<HoverAccentEffect color="FFF" />);
    expect(wrapper.find(ScWrapper).find("div").first()).toHaveStyleRule(
      "--color-accent",
      "#FFF",
    );
  });

  it("Does not add a style prop with no color set", () => {
    const wrapper = mount(<HoverAccentEffect />);
    expect(wrapper.find(ScWrapper).find("div").first()).not.toHaveStyleRule(
      "--color-accent",
    );
  });
});
