import { CoreInteractive, CoreInteractiveProps } from "./component";
import { Link, MemoryRouter } from "react-router-dom";
import { mount, shallow } from "enzyme";

import { setupShallowTest } from "../../tests/helpers";

const setupShallow = setupShallowTest(CoreInteractive);
describe("CoreInteractive", () => {
  it("renders core interactive component defaulting as <button>", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders core interactive component with all (non-custom link) props as a disabled <button>", () => {
    const { wrapper } = setupShallow({
      autoFocus: true,
      className: "myClass",
      children: "text",
      disabled: true,
      disabledInteraction: true,
      download: "download",
      linkTo: "https://example.com",
      onClick: jest.fn(),
      onDoubleClick: jest.fn(),
      onContextMenu: jest.fn(),
      refHandler: jest.fn(),
      role: "link",
      tabIndex: 1,
      targetBlank: true,
      rel: "external",
      title: "test title",
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("renders disabled core interactive as a disabled <button>", () => {
    const { wrapper } = setupShallow({
      disabled: true,
      disabledInteraction: false,
    });

    expect(wrapper.find("button")).toHaveProp("disabled", true);
  });

  it("renders disabledInteraction core interactive as a disabled <button>", () => {
    const { wrapper } = setupShallow({
      disabled: false,
      disabledInteraction: true,
    });

    expect(wrapper.find("button")).toHaveProp("disabled", true);
  });

  it("sets the disabled attribute to undefined and not the string false when disabled", () => {
    const { wrapper } = setupShallow({
      disabled: false,
      disabledInteraction: false,
    });

    expect(wrapper.find("button")).toHaveProp("disabled", undefined);
  });

  it("renders core interactive component with linkTo, title, and targetBlank props as <a>", () => {
    const { wrapper } = setupShallow({
      children: "text",
      linkTo: "https://example.com",
      title: "test title",
      targetBlank: true,
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("renders core interactive component with linkTo, download, and non-disabled props as <a>", () => {
    const { wrapper } = setupShallow({
      children: "text",
      linkTo: "https://example.com",
      download: "download",
      disabled: false,
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("renders core interactive component with internal linkTo and non-disabled props as react-router Link component", () => {
    const { wrapper } = setupShallow({
      children: "text",
      linkTo: "/somewhere",
      title: "test title",
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("renders a core interactive component and passes the replace prop to react-router Link", () => {
    const { wrapper } = setupShallow({
      children: "text",
      linkTo: "/somewhere",
      replace: true,
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("calls the original onClick when renderLink onClick is called", () => {
    const mockOnClick = jest.fn();
    const mockRenderLink = jest.fn().mockReturnValue("this could be anything");
    const props: CoreInteractiveProps = {
      onClick: mockOnClick,
      linkTo: "home",
      renderLink: mockRenderLink,
    };

    setupShallow(props);
    const mockEventData = { test: "foobar" };
    mockRenderLink.mock.calls[0][0].onClick(mockEventData);
    expect(mockOnClick).toHaveBeenCalledWith(mockEventData);
  });

  it("renders core interactive component with renderLink and internal linkTo props as custom link component with filtered props", () => {
    const renderLink = jest.fn().mockReturnValue("this could be anything");
    const props: CoreInteractiveProps = {
      "aria-label": "My aria lable",
      className: "myClass",
      download: "download",
      linkTo: "home",
      role: "link",
      tabIndex: 1,
      title: "test title",
    };

    const { wrapper } = setupShallow({ renderLink, ...props });
    expect(wrapper).toMatchSnapshot();
    expect(renderLink).toHaveBeenCalledWith(props);
  });

  it("transforms target and rel before passing them to renderLink", () => {
    const props: CoreInteractiveProps = {
      rel: "external",
      targetBlank: true,
      linkTo: "home",
      renderLink: jest.fn().mockReturnValue("this could be anything"),
    };

    setupShallow(props);
    expect(props.renderLink).toHaveBeenCalledWith(
      expect.objectContaining({
        target: "_blank",
        rel: expect.stringContaining("external"),
      }),
    );
  });

  it("renders the right value for the rel attribute", () => {
    const { wrapper } = setupShallow({
      linkTo: "www.twitch.tv",
      rel: "nofollow",
    });

    expect(wrapper.prop("rel")).toContain("nofollow");
  });

  it("renders the right value for the rel attribute for targetBlank", () => {
    const { wrapper } = setupShallow({
      linkTo: "www.twitch.tv",
      targetBlank: true,
    });

    expect(wrapper.prop("rel")).toMatch("noopener noreferrer");
  });

  it("adds noopener noreferrer to any links with targetBlank props and no rel", () => {
    const { wrapper } = setupShallow({
      linkTo: "https://someMaliciousSite.gov",
      targetBlank: true,
    });
    expect(wrapper.find("a").props().rel!.includes("noopener noreferrer")).toBe(
      true,
    );
  });

  it("appends noopener noreferrer to any links with targetBlank props and a rel defined", () => {
    const { wrapper } = setupShallow({
      linkTo: "https://someMaliciousSite.gov",
      targetBlank: true,
      rel: "custom",
    });
    expect(
      wrapper.find("a").props().rel!.includes("custom noopener noreferrer"),
    ).toBe(true);
  });

  it("fires the double click callback", () => {
    const callback = jest.fn();
    const { wrapper } = setupShallow({
      onDoubleClick: callback,
    });
    wrapper.simulate("doubleclick");
    expect(callback).toHaveBeenCalled();
  });

  it("fires the context menu callback", () => {
    const callback = jest.fn();
    const { wrapper } = setupShallow({
      onContextMenu: callback,
    });
    wrapper.simulate("contextmenu");
    expect(callback).toHaveBeenCalled();
  });

  it("fires mouseenter callback", () => {
    const callback = jest.fn();
    const { wrapper } = setupShallow({
      onMouseEnter: callback,
    });
    wrapper.simulate("mouseenter");
    expect(callback).toHaveBeenCalled();
  });

  it("fires mouseleave callback", () => {
    const callback = jest.fn();
    const { wrapper } = setupShallow({
      onMouseLeave: callback,
    });
    wrapper.simulate("mouseleave");
    expect(callback).toHaveBeenCalled();
  });

  it("fires focus callback", () => {
    const callback = jest.fn();
    const { wrapper } = setupShallow({
      onFocus: callback,
    });
    wrapper.simulate("focus");
    expect(callback).toHaveBeenCalled();
  });

  it("fires blur callback", () => {
    const callback = jest.fn();
    const { wrapper } = setupShallow({
      onBlur: callback,
    });
    wrapper.simulate("blur");
    expect(callback).toHaveBeenCalled();
  });

  it("gracefully handles fully-qualified URLs as part of a LocationDescriptor", () => {
    const { wrapper } = setupShallow({
      linkTo: {
        pathname: "https://inspector.twitch.tv",
      },
    });

    expect(wrapper.find("a")).toHaveProp("href", "https://inspector.twitch.tv");
  });

  describe("ref forwarding", () => {
    it.each([
      { linkTo: "https://www.google.com" }, // tests <a>
      { linkTo: "/foo/bar" }, // tests <Link>
      { onClick: () => null }, // tests <button>
    ])("calls refHandler with props %o", (props) => {
      const myCallback = jest.fn();
      mount(
        <MemoryRouter>
          <CoreInteractive {...props} refHandler={myCallback} />
        </MemoryRouter>,
      );
      expect(myCallback).toHaveBeenCalled();
    });

    it.each([
      { linkTo: "https://www.google.com" }, // tests <a>
      { linkTo: "/foo/bar" }, // tests <Link>
      { onClick: () => null }, // tests <button>
    ])("calls ref with props %o", (props) => {
      const myCallback = jest.fn();
      mount(
        <MemoryRouter>
          <CoreInteractive {...props} ref={myCallback} />
        </MemoryRouter>,
      );
      expect(myCallback).toHaveBeenCalled();
    });

    it.each([
      { linkTo: "https://www.google.com" }, // tests <a>
      { linkTo: "/foo/bar" }, // tests <Link>
      { onClick: () => null }, // tests <button>
    ])(
      "prefers ref over refHandler if both are provided with props %o",
      (props) => {
        const firstCallback = jest.fn();
        const secondCallback = jest.fn();
        mount(
          <MemoryRouter>
            <CoreInteractive
              {...props}
              ref={firstCallback}
              refHandler={secondCallback}
            />
          </MemoryRouter>,
        );
        expect(firstCallback).toHaveBeenCalled();
        expect(secondCallback).not.toHaveBeenCalled();
      },
    );

    it.each([
      { linkTo: "https://www.google.com" }, // tests <a>
      { linkTo: "/foo/bar" }, // tests <Link>
      { onClick: () => null }, // tests <button>
    ])(
      "Does not apply refHandler prop onto the underlying DOM node, with props %o",
      (props) => {
        const wrapper = mount(
          <MemoryRouter>
            <CoreInteractive {...props} refHandler={jest.fn()} />
          </MemoryRouter>,
        );

        const anchorTag = wrapper.find("a");
        if (anchorTag.length > 0) {
          expect(anchorTag.prop("refHandler")).toBe(undefined);
        }

        const buttonTag = wrapper.find("button");
        if (buttonTag.length > 0) {
          expect(buttonTag.prop("refHandler")).toBe(undefined);
        }
      },
    );
  });

  describe("href safety", () => {
    it("renders a <Link> with the href given internal URL with allowed http protocol", () => {
      const { wrapper } = setupShallow({
        linkTo: "test",
      });

      expect(wrapper.find("Link")).toHaveProp("to", "test");
    });

    it("renders a <Link> with the href given internal URL with allowed other protocol", () => {
      const { wrapper } = setupShallow({
        linkTo: "intent:test",
      });

      expect(wrapper.find("Link")).toHaveProp("to", "intent:test");
    });

    it("renders an <a> with the href given external URL with allowed protocol", () => {
      const { wrapper } = setupShallow({
        linkTo: "http://www.google.com/test",
      });

      expect(wrapper.find("a")).toHaveProp(
        "href",
        "http://www.google.com/test",
      );
    });

    it("renders an <a> with the href given mailto url", () => {
      const { wrapper } = setupShallow({
        linkTo: "mailto:realstreet@buttery.com",
      });

      expect(wrapper.find("a")).toHaveProp(
        "href",
        "mailto:realstreet@buttery.com",
      );
    });

    it("renders a <Link> with blank href given internal URL with dangerous protocol", () => {
      const { wrapper } = setupShallow({
        linkTo: "javascript:test",
      });

      expect(wrapper.find("Link")).toHaveProp("to", "");
    });

    it("renders an <a> with blank href given external URL with dangerous protocol", () => {
      const { wrapper } = setupShallow({
        linkTo: "file://test",
      });

      expect(wrapper.find("a")).toHaveProp("href", "");
    });
  });

  it("passes aria props to the anchor", () => {
    const wrapper = shallow(
      <CoreInteractive
        aria-label="View on Twitch"
        linkTo="https://twitch.tv"
      />,
    );
    const element = wrapper.find("a").first();
    expect(element.prop("aria-label")).toBe("View on Twitch");
  });

  it("passes aria props to the Link", () => {
    const wrapper = shallow(
      <CoreInteractive aria-label="Watch Channel" linkTo="/channel" />,
    );
    const element = wrapper.find(Link).first();
    expect(element.prop("aria-label")).toBe("Watch Channel");
  });

  it("passes aria props to the button", () => {
    const wrapper = shallow(<CoreInteractive aria-label="Some Action" />);
    const element = wrapper.find("button").first();
    expect(element.prop("aria-label")).toBe("Some Action");
  });
});
