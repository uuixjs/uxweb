import { mount } from "enzyme";
import { setupShallowTest } from "../../tests/helpers";
import { TextType, WhiteSpace, WordBreak } from "../core-text";
import { ScSubtitle, Subtitle, SubtitleProps, SubtitleSize } from "./component";

function getOptionalProps(): SubtitleProps {
  return {
    type: TextType.H2,
    size: SubtitleSize.Large,
    children: "Test",
    ellipsis: true,
    whiteSpace: WhiteSpace.NoWrap,
    wordBreak: WordBreak.BreakWord,
  };
}

const setupShallow = setupShallowTest(Subtitle);

describe("Subtitle", () => {
  it("renders title component with required props", () => {
    const { wrapper } = setupShallow({ className: "test" });
    expect(wrapper).toMatchSnapshot();
  });

  it("renders title component with all props as an h2", () => {
    const { wrapper } = setupShallow({
      ...getOptionalProps(),
      id: "1234",
      title: "test subtitle",
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("renders aria and data props to a Title", () => {
    const wrapper = mount(
      <Subtitle aria-atomic={true} role="dialog" data-test="test data" />,
    );

    const title = wrapper.find("p");

    expect(title.prop("aria-atomic")).toBe(true);
    expect(title.prop("role")).toBe("dialog");
    expect(title.prop("data-test")).toBe("test data");
  });

  it("sets font size and font weight for breakpoint props", () => {
    const wrapper = mount(
      <Subtitle
        breakpointMedium={{ size: SubtitleSize.Small }}
        breakpointLarge={{ size: SubtitleSize.Large }}
      />,
    );

    const text = wrapper.find(ScSubtitle);

    expect(text.prop("breakpointExtraSmall")).toBe(undefined);
    expect(text.prop("breakpointSmall")).toBe(undefined);
    expect(text.prop("breakpointMedium")).toHaveProperty("fontSize");
    expect(text.prop("breakpointMedium")).toHaveProperty("fontWeight");
    expect(text.prop("breakpointLarge")).toHaveProperty("fontSize");
    expect(text.prop("breakpointLarge")).toHaveProperty("fontWeight");
    expect(text.prop("breakpointExtraLarge")).toBe(undefined);
  });
});
