import { setupShallowTest } from "../../../tests/helpers";
import { JustifyContent } from "../../layout";
import { Tabs, TabSize, TabsProps, TestSelectors } from "./component";
import { TabItem } from "./components/tab-item";

const TABS = [
  { label: "Zero" },
  { label: "One" },
  { label: "Two" },
  { label: "Three" },
  { label: "Four" },
  { label: "Five" },
  { label: "Six" },
  { label: "Seven" },
  { label: "Eight" },
  { label: "Nine" },
];

function getRequiredProps(): TabsProps {
  return {
    tabs: TABS,
    activeTabIndex: 0,
  };
}

function getOptionalProps(): TabsProps {
  return {
    tabs: TABS,
    activeTabIndex: 0,
    size: TabSize.Large,
    borderBottom: false,
    justifyContent: JustifyContent.Center,
  };
}

const setupShallow = setupShallowTest(Tabs, getRequiredProps);

describe("Tabs", () => {
  it("renders tabs component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders tabs component with optional props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders the correct number of tabs", () => {
    const { wrapper } = setupShallow();
    expect(wrapper.find(TabItem).length).toBe(TABS.length);
  });

  it("puts the active tab indicator on the correct tab", () => {
    const { wrapper } = setupShallow({
      ...getOptionalProps(),
      activeTabIndex: 3,
    });

    const elem = wrapper
      .find({
        "data-index": 3,
      })
      .find(TabItem);

    expect(elem.prop("activeIndicator")).not.toBe(undefined);
  });

  it("does not show an active tab indicator if index is out of range", () => {
    const { wrapper } = setupShallow({
      ...getOptionalProps(),
      activeTabIndex: -999,
    });

    const elem = wrapper.find({
      "data-test-selector": TestSelectors.ActiveTabIndicator,
    });

    expect(elem).toHaveLength(0);
  });

  it("calls the onClick callback when a tab is clicked", () => {
    const mockCallbackOne = jest.fn();
    const mockCallbackTwo = jest.fn();
    const mockCallbackThree = jest.fn();
    const { wrapper } = setupShallow({
      tabs: [
        {
          label: "One",
          onClick: mockCallbackOne,
        },
        {
          label: "Two",
          onClick: mockCallbackTwo,
        },
        {
          label: "Three",
          onClick: mockCallbackThree,
        },
      ],
    });

    wrapper.find(TabItem).at(1).simulate("click");

    expect(mockCallbackOne.mock.calls.length).toEqual(0);
    expect(mockCallbackTwo.mock.calls.length).toEqual(1);
    expect(mockCallbackThree.mock.calls.length).toEqual(0);
  });

  it("updates the active indicator when changed over time", () => {
    const { wrapper } = setupShallow();

    expect(
      wrapper
        .find({
          "data-index": 0,
        })
        .find(TabItem)
        .prop("activeIndicator"),
    ).not.toBe(undefined);

    wrapper.setProps({
      activeTabIndex: 5,
    });

    expect(
      wrapper
        .find({
          "data-index": 5,
        })
        .find(TabItem)
        .prop("activeIndicator"),
    ).not.toBe(undefined);
  });
});
