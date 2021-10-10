import { setupShallowTest } from "../../tests/helpers";
import { TextType } from "../core-text";
import { Header, HeaderProps } from "./component";

function getOptionalProps(): HeaderProps {
  return {
    type: TextType.H1,
    children: "Test",
    ellipsis: true,
  };
}

const setupShallow = setupShallowTest(Header);

describe("Header", () => {
  it("renders header component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders header component with all props as an h1", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
