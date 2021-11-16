import { mount } from "enzyme";
import { createMountWrapperFactory } from "tachyon-test-utils";
import { setupShallowTest } from "../../tests/helpers";
import { Transition, TransitionProps } from "./component";
import { TransitionType } from "./models";

const CHILD_SELECTOR = "transition-test-child";

function getRequiredProps(): TransitionProps {
  return {
    type: TransitionType.Fade,
    show: false,
    children: <span data-test-selector={CHILD_SELECTOR}>Some Child</span>,
  };
}

const setupShallow = setupShallowTest(Transition, getRequiredProps);
const setupMount = createMountWrapperFactory(Transition, getRequiredProps);

describe(Transition, () => {
  it("does not render children when not visible by default", () => {
    const { wrapper } = setupShallow({ show: false });
    expect(wrapper.find({ "data-test-selector": CHILD_SELECTOR }).length).toBe(
      0,
    );
  });

  it("renders children when visible by default", () => {
    const { wrapper } = setupShallow({ show: true });
    expect(wrapper.find({ "data-test-selector": CHILD_SELECTOR }).length).toBe(
      1,
    );
  });

  it("can be configured to alwaysRenderChildren", () => {
    const { wrapper } = setupShallow({ show: false, alwaysRenderChild: true });
    expect(wrapper.find({ "data-test-selector": CHILD_SELECTOR }).length).toBe(
      1,
    );
  });

  it("does not modify the child node by default", () => {
    const { wrapper } = setupShallow({ show: true });
    expect(
      wrapper.find({ "data-test-selector": CHILD_SELECTOR }),
    ).not.toHaveClassName("tw-transition");
  });

  it("can inject props onto child node if configured", () => {
    const { wrapper } = setupMount({ show: true, injectChild: true });

    expect(
      wrapper.find({ "data-test-selector": CHILD_SELECTOR }),
    ).toHaveClassName("tw-transition");
  });

  it("preserves the original ref when injecting on child nodes", () => {
    const myRefHandler = jest.fn();
    mount(
      <Transition type={TransitionType.Fade} show injectChild>
        <span ref={myRefHandler}>Some Child</span>
      </Transition>,
    );
    expect(myRefHandler).toHaveBeenCalled();
  });

  it("fires the enter and exit callback when show is toggled", () => {
    jest.useFakeTimers();
    const myEnterCallback = jest.fn();
    const myExitCallback = jest.fn();
    const { wrapper } = setupShallow({
      show: false,
      onEnterComplete: myEnterCallback,
      onExitComplete: myExitCallback,
    });
    // Mounted, not yet visible:
    expect(myEnterCallback).toHaveBeenCalledTimes(0);
    expect(myExitCallback).toHaveBeenCalledTimes(0);

    // Show the child:
    wrapper.setProps({ show: true });
    jest.runAllTimers();
    expect(myEnterCallback).toHaveBeenCalledTimes(1);
    expect(myExitCallback).toHaveBeenCalledTimes(0);

    // Hide the child:
    wrapper.setProps({ show: false });
    jest.runAllTimers();
    expect(myEnterCallback).toHaveBeenCalledTimes(1);
    expect(myExitCallback).toHaveBeenCalledTimes(1);
  });

  it("supports custom duration values", () => {
    const { wrapper } = setupShallow({
      show: true,
      duration: 5000,
    });

    // It starts visible
    expect(wrapper.find({ "data-test-selector": CHILD_SELECTOR })).toExist();

    // Hide it
    wrapper.setProps({ show: false });

    // Still visible at 4s
    jest.advanceTimersByTime(4000);
    expect(wrapper.find({ "data-test-selector": CHILD_SELECTOR })).toExist();

    // Not visible at 6s
    jest.advanceTimersByTime(2000);
    expect(
      wrapper.find({ "data-test-selector": CHILD_SELECTOR }),
    ).not.toExist();
  });

  it("supports custom delay values", () => {
    const { wrapper } = setupShallow({
      show: true,
      delay: 1000,
    });

    // It starts visible
    expect(wrapper.find({ "data-test-selector": CHILD_SELECTOR })).toExist();

    // Hide it
    wrapper.setProps({ show: false });

    // Still visible at 750ms (shouldn't have started transition)
    jest.advanceTimersByTime(750);
    expect(wrapper.find({ "data-test-selector": CHILD_SELECTOR })).toExist();

    // Not visible when transition completes
    jest.runAllTimers();
    expect(
      wrapper.find({ "data-test-selector": CHILD_SELECTOR }),
    ).not.toExist();
  });

  it("passes className to the DOM node", () => {
    const { wrapper } = setupMount({
      className: "my-example-class",
      show: true,
    });
    expect(wrapper.find("div")).toHaveClassName("my-example-class");
  });
});
