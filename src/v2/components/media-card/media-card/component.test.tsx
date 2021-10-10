import { shallow } from "enzyme";
import { MediaCard } from "./component";

describe("MediaCard", () => {
  it("renders top level props", () => {
    const wrapper = shallow(
      <MediaCard image={<img id="my-image" />} meta={<div id="my-meta" />} />,
    );

    expect(wrapper.find("#my-meta").length).toBe(1);
    expect(wrapper.find("#my-image").length).toBe(1);
  });

  it("renders child object props", () => {
    const wrapper = shallow(
      <MediaCard>
        {{
          image: <img id="my-image" />,
          meta: <div id="my-meta" />,
        }}
      </MediaCard>,
    );

    expect(wrapper.find("#my-meta").length).toBe(1);
    expect(wrapper.find("#my-image").length).toBe(1);
  });

  it("prefers top level props over child object props", () => {
    const wrapper = shallow(
      <MediaCard image={<img id="top-image" />} meta={<div id="top-meta" />}>
        {{
          image: <img id="child-image" />,
          meta: <div id="child-meta" />,
        }}
      </MediaCard>,
    );

    expect(wrapper.find("#top-meta").length).toBe(1);
    expect(wrapper.find("#top-image").length).toBe(1);
    expect(wrapper.find("#child-meta").length).toBe(0);
    expect(wrapper.find("#child-image").length).toBe(0);
  });

  it("passes data- props to DOM node", () => {
    const wrapper = shallow(<MediaCard data-foo-bar="Hello World" />);

    expect(wrapper.find({ "data-foo-bar": "Hello World" })).toHaveLength(1);
  });

  it("passes aria- props to DOM node", () => {
    const wrapper = shallow(<MediaCard aria-label="This is a media card" />);

    expect(wrapper.find({ "aria-label": "This is a media card" })).toHaveLength(
      1,
    );
  });
});
