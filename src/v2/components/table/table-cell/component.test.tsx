import { shallow } from "enzyme";
import { setupShallowTest } from "../../../tests/helpers";
import { TextAlign, VerticalAlign } from "../../layout";
import { TableCell, TableCellProps } from "./component";

function getOptionalProps(): TableCellProps {
  return {
    padding: 0.5,
    textAlign: TextAlign.Right,
    verticalAlign: VerticalAlign.TextTop,
  };
}

const setupShallow = setupShallowTest(TableCell);

describe("TableCell", () => {
  it("renders table cell component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders table cell component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("passes aria props to the element", () => {
    const wrapper = shallow(<TableCell role="tablecell" />);
    const element = wrapper.find("td").first();
    expect(element.prop("role")).toBe("tablecell");
  });
});
