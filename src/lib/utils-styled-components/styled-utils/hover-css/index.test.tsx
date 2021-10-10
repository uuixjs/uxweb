import { shallow } from "enzyme";
import styled, { ThemeProps } from "styled-components";
import { hoverCss, hoverCssWithSelector } from ".";
import { ThemeContextValue } from "../../themed-styled-components";

const getContextValue = (
  { disableHoverCSS }: Pick<ThemeContextValue, "disableHoverCSS"> = {
    disableHoverCSS: false,
  },
): ThemeProps<ThemeContextValue> => {
  return {
    theme: {
      name: "light",
      cssVars: false,
      disableHoverCSS,
    },
  };
};

describe(hoverCss, () => {
  it("hoverCss accepts a tagged template with interpolation functions", () => {
    const contextValue = getContextValue();
    const ScComponent = styled.div`
      ${hoverCss`
        cursor: pointer;
        color: ${() => "blue"};
      `(contextValue)}
    `;
    const wrapper = shallow(<ScComponent />);

    expect(wrapper).toHaveStyleRule("cursor", "pointer", {
      modifier: ":hover",
    });
    expect(wrapper).toHaveStyleRule("color", "blue", {
      modifier: ":hover",
    });
  });

  it("hoverCssWithSelector accepts a tagged template with interpolation functions", () => {
    const contextValue = getContextValue();
    const selector = ".some-element:hover &";
    const ScComponent = styled.div`
      ${hoverCssWithSelector(selector)`
        cursor: pointer;
        color: ${() => "blue"};
      `(contextValue)}
    `;
    const wrapper = shallow(<ScComponent />);

    expect(wrapper).toHaveStyleRule("cursor", "pointer", {
      modifier: selector,
    });
    expect(wrapper).toHaveStyleRule("color", "blue", {
      modifier: selector,
    });
  });

  it("hoverCss returns undefined if disableHoverCSS is enabled", () => {
    const contextValue = getContextValue({ disableHoverCSS: true });
    const result = hoverCss`
      cursor: pointer;
    `(contextValue);

    expect(result).toBe(undefined);
  });

  it("hoverCssWithSelector returns undefined if disableHoverCSS is enabled", () => {
    const contextValue = getContextValue({ disableHoverCSS: true });
    const result = hoverCssWithSelector(".test-selector:hover &")`
      cursor: pointer;
    `(contextValue);

    expect(result).toBe(undefined);
  });
});
