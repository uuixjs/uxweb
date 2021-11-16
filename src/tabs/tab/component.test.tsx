import { setupShallowTest } from "../../../tests/helpers";
import { Tab, TabProps } from "./component";

function getOptionalProps(): TabProps {
  return {
    active: true,
    disabled: true,
    linkTo: "/",
    onClick: jest.fn(),
    targetBlank: true,
  };
}

const setupShallow = setupShallowTest(Tab);

describe("Tab", () => {
  it("renders tab component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders tab component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders tab component as <a>", () => {
    const { wrapper } = setupShallow({ linkTo: "https://www.google.com" });
    expect(wrapper).toMatchSnapshot();
  });

  it("renders tab component as <button> with an onclick", () => {
    const { wrapper } = setupShallow({ onClick: jest.fn() });
    expect(wrapper).toMatchSnapshot();
  });

  it("renders tab component as Link component", () => {
    const { wrapper } = setupShallow({ linkTo: "/" });
    expect(wrapper).toMatchSnapshot();
  });
});
