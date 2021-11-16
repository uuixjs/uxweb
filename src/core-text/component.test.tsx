import { Color, FontSize, FontWeight, VerticalAlign } from "../layout";
import { CoreText, CoreTextProps } from "./component";
import { DarkThemeMap, StaticTokenMap } from "lib/ui-tokens";
import {
  LineHeight,
  TextDecoration,
  TextTransform,
  TextType,
  WhiteSpace,
  WordBreak,
} from "./types";
import { mount, shallow } from "enzyme";

import { Enum } from "tachyon-utils-ts";
import { HTMLProps } from "react";
import { setupShallowTest } from "../../tests/helpers";

function getOptionalProps(): CoreTextProps &
  Pick<HTMLProps<HTMLElement>, "id" | "className"> {
  return {
    align: VerticalAlign.TextBottom,
    bold: true,
    breakpointExtraSmall: { fontSize: FontSize.Size1 },
    breakpointSmall: { fontSize: FontSize.Size2 },
    breakpointMedium: { fontSize: FontSize.Size3 },
    breakpointLarge: { fontSize: FontSize.Size4 },
    breakpointExtraLarge: { fontSize: FontSize.Size5 },
    breakpointExtraExtraLarge: { fontSize: FontSize.Size6 },
    className: "test-classname",
    color: Color.Error,
    decoration: TextDecoration.Strikethrough,
    ellipsis: true,
    fontSize: FontSize.Size3,
    fontWeight: FontWeight.SemiBold,
    id: "1234",
    italic: true,
    lineHeight: LineHeight.Body,
    lines: 2,
    title: "Test title",
    transform: TextTransform.Uppercase,
    type: TextType.H3,
    wordBreak: WordBreak.KeepAll,
    whiteSpace: WhiteSpace.NoWrap,
  };
}

const setupShallow = setupShallowTest(CoreText);

