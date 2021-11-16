import { setupShallowTest } from "../../../tests/helpers";
import { CoreDismissible } from "../../core-dismissible";
import { Background } from "../../layout";
import { NotificationType } from "../notification";
import { InFeatureNotification, InFeatureNotificationProps } from "./component";

function getRequiredProps(): InFeatureNotificationProps {
  return {
    closeButton: {
      "aria-label": "Close",
    },
    message: {
      description: "Here is a descriptive description",
      title: "This is a Title",
      link: {
        linkTo: "http://www.twitch.tv/doobix",
      },
    },
    type: NotificationType.Info,
  };
}

function getOptionalProps(): InFeatureNotificationProps {
  return {
    ...getRequiredProps(),
    avatar: {
      src: "http://twitch.tv/doobix/avatar.jpg",
      alt: "doobix's Avatar",
      size: 30,
      userLogin: "doobix",
    },
    background: Background.Alt,
    actions: {
      primaryButton: {
        "aria-label": "Primary Button",
        children: "Primary Button",
      },
      secondaryButton: { children: "Secondary Button" },
    },
    closeButton: {
      "aria-label": "Close",
      onClick: jest.fn(),
    },
  };
}

const setupShallow = setupShallowTest(InFeatureNotification, getRequiredProps);

describe("InFeatureNotification", () => {
  it("renders in-feature notification component with only required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders in-feature notification component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("invokes onCloseButtonClick when the close button is clicked", () => {
    const onCloseButtonClick = jest.fn();
    const { wrapper } = setupShallow({
      closeButton: { onClick: onCloseButtonClick, "aria-label": "Test Label" },
    });
    expect(onCloseButtonClick).toHaveBeenCalledTimes(0);
    wrapper.find(CoreDismissible).simulate("click");
    expect(onCloseButtonClick).toHaveBeenCalledTimes(1);
  });
});
