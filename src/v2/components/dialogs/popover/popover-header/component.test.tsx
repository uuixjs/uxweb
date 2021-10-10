import { mount } from "enzyme";
import { setupShallowTest } from "../../../../tests/helpers";
import {
  ButtonIcon,
  ButtonIconProps,
  ButtonIconType,
} from "../../../button/button-icon";
import { SVGAsset } from "../../../svg";
import { AttachedTooltip } from "../../tooltip/attached-tooltip";
import { PopoverHeaderComponent, PopoverHeaderProps } from "./component";

const BUTTON_ICON_PROPS = {
  "aria-label": "aria label",
  icon: SVGAsset.Gear,
};

function getRequiredProps(): PopoverHeaderProps {
  return {
    popoverId: "test-popover-id",
    buttonRightPrimary: {
      "aria-label": "Close",
    },
  };
}

function getPartialProps(): PopoverHeaderProps {
  return {
    popoverId: "test-popover-id",
    title: {
      title: "Title",
      subTitle: "SubTitle",
    },
    buttonRightPrimary: {
      "aria-label": "Close",
    },
    buttonLeftSecondary: {
      "aria-label": "label left secondary",
      icon: SVGAsset.Check,
    },
    buttonRightSecondary: {
      "aria-label": "label right secondary",
      icon: SVGAsset.Close,
    },
  };
}

function getOptionalProps(): PopoverHeaderProps {
  return {
    popoverId: "test-popover-id",
    title: {
      title: "Title",
      subTitle: "SubTitle",
    },
    buttonLeftPrimary: {
      "aria-label": "label left primary",
      icon: SVGAsset.GlyphArrLeft,
      variant: ButtonIconType.Alert,
    },
    buttonLeftSecondary: {
      "aria-label": "label left secondary",
      icon: SVGAsset.Check,
      variant: ButtonIconType.Secondary,
    },
    buttonRightPrimary: {
      "aria-label": "Close",
    },
    buttonRightSecondary: {
      "aria-label": "label right secondary",
      icon: SVGAsset.Close,
      variant: ButtonIconType.Primary,
    },
  };
}

function getOptionalPropsWithTooltips(): PopoverHeaderProps {
  return {
    popoverId: "test-popover-id",
    title: {
      title: "Title",
      subTitle: "SubTitle",
    },
    buttonLeftPrimary: {
      "aria-label": "label left primary",
      icon: SVGAsset.GlyphArrLeft,
      variant: ButtonIconType.Alert,
      title: "Alert",
    },
    buttonLeftSecondary: {
      "aria-label": "label left secondary",
      icon: SVGAsset.Check,
      variant: ButtonIconType.Secondary,
      title: "Mark All as Read",
    },
    buttonRightPrimary: {
      "aria-label": "Close",
      title: "Close Menu",
    },
    buttonRightSecondary: {
      "aria-label": "label right secondary",
      icon: SVGAsset.Close,
      variant: ButtonIconType.Primary,
      title: "Close",
    },
  };
}

function getChildrenProps(): PopoverHeaderProps {
  return {
    popoverId: "test-popover-id",
    title: "Title",
    buttonLeftPrimary: {
      "aria-label": "label left primary",
      icon: SVGAsset.GlyphArrLeft,
    },
    buttonLeftSecondary: {
      "aria-label": "label left secondary",
      icon: SVGAsset.Check,
    },
    buttonRightPrimary: {
      "aria-label": "Close",
    },
    buttonRightSecondary: {
      "aria-label": "label right secondary",
      icon: SVGAsset.Close,
    },
  };
}

const setupShallow = setupShallowTest(PopoverHeaderComponent, getRequiredProps);

