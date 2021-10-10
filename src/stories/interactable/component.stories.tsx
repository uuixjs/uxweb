import * as React from "react";

import {
  BorderRadius,
  Display,
  InjectLayout,
  Interactable,
  InteractableProps,
  InteractableType,
  Layout,
  Title,
  TitleSize,
  Typeset,
} from "v2";
import { ExampleBG, OverlayPreview } from "../../components/overlay-preview";

export default { title: "Interactable" };

const renderAllInteractableStates = (
  interactableProps?: Pick<InteractableProps, "variant" | "border">,
) => (
  <>
    <Title size={TitleSize.Small}>Button Element</Title>
    <Layout display={Display.Flex} margin={{ top: 1, bottom: 2 }}>
      <Interactable borderRadius={BorderRadius.Medium} {...interactableProps}>
        <Layout padding={1}>Default</Layout>
      </Interactable>
      &nbsp;
      <Interactable
        borderRadius={BorderRadius.Medium}
        hover
        {...interactableProps}
      >
        <Layout padding={1}>Hover Forced</Layout>
      </Interactable>
      &nbsp;
      <Interactable
        borderRadius={BorderRadius.Medium}
        selected
        {...interactableProps}
      >
        <Layout padding={1}>Selected</Layout>
      </Interactable>
      &nbsp;
      <Interactable
        borderRadius={BorderRadius.Medium}
        disabled
        {...interactableProps}
      >
        <Layout padding={1}>Disabled</Layout>
      </Interactable>
      &nbsp;
      <Interactable
        borderRadius={BorderRadius.Medium}
        selected
        disabled
        {...interactableProps}
      >
        <Layout padding={1}>Selected, Disabled</Layout>
      </Interactable>
      &nbsp;
      <Interactable
        borderRadius={BorderRadius.Medium}
        hover={false}
        {...interactableProps}
      >
        <Layout padding={1}>Never Show Hover</Layout>
      </Interactable>
    </Layout>

    <Title size={TitleSize.Small}>Anchor Element</Title>
    <Layout display={Display.Flex} margin={{ top: 1 }}>
      <Interactable
        linkTo="#"
        borderRadius={BorderRadius.Medium}
        {...interactableProps}
      >
        <Layout padding={1}>Default</Layout>
      </Interactable>
      &nbsp;
      <Interactable
        linkTo="#"
        borderRadius={BorderRadius.Medium}
        hover
        {...interactableProps}
      >
        <Layout padding={1}>Hover Forced</Layout>
      </Interactable>
      &nbsp;
      <Interactable
        linkTo="#"
        borderRadius={BorderRadius.Medium}
        selected
        {...interactableProps}
      >
        <Layout padding={1}>Selected</Layout>
      </Interactable>
      &nbsp;
      <Interactable
        linkTo="#"
        borderRadius={BorderRadius.Medium}
        disabled
        {...interactableProps}
      >
        <Layout padding={1}>Disabled</Layout>
      </Interactable>
      &nbsp;
      <Interactable
        linkTo="#"
        borderRadius={BorderRadius.Medium}
        selected
        disabled
        {...interactableProps}
      >
        <Layout padding={1}>Selected, Disabled</Layout>
      </Interactable>
      &nbsp;
      <Interactable
        linkTo="#"
        borderRadius={BorderRadius.Medium}
        hover={false}
        {...interactableProps}
      >
        <Layout padding={1}>Never Show Hover</Layout>
      </Interactable>
    </Layout>
  </>
);

const renderAllInteractableTypes = ({
  border,
}: Pick<InteractableProps, "border">) => (
  <div>
    <Layout margin={{ bottom: 4 }}>
      <Layout margin={{ bottom: 2 }}>
        <Title>Default</Title>
      </Layout>
      {renderAllInteractableStates({ border })}
    </Layout>
    <Layout margin={{ bottom: 4 }}>
      <Title>Overlay</Title>
      <OverlayPreview defaultBg={ExampleBG.Photo2}>
        {renderAllInteractableStates({ border })}
      </OverlayPreview>
    </Layout>
    <Layout margin={{ bottom: 2 }}>
      <Title>Alert</Title>
      Alert is intended to indicate a "destructive" action. It should contain
      text and/or an icon that indicates its action.
    </Layout>
    <Layout>
      {renderAllInteractableStates({ border, variant: InteractableType.Alert })}
    </Layout>
  </div>
);

export const types = () => renderAllInteractableTypes({});

export const WithLayout = () => (
  <div>
    <InjectLayout display={Display.Flex} margin={{ bottom: 4 }} border>
      <div style={{ height: "10rem" }}>
        <Interactable>
          <Layout padding={2}>
            The interactable element should expand to fill a flex box element.
          </Layout>
        </Interactable>
      </div>
    </InjectLayout>
    <OverlayPreview>
      <InjectLayout display={Display.Flex} border>
        <div style={{ height: "10rem" }}>
          <Interactable>
            <Layout padding={2}>
              The interactable element should expand to fill a flex box element.
            </Layout>
          </Interactable>
        </div>
      </InjectLayout>
    </OverlayPreview>
  </div>
);

export const WithSelectableText = () => (
  <div>
    <Layout margin={{ bottom: 2 }}>
      <Interactable selectableText>
        <Layout padding={1}>Selectable Text (Button)</Layout>
      </Interactable>
    </Layout>

    <Layout margin={{ bottom: 1 }}>
      <Typeset>
        In Chrome and Firefox, users can also hold the option key and drag to
        select text in anchors.
      </Typeset>
    </Layout>
    <Interactable linkTo="https://twitch.tv">
      <Layout padding={1}>Selectable Text (Anchor)</Layout>
    </Interactable>
  </div>
);

export const WithBorder = () => (
  <>
    <Layout margin={{ bottom: 2 }}>
      <Typeset>
        The <code>border</code> property will be deprecated. Using the{" "}
        <code>Layout</code> component to add a border around an{" "}
        <code>Interactable</code> is the preferred method of achieving a border.
      </Typeset>
    </Layout>
    {renderAllInteractableTypes({ border: true })}
  </>
);
