import { mount } from "enzyme";
import { Component } from "react";
import { VerticalNavigationStateProvider } from ".";
import { setupShallowTest } from "../../../tests/helpers";

describe("VerticalNavigationStateProvider", () => {
  const setupShallow = setupShallowTest(VerticalNavigationStateProvider);

  it("renders its child", () => {
    const { wrapper } = setupShallow({
      children: () => <div id="test" />,
    });

    expect(wrapper.find("#test")).toHaveLength(1);
  });

  it("manages/injects item open/closed state correctly", () => {
    interface AssertionProps {
      openGroupIDs?: string[];
      onCloseGroup?(id: string): void;
      onOpenGroup?(id: string): void;
    }

    class Assertion extends Component<AssertionProps> {
      public render() {
        return (
          <>
            <div id="open1" onClick={this.openGroup1} />
            <div id="open2" onClick={this.openGroup2} />
            <div id="close1" onClick={this.closeGroup1} />
            <div id="close2" onClick={this.closeGroup2} />
          </>
        );
      }

      private openGroup1 = () => {
        if (this.props.onOpenGroup) {
          this.props.onOpenGroup("1");
        }
      };
      private openGroup2 = () => {
        if (this.props.onOpenGroup) {
          this.props.onOpenGroup("2");
        }
      };

      private closeGroup1 = () => {
        if (this.props.onCloseGroup) {
          this.props.onCloseGroup("1");
        }
      };

      private closeGroup2 = () => {
        if (this.props.onCloseGroup) {
          this.props.onCloseGroup("2");
        }
      };
    }

    const wrapper = mount(
      <VerticalNavigationStateProvider>
        {({ openGroupIDs, onCloseGroup, onOpenGroup }) => (
          <Assertion
            openGroupIDs={openGroupIDs}
            onCloseGroup={onCloseGroup}
            onOpenGroup={onOpenGroup}
          />
        )}
      </VerticalNavigationStateProvider>,
    );

    expect(wrapper.find(Assertion).props().openGroupIDs).toEqual([]);

    wrapper.find("#open1").simulate("click");
    expect(wrapper.find(Assertion).props().openGroupIDs).toEqual(["1"]);

    wrapper.find("#open2").simulate("click");
    expect(wrapper.find(Assertion).props().openGroupIDs).toEqual(["1", "2"]);

    wrapper.find("#close1").simulate("click");
    expect(wrapper.find(Assertion).props().openGroupIDs).toEqual(["2"]);

    wrapper.find("#close2").simulate("click");
    expect(wrapper.find(Assertion).props().openGroupIDs).toEqual([]);
  });

  it("allows certain groups to be open by default", () => {
    interface AssertionProps {
      openGroupIDs?: string[];
      onCloseGroup?(id: string): void;
      onOpenGroup?(id: string): void;
    }

    class Assertion extends Component<AssertionProps> {
      public render() {
        return (
          <>
            <div id="open" onClick={this.openGroup} />
            <div id="close" onClick={this.closeGroup} />
          </>
        );
      }

      private openGroup = () => {
        if (this.props.onOpenGroup) {
          this.props.onOpenGroup("1");
        }
      };

      private closeGroup = () => {
        if (this.props.onCloseGroup) {
          this.props.onCloseGroup("1");
        }
      };
    }

    const wrapper = mount(
      <VerticalNavigationStateProvider defaultOpenGroupIDs={["1"]}>
        {({ openGroupIDs, onCloseGroup, onOpenGroup }) => (
          <Assertion
            openGroupIDs={openGroupIDs}
            onCloseGroup={onCloseGroup}
            onOpenGroup={onOpenGroup}
          />
        )}
      </VerticalNavigationStateProvider>,
    );

    expect(wrapper.find(Assertion).props().openGroupIDs).toEqual(["1"]);

    wrapper.find("#close").simulate("click");
    expect(wrapper.find(Assertion).props().openGroupIDs).toEqual([]);
  });
});
