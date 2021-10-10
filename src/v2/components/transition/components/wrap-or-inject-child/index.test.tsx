import { createMountWrapperFactory } from "tachyon-test-utils";
import { WrapOrInjectChild } from ".";

const setupMount = createMountWrapperFactory(WrapOrInjectChild, () => ({
  children: null,
}));

describe("WrapOrInjectChild", () => {
  it("injects props onto a provided child node when configured", () => {
    const CHILD_SELECTOR = "transition-test-child";

    const { wrapper } = setupMount({
      injectChild: true,
      children: <span data-test-selector={CHILD_SELECTOR}>Some Child</span>,
      title: "Hello World",
    });

    expect(wrapper.find({ title: "Hello World" })).toExist();
    expect(
      wrapper.find({ "data-test-selector": CHILD_SELECTOR }).prop("title"),
    ).toBe("Hello World");
  });

  it("does not inject props onto a provided child node by default", () => {
    const CHILD_SELECTOR = "transition-test-child";

    const { wrapper } = setupMount({
      children: <span data-test-selector={CHILD_SELECTOR}>Some Child</span>,
      title: "Hello World",
    });

    expect(wrapper.find({ title: "Hello World" })).toExist();
    expect(
      wrapper.find({ "data-test-selector": CHILD_SELECTOR }).prop("title"),
    ).toBe(undefined);
  });

  it("preserves the original ref when injecting on child nodes", () => {
    const myRefHandler = jest.fn();

    setupMount({
      injectChild: true,
      children: <span ref={myRefHandler}>Some Child</span>,
    });

    expect(myRefHandler).toHaveBeenCalled();
  });

  it("prefers the wrapper ref when there are two refs on an injected child", () => {
    const wrapperRefHandler = jest.fn();
    const childRefHandler = jest.fn();

    setupMount({
      ref: wrapperRefHandler,
      injectChild: true,
      children: <span ref={childRefHandler}>Some Child</span>,
    });

    expect(wrapperRefHandler).toHaveBeenCalled();
    expect(childRefHandler).not.toHaveBeenCalled();
  });

  it("calls both refs when not injecting on the child", () => {
    const wrapperRefHandler = jest.fn();
    const childRefHandler = jest.fn();

    setupMount({
      ref: wrapperRefHandler,
      injectChild: false,
      children: <span ref={childRefHandler}>Some Child</span>,
    });

    expect(wrapperRefHandler).toHaveBeenCalled();
    expect(childRefHandler).toHaveBeenCalled();
  });
});
