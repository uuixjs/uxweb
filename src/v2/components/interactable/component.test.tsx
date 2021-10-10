import {
  Interactable,
  InteractableProps,
  InteractableType,
  ScInteractableDefault,
  ScInteractableOverlay,
} from "./component";
import { Link, MemoryRouter } from "react-router-dom";

import { BorderRadius } from "lib/ui-utils";
import { CoreInteractive } from "../core-interactive";
import { OverlayRegion } from "../overlay-region";
import { mount } from "enzyme";

function getOptionalProps(): InteractableProps {
  return {
    variant: InteractableType.Alpha,
    disabled: true,
    hover: true,
    linkTo: "/",
    onClick: jest.fn(),
    selected: true,
    tabIndex: 0,
    targetBlank: true,
    title: "test title",
    borderRadius: {
      topLeft: BorderRadius.Medium,
      bottomRight: BorderRadius.None,
    },
  };
}

describe("Interactable", () => {
  it("renders interactable component with required props", () => {
    const wrapper = mount(<Interactable />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders interactable component with all props", () => {
    const wrapper = mount(<Interactable {...getOptionalProps()} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders interactable component as <button> with an onclick", () => {
    const wrapper = mount(<Interactable onClick={jest.fn()} />);
    expect(wrapper.find("button")).toHaveLength(1);
  });

  it("renders interactable component as <a>", () => {
    const wrapper = mount(<Interactable linkTo="https://www.google.com" />);
    expect(wrapper.find("a")).toHaveLength(1);
  });

  it("renders interactable component as Link component", () => {
    const wrapper = mount(
      <MemoryRouter>
        <Interactable linkTo="/" />
      </MemoryRouter>,
    );
    expect(wrapper.find(Link)).toHaveLength(1);
  });

  it("renders interactable component in overlay context", () => {
    const wrapper = mount(
      <OverlayRegion overlay>
        <Interactable />
      </OverlayRegion>,
    );
    expect(wrapper.find(ScInteractableOverlay)).toExist();
  });

  it("passes aria props to the element", () => {
    const wrapper = mount(<Interactable aria-label="Some Action" />);
    const element = wrapper.find(CoreInteractive).first();
    expect(element.prop("aria-label")).toBe("Some Action");
  });

  it("renders Inverted type as Default", () => {
    const wrapper = mount(
      <Interactable variant={InteractableType.Inverted}>Test</Interactable>,
    );
    expect(wrapper.find(ScInteractableDefault)).toExist();
  });

  it("renders Alpha types as Default", () => {
    const wrapper = mount(
      <Interactable variant={InteractableType.Alpha}>Test</Interactable>,
    );
    expect(wrapper.find(ScInteractableDefault)).toExist();
  });

  it("renders doesn't pass borderRadius to DOM", () => {
    const wrapper = mount(
      <Interactable borderRadius={BorderRadius.Rounded}>Test</Interactable>,
    );
    expect(wrapper.find("button")).not.toHaveProp("borderRadius");
  });
});