describe("CoreText", () => {
  it("renders core text component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders core text component with all props as an h3", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("passes aria props to the element", () => {
    const wrapper = shallow(<CoreText aria-details="id" />);
    const element = wrapper.find("p").first();
    expect(element.prop("aria-details")).toBe("id");
  });

  it("passes data- props to the element", () => {
    const wrapper = mount(<CoreText data-foobar="test">Hello World</CoreText>);
    const domNode = wrapper.find("p").hostNodes();
    expect(domNode).toHaveProp("data-foobar");
    expect(domNode.prop("data-foobar")).toEqual("test");
  });

  it("sets title to children when ellipsis is string", () => {
    const wrapper = shallow(<CoreText ellipsis>Ellipsized Text</CoreText>);
    const element = wrapper.find("p").first();
    expect(element.prop("title")).toBe("Ellipsized Text");
  });

  it("allows custom title when ellipsis is string", () => {
    const wrapper = shallow(
      <CoreText title="custom title" ellipsis>
        Ellipsized Text
      </CoreText>,
    );
    const element = wrapper.find("p").first();
    expect(element.prop("title")).toBe("custom title");
  });

  it("allows title to be unset when ellipsis is defined", () => {
    const wrapper = shallow(
      <CoreText title="" ellipsis>
        Ellipsized Text
      </CoreText>,
    );
    const element = wrapper.find("p").first();
    expect(element.prop("title")).toBe("");
  });

  it("renders a p tag by default", () => {
    const wrapper = shallow(<CoreText>Hello World</CoreText>);
    expect(wrapper.find("p")).toExist();
  });

  it.each(Enum.values(TextType))(
    "renders %s tag via the type prop",
    (tagName) => {
      const wrapper = shallow(<CoreText type={tagName}>Hello World</CoreText>);
      expect(wrapper.find(tagName)).toExist();
    },
  );

  it.each(Enum.values(TextType))(
    "renders %s tag via the as prop",
    (tagName) => {
      const wrapper = shallow(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <CoreText as={tagName as any}>Hello World</CoreText>,
      );
      expect(wrapper.find(tagName)).toExist();
    },
  );

  it("sets vertical-align css via the special `align` prop", () => {
    const wrapper = mount(
      <CoreText align={VerticalAlign.Middle}>Hello World</CoreText>,
    );
    const text = wrapper.find("p");
    expect(text).toHaveStyleRule("vertical-align", "middle !important");
  });

  it("sets font-weight css via the special `bold` prop", () => {
    const wrapper = mount(<CoreText bold>Hello World</CoreText>);
    const text = wrapper.find("p");
    expect(text).toHaveStyleRule(
      "font-weight",
      `${StaticTokenMap["font-weight-semibold"]} !important`,
    );
  });

  describe("ellipsis", () => {
    it("sets the right css when ellipsis = true", () => {
      const wrapper = mount(<CoreText lines={1}>Hello World</CoreText>);

      const text = wrapper.find("p");
      expect(text).toHaveStyleRule("overflow: hidden");
      expect(text).toHaveStyleRule("text-overflow: ellipsis");
      expect(text).toHaveStyleRule("white-space", "nowrap");
    });

    it("sets the right css when lines = 1", () => {
      const wrapper = mount(<CoreText lines={1}>Hello World</CoreText>);

      const text = wrapper.find("p");
      expect(text).toHaveStyleRule("overflow: hidden");
      expect(text).toHaveStyleRule("text-overflow: ellipsis");
      expect(text).toHaveStyleRule("white-space", "nowrap");
    });

    it("sets the right css when lines = 2", () => {
      const wrapper = mount(<CoreText lines={2}>Hello World</CoreText>);

      const text = wrapper.find("p");
      expect(text).toHaveStyleRule("overflow: hidden !important");
      expect(text).toHaveStyleRule("text-overflow: ellipsis !important");
      expect(text).toHaveStyleRule("white-space", "normal !important");
      expect(text).toHaveStyleRule("display", "-webkit-box");
      expect(text).toHaveStyleRule("-webkit-line-clamp", "2");
      expect(text).toHaveStyleRule("-webkit-box-orient", "vertical");
    });

    it("sets the right css when lines = 2 and ellipsis = true", () => {
      // There is an issue with jest `toHaveStyleRule` with multiple css props with the same name.
      const wrapper = mount(
        <CoreText ellipsis lines={2}>
          Hello World
        </CoreText>,
      );

      const text = wrapper.find("p");
      expect(text).toHaveStyleRule("overflow: hidden !important");
      expect(text).toHaveStyleRule("text-overflow: ellipsis !important");
      expect(text).toHaveStyleRule("white-space", "normal !important");
      expect(text).toHaveStyleRule("display", "-webkit-box");
      expect(text).toHaveStyleRule("-webkit-line-clamp", "2");
      expect(text).toHaveStyleRule("-webkit-box-orient", "vertical");
    });
  });

  it("sets css for CoreText specific props", () => {
    const wrapper = mount(
      <CoreText
        decoration={TextDecoration.Strikethrough}
        italic
        lineHeight={LineHeight.Heading}
        tabularNums
        transform={TextTransform.Uppercase}
        wordBreak={WordBreak.Normal}
        lines={2}
      >
        Hello World
      </CoreText>,
    );

    const text = wrapper.find("p");

    expect(text).toHaveStyleRule("text-decoration", "line-through !important");
    expect(text).toHaveStyleRule("font-style", "italic !important");
    expect(text).toHaveStyleRule(
      "line-height",
      `${StaticTokenMap["line-height-heading"]} !important`,
    );
    expect(text).toHaveStyleRule("font-variant-numeric", "tabular-nums");
    expect(text).toHaveStyleRule("text-transform", "uppercase !important");
    expect(text).toHaveStyleRule("word-break", "normal !important");
  });

  it("sets css for Layout specific props with breakpoints", () => {
    const wrapper = mount(
      <CoreText
        color={Color.Alt}
        fontSize={FontSize.Size4}
        breakpointLarge={{ fontSize: FontSize.Size5 }}
      >
        Hello World
      </CoreText>,
    );

    const text = wrapper.find("p");

    expect(text).toHaveStyleRule(
      "color",
      expect.stringContaining(DarkThemeMap["color-text-alt"]),
    );
    expect(text).toHaveStyleRule(
      "font-size",
      expect.stringContaining(StaticTokenMap["font-size-4"]),
    );
    expect(text).toHaveStyleRule(
      "font-size",
      expect.stringContaining(StaticTokenMap["font-size-5"]),
      { media: `screen and (min-width:${StaticTokenMap["break-lg"]})` },
    );
  });

  it("does not pass through props to underlying DOM node", () => {
    const wrapper = mount(
      <CoreText
        color={Color.Base}
        align={VerticalAlign.Middle}
        bold
        type={TextType.Span}
      >
        Hello World
      </CoreText>,
    );
    const domNode = wrapper.find("span").hostNodes();
    expect(domNode).not.toHaveProp("color");
    expect(domNode).not.toHaveProp("align");
    expect(domNode).not.toHaveProp("bold");
    expect(domNode).not.toHaveProp("type");
  });

  it("renders children and works with enzyme text()", () => {
    const wrapper = shallow(
      <CoreText type={TextType.Span}>Hello World</CoreText>,
    );

    expect(wrapper.text()).toEqual("Hello World");
  });

  it("typescript disallows Layout props", () => {
    // @ts-expect-error The margin prop is not part of the CoreTextProps interface
    shallow(<CoreText margin={1}>Hello World</CoreText>);
  });
});
