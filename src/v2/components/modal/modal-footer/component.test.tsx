import { setupShallowTest } from "../../../tests/helpers";
import { Button, ButtonState } from "../../button/button";
import { ModalFooter, ModalFooterProps } from "./component";

function getRequiredProps(): ModalFooterProps {
  return {
    primaryButtonProps: {
      "aria-label": "test label",
      title: "Action",
      onClick: jest.fn(),
    },
  };
}

function getOptionalProps(): ModalFooterProps {
  return {
    primaryButtonProps: {
      title: "Action",
      onClick: jest.fn(),
    },
    secondaryButtonProps: {
      title: "Cancel",
      onClick: jest.fn(),
    },
  };
}

const setupShallow = setupShallowTest(ModalFooter, getRequiredProps);

describe("ModalFooter", () => {
  it("renders modal footer component", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders modal footer component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders modal footer component with all props", () => {
    const { wrapper } = setupShallow({
      primaryButtonProps: {
        ...getOptionalProps().primaryButtonProps,
        state: ButtonState.Loading,
      },
    });

    expect(wrapper.find(Button).prop("state")).toEqual(ButtonState.Loading);
  });
});
