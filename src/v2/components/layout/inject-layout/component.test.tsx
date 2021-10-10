import {
  AlignContent,
  AlignItems,
  AlignSelf,
  Background,
  Color,
  Cursor,
  Display,
  FlexDirection,
  FlexWrap,
  FontSize,
  FontWeight,
  JustifyContent,
  Overflow,
  Position,
  Resize,
  TextAlign,
  VerticalAlign,
  Visibility,
  ZIndex,
} from "../types";
import { InjectLayout, InjectLayoutProps } from "./component";

import { BorderRadius } from "lib/ui-utils";
import { LayoutCssBreakpointProps } from "../utils/layout-props";
import { createMountWrapperFactory } from "tachyon-test-utils";
import { mount } from "enzyme";

function getBreakpointProps(): LayoutCssBreakpointProps {
  return {
    alignContent: AlignContent.Center,
    alignItems: AlignItems.Start,
    alignSelf: AlignSelf.Center,
    display: Display.InlineBlock,
    flexDirection: FlexDirection.ColumnReverse,
    flexGrow: 2,
    flexOrder: 1,
    flexShrink: 0,
    flexWrap: FlexWrap.WrapReverse,
    fontSize: FontSize.Size4,
    justifyContent: JustifyContent.Start,
    margin: { top: 2, left: 3, right: 1, bottom: 0.5 },
    padding: { top: 2, left: 3, right: 1, bottom: 0.5 },
    position: Position.Absolute,
    textAlign: TextAlign.Right,
    visibility: Visibility.Hidden,
  };
}

function getOptionalProps(): InjectLayoutProps {
  return {
    attachBottom: true,
    attachLeft: true,
    attachRight: true,
    attachTop: true,
    background: Background.AccentAlt2,
    border: true,
    borderBottom: true,
    borderLeft: true,
    borderMarked: true,
    borderRadius: BorderRadius.Rounded,
    borderRight: true,
    borderTop: true,
    children: <div />,
    className: "test-classname",
    color: Color.Live,
    cursor: Cursor.Pointer,
    elevation: 3,
    ellipsis: true,
    fontWeight: FontWeight.Bold,
    fullHeight: true,
    fullWidth: true,
    overflow: Overflow.Hidden,
    resize: Resize.X,
    verticalAlign: VerticalAlign.Middle,
    zIndex: ZIndex.Below,
    ...getBreakpointProps(),
    breakpointExtraSmall: getBreakpointProps(),
    breakpointSmall: getBreakpointProps(),
    breakpointMedium: getBreakpointProps(),
    breakpointLarge: getBreakpointProps(),
    breakpointExtraLarge: getBreakpointProps(),
    breakpointExtraExtraLarge: getBreakpointProps(),
  };
}

function getBorderRadiusDirectionsProp(): InjectLayoutProps {
  return {
    children: <div />,
    borderRadius: {
      topLeft: BorderRadius.Large,
      topRight: BorderRadius.Medium,
      bottomRight: BorderRadius.Small,
      bottomLeft: BorderRadius.None,
    },
  };
}

const setupMount = createMountWrapperFactory(InjectLayout);

describe("InjectLayout", () => {
  it("renders inject layout component with required props", () => {
    const { wrapper } = setupMount({ children: <div /> });
    expect(wrapper).toMatchSnapshot();
  });

  it("renders inject layout component with all props", () => {
    const { wrapper } = setupMount(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders classNames from both parent and child", () => {
    const { wrapper } = setupMount({
      className: "parent-class-name",
      children: <div className="child-class-name" />,
    });

    expect(wrapper.find("div")).toHaveClassName("child-class-name");
    expect(wrapper.find("div")).toHaveClassName("parent-class-name");
  });

  it("does not add whitespace when only applying classNames and no props", () => {
    const { wrapper } = setupMount({
      className: "parent-class-name",
      children: <div className="child-class-name" />,
    });

    expect(wrapper.prop("className")).toEqual(
      wrapper.prop("className")?.trim(),
    );
  });

  it("renders div component with directional border radius", () => {
    const { wrapper } = setupMount(getBorderRadiusDirectionsProp());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders classnames in alpha order when child has classname", () => {
    const wrapper = mount(
      <InjectLayout display={Display.Flex}>
        <div className="zeus alpha beta">Layout</div>
      </InjectLayout>,
    );

    expect(wrapper.find("div").prop("className")).toEqual(
      wrapper.find("div").prop("className")?.split(" ").sort().join(" "),
    );
  });

  it("renders classnames in alpha order when inject layout has classnames", () => {
    const wrapper = mount(
      <InjectLayout className="zeus alpha beta" display={Display.Flex}>
        <div>Layout</div>
      </InjectLayout>,
    );

    expect(wrapper.find("div").prop("className")).toEqual(
      wrapper.find("div").prop("className")?.split(" ").sort().join(" "),
    );
  });

  it("renders aria attributes when using custom AriaProps interface", () => {
    const wrapper = mount(
      <InjectLayout aria-atomic={true} role="dialog">
        <div />
      </InjectLayout>,
    );
    const div = wrapper.find("div");

    expect(div.prop("aria-atomic")).toBe(true);
    expect(div.prop("role")).toBe("dialog");
  });

  it("does not pass through InjectLayout props to the DOM node", () => {
    const wrapper = mount(
      <InjectLayout color={Color.Base} margin={1} display={Display.Flex}>
        <div />
      </InjectLayout>,
    );

    const domNode = wrapper.find("div").hostNodes();

    expect(domNode).not.toHaveProp("color");
    expect(domNode).not.toHaveProp("margin");
    expect(domNode).not.toHaveProp("display");
  });
});
