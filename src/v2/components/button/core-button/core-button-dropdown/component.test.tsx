import { setupShallowTest } from "../../../../tests/helpers";
import {
  CoreButtonDropdown,
  CoreButtonDropdownProps,
  CoreButtonDropdownType,
} from "./component";

function getOptionalProps(): CoreButtonDropdownProps {
  return {
    type: CoreButtonDropdownType.Select,
  };
}

const setupShallow = setupShallowTest(CoreButtonDropdown);
describe("CoreButtonDropdown", () => {
  it("renders CoreButtonDropdown component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
