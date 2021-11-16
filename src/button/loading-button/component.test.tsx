import { mount, shallow } from "enzyme";
import { setupShallowTest } from "../../../tests/helpers";
import { CoreButton, CoreButtonSize } from "../core-button";
import {
  LoadingButton,
  LoadingButtonProps,
  LoadingStatus,
  ScLoader,
  ScLoadingSuccessButton,
} from "./component";

function getOptionalProps(): LoadingButtonProps {
  return {
    autoFocus: true,
    children: "Test Button",
    disabled: true,
    download: "Download all the things",
    fullWidth: true,
    linkTo: "/",
    onClick: jest.fn(),
    size: CoreButtonSize.Large,
    tabIndex: 0,
    targetBlank: true,
    title: "Test title",
  };
}

const setupShallow = setupShallowTest(LoadingButton);
describe("LoadingButton", () => {
  it("renders LoadingButton component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders LoadingButton component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("passes aria props to the element", () => {
    const wrapper = shallow(
      <LoadingButton aria-label="Some Action">Some Action</LoadingButton>,
    );
    const element = wrapper.find(CoreButton).first();
    expect(element.prop("aria-label")).toBe("Some Action");
  });

  it("renders a LoadingButton in a loading state", () => {
    const wrapper = mount(
      <LoadingButton
        loadingStatus={LoadingStatus.Loading}
        {...getOptionalProps()}
      ></LoadingButton>,
    );

    expect(wrapper.find(ScLoader)).toExist();
  });

  it("renders a LoadingButton in a success state", () => {
    const wrapper = mount(
      <LoadingButton
        loadingStatus={LoadingStatus.Success}
        {...getOptionalProps()}
      ></LoadingButton>,
    );

    expect(wrapper.find(ScLoadingSuccessButton)).toExist();
  });
});
