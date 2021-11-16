import { mount } from "enzyme";
import { CoreButton } from "../../../button/core-button";
import { NotificationType } from "../../notification";
import { SnackbarActions } from "./component";

describe("Snackbar", () => {
  it("Renders SnackbarActions with a button", () => {
    const wrapper = mount(
      <SnackbarActions
        type={NotificationType.Info}
        primaryButton={{
          children: "Sounds good!",
          linkTo: "//twitch.tv",
        }}
      />,
    );

    expect(wrapper.find(CoreButton)).toHaveLength(1);
  });
});
