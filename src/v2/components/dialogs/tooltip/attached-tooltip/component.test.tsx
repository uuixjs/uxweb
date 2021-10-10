import { setupShallowTest } from "../../../../tests/helpers";
import { Display } from "../../../layout";
import {
  AttachedTooltip,
  AttachedTooltipProps,
  TooltipAlign,
  TooltipDirection,
} from "./component";

function getRequiredProps(): AttachedTooltipProps {
  return {
    label: "Test label",
    id: "test-id",
  };
}

function getOptionalProps(): AttachedTooltipProps {
  return {
    align: TooltipAlign.Center,
    direction: TooltipDirection.Left,
    display: Display.Inline,
    label: "Test label",
    id: "test-id",
    show: true,
    width: 100,
    offsetX: "-20px",
    offsetY: "-20px",
    title: "Test title",
  };
}

const setupShallow = setupShallowTest(AttachedTooltip);

describe("Tooltip", () => {
  it("renders tooltip component with only required props", () => {
    const { wrapper } = setupShallow(getRequiredProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders tooltip component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("does not render tooltip if disabled", () => {
    const { wrapper } = setupShallow({ ...getRequiredProps(), disabled: true });
    expect(wrapper).toMatchSnapshot();
  });
});
