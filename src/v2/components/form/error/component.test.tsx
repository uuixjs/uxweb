import { setupShallowTest } from "../../../tests/helpers";
import { FormErrorComponent, FormErrorProps } from "./component";

function getRequiredProps(): FormErrorProps {
  return {
    errorMessage: "The value you entered is invalid.",
  };
}

const setupShallow = setupShallowTest(FormErrorComponent, getRequiredProps);

describe("FormGroup", () => {
  it("renders form error component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });
});
