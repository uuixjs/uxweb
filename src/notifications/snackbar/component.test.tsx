import { mount } from "enzyme";
import { CoreButton } from "../../button/core-button";
import { NotificationType } from "../notification";
import { ScSnackbarCloseButton, Snackbar } from "./component";
import { SnackbarActions } from "./snackbar-actions";
import { SnackbarMessage } from "./snackbar-message";

describe("Snackbar", () => {
  it("Renders Snackbar with SnackbarMessage", () => {
    const wrapper = mount(
      <Snackbar
        type={NotificationType.Info}
        message={
          <SnackbarMessage title="Here is a sample message for snackbar" />
        }
      />,
    );

    expect(wrapper.text()).toEqual("Here is a sample message for snackbar");
  });

  it("Renders Snackbar with SnackbarActions", () => {
    const wrapper = mount(
      <Snackbar
        type={NotificationType.Info}
        message={<SnackbarMessage title="Hello" />}
        actions={
          <SnackbarActions
            type={NotificationType.Info}
            primaryButton={{
              children: "Sounds good!",
              linkTo: "//twitch.tv",
            }}
          />
        }
      />,
    );

    expect(wrapper.find(CoreButton)).toHaveLength(1);
  });

  it("Fires the onCloseButtonClick callback when the user clicks the close button", () => {
    const testCallback = jest.fn();
    const wrapper = mount(
      <Snackbar
        type={NotificationType.Info}
        message={
          <SnackbarMessage title="Groom the backlog looks great, can we try it a different way collaboration through advanced technlogy. Per my previous email run it up the flag pole nor strategic high-level 30,000 ft view. Clear blue water scope creep organic growth, nor in this space. Crisp ppt 360 degree content marketing pool, land the plane show pony, nor dear hiring manager: keep it lean." />
        }
        actions={
          <SnackbarActions
            type={NotificationType.Info}
            primaryButton={{
              children: "Sounds good!",
              linkTo: "//twitch.tv",
            }}
          />
        }
        closeButton={{
          "aria-label": "Close",
          onClick: testCallback,
        }}
      />,
    );

    wrapper.find(ScSnackbarCloseButton).simulate("click");
    expect(testCallback).toHaveBeenCalled();
  });
});
