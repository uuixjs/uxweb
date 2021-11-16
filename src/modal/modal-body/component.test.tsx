import { setupShallowTest } from "../../../tests/helpers";
import { ModalBody, ModalBodyProps } from "./component";

function getOptionalProps(): ModalBodyProps {
  return {
    children: "Modal Body",
  };
}

const setupShallow = setupShallowTest(ModalBody);

describe("ModalBody", () => {
  it("renders modal body component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
