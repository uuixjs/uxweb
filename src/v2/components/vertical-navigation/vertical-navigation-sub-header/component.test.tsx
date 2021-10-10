import { VerticalNavigationSubHeader } from ".";
import { setupShallowTest } from "../../../tests/helpers";
import { Header } from "../../header";

describe("VerticalNavigationSubHeader", () => {
  const testText = "abc";
  const Test = () => (
    <VerticalNavigationSubHeader>{testText}</VerticalNavigationSubHeader>
  );
  const setupShallow = setupShallowTest(Test);

  it("renders children in a CoreText", () => {
    const { wrapper } = setupShallow();

    expect(wrapper.shallow().find(Header).children().text()).toEqual(testText);
  });
});
