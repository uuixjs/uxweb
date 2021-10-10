import { mount } from "enzyme";
import { setupShallowTest } from "../../../tests/helpers";
import { CoreButton, CoreButtonSize } from "../core-button";
import {
  PaymentButton,
  PaymentButtonProps,
  PaymentButtonType,
  ScPaymentButton,
} from "./component";

function getOptionalProps(): PaymentButtonProps {
  return {
    autoFocus: true,
    children: "Test Button",
    disabled: true,
    download: "Download all the things",
    fullWidth: true,
    linkTo: "/",
    onClick: jest.fn(),
    size: CoreButtonSize.Large,
    tabIndex: 0,
    targetBlank: true,
    title: "Test title",
    variant: PaymentButtonType.AmazonPay,
  };
}

const setupShallow = setupShallowTest(PaymentButton);
describe("PaymentButton", () => {
  it("renders PaymentButton component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders PaymentButton component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders PaymentButton as XSolla (CoreButton)", () => {
    const { wrapper } = setupShallow({ variant: PaymentButtonType.Xsolla });
    expect(wrapper.find(CoreButton)).toExist();
    expect(wrapper.find(ScPaymentButton)).not.toExist();
  });

  it("renders PaymentButton as AmazonPay (ScPaymentButton)", () => {
    const { wrapper } = setupShallow({ variant: PaymentButtonType.AmazonPay });
    expect(wrapper.find(ScPaymentButton)).toExist();
    expect(wrapper.find(CoreButton)).not.toExist();
  });

  it("passes aria props to the element", () => {
    const wrapper = mount(
      <PaymentButton
        variant={PaymentButtonType.AmazonPay}
        aria-label="Some Action"
      />,
    );
    const element = wrapper.find(CoreButton).first();
    expect(element.prop("aria-label")).toBe("Some Action");
  });
});
