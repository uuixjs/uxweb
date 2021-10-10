import { shallow } from "enzyme";
import { setupShallowTest } from "../../tests/helpers";
import {
  ButtonIcon,
  ButtonIconSize,
  ButtonIconType,
} from "../button/button-icon";
import {
  CloseButtonProps,
  CoreDismissible,
  CoreDismissibleProps,
} from "./component";

function getRequiredProps(): CoreDismissibleProps & CloseButtonProps {
  return {
    "aria-label": "Close Button",
  };
}

function getOptionalProps(): CoreDismissibleProps & CloseButtonProps {
  return {
    "aria-label": "Close Button",
    overlay: true,
    size: ButtonIconSize.Small,
    variant: ButtonIconType.Secondary,
  };
}

const setupShallow = setupShallowTest(CoreDismissible, getRequiredProps);

describe("CoreDismissible", () => {
  it("renders CoreDismissible component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders CoreDismissible component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("passes aria-label to the element", () => {
    const label = "Close Button";
    const wrapper = shallow(<CoreDismissible aria-label={label} />);
    const element = wrapper.find(ButtonIcon).first();
    expect(element.prop("aria-label")).toBe(label);
  });
});
