import { setupShallowTest } from "../../tests/helpers";
import { Typeset } from "./component";

const setupShallow = setupShallowTest(Typeset);

describe("Typeset", () => {
  it("renders typeset component with only required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });
});
