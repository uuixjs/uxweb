import { setupShallowTest } from "../../tests/helpers";
import { Pill, PillProps, PillType } from "./component";

function getRequiredProps(): PillProps {
  return {
    label: "Test label",
  };
}

function getOptionalProps(): PillProps {
  return {
    label: "Test label",
    type: PillType.Success,
  };
}

const setupShallow = setupShallowTest(Pill);

describe("Pill", () => {
  it("renders pill component with required props", () => {
    const { wrapper } = setupShallow(getRequiredProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders pill component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
