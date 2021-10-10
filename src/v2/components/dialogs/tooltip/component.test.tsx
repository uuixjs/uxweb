import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { Tooltip } from "./component";

const querySelectorSpy = jest.spyOn(document, "querySelector");

describe(Tooltip, () => {
  beforeEach(() => {
    querySelectorSpy.mockReset();
    querySelectorSpy.mockReturnValue(null);
    jest.useFakeTimers();
  });

  afterAll(() => {
    querySelectorSpy.mockRestore();
  });

  it("shows children when the tooltip is not visible", () => {
    const selector = {
      "data-test-selector": "my-test-content",
    };
    const wrapper = mount(
      <Tooltip label="My Label">
        <div {...selector} />
      </Tooltip>,
    );
    expect(wrapper.find(selector)).toExist();
  });

  it("Allows aria-describedby to be set directly", () => {
    const customDescribedBy = "#some-unique-id";
    const wrapper = mount(
      <Tooltip label="My Label">
        <div aria-describedby={customDescribedBy} />
      </Tooltip>,
    );

    expect(wrapper.find({ "aria-describedby": customDescribedBy })).toExist();
  });

  it("Sets aria-describedby automatically if not provided", () => {
    const wrapper = mount(
      <Tooltip label="My Label">
        <div />
      </Tooltip>,
    );

    expect(wrapper.find("[aria-describedby]")).toExist();
  });

  it("Doesn't set aria-describedby when label matches aria-label", () => {
    const wrapper = mount(
      <Tooltip label="My Label">
        <button aria-label="My Label" />
      </Tooltip>,
    );

    expect(wrapper.find("[aria-describedby]")).not.toExist();
  });

  it("shows the tooltip on mouse hover and hides it on mouse leave", async () => {
    const tooltipSelector = {
      "data-test-selector": "my-test-tooltip",
    };

    const wrapper = mount(
      <Tooltip label={<div {...tooltipSelector} />}>
        <div />
      </Tooltip>,
    );

    const anchorDiv = wrapper.find("div").first();

    await act(async () => {
      anchorDiv.simulate("mouseenter");
      jest.runAllTimers();
      wrapper.update();
    });

    expect(wrapper.find(tooltipSelector)).toExist();

    await act(async () => {
      anchorDiv.simulate("mouseleave");
      jest.runAllTimers();
      wrapper.update();
    });

    expect(wrapper.find(tooltipSelector)).not.toExist();
  });

  it("shows the tooltip on keyboard focus and hides it on keyboard blur", async () => {
    const tooltipSelector = {
      "data-test-selector": "my-test-tooltip",
    };

    const wrapper = mount(
      <Tooltip label={<div {...tooltipSelector} />}>
        <div />
      </Tooltip>,
    );

    const anchorDiv = wrapper.find("div").first();

    await act(async () => {
      anchorDiv.simulate("focus");
      jest.runAllTimers();
      wrapper.update();
    });

    expect(wrapper.find(tooltipSelector)).toExist();

    await act(async () => {
      anchorDiv.simulate("blur");
      jest.runAllTimers();
      wrapper.update();
    });

    expect(wrapper.find(tooltipSelector)).not.toExist();
  });

  it("uses a debounce and does not show tooltip before `enterDelay` has elapsed", async () => {
    const tooltipSelector = {
      "data-test-selector": "my-test-tooltip",
    };

    const testDelayValue = 1000;

    const wrapper = mount(
      <Tooltip label={<div {...tooltipSelector} />} enterDelay={testDelayValue}>
        <div />
      </Tooltip>,
    );

    const anchorDiv = wrapper.find("div").first();

    await act(async () => {
      anchorDiv.simulate("mouseenter");
      jest.advanceTimersByTime(testDelayValue - 100); // any number of ms less than the debounce timer
      wrapper.update();
    });

    // Only a few ms elapsed; it should not exist yet
    expect(wrapper.find(tooltipSelector)).not.toExist();

    await act(async () => {
      anchorDiv.simulate("mouseleave");
      jest.runAllTimers();
      wrapper.update();
    });

    // It should never open
    expect(wrapper.find(tooltipSelector)).not.toExist();
  });

  it("does not show the tooltip when disabled but still tracks interactions", async () => {
    const tooltipSelector = {
      "data-test-selector": "my-test-tooltip",
    };
    const childSelector = {
      "data-test-selector": "my-child-node",
    };

    const wrapper = mount(
      <Tooltip disabled label={<div {...tooltipSelector} />}>
        <div {...childSelector} />
      </Tooltip>,
    );

    const anchorDiv = wrapper.find("div").first();

    // mouseEnter will set internal state "show" to true, but tooltip is still hidden because of "disabled"
    await act(async () => {
      anchorDiv.simulate("mouseenter");
      jest.runAllTimers();
      wrapper.update();
    });

    expect(wrapper.find(childSelector)).toExist();
    expect(wrapper.find(tooltipSelector)).not.toExist();

    // Once "disabled" is set to false, the tooltip should be visible because of the previous mouseEnter event
    await act(async () => {
      wrapper.setProps({ disabled: false });
      jest.runAllTimers();
      wrapper.update();
    });

    expect(wrapper.find(childSelector)).toExist();
    expect(wrapper.find(tooltipSelector)).toExist();
  });

  it("displays the tooltip when `showAlways` is set", async () => {
    const tooltipSelector = {
      "data-test-selector": "my-test-tooltip",
    };

    const wrapper = mount(
      <Tooltip label={<div {...tooltipSelector} />} show>
        <div />
      </Tooltip>,
    );

    expect(wrapper.find(tooltipSelector)).toExist();
  });

  it("prevents showing the tooltip when focus-visible is loaded and a mouse click triggers focus", async () => {
    const tooltipSelector = {
      "data-test-selector": "my-test-tooltip",
    };

    const wrapper = mount(
      <Tooltip label={<div {...tooltipSelector} />}>
        <div />
      </Tooltip>,
    );

    querySelectorSpy
      .mockReturnValueOnce(document.createElement("div"))
      .mockReturnValueOnce(null);

    const anchorDiv = wrapper.find("div").first();

    await act(async () => {
      anchorDiv.simulate("focus");
      jest.runAllTimers();
      wrapper.update();
    });

    expect(wrapper.find(tooltipSelector)).not.toExist();
  });
});
