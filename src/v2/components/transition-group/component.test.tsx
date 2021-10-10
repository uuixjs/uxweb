import { mount } from "enzyme";
import { InjectLayout } from "../layout/inject-layout";
import { TransitionGroup } from "./component";

describe("TransitionGroup", () => {
  it("is compatible with InjectLayout and fullWidth", () => {
    const wrapper = mount(
      <InjectLayout fullWidth>
        <TransitionGroup>
          <div key="example-1" />
        </TransitionGroup>
      </InjectLayout>,
    );

    expect(wrapper.find("div.tw-transition-group")).toHaveStyleRule(
      "width",
      "100% !important",
    );
  });

  it("renders with the provided component prop", () => {
    const wrapper = mount(
      <TransitionGroup component={<span className="my-span" />}>
        <div key="example-1" />
      </TransitionGroup>,
    );

    expect(wrapper.find(".my-span")).toExist();
  });

  it("renders multiple children", () => {
    const wrapper = mount(
      <TransitionGroup>
        <div key="div-1" className="div-1" />
        <div key="div-2" className="div-2" />
      </TransitionGroup>,
    );

    expect(wrapper.find(".div-1")).toExist();
    expect(wrapper.find(".div-2")).toExist();
  });

  it("updates children over time", () => {
    jest.useFakeTimers();
    const wrapper = mount(
      <TransitionGroup>
        <div key="div-1" className="div-1" />
      </TransitionGroup>,
    );

    // Add a child
    wrapper.setProps({
      children: [
        <div key="div-1" className="div-1" />,
        <div key="div-2" className="div-2" />,
      ],
    });
    expect(wrapper.find(".div-1")).toExist();
    expect(wrapper.find(".div-2")).toExist();

    // Remove a child
    wrapper.setProps({
      children: [<div key="div-2" className="div-2" />],
    });
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find(".div-1")).not.toExist();
    expect(wrapper.find(".div-2")).toExist();
  });

  it("renders exiting children while they animate out", () => {
    jest.useFakeTimers();
    const wrapper = mount(
      <TransitionGroup>
        <div key="div-1" className="div-1" />
      </TransitionGroup>,
    );

    // Delete a child
    wrapper.setProps({ children: [] });
    wrapper.update();
    expect(wrapper.find(".div-1")).toExist();

    // Still animating out...
    jest.advanceTimersByTime(100);
    wrapper.update();
    expect(wrapper.find(".div-1")).toExist();

    // Finish animating out...
    jest.advanceTimersByTime(9999);
    wrapper.update();
    expect(wrapper.find(".div-1")).not.toExist();
  });

  it("still shows the same child if it is re-added during an exit animation", () => {
    jest.useFakeTimers();
    const wrapper = mount(
      <TransitionGroup>
        <div key="div-1" className="div-1" />
      </TransitionGroup>,
    );

    // Delete a child
    wrapper.setProps({ children: [] });
    wrapper.update();

    // Still animating out...
    jest.advanceTimersByTime(100);
    wrapper.update();

    // Re-add child while it is still animating out...
    wrapper.setProps({ children: [<div key="div-1" className="div-1" />] });
    jest.runAllTimers();
    wrapper.update();

    expect(wrapper.find(".div-1")).toExist();
  });

  it("filters out falsey children", () => {
    const wrapper = mount(
      <TransitionGroup component={<span className="my-wrapper-component" />}>
        {[false, null, undefined, <div key="div-1" className="div-1" />]}
      </TransitionGroup>,
    );

    const children = wrapper.find(".my-wrapper-component").children();

    expect(children.length).toBe(1);
  });
});
