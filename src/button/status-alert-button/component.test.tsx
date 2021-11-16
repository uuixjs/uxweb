import { createMountWrapperFactory } from "tachyon-test-utils";
import { SVGAsset } from "../../svg";
import { CoreButtonSize } from "../core-button";
import { ScStatusAlertLabel, StatusAlertButton } from "./component";

const setup = createMountWrapperFactory(StatusAlertButton, () => ({
  children: "Star",
  size: CoreButtonSize.Large,
  title: "Test title",
  statusAlertIcon: SVGAsset.StarHollow,
  statusAlertText: "Unstar",
}));

describe("StatusAlertButton", () => {
  it("renders StatusAlertButton component with more options", () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it("Shows alert when toggled", () => {
    const { wrapper } = setup({
      showAlert: true,
    });

    const primary = wrapper.find(ScStatusAlertLabel).at(0);
    expect(primary).toHaveProp("type", "primary");
    expect(primary).toHaveStyleRule("opacity", "0");

    const alert = wrapper.find(ScStatusAlertLabel).at(1);
    expect(alert).toHaveProp("type", "alert");
    expect(alert).toHaveStyleRule("opacity", "1");
  });
});
