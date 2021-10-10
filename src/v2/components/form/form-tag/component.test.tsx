import { setupShallowTest } from "../../../tests/helpers";
import { SVG, SVGAsset } from "../../svg";
import { InputSize } from "../form";
import { FormTag, FormTagProps, FormTagStatus } from "./component";

function getRequiredProps(): FormTagProps {
  return {
    label: "Test Label",
  };
}

function getOptionalProps(): FormTagProps {
  return {
    disabled: true,
    label: "Test Label",
    onClick: jest.fn(),
    status: FormTagStatus.Selected,
    tabIndex: 0,
  };
}

const setupShallow = setupShallowTest(FormTag, getRequiredProps);

describe("FormTag", () => {
  it("renders form tag component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders form tag component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders form tag component with size prop", () => {
    const { wrapper } = setupShallow({ size: InputSize.Large });
    expect(wrapper).toMatchSnapshot();
  });

  it("renders form tag component as locked", () => {
    const { wrapper } = setupShallow({ status: FormTagStatus.Locked });
    expect(wrapper).toMatchSnapshot();
  });

  it("should display a close icon when status is selected", () => {
    const { wrapper } = setupShallow({ status: FormTagStatus.Selected });
    expect(wrapper.find(SVG).props().asset).toEqual(SVGAsset.Smallhide);
  });
});
