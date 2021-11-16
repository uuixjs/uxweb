import { setupShallowTest } from "../../tests/helpers";
import { DropZone, DropZoneProps } from "./component";

function getOptionalProps(): DropZoneProps {
  return {
    dragOver: true,
    error: true,
    disabled: true,
  };
}

const setupShallow = setupShallowTest(DropZone);

describe("DropZone", () => {
  it("renders drop zone component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders drop zone component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
