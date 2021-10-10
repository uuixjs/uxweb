import { setupShallowTest } from "../../../tests/helpers";
import { FormHintComponent, FormHintProps } from "./component";

function getRequiredProps(): FormHintProps {
  return {
    hint: "Any combination of letters or numbers",
  };
}

function getOptionalProps(): FormHintProps {
  return {
    hint: "Any combination of letters or numbers",
    overlay: true,
  };
}

const setupShallow = setupShallowTest(FormHintComponent, getRequiredProps);

describe("FormHint", () => {
  it("renders form hint component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });
});

describe("FormHint", () => {
  it("renders form hint component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
