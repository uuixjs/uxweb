import { shallow } from "enzyme";
import { CoreLink } from "../../core-link";
import { HoverAccentEffect } from "../../hover-accent-effect";
import { MediaCardImage } from "./component";

const topLevelProps = {
  image: <img id="top-level-image" />,
  cover: <div id="top-level-cover" />,
  topLeft: <div id="top-level-topLeft" />,
  topRight: <div id="top-level-topRight" />,
  bottomLeft: <div id="top-level-bottomLeft" />,
  bottomRight: <div id="top-level-bottomRight" />,
};

const childObjectProps = {
  image: <img id="child-level-image" />,
  cover: <div id="child-level-cover" />,
  topLeft: <div id="child-level-topLeft" />,
  topRight: <div id="child-level-topRight" />,
  bottomLeft: <div id="child-level-bottomLeft" />,
  bottomRight: <div id="child-level-bottomRight" />,
};

describe("MediaCardImage", () => {
  it("renders top level props", () => {
    const wrapper = shallow(<MediaCardImage {...topLevelProps} />);

    expect(wrapper.find("#top-level-image").length).toBe(1);
    expect(wrapper.find("#top-level-cover").length).toBe(1);
    expect(wrapper.find("#top-level-topLeft").length).toBe(1);
    expect(wrapper.find("#top-level-topRight").length).toBe(1);
    expect(wrapper.find("#top-level-bottomLeft").length).toBe(1);
    expect(wrapper.find("#top-level-bottomRight").length).toBe(1);
  });

  it("renders child object props", () => {
    const wrapper = shallow(
      <MediaCardImage>{childObjectProps}</MediaCardImage>,
    );

    expect(wrapper.find("#child-level-image").length).toBe(1);
    expect(wrapper.find("#child-level-cover").length).toBe(1);
    expect(wrapper.find("#child-level-topLeft").length).toBe(1);
    expect(wrapper.find("#child-level-topRight").length).toBe(1);
    expect(wrapper.find("#child-level-bottomLeft").length).toBe(1);
    expect(wrapper.find("#child-level-bottomRight").length).toBe(1);
  });

  it("prefers top level props over child object props", () => {
    const wrapper = shallow(
      <MediaCardImage {...topLevelProps}>{childObjectProps}</MediaCardImage>,
    );

    expect(wrapper.find("#top-level-image").length).toBe(1);
    expect(wrapper.find("#top-level-cover").length).toBe(1);
    expect(wrapper.find("#top-level-topLeft").length).toBe(1);
    expect(wrapper.find("#top-level-topRight").length).toBe(1);
    expect(wrapper.find("#top-level-bottomLeft").length).toBe(1);
    expect(wrapper.find("#top-level-bottomRight").length).toBe(1);

    expect(wrapper.find("#child-level-image").length).toBe(0);
    expect(wrapper.find("#child-level-cover").length).toBe(0);
    expect(wrapper.find("#child-level-topLeft").length).toBe(0);
    expect(wrapper.find("#child-level-topRight").length).toBe(0);
    expect(wrapper.find("#child-level-bottomLeft").length).toBe(0);
    expect(wrapper.find("#child-level-bottomRight").length).toBe(0);
  });

  it("omits hover accent and core link when no linkProps provided", () => {
    const wrapper = shallow(<MediaCardImage {...topLevelProps} />);

    expect(wrapper.find(CoreLink)).not.toExist();
    expect(wrapper.find(HoverAccentEffect)).not.toExist();
  });

  it("adds hover accent when linkProps are provided", () => {
    const wrapper = shallow(
      <MediaCardImage
        {...topLevelProps}
        linkProps={{
          linkTo: "/",
        }}
      />,
    );

    expect(wrapper.find(CoreLink)).toExist();
    expect(wrapper.find(HoverAccentEffect)).toExist();
  });
});
