import { mount, shallow } from "enzyme";
import {
  ScSelectableInput,
  ScSelectableLabel,
  SelectableComponent,
  SelectableType,
} from "./component";

describe("Selectable", () => {
  it("accepts children nodes", () => {
    const wrapper = shallow(
      <SelectableComponent type={SelectableType.Checkbox}>
        <div id="child-div">Hello World</div>
      </SelectableComponent>,
    );

    expect(wrapper.find("#child-div")).toExist();
  });

  it("puts an id on the input", () => {
    const wrapper = shallow(
      <SelectableComponent id="test-id" type={SelectableType.Checkbox}>
        <div id="child-div">Hello World</div>
      </SelectableComponent>,
    );

    expect(wrapper.find(ScSelectableInput).prop("id")).toBe("test-id");
  });

  it("sets an id automatically if not provided", () => {
    const wrapper = shallow(
      <SelectableComponent type={SelectableType.Radio} />,
    );

    const labelElement = wrapper.find(ScSelectableLabel);
    const inputElement = wrapper.find(ScSelectableInput);
    expect(labelElement.prop("htmlFor")).toEqual(inputElement.prop("id"));
  });

  it("sets selectable input type to checkbox", () => {
    const wrapper = shallow(
      <SelectableComponent type={SelectableType.Checkbox} />,
    );

    expect(wrapper.find(ScSelectableInput).prop("type")).toBe("checkbox");
  });

  it("allows custom automation target to be provided", () => {
    const wrapper = shallow(
      <SelectableComponent
        type={SelectableType.Checkbox}
        data-a-target="custom automation target"
      />,
    );

    expect(wrapper.find(ScSelectableInput).prop("data-a-target")).toBe(
      "custom automation target",
    );
  });

  it("renders spread props to appropriate children", () => {
    const wrapper = mount(
      <SelectableComponent
        type={SelectableType.Checkbox}
        autoFocus={true}
        checked={true}
        defaultChecked={true}
        disabled={true}
        error={true}
        id={"test-id"}
        name={"Test name"}
        onBlur={jest.fn()}
        onChange={jest.fn()}
        onFocus={jest.fn()}
        overlay={true}
        readOnly={true}
        required={true}
        tabIndex={0}
        value={"Test value"}
        data-test={"Test data value"}
        aria-label={"Test aria label"}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(ScSelectableInput).prop("data-test")).toBe(
      "Test data value",
    );
  });

  it("passes through tab index of 0", () => {
    const wrapper = shallow(
      <SelectableComponent type={SelectableType.Checkbox} tabIndex={0} />,
    );
    expect(wrapper.find(ScSelectableInput)).toHaveProp("tabIndex", 0);
  });

  it("passes through tab index of 1", () => {
    const wrapper = shallow(
      <SelectableComponent type={SelectableType.Checkbox} tabIndex={1} />,
    );
    expect(wrapper.find(ScSelectableInput)).toHaveProp("tabIndex", 1);
  });

  it("passes through tab index of -1", () => {
    const wrapper = shallow(
      <SelectableComponent type={SelectableType.Checkbox} tabIndex={-1} />,
    );
    expect(wrapper.find(ScSelectableInput)).toHaveProp("tabIndex", -1);
  });
});
