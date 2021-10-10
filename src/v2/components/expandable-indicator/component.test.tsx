import { setupShallowTest } from "../../tests/helpers";
import {
  ExpandableIndicator,
  ExpandableIndicatorDirection,
  ScExpandableIndicator,
} from "./component";

const setupShallow = setupShallowTest(ExpandableIndicator);

describe("ExpandableIndicator", () => {
  it("defaults to right/down", () => {
    const { wrapper } = setupShallow();
    expect(wrapper.find(ScExpandableIndicator).prop("direction")).toBe(
      ExpandableIndicatorDirection.Right,
    );
    wrapper.setProps({ open: true });
    expect(wrapper.find(ScExpandableIndicator).prop("direction")).toBe(
      ExpandableIndicatorDirection.Down,
    );
  });

  it("sets classnames properly", () => {
    const { wrapper } = setupShallow();

    wrapper.setProps({
      open: false,
      openDirection: ExpandableIndicatorDirection.Up,
      closedDirection: ExpandableIndicatorDirection.Left,
    });

    expect(wrapper.find(ScExpandableIndicator).prop("direction")).toBe(
      ExpandableIndicatorDirection.Left,
    );
    expect(wrapper.find(ScExpandableIndicator).prop("direction")).not.toBe(
      ExpandableIndicatorDirection.Up,
    );
    wrapper.setProps({ open: true });
    expect(wrapper.find(ScExpandableIndicator).prop("direction")).toBe(
      ExpandableIndicatorDirection.Up,
    );
    expect(wrapper.find(ScExpandableIndicator).prop("direction")).not.toBe(
      ExpandableIndicatorDirection.Left,
    );

    wrapper.setProps({
      open: false,
      openDirection: ExpandableIndicatorDirection.Right,
      closedDirection: ExpandableIndicatorDirection.Up,
    });

    expect(wrapper.find(ScExpandableIndicator).prop("direction")).toBe(
      ExpandableIndicatorDirection.Up,
    );
    expect(wrapper.find(ScExpandableIndicator).prop("direction")).not.toBe(
      ExpandableIndicatorDirection.Right,
    );
    wrapper.setProps({ open: true });
    expect(wrapper.find(ScExpandableIndicator).prop("direction")).toBe(
      ExpandableIndicatorDirection.Right,
    );
    expect(wrapper.find(ScExpandableIndicator).prop("direction")).not.toBe(
      ExpandableIndicatorDirection.Up,
    );

    wrapper.setProps({
      open: false,
      openDirection: ExpandableIndicatorDirection.Down,
      closedDirection: ExpandableIndicatorDirection.Right,
    });

    expect(wrapper.find(ScExpandableIndicator).prop("direction")).toBe(
      ExpandableIndicatorDirection.Right,
    );
    expect(wrapper.find(ScExpandableIndicator).prop("direction")).not.toBe(
      ExpandableIndicatorDirection.Down,
    );
    wrapper.setProps({ open: true });
    expect(wrapper.find(ScExpandableIndicator).prop("direction")).toBe(
      ExpandableIndicatorDirection.Down,
    );
    expect(wrapper.find(ScExpandableIndicator).prop("direction")).not.toBe(
      ExpandableIndicatorDirection.Right,
    );

    wrapper.setProps({
      open: false,
      openDirection: ExpandableIndicatorDirection.Left,
      closedDirection: ExpandableIndicatorDirection.Down,
    });

    expect(wrapper.find(ScExpandableIndicator).prop("direction")).toBe(
      ExpandableIndicatorDirection.Down,
    );
    expect(wrapper.find(ScExpandableIndicator).prop("direction")).not.toBe(
      ExpandableIndicatorDirection.Left,
    );
    wrapper.setProps({ open: true });
    expect(wrapper.find(ScExpandableIndicator).prop("direction")).toBe(
      ExpandableIndicatorDirection.Left,
    );
    expect(wrapper.find(ScExpandableIndicator).prop("direction")).not.toBe(
      ExpandableIndicatorDirection.Down,
    );
  });
});
