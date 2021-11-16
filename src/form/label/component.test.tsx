import { setupShallowTest } from "../../../tests/helpers";
import { FormLabelComponent, FormLabelProps } from "./component";

function getRequiredProps(): FormLabelProps {
  return {
    label: "Test Label",
    id: "test-id",
  };
}

function getOptionalProps(): FormLabelProps {
  return {
    label: "Test Label",
    id: "test-id",
    overlay: true,
    required: true,
  };
}

const setupShallow = setupShallowTest(FormLabelComponent, getRequiredProps);

describe("Label", () => {
  it("renders form label component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders form label component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