describe("PopoverHeader", () => {
  it("renders Popover header component", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders Popover header component with secondary icons in the primary slot if they are the only ones provided", () => {
    const { wrapper } = setupShallow(getPartialProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders Popover header component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper.find(AttachedTooltip)).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders Popover header component with all props and tooltips", () => {
    const { wrapper } = setupShallow(getOptionalPropsWithTooltips());
    expect(wrapper.find(AttachedTooltip)).toHaveLength(4);
  });

  it("renders Popover header component with child node instead of title/subtitle pattern", () => {
    const { wrapper } = setupShallow(getChildrenProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("does not allow button type to be overwritten", () => {
    const BUTTON_PROPS: ButtonIconProps = {
      "aria-label": "aria label",
      variant: ButtonIconType.Primary,
      icon: SVGAsset.Gear,
    };

    const props = {
      ...getRequiredProps(),
      buttonLeftPrimary: BUTTON_PROPS,
      buttonLeftSecondary: BUTTON_PROPS,
      buttonRightPrimary: { "aria-label": "Close" },
      buttonRightSecondary: BUTTON_PROPS,
    };

    const wrapper = mount(<PopoverHeaderComponent {...props} />);

    expect(wrapper.find(ButtonIcon).at(0).prop("variant")).toBe(
      ButtonIconType.Secondary,
    );
    expect(wrapper.find(ButtonIcon).at(1).prop("variant")).toBe(
      ButtonIconType.Secondary,
    );
    expect(wrapper.find(ButtonIcon).at(2).prop("variant")).toBe(
      ButtonIconType.Secondary,
    );
    expect(wrapper.find(ButtonIcon).at(3).prop("variant")).toBe(
      ButtonIconType.Secondary,
    );
  });

  it("renders containers to balance the right side", () => {
    const { wrapper } = setupShallow({
      buttonLeftPrimary: BUTTON_ICON_PROPS,
    });

    expect(wrapper.find(".tw-popover-header__icon-slot--left").length).toBe(1);
    expect(wrapper.find(".tw-popover-header__icon-slot--right").length).toBe(1);
  });

  it("renders containers to balance the right side", () => {
    const { wrapper } = setupShallow({
      buttonLeftSecondary: BUTTON_ICON_PROPS,
    });

    expect(wrapper.find(".tw-popover-header__icon-slot--left").length).toBe(1);
    expect(wrapper.find(".tw-popover-header__icon-slot--right").length).toBe(1);
  });

  it("renders containers to balance the left side", () => {
    const { wrapper } = setupShallow({
      buttonRightPrimary: { "aria-label": "Close" },
    });

    expect(wrapper.find(".tw-popover-header__icon-slot--left").length).toBe(1);
    expect(wrapper.find(".tw-popover-header__icon-slot--right").length).toBe(1);
  });

  it("renders containers to balance the other side", () => {
    const { wrapper } = setupShallow({
      buttonLeftPrimary: BUTTON_ICON_PROPS,
      buttonLeftSecondary: BUTTON_ICON_PROPS,
    });

    expect(wrapper.find(".tw-popover-header__icon-slot--left").length).toBe(2);
    expect(wrapper.find(".tw-popover-header__icon-slot--right").length).toBe(2);
  });

  it("renders containers to balance the other side", () => {
    const { wrapper } = setupShallow({
      buttonRightPrimary: { "aria-label": "Close" },
      buttonRightSecondary: BUTTON_ICON_PROPS,
    });

    expect(wrapper.find(".tw-popover-header__icon-slot--left").length).toBe(2);
    expect(wrapper.find(".tw-popover-header__icon-slot--right").length).toBe(2);
  });

  it("does not render more than four containers", () => {
    const { wrapper } = setupShallow({
      buttonLeftPrimary: BUTTON_ICON_PROPS,
      buttonLeftSecondary: BUTTON_ICON_PROPS,
      buttonRightPrimary: { "aria-label": "Close" },
      buttonRightSecondary: BUTTON_ICON_PROPS,
    });

    expect(wrapper.find(".tw-popover-header__icon-slot--left").length).toBe(2);
    expect(wrapper.find(".tw-popover-header__icon-slot--right").length).toBe(2);
  });
});
