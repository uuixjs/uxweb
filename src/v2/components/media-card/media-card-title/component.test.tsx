import { shallow } from "enzyme";
import { CoreLink } from "../../core-link";
import { MediaCardTitle } from "./component";

describe("MediaCardTitle", () => {
  it("renders a link when given linkTo", () => {
    const wrapper = shallow(<MediaCardTitle linkTo="#">Hello</MediaCardTitle>);
    expect(wrapper.find(CoreLink).length).toBe(1);
  });

  it("renders a link when given onClick", () => {
    const wrapper = shallow(
      <MediaCardTitle onClick={() => null}>Hello</MediaCardTitle>,
    );
    expect(wrapper.find(CoreLink).length).toBe(1);
  });

  it("does not render link with no link props", () => {
    const wrapper = shallow(<MediaCardTitle>Hello</MediaCardTitle>);
    expect(wrapper.find(CoreLink).length).toBe(0);
  });

  it("renders a badge", () => {
    const wrapper = shallow(
      <MediaCardTitle badge={<div id="my-badge" />}>Hello</MediaCardTitle>,
    );
    expect(wrapper.find("#my-badge").length).toBe(1);
  });
});
