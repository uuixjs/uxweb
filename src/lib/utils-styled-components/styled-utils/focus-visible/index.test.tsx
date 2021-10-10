import { shallow } from "enzyme";
import styled from "styled-components";
import { FOCUS_VISIBLE_ATTR, focusVisible, focusVisibleReset } from ".";

const FOCUS_VISIBLE_SELECTOR = `&${FOCUS_VISIBLE_ATTR}`;
const FOCUS_VISIBLE_RESET_SELECTOR = `.js-focus-visible &:focus:not(${FOCUS_VISIBLE_ATTR})`;

describe(focusVisible, () => {
  it("focusVisible accepts a tagged template with an interpolation function as an argument", () => {
    const ScComponent = styled.div`
      ${focusVisible`
        background: purple;
        color: ${() => "blue"};`}
    `;
    const wrapper = shallow(<ScComponent />);

    expect(wrapper).toHaveStyleRule("background", "purple", {
      modifier: FOCUS_VISIBLE_SELECTOR,
    });
    expect(wrapper).toHaveStyleRule("color", "blue", {
      modifier: FOCUS_VISIBLE_SELECTOR,
    });
  });
});

describe(focusVisibleReset, () => {
  it("focusVisibleReset accepts a tagged template with an interpolation function as an argument", () => {
    const ScComponent = styled.div`
      ${focusVisibleReset`
        outline: none;
        border-color: ${() => "blue"};
      `}
    `;
    const wrapper = shallow(<ScComponent />);

    expect(wrapper).toHaveStyleRule("outline", "none", {
      modifier: FOCUS_VISIBLE_RESET_SELECTOR,
    });
    expect(wrapper).toHaveStyleRule("border-color", "blue", {
      modifier: FOCUS_VISIBLE_RESET_SELECTOR,
    });
  });
});
