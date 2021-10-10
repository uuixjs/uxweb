import { setupShallowTest } from "../../../tests/helpers";
import { ChannelStatusIndicatorStatus } from "../../channel-status-indicator";
import { Background } from "../../layout";
import { AvatarHalo, AvatarHaloProps } from "./component";

function getOptionalProps(): AvatarHaloProps {
  return {
    background: Background.Inherit,
    children: "child",
    indicator: "indicator",
    size: 64,
    status: ChannelStatusIndicatorStatus.Offline,
  };
}

const setupShallow = setupShallowTest(AvatarHalo);

describe("AvatarHalo", () => {
  it("renders AvatarHalo component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders AvatarHalo component with all type prop as a span", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
