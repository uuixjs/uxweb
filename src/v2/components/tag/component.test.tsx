import { shallow } from "enzyme";
import { setupShallowTest } from "../../tests/helpers";
import { Tag, TagAction, TagComponent, TagProps } from "./component";

function getRequiredProps(): TagProps {
  return {
    label: "Test label",
  };
}

function getOptionalProps(): TagProps {
  return {
    disabled: true,
    label: "Test label",
    onClick: jest.fn(),
    tabIndex: 0,
    autoFocus: true,
    download: "download",
    linkTo: "https://example.com",
    targetBlank: true,
    title: "test title",
  };
}

const setupShallow = setupShallowTest(TagComponent, getRequiredProps);

describe("Tag", () => {
  it("renders tag component with only required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders tag component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders tag component with an actionType prop", () => {
    const { wrapper } = setupShallow({ action: TagAction.Add });
    expect(wrapper).toMatchSnapshot();
  });

  it("passes the aria label to the html", () => {
    const wrapper = shallow(
      <Tag aria-label="this is my aria label" {...getRequiredProps()} />,
    );
    expect(
      wrapper.html().match(/aria-label="this is my aria label"/)?.length,
    ).toBe(1);
  });
});
