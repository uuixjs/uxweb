import { setupShallowTest } from "../../tests/helpers";
import {
  ChannelStatusIndicator,
  ChannelStatusIndicatorProps,
  ChannelStatusIndicatorSize,
  ChannelStatusIndicatorStatus,
} from "./component";

function getOptionalProps(): ChannelStatusIndicatorProps {
  return {
    size: ChannelStatusIndicatorSize.Medium,
    pulse: true,
    status: ChannelStatusIndicatorStatus.Live,
  };
}

const setupShallow = setupShallowTest(ChannelStatusIndicator);
describe("ChannelStatusIndicator", () => {
  it("renders channel status indicator component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders channel status indicator component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
