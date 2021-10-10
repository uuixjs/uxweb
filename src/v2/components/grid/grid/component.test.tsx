import { setupShallowTest } from "../../../tests/helpers";
import { AlignItems, JustifyContent } from "../../layout";
import { Grid, GridGutterSize, GridProps } from "./component";

function getOptionalProps(): GridProps {
  return {
    gutterSize: GridGutterSize.Medium,
    fullHeight: true,
    breakpointExtraSmall: {
      justifyContent: JustifyContent.Between,
      alignItems: AlignItems.Start,
    },
    breakpointSmall: {
      justifyContent: JustifyContent.End,
      alignItems: AlignItems.Stretch,
    },
    breakpointMedium: {
      justifyContent: JustifyContent.Center,
      alignItems: AlignItems.End,
    },
    breakpointLarge: {
      justifyContent: JustifyContent.Around,
      alignItems: AlignItems.Center,
    },
    breakpointExtraLarge: {
      justifyContent: JustifyContent.Start,
      alignItems: AlignItems.Baseline,
    },
    breakpointExtraExtraLarge: {
      justifyContent: JustifyContent.Between,
      alignItems: AlignItems.Start,
    },
  };
}

const setupShallow = setupShallowTest(Grid);

describe("Grid", () => {
  it("renders grid component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders grid component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
