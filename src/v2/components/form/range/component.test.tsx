import { createMountWrapperFactory } from "tachyon-test-utils";
import { setupShallowTest } from "../../../tests/helpers";
import {
  Range,
  RangeComponent,
  RangePropsBase,
  RangePropsFilled,
  RangePropsUnfilled,
} from "./component";

function getOptionalProps(): RangePropsBase {
  return {
    disabled: true,
    error: true,
    id: "Test ID",
    name: "Test name",
    onBlur: jest.fn(),
    onChange: jest.fn(),
    onFocus: jest.fn(),
    max: 100,
    min: 0,
    step: 10,
    tabIndex: 0,
  };
}

function getUnfilledOptionalProps(): RangePropsUnfilled {
  return {
    ...getOptionalProps(),
    defaultValue: "2",
    value: "2",
  };
}

function getFillProps(): RangePropsFilled {
  return {
    ...getOptionalProps(),
    fill: true,
    max: 100,
    min: 0,
    step: 10,
    value: "8",
  };
}

const setupShallow = setupShallowTest(RangeComponent);

const setupMount = createMountWrapperFactory(Range);

describe("Range", () => {
  describe("unfilled", () => {
    it("renders range component with required props", () => {
      const { wrapper } = setupMount();
      expect(wrapper.find("input")).toExist();
      expect(wrapper).toMatchSnapshot();
    });

    it("renders range component with all props", () => {
      const { wrapper } = setupMount(getUnfilledOptionalProps());
      expect(wrapper.find("input")).toExist();
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("filled", () => {
    it("renders range component with correct fill percentage", () => {
      const { wrapper } = setupMount(getFillProps());

      expect(wrapper.find("input")).toExist();

      expect(
        wrapper
          .find({
            "data-test-selector": "tw-range__fill-value-selector",
          })
          .hostNodes()
          .props().style,
      ).toEqual({ width: "8.00%" });
    });

    it("renders range component with correct fill percentage with offset min/max", () => {
      const { wrapper } = setupShallow({
        ...getFillProps(),
        max: 10,
        min: 3,
        step: 1,
        value: "6",
      });

      expect(
        wrapper
          .find({
            "data-test-selector": "tw-range__fill-value-selector",
          })
          .props().style,
      ).toEqual({ width: "42.86%" });
    });

    it("renders range component with correct fill percentage with decimal value", () => {
      const { wrapper } = setupShallow({
        ...getFillProps(),
        max: 1,
        min: 0.5,
        step: 0.1,
        value: "0.6",
      });

      expect(
        wrapper
          .find({
            "data-test-selector": "tw-range__fill-value-selector",
          })
          .props().style,
      ).toEqual({ width: "20.00%" });
    });
  });
});
