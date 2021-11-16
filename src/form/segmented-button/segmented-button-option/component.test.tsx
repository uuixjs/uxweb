import { setupShallowTest } from "../../../../tests/helpers";
import { CoreButtonLabel } from "../../../button/core-button/core-button-label";
import {
  SegmentedButtonOption,
  SegmentedButtonOptionProps,
  SegmentedButtonType,
} from "./component";

function getOptionalProps(): SegmentedButtonOptionProps {
  return {
    checked: true,
    children: <div>Child Node</div>,
    defaultChecked: true,
    defaultValue: "Default Value",
    disabled: true,
    id: "Test ID",
    label: "Test Label",
    name: "Test name",
    onBlur: jest.fn(),
    onChange: jest.fn(),
    onFocus: jest.fn(),
    tabIndex: 0,
    type: SegmentedButtonType.Checkbox,
    value: "Test value",
  };
}

const setupShallow = setupShallowTest(SegmentedButtonOption);

describe("SegmentedButton", () => {
  it("renders segmented button option component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders segmented button option with label, without child", () => {
    const { wrapper } = setupShallow({
      children: undefined,
      label: "Input Label",
    });

    const child = wrapper.find(CoreButtonLabel).children().text();
    const ariaLabel = wrapper.find("[aria-label]");

    expect(ariaLabel.length).toBe(0);
    expect(child).toEqual("Input Label");
  });

  it("renders segmented button option without label, with child", () => {
    const { wrapper } = setupShallow({
      children: <div>Child Node</div>,
      label: undefined,
    });

    const child = wrapper.find(".tw-segmented-button-option__label").children();
    const ariaLabel = wrapper.find("[aria-label]");

    expect(ariaLabel.length).toBe(0);
    expect(child.type()).toEqual("div");
    expect(child.text()).toEqual("Child Node");
  });

  it("renders segmented button option with label and child", () => {
    const { wrapper } = setupShallow({
      children: <div>Child Node</div>,
      label: "Input Label",
    });
    const child = wrapper.find(".tw-segmented-button-option__label").children();
    const ariaLabel = wrapper.find("[aria-label]").prop("aria-label");

    expect(ariaLabel).toEqual("Input Label");
    expect(child.type()).toEqual("div");
  });

  it("renders segmented button option with child as string", () => {
    const { wrapper } = setupShallow({
      children: "Child String",
    });

    const child = wrapper.find(CoreButtonLabel).children().text();
    const ariaLabel = wrapper.find("[aria-label]");

    expect(ariaLabel.length).toBe(0);
    expect(child).toEqual("Child String");
  });

  it("renders segmented button option with child as string, and label", () => {
    const { wrapper } = setupShallow({
      children: "Child String",
      label: "Input Label",
    });

    const child = wrapper.find(CoreButtonLabel).children().text();
    const ariaLabel = wrapper.find("[aria-label]").prop("aria-label");

    expect(ariaLabel).toEqual("Input Label");
    expect(child).toEqual("Child String");
  });
});
