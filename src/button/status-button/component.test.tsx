import { createMountWrapperFactory } from "tachyon-test-utils";
import { NotificationType } from "../../notifications/notification";
import { SVGAsset } from "../../svg";
import { CoreButtonSize } from "../core-button";
import { StatusButton } from "./component";

const setup = createMountWrapperFactory(StatusButton, () => ({
  "aria-label": "Test aria label",
  children: "Status",
  icon: SVGAsset.NavProfile,
  size: CoreButtonSize.Large,
  title: "Test title",
  type: NotificationType.Info,
}));

describe("StatusButton", () => {
  it("renders StatusButton component with options", () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
