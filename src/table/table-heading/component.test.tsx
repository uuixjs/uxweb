import { mount } from "enzyme";
import { setupShallowTest } from "../../../tests/helpers";
import { TextAlign, VerticalAlign } from "../../layout";
import { Sorting, TableHeading, TableHeadingProps } from "./component";

function getOptionalProps(
  overrides?: Partial<TableHeadingProps>,
): TableHeadingProps {
  return {
    label: "Test label",
    onClick: jest.fn(),
    padding: 0.5,
    sorting: Sorting.Ascending,
    verticalAlign: VerticalAlign.Middle,
    textAlign: TextAlign.Right,
    ...overrides,
  };
}

const setupShallow = setupShallowTest(TableHeading);

describe("TableHeading", () => {
  it("renders a table heading component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders a table heading component with a label", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders a table heading component with children", () => {
    const { wrapper } = setupShallow(
      getOptionalProps({
        label: undefined,
        children: (
          <>
            <div>Title</div>
            <div>Sub title</div>
          </>
        ),
      }),
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("passes aria props to the element", () => {
    const wrapper = mount(<TableHeading role="tableheading" />);
    const element = wrapper.find("th").first();
    expect(element.prop("role")).toBe("tableheading");
  });
});
