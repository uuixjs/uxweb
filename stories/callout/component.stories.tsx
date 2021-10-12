import * as React from "react";

import {
  AccentRegion,
  Avatar,
  Background,
  BorderRadius,
  Callout,
  CalloutActions,
  CalloutMessage,
  CalloutOrientation,
  InjectLayout,
  Layout,
  PillType,
  Title,
  TitleSize,
  generateAccentRegionProps,
} from "v2";

import { ColorPicker } from "../accent-region/story-components/color-picker";
import { ExampleAvatars } from "../assets";
import { useColorStorage } from "../accent-region/story-components/utils";

export default { title: "Callout" };

export const examples = () => {
  const onCloseButtonClick = () => alert("Close!");
  return (
    <>
      <Layout margin={{ y: 2 }} />
      <Callout message="hello" />
      <Layout margin={{ y: 2 }} />
      <Callout orientation={CalloutOrientation.Column} message="hello" />
      <Layout margin={{ y: 2 }} />
      <Callout
        orientation={CalloutOrientation.Column}
        message={<CalloutMessage />}
        actions={
          <CalloutActions
            primaryButton={{
              children: "Primary",
              linkTo: "#",
            }}
          />
        }
        closeButton={{
          "aria-label": "Close",
          onClick: onCloseButtonClick,
        }}
      />
      <Layout margin={{ y: 2 }} />
      <Callout
        orientation={CalloutOrientation.Column}
        message={
          <CalloutMessage
            title="This is My Feature"
            description="This is some descriptive text. "
          />
        }
        actions={
          <CalloutActions
            primaryButton={{
              children: "Primary",
              linkTo: "#",
            }}
          />
        }
        closeButton={{
          "aria-label": "Close",
          onClick: onCloseButtonClick,
        }}
      />
      <Layout margin={{ y: 2 }} />
      <Callout
        closeButton={{
          "aria-label": "Close",
          onClick: onCloseButtonClick,
        }}
        orientation={CalloutOrientation.Column}
        message={
          <CalloutMessage
            title="This is My Feature Title that is Much Longer than Above"
            description="This is some descriptive text. A longer description with more content."
            inline={true}
            pill={{
              label: "NEW",
              type: PillType.Brand,
            }}
          />
        }
        actions={
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
        }
      />
      <Layout margin={{ y: 2 }} />
      <Callout
        closeButton={{
          "aria-label": "Close",
          onClick: onCloseButtonClick,
        }}
        orientation={CalloutOrientation.Column}
        figure={
          <InjectLayout borderRadius={BorderRadius.Rounded}>
            <Avatar
              alt=""
              src={ExampleAvatars.drlupo}
              size={50}
              userLogin="drlupo"
            />
          </InjectLayout>
        }
        message={
          <CalloutMessage
            title="This is My Feature Title that is Much Longer than Above"
            description="This is some descriptive text. A longer description with more content."
            pill={{
              label: "NEW",
              type: PillType.Brand,
            }}
          />
        }
        actions={
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
        }
      />
      <Layout margin={{ y: 2 }} />
      <Callout
        closeButton={{
          "aria-label": "Close",
          onClick: onCloseButtonClick,
        }}
        orientation={CalloutOrientation.Column}
        figure={
          <Avatar
            alt=""
            src={ExampleAvatars.drlupo}
            size={50}
            userLogin="drlupo"
          />
        }
        message={
          <CalloutMessage
            title="This is My Feature Title that is Much Longer than Above"
            description="This is some descriptive text. A longer description with more content."
            inline={true}
            pill={{
              label: "NEW",
              type: PillType.Brand,
            }}
          />
        }
        actions={
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
        }
      />
      <Layout margin={{ y: 2 }} />
      <Callout
        orientation={CalloutOrientation.Row}
        message={
          <CalloutMessage
            title="This is My Feature"
            pill={{
              label: "NEW",
              type: PillType.Brand,
            }}
          />
        }
        actions={
          <CalloutActions
            primaryButton={{
              children: "Primary",
              linkTo: "#",
            }}
          />
        }
        closeButton={{
          "aria-label": "Close",
          onClick: onCloseButtonClick,
        }}
      />
      <Layout margin={{ y: 2 }} />
      <Callout
        closeButton={{
          "aria-label": "Close",
          onClick: onCloseButtonClick,
        }}
        orientation={CalloutOrientation.Row}
        message={
          <CalloutMessage
            title="This is My Feature Title that is Much Longer than Above"
            description="This is some descriptive text. A longer description with more content."
            inline={true}
            pill={{
              label: "NEW",
              type: PillType.Brand,
            }}
          />
        }
        actions={
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
        }
      />
      <Layout margin={{ y: 2 }} />
      <Callout
        closeButton={{
          "aria-label": "Close",
          onClick: onCloseButtonClick,
        }}
        figure={
          <Avatar
            alt=""
            src={ExampleAvatars.drlupo}
            size={50}
            userLogin="drlupo"
          />
        }
        orientation={CalloutOrientation.Row}
        message={
          <CalloutMessage
            title="This is My Feature Title that is Much Longer than Above"
            description="This is some descriptive text. A longer description with more content."
            inline={true}
            pill={{
              label: "NEW",
              type: PillType.Brand,
            }}
          />
        }
        actions={
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
        }
      />
      <Layout margin={{ y: 2 }} />
      <Callout
        orientation={CalloutOrientation.Row}
        figure={
          <Avatar
            alt=""
            src={ExampleAvatars.drlupo}
            size={50}
            userLogin="drlupo"
          />
        }
        message={
          <CalloutMessage
            title="This is My Feature"
            description="This is some descriptive text. "
            pill={{
              label: "NEW",
              type: PillType.Brand,
            }}
          />
        }
        actions={
          <CalloutActions
            primaryButton={{
              children: "Primary",
              linkTo: "#",
            }}
          />
        }
        closeButton={{
          "aria-label": "Close",
          onClick: onCloseButtonClick,
        }}
      />
    </>
  );
};

