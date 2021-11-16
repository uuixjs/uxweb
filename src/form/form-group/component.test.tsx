import { mount } from "enzyme";
import { setupShallowTest } from "../../../tests/helpers";
import { Layout } from "../../layout";
import { FormError } from "../error";
import { FormHint } from "../hint";
import { FormLabel } from "../label";
import {
  FORM_GROUP_HORIZONTAL_LABEL_TEST_SELECTOR,
  FormGroup,
  FormGroupControls,
  formGroupHorizontalLabelWidth,
  FormGroupOrientation,
  FormGroupProps,
  ScFormGroupOptional,
} from "./component";

function getRequiredProps(): FormGroupProps {
  return {
    label: "Test Label",
    id: "test-id",
  };
}

function getOptionalProps(): FormGroupProps {
  return {
    error: true,
    errorMessage: "Error message",
    hint: "Test hint",
    label: "Test Label",
    id: "test-id",
    labelOptional: "Test optional label",
    orientation: FormGroupOrientation.Vertical,
  };
}

const setupShallow = setupShallowTest(FormGroup, getRequiredProps);

describe("FormGroup", () => {
  it("renders form group component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders form group component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders form group component as a fieldset", () => {
    const wrapper = mount(
      <FormGroup
        {...getRequiredProps()}
        controls={FormGroupControls.Multiple}
      />,
    );
    expect(wrapper.find("fieldset")).toExist();
  });

  it("renders form group component as a horizontal layout", () => {
    const wrapper = mount(
      <FormGroup
        {...getRequiredProps()}
        orientation={FormGroupOrientation.Horizontal}
      />,
    );

    expect(
      wrapper
        .find(Layout)
        .filter({
          "data-test-selector": FORM_GROUP_HORIZONTAL_LABEL_TEST_SELECTOR,
        })
        .prop("width"),
    ).toBe(formGroupHorizontalLabelWidth);
  });

  it("renders error instead of hint when in error", () => {
    const wrapper = mount(
      <FormGroup {...getRequiredProps()} error errorMessage="test error" />,
    );

    // When error exists, and hint does not.
    expect(wrapper.find(FormError)).toExist();

    wrapper.setProps({ error: false, hint: "hint text" });
    wrapper.update();

    // When hint exists, and error does not.
    expect(wrapper.find(FormError)).not.toExist();
    expect(wrapper.find(FormHint)).toExist();

    wrapper.setProps({ error: "error text", hint: "hint text" });
    wrapper.update();

    // When both exist, error is displayed
    expect(wrapper.find(FormError)).toExist();
    expect(wrapper.find(FormHint)).not.toExist();

    wrapper.setProps({
      error: <span>Error</span>,
      hint: <span>Hint</span>,
    });
    wrapper.update();

    // same as above, but expecting both values to be ReactNodes
    expect(wrapper.find("span").filter({ children: "Error" })).toExist();
    expect(wrapper.find("span").filter({ children: "Hint" })).not.toExist();
  });

  it("renders optional label only when label is a string", () => {
    const wrapper = mount(
      <FormGroup
        {...getRequiredProps()}
        label="string label"
        labelOptional="string optional label"
      />,
    );

    expect(wrapper.find(FormLabel)).toExist();
    expect(wrapper.find(ScFormGroupOptional)).toExist();
  });
});
