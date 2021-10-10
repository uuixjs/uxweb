import { setupShallowTest } from "../../../../tests/helpers";
import { Button, ButtonType } from "../../../button/button";
import { StatusButton } from "../../../button/status-button";
import { NotificationType } from "../../notification";
import { NotificationActions, NotificationActionsProps } from "./component";

function getRequiredProps(): NotificationActionsProps {
  return {
    primaryButton: {
      "aria-label": "Primary Button",
      children: "Primary Button",
    },
    secondaryButton: { children: "Secondary Button" },
    type: NotificationType.Info,
  };
}

const setupShallow = setupShallowTest(NotificationActions, getRequiredProps);

describe("NotificationActions", () => {
  it("Sets StatusButton type ", () => {
    const { wrapper } = setupShallow();
    expect(wrapper.find(StatusButton).prop("type")).toBe(NotificationType.Info);
  });

  it("Sets Button type even when notification type is defined ", () => {
    const { wrapper } = setupShallow({
      primaryButton: { type: ButtonType.Primary },
    });
    expect(wrapper.find(Button).first().prop("variant")).toBe(
      ButtonType.Primary,
    );
  });
});
