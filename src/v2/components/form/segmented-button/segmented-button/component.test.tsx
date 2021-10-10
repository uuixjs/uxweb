import { setupShallowTest } from "../../../../tests/helpers";
import { SegmentedButton } from "./component";

const setupShallow = setupShallowTest(SegmentedButton);

describe("SegmentedButton", () => {
  it("renders segmented button component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });
});
