import { Background, InjectLayout } from "../layout";
import { Callout, CalloutOrientation, CalloutProps } from "./component";

import { BorderRadius } from "lib";
import { CalloutActions } from ".";
import { CalloutMessage } from "./callout-message";
import { CoreDismissible } from "../core-dismissible";
import { CoreImage } from "../core-image";
import { PillType } from "../pill";
import { setupShallowTest } from "../../tests/helpers";

function getOptionalProps(): CalloutProps {
  return {
    elevation: 3,
    orientation: CalloutOrientation.Row,
    closeButton: {
      "aria-label": "Close",
      onClick: jest.fn(),
    },
    figure: (
      <InjectLayout borderRadius={BorderRadius.Rounded}>
        <CoreImage alt="" src="http://placehold.jp/30x30.png" />
      </InjectLayout>
    ),
    message: (
      <CalloutMessage
        title="This is My Feature Title that is Much Longer than Above"
        description="This is some descriptive text. A longer description with more content."
        inline={true}
        pill={{
          label: "NEW",
          type: PillType.Brand,
        }}
      />
    ),
    actions: (
      <CalloutActions
        primaryButton={{
          children: "Primary",
          linkTo: "#",
        }}
        secondaryButton={{
          children: "Secondary",
          linkTo: "#",
        }}
      />
    ),
  };
}

const setupShallow = setupShallowTest(Callout);
describe("Callout", () => {
  it("renders Callout component with composed children", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
  it("renders Callout component with all config props", () => {
    const { wrapper } = setupShallow({
      elevation: 2,
    });
    expect(wrapper).toMatchSnapshot();
  });
  it("renders Callout component with accent background", () => {
    const { wrapper } = setupShallow({
      elevation: 2,
      background: Background.Accent,
    });
    expect(wrapper).toMatchSnapshot();
  });
  it("renders a close button when Orientation is row", () => {
    const { wrapper } = setupShallow({
      orientation: CalloutOrientation.Row,
      closeButton: {
        "aria-label": "Close",
        onClick: jest.fn(),
      },
      message: "Test",
    });
    expect(wrapper.find(CoreDismissible)).toHaveLength(1);
  });
  it("renders a close button when Orientation is row", () => {
    const { wrapper } = setupShallow({
      orientation: CalloutOrientation.Column,
      closeButton: {
        "aria-label": "Close",
        onClick: jest.fn(),
      },
      message: "Test",
    });
    expect(wrapper.find(CoreDismissible)).toHaveLength(1);
  });
});
