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
import { Layout, LayoutProps } from "./component";

import { BorderRadius } from "lib";
import { DarkThemeMap } from "lib/ui-tokens";
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
    fontWeight: FontWeight.Bold,
    justifyContent: JustifyContent.Start,
    margin: { top: 2, left: 3, right: 1, bottom: 0.5 },
    padding: { top: 2, left: 3, right: 1, bottom: 0.5 },
    position: Position.Absolute,
    textAlign: TextAlign.Right,
    visibility: Visibility.Hidden,
  };
}

function getOptionalProps(): LayoutProps {
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
    className: "test-classname",
    color: Color.Live,
    cursor: Cursor.Pointer,
    elevation: 3,
    ellipsis: true,
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

function getBorderRadiusDirectionsProp(): LayoutProps {
  return {
    borderRadius: {
      topLeft: BorderRadius.Large,
      topRight: BorderRadius.Medium,
      bottomRight: BorderRadius.Small,
      bottomLeft: BorderRadius.None,
    },
  };
}

const setupMount = createMountWrapperFactory(Layout);

describe("Layout", () => {
  it("renders inject layout component with required props", () => {
    const { wrapper } = setupMount();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders layout component with all props", () => {
    const { wrapper } = setupMount(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders styled layout component with directional border radius", () => {
    const { wrapper } = setupMount(getBorderRadiusDirectionsProp());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders aria attributes when using custom AriaProps interface", () => {
    const wrapper = mount(<Layout aria-atomic={true} role="dialog" />);
    const div = wrapper.find("div");

    expect(div.prop("aria-atomic")).toBe(true);
    expect(div.prop("role")).toBe("dialog");
  });

  it("renders a custom css class name", () => {
    const wrapper = mount(<Layout className="my-custom-name" />);
    expect(wrapper.find(".my-custom-name").hostNodes()).toExist();
  });

  it("forwards ref to underlying DOM node", () => {
    const myCallback = jest.fn();
    mount(<Layout ref={myCallback} />);

    expect(myCallback).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it("passes through html div props", () => {
    const wrapper = mount(
      <Layout draggable style={{ color: "blue " }} lang="fr" />,
    );
    expect(wrapper.find("[draggable]").hostNodes()).toExist();
    expect(wrapper.find("[lang]").hostNodes().prop("lang")).toEqual("fr");
    expect(wrapper.find("[style]").hostNodes().prop("style")).toEqual({
      color: "blue ",
    });
  });

  it("does not pass through Layout props to the DOM node", () => {
    const wrapper = mount(
      <Layout color={Color.Base} margin={1} display={Display.Flex} />,
    );

    const domNode = wrapper.find("div").hostNodes();

    expect(domNode).not.toHaveProp("color");
    expect(domNode).not.toHaveProp("margin");
    expect(domNode).not.toHaveProp("display");
  });

  it("adds the provided className", () => {
    const wrapper = mount(<Layout className="my-test-class" />);

    expect(wrapper.find("div")).toHaveClassName("my-test-class");
  });

  it("sets color to overlay if background is overlay", () => {
    const wrapper = mount(<Layout background={Background.Overlay} />);

    expect(wrapper).toHaveStyleRule(
      "color",
      DarkThemeMap["color-text-overlay"] + " !important",
    );
    expect(wrapper).toHaveStyleRule(
      "background-color",
      // Convert "rgba(0, 0, 0, 0.6)" to "rgba(0,0,0,0.6)"
      DarkThemeMap["color-background-overlay"].replace(/, /g, ",") +
        " !important",
    );
  });

  it("uses the provided color even if background is overlay", () => {
    const wrapper = mount(
      <Layout background={Background.Overlay} color={Color.Live} />,
    );

    expect(wrapper).toHaveStyleRule(
      "color",
      DarkThemeMap["color-text-live"] + " !important",
    );
    expect(wrapper).toHaveStyleRule(
      "background-color",
      // Convert "rgba(0, 0, 0, 0.6)" to "rgba(0,0,0,0.6)"
      DarkThemeMap["color-background-overlay"].replace(/, /g, ",") +
        " !important",
    );
  });

  it("doesn't add styles for boolean props 'false'", () => {
    const wrapper = mount(
      <Layout
        fullWidth={false}
        fullHeight={false}
        ellipsis={false}
        attachTop={false}
        attachRight={false}
        attachBottom={false}
        attachLeft={false}
      />,
    );

    expect(wrapper).not.toHaveStyleRule("width");
    expect(wrapper).not.toHaveStyleRule("height");
    expect(wrapper).not.toHaveStyleRule("top");
    expect(wrapper).not.toHaveStyleRule("right");
    expect(wrapper).not.toHaveStyleRule("bottom");
    expect(wrapper).not.toHaveStyleRule("left");
  });

  it("renders a div element by default", () => {
    const wrapper = mount(<Layout as={undefined} />);
    expect(wrapper.find("div")).toExist();
  });

  it("uses the provided element type", () => {
    const wrapper = mount(<Layout as="span" />);
    expect(wrapper.find("span")).toExist();
  });

  it.each(["div", "span", "ul", "li", "a", "button"] as const)(
    "renders the provided HTML element type: %s",
    (type) => {
      const wrapper = mount(<Layout as={type} />);
      expect(wrapper.find(type)).toExist();
    },
  );

  it("renders DOM node specified by `as` prop", () => {
    const wrapper = mount(<Layout as="span" padding={1} />);

    expect(wrapper.find("span")).toExist();
    expect(wrapper.find("span")).not.toHaveProp("as");
  });

  it("sets flex shrink and grow correctly", () => {
    const wrapper = mount(<Layout flexShrink={0} flexGrow={0} />);

    expect(wrapper).toHaveStyleRule("flex-shrink", "0 !important");
    expect(wrapper).toHaveStyleRule("flex-grow", "0 !important");
  });

  it("width prop takes precedence over fullWidth", () => {
    const wrapper = mount(<Layout width="75%" fullWidth />);
    expect(wrapper).toHaveStyleRule("width", "75% !important");
  });

  it("height prop takes precedence over fullHeight", () => {
    const wrapper = mount(<Layout height="25%" fullHeight />);
    expect(wrapper).toHaveStyleRule("height", "25% !important");
  });

  it("sets minWidth and maxWidth", () => {
    const wrapper = mount(<Layout minWidth="100px" maxWidth="200px" />);
    expect(wrapper).toHaveStyleRule("min-width", "100px !important");
    expect(wrapper).toHaveStyleRule("max-width", "200px !important");
  });

  it("sets minHeight and maxHeight", () => {
    const wrapper = mount(<Layout minHeight="400px" maxHeight="800px" />);
    expect(wrapper).toHaveStyleRule("min-height", "400px !important");
    expect(wrapper).toHaveStyleRule("max-height", "800px !important");
  });

  it("skips fullWidth when false", () => {
    const wrapper = mount(<Layout fullWidth={false} />);
    expect(wrapper).not.toHaveStyleRule("width", "100% !important");
  });

  it("skips fullHeight when false", () => {
    const wrapper = mount(<Layout fullHeight={false} />);
    expect(wrapper).not.toHaveStyleRule("height", "100% !important");
  });

  describe("css specificity", () => {
    const isImportant = expect.stringContaining("!important");

    it("uses !important on css properties for spacing simple values", () => {
      const wrapper = mount(<Layout margin={1} padding={1} />);

      expect(wrapper).toHaveStyleRule("margin", isImportant);
      expect(wrapper).toHaveStyleRule("padding", isImportant);
    });

    it("uses !important on css properties for spacing object values", () => {
      const wrapper = mount(
        <Layout margin={{ x: 1, y: 2 }} padding={{ x: 1, y: 2 }} />,
      );

      expect(wrapper).toHaveStyleRule("margin-left", isImportant);
      expect(wrapper).toHaveStyleRule("margin-right", isImportant);
      expect(wrapper).toHaveStyleRule("margin-top", isImportant);
      expect(wrapper).toHaveStyleRule("margin-bottom", isImportant);

      expect(wrapper).toHaveStyleRule("padding-left", isImportant);
      expect(wrapper).toHaveStyleRule("padding-right", isImportant);
      expect(wrapper).toHaveStyleRule("padding-top", isImportant);
      expect(wrapper).toHaveStyleRule("padding-bottom", isImportant);
    });

    it("does NOT set !important for ellipsis css", () => {
      const wrapper = mount(<Layout ellipsis />);
      expect(wrapper).toHaveStyleRule("text-overflow", "ellipsis");
      expect(wrapper).toHaveStyleRule("white-space", "nowrap");
      expect(wrapper).toHaveStyleRule("overflow", "hidden");
    });

    it("uses !important on css properties for many other props", () => {
      const wrapper = mount(
        <Layout {...getOptionalProps()} className={undefined} />,
      );

      // This is NOT an exhaustive list of all possible props and css values

      expect(wrapper).toHaveStyleRule("font-size", isImportant);
      expect(wrapper).toHaveStyleRule("font-weight", isImportant);
      expect(wrapper).toHaveStyleRule("vertical-align", isImportant);
      expect(wrapper).toHaveStyleRule("display", isImportant);
      expect(wrapper).toHaveStyleRule("background-color", isImportant);
      expect(wrapper).toHaveStyleRule("color", isImportant);
      expect(wrapper).toHaveStyleRule("font-weight", isImportant);
      expect(wrapper).toHaveStyleRule("text-align", isImportant);
      expect(wrapper).toHaveStyleRule("border-radius", isImportant);
      expect(wrapper).toHaveStyleRule("cursor", isImportant);
      expect(wrapper).toHaveStyleRule("overflow", isImportant);
      expect(wrapper).toHaveStyleRule("resize", isImportant);
      expect(wrapper).toHaveStyleRule("width", isImportant);
      expect(wrapper).toHaveStyleRule("height", isImportant);
      expect(wrapper).toHaveStyleRule("visibility", isImportant);
      expect(wrapper).toHaveStyleRule("position", isImportant);
      expect(wrapper).toHaveStyleRule("flex-wrap", isImportant);
      expect(wrapper).toHaveStyleRule("flex-direction", isImportant);
      expect(wrapper).toHaveStyleRule("align-items", isImportant);
      expect(wrapper).toHaveStyleRule("align-self", isImportant);
      expect(wrapper).toHaveStyleRule("justify-content", isImportant);
      expect(wrapper).toHaveStyleRule("align-content", isImportant);
      expect(wrapper).toHaveStyleRule("flex-grow", isImportant);
      expect(wrapper).toHaveStyleRule("flex-shrink", isImportant);
      expect(wrapper).toHaveStyleRule("order", isImportant);
      expect(wrapper).toHaveStyleRule("top", isImportant);
      expect(wrapper).toHaveStyleRule("right", isImportant);
      expect(wrapper).toHaveStyleRule("bottom", isImportant);
      expect(wrapper).toHaveStyleRule("left", isImportant);
      expect(wrapper).toHaveStyleRule("z-index", isImportant);
      expect(wrapper).toHaveStyleRule("padding-top", isImportant);
      expect(wrapper).toHaveStyleRule("padding-right", isImportant);
      expect(wrapper).toHaveStyleRule("padding-bottom", isImportant);
      expect(wrapper).toHaveStyleRule("padding-left", isImportant);
      expect(wrapper).toHaveStyleRule("margin-top", isImportant);
      expect(wrapper).toHaveStyleRule("margin-right", isImportant);
      expect(wrapper).toHaveStyleRule("margin-bottom", isImportant);
      expect(wrapper).toHaveStyleRule("margin-left", isImportant);
      expect(wrapper).toHaveStyleRule("border-top", isImportant);
      expect(wrapper).toHaveStyleRule("border-right", isImportant);
      expect(wrapper).toHaveStyleRule("border-bottom", isImportant);
      expect(wrapper).toHaveStyleRule("border-left", isImportant);
      expect(wrapper).toHaveStyleRule("box-shadow", isImportant);
    });
  });
});
