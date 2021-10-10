import { shallow } from "enzyme";
import { MediaCardLink } from "../media-card-link";
import { MediaCardTitle } from "../media-card-title";
import { MediaCardMeta } from "./component";

describe("MediaCardMeta", () => {
  it("renders top level props", () => {
    const wrapper = shallow(
      <MediaCardMeta
        image={<img id="my-image" />}
        actions={<div id="my-actions" />}
      />,
    );

    expect(wrapper.find("#my-actions").length).toBe(1);
    expect(wrapper.find("#my-image").length).toBe(1);
  });

  it("renders child object props", () => {
    const wrapper = shallow(
      <MediaCardMeta>
        {{
          image: <img id="my-image" />,
          actions: <div id="my-actions" />,
        }}
      </MediaCardMeta>,
    );

    expect(wrapper.find("#my-actions").length).toBe(1);
    expect(wrapper.find("#my-image").length).toBe(1);
  });

  it("prefers top level props over child object props", () => {
    const wrapper = shallow(
      <MediaCardMeta
        image={<img id="top-image" />}
        actions={<div id="top-actions" />}
      >
        {{
          image: <img id="child-image" />,
          actions: <div id="child-actions" />,
        }}
      </MediaCardMeta>,
    );

    expect(wrapper.find("#top-actions").length).toBe(1);
    expect(wrapper.find("#top-image").length).toBe(1);
    expect(wrapper.find("#child-actions").length).toBe(0);
    expect(wrapper.find("#child-image").length).toBe(0);
  });

  it("Accepts an object for title", () => {
    const wrapper = shallow(
      <MediaCardMeta title={{ children: "Hello World" }} />,
    );
    expect(wrapper.find(MediaCardTitle).length).toBe(1);
  });

  it("Accepts a string for title but still renders a MediaCardTitle", () => {
    const wrapper = shallow(<MediaCardMeta title={"Hello World"} />);
    expect(wrapper.find(MediaCardTitle).length).toBe(1);
  });

  it("Accepts any react node for a title", () => {
    const wrapper = shallow(
      <MediaCardMeta title={<div id="some-custom-title" />} />,
    );
    expect(wrapper.find("#some-custom-title").length).toBe(1);
  });

  it("Accepts an object for links", () => {
    const wrapper = shallow(
      <MediaCardMeta links={{ children: "My only link" }} />,
    );
    expect(wrapper.find(MediaCardLink).length).toBe(1);
  });

  it("Accepts an array of prop objects for links", () => {
    const wrapper = shallow(
      <MediaCardMeta
        links={[{ children: "My first link" }, { children: "My second link" }]}
      />,
    );
    expect(wrapper.find(MediaCardLink).length).toBe(2);
  });

  it("Accepts an array of react nodes for links", () => {
    const wrapper = shallow(
      <MediaCardMeta
        links={[<div id="link-id-1" key={1} />, <div id="link-id-2" key={2} />]}
      />,
    );
    expect(wrapper.find("#link-id-1").length).toBe(1);
    expect(wrapper.find("#link-id-2").length).toBe(1);
  });

  it("accepts a react node for menu", () => {
    const wrapper = shallow(<MediaCardMeta menu={<div id="my-menu" />} />);
    expect(wrapper.find("#my-menu").length).toBe(1);
  });
});
