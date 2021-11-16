import { setupShallowTest } from "../../tests/helpers";
import { TextType } from "../core-text";
import { AssistiveText, AssistiveTextProps } from "./component";

function getOptionalProps(): AssistiveTextProps {
  return {
    type: TextType.Span,
    children: "Test",
  };
}

const setupShallow = setupShallowTest(AssistiveText);

describe("Assistive Text", () => {
  it("renders AssistiveText component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders AssistiveText component with all type prop as a span", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
