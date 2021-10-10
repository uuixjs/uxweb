import { shallow } from "enzyme";
import { setupShallowTest } from "../../../tests/helpers";
import { Table, TableProps } from "./component";

function getOptionalProps(): TableProps {
  return {
    alternateRows: true,
  };
}

const setupShallow = setupShallowTest(Table);

describe("Table", () => {
  it("renders table component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders table component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("passes aria props to the element", () => {
    const wrapper = shallow(<Table aria-rowcount={4} />);
    const element = wrapper.find("table").first();
    expect(element.prop("aria-rowcount")).toBe(4);
  });
});