export function WithAccentBackground() {
  const onCloseButtonClick = () => alert("Close!");

  const [color, setColor] = useColorStorage();

  return (
    <AccentRegion {...generateAccentRegionProps(color)}>
      <ColorPicker color={color} setColor={setColor} />

      <Layout margin={{ y: 2 }} />
      <Callout background={Background.AccentAlt} message="hello" />
      <Layout margin={{ y: 2 }} />
      <Callout
        background={Background.AccentAlt}
        orientation={CalloutOrientation.Column}
        message="hello"
      />
      <Layout margin={{ y: 2 }} />
      <Callout
        background={Background.AccentAlt}
        orientation={CalloutOrientation.Column}
        message={<CalloutMessage />}
        actions={
          <CalloutActions
            primaryButton={{
              children: "Primary",
              linkTo: "#",
            }}
          />
        }
        closeButton={{
          "aria-label": "Close",
          onClick: onCloseButtonClick,
        }}
      />
      <Layout margin={{ y: 2 }} />
      <Callout
        background={Background.AccentAlt}
        orientation={CalloutOrientation.Column}
        message={
          <CalloutMessage
            title="This is My Feature"
            description="This is some descriptive text. "
          />
        }
        actions={
          <CalloutActions
            primaryButton={{
              children: "Primary",
              linkTo: "#",
            }}
          />
        }
        closeButton={{
          "aria-label": "Close",
          onClick: onCloseButtonClick,
        }}
      />
      <Layout margin={{ y: 2 }} />
      <Callout
        background={Background.AccentAlt}
        closeButton={{
          "aria-label": "Close",
          onClick: onCloseButtonClick,
        }}
        orientation={CalloutOrientation.Column}
        message={
          <CalloutMessage
            title="This is My Feature Title that is Much Longer than Above"
            description="This is some descriptive text. A longer description with more content."
            inline={true}
            pill={{
              label: "NEW",
              type: PillType.Brand,
            }}
          />
        }
        actions={
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
        }
      />
      <Layout margin={{ y: 2 }} />
      <Callout
        background={Background.AccentAlt}
        closeButton={{
          "aria-label": "Close",
          onClick: onCloseButtonClick,
        }}
        orientation={CalloutOrientation.Column}
        figure={
          <InjectLayout borderRadius={BorderRadius.Rounded}>
            <Avatar
              alt=""
              src={ExampleAvatars.drlupo}
              size={50}
              userLogin="drlupo"
            />
          </InjectLayout>
        }
        message={
          <CalloutMessage
            title="This is My Feature Title that is Much Longer than Above"
            description="This is some descriptive text. A longer description with more content."
            pill={{
              label: "NEW",
              type: PillType.Brand,
            }}
          />
        }
        actions={
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
        }
      />
      <Layout margin={{ y: 2 }} />
      <Callout
        background={Background.AccentAlt}
        closeButton={{
          "aria-label": "Close",
          onClick: onCloseButtonClick,
        }}
        orientation={CalloutOrientation.Column}
        figure={
          <Avatar
            alt=""
            src={ExampleAvatars.drlupo}
            size={50}
            userLogin="drlupo"
          />
        }
        message={
          <CalloutMessage
            title="This is My Feature Title that is Much Longer than Above"
            description="This is some descriptive text. A longer description with more content."
            inline={true}
            pill={{
              label: "NEW",
              type: PillType.Brand,
            }}
          />
        }
        actions={
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
        }
      />
      <Layout margin={{ y: 2 }} />
      <Callout
        background={Background.AccentAlt}
        orientation={CalloutOrientation.Row}
        message={
          <CalloutMessage
            title="This is My Feature"
            pill={{
              label: "NEW",
              type: PillType.Brand,
            }}
          />
        }
        actions={
          <CalloutActions
            primaryButton={{
              children: "Primary",
              linkTo: "#",
            }}
          />
        }
        closeButton={{
          "aria-label": "Close",
          onClick: onCloseButtonClick,
        }}
      />
      <Layout margin={{ y: 2 }} />
      <Callout
        background={Background.AccentAlt}
        closeButton={{
          "aria-label": "Close",
          onClick: onCloseButtonClick,
        }}
        orientation={CalloutOrientation.Row}
        message={
          <CalloutMessage
            title="This is My Feature Title that is Much Longer than Above"
            description="This is some descriptive text. A longer description with more content."
            inline={true}
            pill={{
              label: "NEW",
              type: PillType.Brand,
            }}
          />
        }
        actions={
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
        }
      />
      <Layout margin={{ y: 2 }} />
      <Callout
        background={Background.AccentAlt}
        closeButton={{
          "aria-label": "Close",
          onClick: onCloseButtonClick,
        }}
        figure={
          <Avatar
            alt=""
            src={ExampleAvatars.drlupo}
            size={50}
            userLogin="drlupo"
          />
        }
        orientation={CalloutOrientation.Row}
        message={
          <CalloutMessage
            title="This is My Feature Title that is Much Longer than Above"
            description="This is some descriptive text. A longer description with more content."
            inline={true}
            pill={{
              label: "NEW",
              type: PillType.Brand,
            }}
          />
        }
        actions={
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
        }
      />
      <Layout margin={{ y: 2 }} />
      <Callout
        background={Background.AccentAlt}
        orientation={CalloutOrientation.Row}
        figure={
          <Avatar
            alt=""
            src={ExampleAvatars.drlupo}
            size={50}
            userLogin="drlupo"
          />
        }
        message={
          <CalloutMessage
            title="This is My Feature"
            description="This is some descriptive text. "
            pill={{
              label: "NEW",
              type: PillType.Brand,
            }}
          />
        }
        actions={
          <CalloutActions
            primaryButton={{
              children: "Primary",
              linkTo: "#",
            }}
          />
        }
        closeButton={{
          "aria-label": "Close",
          onClick: onCloseButtonClick,
        }}
      />
    </AccentRegion>
  );
}
export const withReactNodeAsMessage = () => {
  const onCloseButtonClick = () => alert("Close!");
  return (
    <>
      <Callout
        padding={0}
        message={
          <CalloutMessage
            title="This is My Feature"
            description="This is some descriptive text. "
            pill={{
              label: "NEW",
              type: PillType.Brand,
            }}
          />
        }
      />
      <Layout margin={{ y: 2 }} />
      <Callout
        orientation={CalloutOrientation.Column}
        actions={
          <CalloutActions
            primaryButton={{
              children: "Primary",
              linkTo: "#",
            }}
          />
        }
        closeButton={{
          "aria-label": "Close",
          onClick: onCloseButtonClick,
        }}
        message={<Title size={TitleSize.ExtraLarge}>Composed Message</Title>}
      />
    </>
  );
};
