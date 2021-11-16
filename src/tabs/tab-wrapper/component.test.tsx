import { setupShallowTest } from "../../../tests/helpers";
import { TabWrapper, TabWrapperProps } from "./component";

function getOptionalProps(): TabWrapperProps {
  return {
    alignRight: true,
  };
}

const setupShallow = setupShallowTest(TabWrapper);

describe("TabWrapper", () => {
  it("renders tab component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders tab component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
