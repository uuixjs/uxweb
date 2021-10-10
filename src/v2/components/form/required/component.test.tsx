import { setupShallowTest } from "../../../tests/helpers";
import { FormRequired } from "./component";

const setupShallow = setupShallowTest(FormRequired);

describe("FormGroup", () => {
  it("renders form required component", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });
});
