import { setupShallowTest } from "../../../tests/helpers";
import { Layout } from "../../layout/layout";
import { ModalBody } from "../modal-body";
import { ModalFooter } from "../modal-footer";
import { ModalHeader } from "../modal-header";
import { ModalSize, ModalWrapper, ModalWrapperProps } from "./component";

function getOptionalProps(): ModalWrapperProps {
  return {
    elevation: 3,
    size: ModalSize.Medium,
    fullHeight: true,
    children: (
      <>
        <ModalHeader
          title="Log In or Register"
          closeButton={{
            "aria-label": "Close",
            onClick: jest.fn(),
          }}
        />
        <ModalBody>
          <Layout padding={2} />
        </ModalBody>
        <ModalFooter
          primaryButtonProps={{
            children: "Log In",
          }}
          secondaryButtonProps={{
            children: "Cancel",
          }}
        />
      </>
    ),
  };
}

function getAriaProps() {
  return {
    "aria-describedby": "described-by-id",
    "aria-labelledby": "labelled-by-id",
  };
}

function getDataProps() {
  return {
    "data-test-selector": "data-test-selector",
  };
}

const setupShallow = setupShallowTest(ModalWrapper);

describe("Modal", () => {
  it("renders modal component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());

    expect(wrapper).toMatchSnapshot();
  });

  it("renders modal component with aria and data props", () => {
    const { wrapper } = setupShallow({
      ...getOptionalProps(),
      ...getAriaProps(),
      ...getDataProps(),
    });
    expect(wrapper).toMatchSnapshot();
  });
});
