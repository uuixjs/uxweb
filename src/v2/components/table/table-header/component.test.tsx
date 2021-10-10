import { shallow } from "enzyme";
import { setupShallowTest } from "../../../tests/helpers";
import { TableHeader } from "./component";

const setupShallow = setupShallowTest(TableHeader);

describe("TableHeader", () => {
  it("renders table header component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("passes aria props to the element", () => {
    const wrapper = shallow(<TableHeader role="tableheader" />);
    const element = wrapper.find("thead").first();
    expect(element.prop("role")).toBe("tableheader");
  });
});
