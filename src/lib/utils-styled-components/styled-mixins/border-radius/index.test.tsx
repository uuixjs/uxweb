import { BorderRadius, BorderRadiusMixinProps, getBorderRadiusStyles } from ".";

import { StaticTokenMap } from "lib/ui-tokens";
import { shallow } from "enzyme";
import styled from "styled-components";

describe("getBorderRadiusStyles", () => {
  it("works for string enum value", () => {
    const Div = styled.div<BorderRadiusMixinProps>`
      ${getBorderRadiusStyles}
    `;
    const wrapper = shallow(<Div borderRadius={BorderRadius.Rounded} />);

    expect(wrapper).toHaveStyleRule(
      "border-radius",
      StaticTokenMap[BorderRadius.Rounded],
    );
  });

  it("works for object of mapped corners' enum values", () => {
    const Div = styled.div<BorderRadiusMixinProps>`
      ${getBorderRadiusStyles}
    `;
    const wrapper = shallow(
      <Div
        borderRadius={{
          topLeft: BorderRadius.Rounded,
          topRight: BorderRadius.Large,
          bottomLeft: BorderRadius.Rounded,
          bottomRight: BorderRadius.None,
        }}
      />,
    );

    expect(wrapper).toHaveStyleRule(
      "border-top-left-radius",
      StaticTokenMap[BorderRadius.Rounded],
    );
    expect(wrapper).toHaveStyleRule(
      "border-top-right-radius",
      StaticTokenMap[BorderRadius.Large],
    );
    expect(wrapper).toHaveStyleRule(
      "border-bottom-left-radius",
      StaticTokenMap[BorderRadius.Rounded],
    );
    expect(wrapper).toHaveStyleRule(
      "border-bottom-right-radius",
      StaticTokenMap[BorderRadius.None],
    );
  });
});
