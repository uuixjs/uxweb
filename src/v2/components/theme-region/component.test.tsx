import {
  CORE_UI_ROOT_DARK_THEME_SELECTOR,
  CORE_UI_ROOT_LIGHT_THEME_SELECTOR,
} from "lib/ui-utils";
import { Color, Layout } from "../layout";

import { ThemeRegion } from "./component";
import { shallow } from "enzyme";

describe(ThemeRegion, () => {
  const { documentElement } = document;

  beforeEach(() => {
    documentElement.className = "";
  });

  it("sets a color by defualt", () => {
    const wrapper = shallow(<ThemeRegion theme="light" />);
    expect(wrapper.find(Layout).prop("color")).not.toBe(undefined);
  });

  it("allows color to be configured", () => {
    const wrapper = shallow(<ThemeRegion theme="light" color={Color.Alt2} />);
    expect(wrapper.find(Layout).prop("color")).toBe(Color.Alt2);
  });

  it("sets light theme class", () => {
    const wrapper = shallow(<ThemeRegion theme="light" />);

    expect(
      wrapper.find({ className: CORE_UI_ROOT_LIGHT_THEME_SELECTOR }),
    ).toExist();
  });

  it("sets dark theme class", () => {
    const wrapper = shallow(<ThemeRegion theme="dark" />);

    expect(
      wrapper.find({ className: CORE_UI_ROOT_DARK_THEME_SELECTOR }),
    ).toExist();
  });

  it("sets a theme class for `system`", () => {
    const wrapper = shallow(<ThemeRegion theme="system" />);

    expect(
      wrapper.find({ className: CORE_UI_ROOT_LIGHT_THEME_SELECTOR }),
    ).toExist();
  });
});
