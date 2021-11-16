import { mount } from "enzyme";
import { setupShallowTest } from "../../../tests/helpers";
import { FormLegend, FormLegendProps } from "./component";

function getRequiredProps(): FormLegendProps {
  return {
    label: "Test Legend",
  };
}

function getOptionalProps(): FormLegendProps {
  return {
    label: "Test Legend",
    required: true,
  };
}

const setupShallow = setupShallowTest(FormLegend, getRequiredProps);

describe("Legend", () => {
  it("renders form legend component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders form legend component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders form legend component as a legend element", () => {
    const wrapper = mount(<FormLegend {...getOptionalProps()} />);
    expect(wrapper.find("legend")).toExist();
  });
});
