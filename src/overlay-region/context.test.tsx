import { mount } from "enzyme";
import { createRef, forwardRef } from "react";
import { withOverlayContext } from "./context";

interface Props {}

const MyButtonComponent = forwardRef<HTMLButtonElement, Props>((_, ref) => {
  return <button ref={ref}>Hello World</button>;
});

MyButtonComponent.displayName = "MyButtonComponent";

const WrappedComponent = withOverlayContext<Props, HTMLButtonElement>(
  MyButtonComponent,
);

describe("withOverlayContext", () => {
  it("does not pass along a `forwardedRef` prop", () => {
    const wrapper = mount(<WrappedComponent />);

    expect(wrapper.find(MyButtonComponent).prop("forwardedRef")).toBe(
      undefined,
    );
  });

  it("sets the right ref value", () => {
    const myRef = createRef<HTMLButtonElement>();
    mount(<WrappedComponent ref={myRef} />);

    expect(myRef.current?.outerHTML).toEqual("<button>Hello World</button>");
  });

  it("matches a snapshot", () => {
    const wrapper = mount(<WrappedComponent />);

    expect(wrapper).toMatchInlineSnapshot(`
      <MyButton>
        <MyButtonComponent
          overlay={false}
        >
          <button>
            Hello World
          </button>
        </MyButtonComponent>
      </MyButton>
    `);
  });
});
