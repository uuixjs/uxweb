import { mount } from "enzyme";
import { setupShallowTest } from "../../tests/helpers";
import { TextType, WhiteSpace, WordBreak } from "../core-text";
import { ScTitleText, Title, TitleProps, TitleSize } from "./component";

function getOptionalProps(): TitleProps {
  return {
    type: TextType.H1,
    size: TitleSize.ExtraLarge,
    children: "Test",
    ellipsis: true,
    whiteSpace: WhiteSpace.NoWrap,
    wordBreak: WordBreak.BreakWord,
  };
}

const setupShallow = setupShallowTest(Title);

describe("Title", () => {
  it("renders title component with required props", () => {
    const { wrapper } = setupShallow({ className: "test" });
    expect(wrapper).toMatchSnapshot();
  });

  it("renders title component with all props as an h1", () => {
    const { wrapper } = setupShallow({
      ...getOptionalProps(),
      id: "1234",
      title: "test title",
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("renders aria and data props to a Title", () => {
    const wrapper = mount(
      <Title aria-atomic={true} role="dialog" data-test="test data" />,
    );

    const title = wrapper.find("p");

    expect(title.prop("aria-atomic")).toBe(true);
    expect(title.prop("role")).toBe("dialog");
    expect(title.prop("data-test")).toBe("test data");
  });

  it("sets font size and font weight for breakpoint props", () => {
    const wrapper = mount(
      <Title
        breakpointMedium={{ size: TitleSize.Small }}
        breakpointLarge={{ size: TitleSize.Large }}
      />,
    );

    const text = wrapper.find(ScTitleText);

    expect(text.prop("breakpointExtraSmall")).toBe(undefined);
    expect(text.prop("breakpointSmall")).toBe(undefined);
    expect(text.prop("breakpointMedium")).toHaveProperty("fontSize");
    expect(text.prop("breakpointMedium")).toHaveProperty("fontWeight");
    expect(text.prop("breakpointLarge")).toHaveProperty("fontSize");
    expect(text.prop("breakpointLarge")).toHaveProperty("fontWeight");
    expect(text.prop("breakpointExtraLarge")).toBe(undefined);
  });
});
