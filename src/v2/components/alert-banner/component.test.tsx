import { mount } from "enzyme";
import { setupShallowTest } from "../../tests/helpers";
import { Button, ButtonSize, ButtonState, ButtonType } from "../button/button";
import { CoreDismissible } from "../core-dismissible";
import { AlertBanner, AlertBannerProps, AlertBannerType } from "./component";

const mockCallback = jest.fn();

function getRequiredProps(): AlertBannerProps {
  return {
    closeButton: {
      "aria-label": "Close",
    },
    type: AlertBannerType.Info,
    message: "Alert Banner Info Bar",
  };
}

function getOptionalProps(): AlertBannerProps {
  return {
    closeButton: {
      "aria-label": "Close",
      onClick: mockCallback,
    },
    type: AlertBannerType.Info,
    status: "Alert",
    message: "Alert Banner Info Bar",
    link: {
      linkTo: "//twitch.tv",
      onClick: jest.fn(),
      text: "Link CTA",
    },
    actions: [{ children: "Confirm" }, { children: "Dismiss" }],
  };
}

const setupShallow = setupShallowTest(AlertBanner, getRequiredProps);

describe("Alert Banner", () => {
  it("renders alert-banner component", () => {
    const { wrapper } = setupShallow();

    expect(wrapper).toMatchSnapshot();
  });

  it("renders alert-banner component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());

    expect(wrapper).toMatchSnapshot();
  });

  it("fires the onCloseButtonClick callback when the user clicks the close button", () => {
    const { wrapper } = setupShallow({
      closeButton: { "aria-label": "Test Label", onClick: mockCallback },
    });

    // Simulate onCloseButtonClick and verify it calls the mock callback
    wrapper.find(CoreDismissible).simulate("click");
    expect(mockCallback.mock.calls.length).toEqual(1);
  });
  it("renders alert-banner actions to override default props", () => {
    const wrapper = mount(
      <AlertBanner
        {...getOptionalProps()}
        actions={
          <Button
            size={ButtonSize.Large}
            variant={ButtonType.Success}
            state={ButtonState.Loading}
          >
            Confirm
          </Button>
        }
      />,
    );

    expect(wrapper.find(Button)).toExist();
  });
});
