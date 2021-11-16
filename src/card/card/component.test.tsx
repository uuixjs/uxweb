import { setupShallowTest } from "../../../tests/helpers";
import { Background } from "../../layout";
import { Card, CardProps } from "./component";

function getOptionalProps(): CardProps {
  return {
    border: true,
    background: Background.Alt2,
    elevation: 3,
    row: true,
  };
}

const setupShallow = setupShallowTest(Card);
describe("Card", () => {
  it("renders card component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders card component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
