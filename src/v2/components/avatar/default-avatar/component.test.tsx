import {
  DefaultAvatarComponent,
  DefaultAvatarProps,
  ScDefaultAvatar,
} from "./component";

import { BorderRadius } from "lib";
import { Icon } from "../../icon";
import { StaticTokenMap } from "lib/ui-tokens";
import { setupShallowTest } from "../../../tests/helpers";

function getRequiredProps(): DefaultAvatarProps {
  return {
    userLogin: "pondelinip",
    size: 30,
  };
}

function getOptionalProps(): DefaultAvatarProps {
  return {
    ...getRequiredProps(),
    borderRadius: BorderRadius.Medium,
  };
}

const setupShallow = setupShallowTest(DefaultAvatarComponent, getRequiredProps);

describe("DefaultAvatar", () => {
  it("renders default-avatar component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders default-avatar component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("skips the icon for small sizes", () => {
    const { wrapper } = setupShallow({ size: 10 });
    expect(wrapper.find(Icon)).not.toExist();

    const { wrapper: anotherWrapper } = setupShallow({ size: 15 });
    expect(anotherWrapper.find(Icon)).not.toExist();
  });

  it.each([
    // The qoi0 username was arbitrarily chosen to match accent-carrot, to make it easier to keep
    // this test and the DEFAULT_AVATAR_COLORS array in sync (they can both be in alphabetical order)
    [StaticTokenMap["color-brand-accent-carrot"], "qoi0"],
    [StaticTokenMap["color-brand-accent-dragonfruit"], "qoi1"],
    [StaticTokenMap["color-brand-accent-eggplant"], "qoi2"],
    [StaticTokenMap["color-brand-accent-grape"], "qoi3"],
    [StaticTokenMap["color-brand-accent-lime"], "qoi4"],
    [StaticTokenMap["color-brand-accent-marine"], "qoi5"],
    [StaticTokenMap["color-brand-accent-seafoam"], "qoi6"],
    [StaticTokenMap["color-brand-accent-sun"], "qoi7"],
    [StaticTokenMap["color-brand-accent-turquoise"], "qoi8"],
    [StaticTokenMap["color-brand-accent-wine"], "qoi9"],
    [StaticTokenMap["color-brand-muted-emerald"], "qoi10"],
    [StaticTokenMap["color-brand-muted-ice"], "qoi11"],
    [StaticTokenMap["color-brand-muted-mustard"], "qoi12"],
    // This accent-carrot is repeated to demonstrate that the assignment 'loops around'
    [StaticTokenMap["color-brand-accent-carrot"], "qoi13"],
  ])('assigns color "%s", given user login "%s"', (color, userLogin) => {
    const { wrapper } = setupShallow({ userLogin });

    expect(wrapper.find(ScDefaultAvatar)).toHaveStyleRule(
      "background-color",
      color,
    );
  });
});
