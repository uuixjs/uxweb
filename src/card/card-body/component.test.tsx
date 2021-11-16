import { setupShallowTest } from "../../../tests/helpers";
import { Overflow } from "../../layout";
import { CardBody, CardBodyProps } from "./component";

function getOptionalProps(): CardBodyProps {
  return {
    overflow: Overflow.Hidden,
  };
}

const setupShallow = setupShallowTest(CardBody);
describe("CardBody", () => {
  it("renders card body component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders card body component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
