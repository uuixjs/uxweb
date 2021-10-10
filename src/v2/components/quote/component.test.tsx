import { Quote, QuoteProps } from ".";
import { setupShallowTest } from "../../tests/helpers";

function getRequiredProps(): QuoteProps {
  return {
    children: "Test",
  };
}

function getOptionalProps(): QuoteProps {
  return {
    padding: 1,
    children: "howdy",
    color: "#FF0000",
  };
}

const setupShallow = setupShallowTest(Quote);

describe("Quote", () => {
  it("renders quote component", () => {
    const { wrapper } = setupShallow(getRequiredProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders quote component", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
