import { shallow } from "enzyme";
import { setupShallowTest } from "../../../../../tests/helpers";
import { TextAlign } from "../../../../layout";
import { TabSize } from "../../component";
import { TabItem, TabItemComponent, TabItemProps } from "./component";

function getRequiredProps(): TabItemProps {
  return {
    label: "My Awesome Tab",
    originalIndex: 1,
  };
}

function getOptionalProps(): Partial<TabItemProps> {
  return {
    disabled: false,
    linkTo: "https://www.twitch.tv",
    onClick: () => {
      return;
    },
    tabIndex: 1,
    targetBlank: false,
    title: "This is an awesome title",
    textAlign: TextAlign.Center,
    size: TabSize.Default,
  };
}

const setupShallow = setupShallowTest(TabItemComponent, getRequiredProps);

describe("TabItem", () => {
  it("renders TabItem component with only required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders TabItem component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("passes through data- props", () => {
    const { wrapper } = setupShallow({
      "data-test-selector": "my-selector",
    });

    expect(wrapper.find({ ["data-test-selector"]: "my-selector" }).length).toBe(
      1,
    );
  });

  it("passes the aria label to the html", () => {
    const wrapper = shallow(
      <TabItem aria-label="this is my aria label" {...getRequiredProps()} />,
    );
    expect(
      wrapper.html().match(/aria-label="this is my aria label"/)?.length,
    ).toBe(1);
  });
});
