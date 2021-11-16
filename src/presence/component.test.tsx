import { setupShallowTest } from "../../tests/helpers";
import { Presence, PresenceProps, PresenceStatus } from "./component";

function getOptionalProps(): PresenceProps {
  return {
    status: PresenceStatus.Online,
    border: true,
  };
}

const setupShallow = setupShallowTest(Presence);

describe("Presence", () => {
  it("renders presence component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders presence component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
