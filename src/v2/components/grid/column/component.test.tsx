import { createMountWrapperFactory } from "tachyon-test-utils";
import { Column, ColumnOrder, ColumnProps } from "./component";

function getRequiredProps(): ColumnProps {
  return {
    cols: 6,
  };
}

function getNonBreakpointProps(): ColumnProps {
  return {
    cols: 3,
    offset: 6,
    order: ColumnOrder.First,
  };
}

function getBreakpointProps(): ColumnProps {
  return {
    cols: {
      default: 2,
      xs: 3,
      sm: 4,
      md: 5,
      lg: 6,
      xl: 7,
      xxl: 8,
    },
    offset: {
      default: 2,
      xs: 3,
      sm: 4,
      md: 5,
      lg: 6,
      xl: 7,
      xxl: 8,
    },
    order: {
      default: ColumnOrder.First,
      xs: ColumnOrder.Last,
      sm: ColumnOrder.First,
      md: ColumnOrder.Last,
      lg: ColumnOrder.First,
      xl: ColumnOrder.Last,
      xxl: ColumnOrder.First,
    },
  };
}

const setupMount = createMountWrapperFactory(Column, getRequiredProps);

describe("Column", () => {
  it("matches snapshot with required props", () => {
    const { wrapper } = setupMount();
    expect(wrapper).toMatchSnapshot();
  });

  it("matches snapshot with non-breakpoint props", () => {
    const { wrapper } = setupMount(getNonBreakpointProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("matches snapshot with breakpoint props", () => {
    const { wrapper } = setupMount(getBreakpointProps());
    expect(wrapper).toMatchSnapshot();
  });
});
