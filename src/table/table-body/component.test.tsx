import { shallow } from "enzyme";
import { setupShallowTest } from "../../../tests/helpers";
import { TableBody } from "./component";

const setupShallow = setupShallowTest(TableBody);

describe("TableBody", () => {
  it("renders table body component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("passes aria props to the element", () => {
    const wrapper = shallow(<TableBody role="tablebody" />);
    const element = wrapper.find("tbody").first();
    expect(element.prop("role")).toBe("tablebody");
  });
});
