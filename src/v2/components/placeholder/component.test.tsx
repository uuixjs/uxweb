import {
  Placeholder,
  PlaceholderComponent,
  PlaceholderProps,
  ScPlaceholder,
} from "./component";

import { createMountWrapperFactory } from "tachyon-test-utils";
import { mount } from "enzyme";
import { rem } from "lib/ui-utils";
import { setupShallowTest } from "../../tests/helpers";

function getOptionalProps(): PlaceholderProps {
  return {
    lineCount: 2,
    overlay: true,
    height: 100,
    width: 100,
  };
}

const setupShallow = setupShallowTest(PlaceholderComponent);
const setupMount = createMountWrapperFactory(PlaceholderComponent);

describe("Placeholder", () => {
  it("renders placeholder component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders placeholder component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders placeholder component with data props", () => {
    const wrapper = mount(<Placeholder data-test-selector="test selector" />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders with custom height", () => {
    const HEIGHT = 100;
    const wrapper = mount(<Placeholder height={HEIGHT} />);
    const placeholder = wrapper.find(ScPlaceholder).find("span");

    expect(placeholder).toHaveStyleRule("min-height", "0", {
      modifier: "::before",
    });
    expect(placeholder).toHaveStyleRule("min-height", "0");
    expect(placeholder).toHaveStyleRule("height", rem(HEIGHT));
  });

  it("renders x number of placeholder lines", () => {
    const { wrapper } = setupMount({
      lineCount: 3,
    });
    expect(wrapper.find(ScPlaceholder).length).toEqual(3);
  });
});
