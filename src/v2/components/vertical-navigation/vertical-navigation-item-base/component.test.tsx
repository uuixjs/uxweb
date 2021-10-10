import { VerticalNavigationItemBase, VerticalNavigationItemBaseProps } from ".";
import { setupShallowTest } from "../../../tests/helpers";
import { SVGAsset } from "../../svg";

describe("VerticalNavigationItemBase", () => {
  const testText = "abc";
  const Test = (props: VerticalNavigationItemBaseProps) => (
    <VerticalNavigationItemBase {...props}>
      {testText}
    </VerticalNavigationItemBase>
  );
  const setupShallow = setupShallowTest(Test);

  it("renders children in a CoreText", () => {
    const { wrapper } = setupShallow();

    expect(wrapper.shallow().find("CoreText").children().text()).toEqual(
      testText,
    );
  });

  it("shows the iconAsset", () => {
    const { wrapper } = setupShallow({
      iconAsset: SVGAsset.Gift,
    });

    expect(wrapper.shallow().find("Icon").props()).toMatchObject({
      asset: SVGAsset.Gift,
    });
  });

  it("applies indent level padding", () => {
    const { wrapper } = setupShallow({
      indentLevel: 1,
    });

    expect(
      wrapper.shallow().find(".vertical-navigation-item-base__text-container"),
    ).toHaveProp("padding", expect.objectContaining({ left: 2 }));
  });

  it("calls the onClick handler", () => {
    const onClickSpy = jest.fn();
    const { wrapper } = setupShallow({
      onClick: onClickSpy,
    });

    wrapper.simulate("click");
    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });
});
