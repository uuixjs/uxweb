import { shallow } from "enzyme";
import { setupShallowTest } from "../../../tests/helpers";
import { TableRow } from "./component";

const setupShallow = setupShallowTest(TableRow);

describe("TableRow", () => {
  it("renders table row component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("passes aria props to the element", () => {
    const wrapper = shallow(<TableRow role="tablerow" />);
    const element = wrapper.find("tr").first();
    expect(element.prop("role")).toBe("tablerow");
  });
});
