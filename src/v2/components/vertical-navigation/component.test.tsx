import { mount, shallow } from "enzyme";
import { setupShallowTest } from "../../tests/helpers";
import { Layout } from "../layout";
import { SVGAsset } from "../svg";
import { VerticalNavigation, VerticalNavigationProps } from "./";
import { VerticalNavigationGroup } from "./vertical-navigation-group";
import { VerticalNavigationGroupHeader } from "./vertical-navigation-group-header";
import { VerticalNavigationItem } from "./vertical-navigation-item";
import { VerticalNavigationSubHeader } from "./vertical-navigation-sub-header";
import { VerticalNavigationTitle } from "./vertical-navigation-title";

describe("VerticalNavigation", () => {
  const BasicTest = (props: { margin?: VerticalNavigationProps["margin"] }) => (
    <VerticalNavigation {...props}>
      <VerticalNavigationTitle>Test</VerticalNavigationTitle>
      <VerticalNavigationSubHeader>Test Sub</VerticalNavigationSubHeader>
      <VerticalNavigationItem>1</VerticalNavigationItem>
      <VerticalNavigationGroup
        label="Group 1"
        onOpen={jest.fn()}
        onClose={jest.fn()}
        open
        iconAsset={SVGAsset.Heart}
      >
        <VerticalNavigationItem>group-1-item-1</VerticalNavigationItem>
      </VerticalNavigationGroup>
      <VerticalNavigationItem>2</VerticalNavigationItem>
      <VerticalNavigationGroup
        label="Group 2"
        onOpen={jest.fn()}
        onClose={jest.fn()}
      >
        <VerticalNavigationItem>group-2-item-1</VerticalNavigationItem>
      </VerticalNavigationGroup>
    </VerticalNavigation>
  );
  const setupShallow = setupShallowTest(BasicTest);

  it("applies margin to the outer layout", () => {
    const { wrapper } = setupShallow({
      margin: 5,
    });

    expect(wrapper.shallow().find(Layout)).toHaveProp("margin", 5);
  });

  it("renders children/groups as siblings in a TransitionGroup", () => {
    const SiblingTest = (props: VerticalNavigationProps) => (
      <VerticalNavigation {...props}>
        <VerticalNavigationItem>1</VerticalNavigationItem>
        <VerticalNavigationGroup
          open
          label="Group 1"
          onOpen={jest.fn()}
          onClose={jest.fn()}
        >
          <VerticalNavigationItem>group 1 - item 1</VerticalNavigationItem>
          <VerticalNavigationItem>group 1 - item 2</VerticalNavigationItem>
        </VerticalNavigationGroup>
        <VerticalNavigationItem>2</VerticalNavigationItem>
      </VerticalNavigation>
    );

    const { wrapper } = setupShallowTest(SiblingTest)({});

    expect(wrapper.dive().find("TransitionGroup").children()).toHaveLength(5);
  });

  it("doesn't render children of closed groups", () => {
    const SiblingTest = (props: VerticalNavigationProps) => (
      <VerticalNavigation {...props}>
        <VerticalNavigationItem>1</VerticalNavigationItem>
        <VerticalNavigationGroup
          open={false}
          label="Group 1"
          onOpen={jest.fn()}
          onClose={jest.fn()}
        >
          <VerticalNavigationItem>group 1 - item 1</VerticalNavigationItem>
        </VerticalNavigationGroup>
        <VerticalNavigationItem>2</VerticalNavigationItem>
      </VerticalNavigation>
    );

    const { wrapper } = setupShallowTest(SiblingTest)({});

    expect(wrapper.dive().find("TransitionGroup").children()).toHaveLength(3);
  });

  it("adds a header to each group", () => {
    const { wrapper } = setupShallow();

    expect(wrapper.dive().find("VerticalNavigationGroupHeader")).toHaveLength(
      2,
    );
  });

  it("sets open on the header of open nav groups", () => {
    const { wrapper } = setupShallow();

    expect(
      wrapper
        .dive()
        .find("VerticalNavigationGroupHeader")
        .findWhere((w) => !!w.props().open),
    ).toHaveLength(1);
  });

  it("sets aria-expanded on the header of open nav groups", () => {
    const { wrapper } = setupShallow();

    const headerElement = wrapper
      .dive()
      .find("VerticalNavigationGroupHeader")
      .findWhere((w) => !!w.props()["aria-expanded"]);

    expect(headerElement.html().match(/aria-expanded="true"/)?.length).toBe(1);
  });

  it("passes through iconAsset to the header of nav groups", () => {
    const { wrapper } = setupShallow();

    expect(
      wrapper
        .dive()
        .find("VerticalNavigationGroupHeader")
        .findWhere((w) => w.props().iconAsset === SVGAsset.Heart),
    ).toHaveLength(1);
  });

  it("passes through onClick as onOpen or onClose to the header of nav groups", () => {
    const handleOpen = jest.fn();
    const handleClose = jest.fn();

    const openWrapper = shallow(
      <VerticalNavigation>
        <VerticalNavigationGroup
          open={false}
          label="Group 1"
          onOpen={handleOpen}
          onClose={handleClose}
        >
          <VerticalNavigationItem>item 1</VerticalNavigationItem>
        </VerticalNavigationGroup>
      </VerticalNavigation>,
    );

    expect(
      openWrapper.find("VerticalNavigationGroupHeader").prop("onClick"),
    ).toEqual(handleOpen);

    const closeWrapper = shallow(
      <VerticalNavigation>
        <VerticalNavigationGroup
          open
          label="Group 1"
          onOpen={handleOpen}
          onClose={handleClose}
        >
          <VerticalNavigationItem>item 1</VerticalNavigationItem>
        </VerticalNavigationGroup>
      </VerticalNavigation>,
    );

    expect(
      closeWrapper.find("VerticalNavigationGroupHeader").prop("onClick"),
    ).toEqual(handleClose);
  });

  it("sets the correct indentLevel on VerticalNavigationItem group children", () => {
    const wrapper = mount(
      <VerticalNavigation>
        <VerticalNavigationGroup
          data-test-selector="1"
          open
          label="Group 1"
          onOpen={jest.fn()}
          onClose={jest.fn()}
        >
          <VerticalNavigationItem>item 1</VerticalNavigationItem>
        </VerticalNavigationGroup>
        <VerticalNavigationGroup
          iconAsset={SVGAsset.Heart}
          open
          label="Group 1"
          onOpen={jest.fn()}
          onClose={jest.fn()}
        >
          <VerticalNavigationItem>item 1</VerticalNavigationItem>
        </VerticalNavigationGroup>
      </VerticalNavigation>,
    );

    // no icon
    expect(wrapper.find("VerticalNavigationItem").at(0)).toHaveProp(
      "indentLevel",
      1,
    );
    // with icon
    expect(wrapper.find("VerticalNavigationItem").at(1)).toHaveProp(
      "indentLevel",
      2,
    );
  });

  it("sets selected on the group if a child is selected and the group is collapsed", () => {
    const wrapper = mount(
      <VerticalNavigation>
        <VerticalNavigationGroup
          label=""
          open={false}
          onOpen={jest.fn()}
          onClose={jest.fn()}
        >
          <VerticalNavigationItem selected>item 1</VerticalNavigationItem>
        </VerticalNavigationGroup>
      </VerticalNavigation>,
    );

    expect(wrapper.find(VerticalNavigationGroupHeader).prop("selected")).toBe(
      true,
    );
  });

  it("does not set selected on the group if a child is selected and the group is open", () => {
    const wrapper = mount(
      <VerticalNavigation>
        <VerticalNavigationGroup
          label=""
          open={true}
          onOpen={jest.fn()}
          onClose={jest.fn()}
        >
          <VerticalNavigationItem selected>item 1</VerticalNavigationItem>
        </VerticalNavigationGroup>
      </VerticalNavigation>,
    );

    expect(wrapper.find(VerticalNavigationGroupHeader).prop("selected")).toBe(
      false,
    );
  });
});
