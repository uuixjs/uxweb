import { VerticalNavigationTitle } from ".";
import { setupShallowTest } from "../../../tests/helpers";
import { Title } from "../../title";

describe("VerticalNavigationTitle", () => {
  const testText = "abc";
  const Test = () => (
    <VerticalNavigationTitle>{testText}</VerticalNavigationTitle>
  );
  const setupShallow = setupShallowTest(Test);

  it("renders children in a CoreText", () => {
    const { wrapper } = setupShallow();

    expect(wrapper.shallow().find(Title).children().text()).toEqual(testText);
  });
});
