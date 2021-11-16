import { mount } from "enzyme";
import { CoreText, TextType } from "../core-text";
import { Input, InputType } from "../form/input";
import { Color, Layout } from "../layout";
import {
  ScTokenOverrideCSSVars,
  TokenOverrideRegion,
  withTokenOverrides,
} from "./component";

describe(TokenOverrideRegion, () => {
  it("renders a custom css property value when provided a color", () => {
    const wrapper = mount(
      <TokenOverrideRegion
        cssVars={true}
        tokenOverrides={{
          "color-fill-button-icon": "yellow",
        }}
      />,
    );

    expect(wrapper.find(ScTokenOverrideCSSVars)).toHaveStyleRule(
      "--color-fill-button-icon",
      "yellow",
    );
  });

  it("renders no CSS variables when cssVars is false", () => {
    const wrapper = mount(
      <TokenOverrideRegion
        cssVars={false}
        tokenOverrides={{
          "color-fill-button-icon": "yellow",
        }}
      />,
    );

    expect(wrapper.find(ScTokenOverrideCSSVars)).not.toHaveStyleRule(
      "--color-fill-button-icon",
    );
  });

  it("renders no CSS variables for nested provider, inherits cssVar context from parent provider", () => {
    const wrapper = mount(
      <TokenOverrideRegion
        cssVars={true}
        tokenOverrides={{
          "color-fill-button-icon": "blue",
          "color-text-base": "red",
        }}
      >
        <TokenOverrideRegion
          tokenOverrides={{
            "color-fill-button-icon": "yellow",
          }}
        />
      </TokenOverrideRegion>,
    );

    expect(wrapper.find(ScTokenOverrideCSSVars).at(1)).not.toHaveStyleRule(
      "--color-fill-button-icon",
      "blue",
    );

    expect(wrapper.find(ScTokenOverrideCSSVars).at(1)).toHaveStyleRule(
      "--color-fill-button-icon",
      "yellow",
    );
  });
});

describe(withTokenOverrides, () => {
  it("renders a component withtokenOverrides HOC", () => {
    const CustomInput = withTokenOverrides(Input, {
      tokenOverrides: { "color-border-input": "blue" },
    });

    const wrapper = mount(<CustomInput type={InputType.Text} value="twitch" />);

    expect(wrapper.find("input")).toHaveStyleRule("border-color", "blue");
  });

  it("children of withtokenOverrides also inherit theme context", () => {
    const CustomLayout = withTokenOverrides(Layout, {
      tokenOverrides: { "color-text-alt": "blue" },
    });

    const wrapper = mount(
      <CustomLayout>
        <CoreText type={TextType.H2} color={Color.Alt} />
      </CustomLayout>,
    );

    expect(wrapper.find("h2")).toHaveStyleRule("color", "blue !important");
  });
});
