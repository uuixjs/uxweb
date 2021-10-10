import { shallow } from "enzyme";
import { setupShallowTest } from "../../../tests/helpers";
import { CoreButton, CoreButtonSize } from "../core-button";
import {
  PurchaseButton,
  PurchaseButtonProps,
  ScPurchaseButtonPrice,
} from "./component";

function getOptionalProps(): PurchaseButtonProps {
  return {
    autoFocus: true,
    children: "Test Button",
    disabled: true,
    download: "Download all the things",
    fullWidth: true,
    linkTo: "/",
    onClick: jest.fn(),
    price: "$100.00",
    size: CoreButtonSize.Large,
    tabIndex: 0,
    targetBlank: true,
    title: "Test title",
  };
}

const setupShallow = setupShallowTest(PurchaseButton);
describe("PurchaseButton", () => {
  it("renders PurchaseButton component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders PurchaseButton component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("passes aria props to the element", () => {
    const wrapper = shallow(
      <PurchaseButton price="$100.00" aria-label="Some Action">
        Some Action
      </PurchaseButton>,
    );
    const element = wrapper.find(CoreButton).first();
    expect(element.prop("aria-label")).toBe("Some Action");
  });

  it("removes price background from disable buttons", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper.find(ScPurchaseButtonPrice).dive()).toHaveStyleRule(
      "background-color",
      undefined,
    );
  });

  it("passes data props to the price element", () => {
    const wrapper = shallow(
      <PurchaseButton
        price="$100.00"
        aria-label="Some Action"
        priceTestSelectors={{
          "data-a-target": "price-target",
          "data-test-selector": "test-selector",
        }}
      >
        Some Action
      </PurchaseButton>,
    );
    const element = wrapper.find(ScPurchaseButtonPrice).dive();
    expect(element.prop("data-a-target")).toBe("price-target");
    expect(element.prop("data-test-selector")).toBe("test-selector");
  });
});
