import { setupShallowTest } from "../../tests/helpers";
import { Background } from "../layout";
import {
  ChannelStatusTextIndicatorComponent,
  ChannelStatusTextIndicatorProps,
  ChannelStatusTextIndicatorSize,
  ChannelStatusTextIndicatorType,
} from "./component";

function getRequiredProps(): ChannelStatusTextIndicatorProps {
  return {
    label: "Test label",
  };
}

function getOptionalProps(): ChannelStatusTextIndicatorProps {
  return {
    label: "Test label",
    size: ChannelStatusTextIndicatorSize.Large,
    type: ChannelStatusTextIndicatorType.Hosting,
    overlay: true,
    mask: Background.AccentAlt2,
  };
}

const setupShallow = setupShallowTest(ChannelStatusTextIndicatorComponent);

describe("ChannelStatusTextIndicator", () => {
  it("renders channel status text indicator component with required props", () => {
    const { wrapper } = setupShallow(getRequiredProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders channel status text indicator component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
