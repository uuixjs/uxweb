import { setupShallowTest } from "../../../tests/helpers";
import { ButtonIconSize } from "../button-icon";
import {
  ChromecastButton,
  ChromecastButtonProps,
  ChromecastButtonStatus,
} from "./component";

function getRequiredProps(): ChromecastButtonProps {
  return {
    "aria-label": "Test aria label",
  };
}

function getOptionalProps(): ChromecastButtonProps {
  return {
    "aria-label": "Test aria label",
    autoFocus: true,
    disabled: true,
    download: "Download all the things",
    linkTo: "/",
    onClick: jest.fn(),
    overlay: true,
    size: ButtonIconSize.Large,
    status: ChromecastButtonStatus.Connecting,
    tabIndex: 0,
    targetBlank: true,
    title: "test title",
  };
}

const setupShallow = setupShallowTest(ChromecastButton, getRequiredProps);
describe("ButtonIcon", () => {
  it("renders button icon component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders button icon component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
