import addons, { mockChannel } from "@storybook/addons";

import { CoreUIRoot } from "v2/components/core-ui-root/component";
import { RootClassesDecorator } from "./component";
import { THEME_STORAGE_KEY } from "../../constants";
import { shallow } from "enzyme";

describe("featureDecorator", () => {
  beforeAll(() => {
    addons.setChannel(mockChannel());
  });

  test("should set a default root theme class", () => {
    const wrapper = shallow(<RootClassesDecorator />);
    expect(wrapper.find(CoreUIRoot)).toHaveProp("theme", "system");
  });

  test("should apply the theme stored in localStorage", () => {
    const activeTheme = "dark";
    localStorage.setItem(THEME_STORAGE_KEY, activeTheme);
    const wrapper = shallow(<RootClassesDecorator />);
    expect(wrapper.find(CoreUIRoot)).toHaveProp("theme", activeTheme);
  });
});
