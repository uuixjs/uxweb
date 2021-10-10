import { setupShallowTest } from "../../../tests/helpers";
import { Toast, ToastProps } from "./component";

function getOptionalProps(): ToastProps {
  return {
    tabIndex: 0,
    onClose: jest.fn(),
  };
}

const setupShallow = setupShallowTest(Toast);

describe("Toast", () => {
  it("renders toast component with only required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders toast component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
