import { shallow } from "enzyme";
import { setupShallowTest } from "../../../tests/helpers";
import { CoreDismissible } from "../../core-dismissible";
import { ModalSize } from "../modal-wrapper/component";
import { ModalHeader, ModalHeaderProps } from "./component";

const mockCallback = jest.fn();

function getRequiredProps(): ModalHeaderProps {
  return {
    title: "Test Title",
    closeButton: {
      "aria-label": "close",
    },
  };
}

function getOptionalProps(): ModalHeaderProps {
  return {
    title: "Test Title",
    closeButton: {
      "aria-label": "close",
      onClick: mockCallback,
    },
    imageSrc: "//image.src",
  };
}

const setupShallow = setupShallowTest(ModalHeader, getRequiredProps);

describe("Modal Header", () => {
  it("renders modal header component", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders modal header component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("fires the onCloseButtonClick callback when the user clicks the close button", () => {
    const { wrapper } = setupShallow(getOptionalProps());

    // Simulate onCloseButtonClick and verify it calls the mock callback
    wrapper.find(CoreDismissible).simulate("click");
    expect(mockCallback.mock.calls.length).toEqual(1);
  });

  it("sets some padding by default", () => {
    const wrapper = shallow(
      <ModalHeader size={ModalSize.Small} title="My Awesome Title" />,
    );

    const titleElement = wrapper.find(".tw-modal-header__title");
    expect(titleElement.prop("padding")).not.toBe(undefined);
  });

  it("allows custom padding to increase padding amount", () => {
    const wrapper = shallow(
      <ModalHeader
        padding={5}
        size={ModalSize.Small}
        title="My Awesome Title"
      />,
    );

    const titleElement = wrapper.find(".tw-modal-header__title");
    expect(titleElement.prop("padding")).toBe(5);
  });

  it("allows custom padding to remove padding completely", () => {
    const wrapper = shallow(
      <ModalHeader
        padding={0}
        size={ModalSize.Small}
        title="My Awesome Title"
      />,
    );

    const titleElement = wrapper.find(".tw-modal-header__title");
    expect(titleElement.prop("padding")).toBe(0);
  });
});
