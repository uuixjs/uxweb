import {
  ImageSelector,
  ImageSelectorIconPosition,
  ImageSelectorProps,
  ImageSelectorType,
} from "./component";

import { AspectRatio } from "../../aspect";
import { BorderRadius } from "lib/ui-utils";
import { SVGAsset } from "../../svg";
import { setupShallowTest } from "../../../tests/helpers";

function getRequiredProps(): ImageSelectorProps {
  return {
    title: "Test Label",
    id: "test-id",
    src: "/testSRC",
    alt: "Test Alt",
    type: ImageSelectorType.Radio,
  };
}

function getOptionalProps(): ImageSelectorProps {
  return {
    autoFocus: true,
    checked: true,
    defaultChecked: true,
    disabled: true,
    error: true,
    id: "test-id",
    title: "Test Label",
    name: "Test name",
    onBlur: jest.fn(),
    onChange: jest.fn(),
    onFocus: jest.fn(),
    required: true,
    src: "/testSRC",
    alt: "Test Alt",
    tabIndex: 0,
    type: ImageSelectorType.Checkbox,
    value: "Test value",
    borderRadius: BorderRadius.Medium,
    hoverScale: true,
    selectedMask: true,
    selectedIcon: {
      position: ImageSelectorIconPosition.TopRight,
      icon: SVGAsset.Heart,
    },
    ratio: AspectRatio.Aspect16x9,
  };
}

const setupShallow = setupShallowTest(ImageSelector, getRequiredProps);

describe("ImageSelector", () => {
  it("renders checkbox component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders checkbox component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
