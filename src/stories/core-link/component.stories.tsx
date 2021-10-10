import * as React from "react";

import {
  Color,
  CoreLink,
  CoreLinkType,
  CoreText,
  Display,
  FontSize,
  Layout,
  Title,
  TitleSize,
  Typeset,
} from "v2";

import { OverlayPreview } from "../../components/overlay-preview";

export default { title: "CoreLink" };

const renderLinks = (props?: {
  disabled?: boolean;
  linkTo?: string;
  variant?: CoreLinkType;
}) => (
  <Layout fontSize={FontSize.Size4} display={Display.Flex} fullWidth>
    <Layout padding={{ right: 1 }}>
      <CoreLink {...props}>Default</CoreLink>
    </Layout>
    <Layout padding={{ right: 1 }}>
      <CoreLink {...props} underline>
        Underline
      </CoreLink>
    </Layout>
    <Layout padding={{ right: 1 }}>
      <CoreLink {...props} hoverUnderlineNone>
        No Underline on Hover
      </CoreLink>
    </Layout>
    <Layout padding={{ right: 1 }}>
      <CoreLink {...props} hoverColorInherit>
        Inherit Color on Hover
      </CoreLink>
    </Layout>
  </Layout>
);

export const defaultType = () => (
  <>
    <Title size={TitleSize.Small}>As Button Element</Title>
    <Layout padding={{ y: 2 }}>{renderLinks()}</Layout>
    <Layout padding={{ bottom: 4 }}>{renderLinks({ disabled: true })}</Layout>

    <Title size={TitleSize.Small}>As Anchor Element</Title>
    <Layout padding={{ y: 2 }}>{renderLinks({ linkTo: "#" })}</Layout>
    <Layout padding={{ bottom: 4 }}>
      {renderLinks({ linkTo: "#", disabled: true })}
    </Layout>
  </>
);

export const withInherit = () => (
  <>
    <Layout margin={{ bottom: 2 }}>
      <Typeset>
        <p>
          Setting the <code>type</code> to <code>CoreLinkType.Inherit</code>{" "}
          will allow the <code>CoreLink</code> to inherit the text color from a
          parent.
        </p>
      </Typeset>
    </Layout>
    <Title size={TitleSize.Small}>As Button Element</Title>
    <Layout color={Color.Alt2}>
      <Layout padding={{ y: 2 }}>
        {renderLinks({ variant: CoreLinkType.Inherit })}
      </Layout>
      <Layout padding={{ bottom: 4 }}>
        {renderLinks({ disabled: true, variant: CoreLinkType.Inherit })}
      </Layout>
    </Layout>

    <Title size={TitleSize.Small}>As Anchor Element</Title>
    <Layout color={Color.Alt2}>
      <Layout padding={{ y: 2 }}>
        {renderLinks({ linkTo: "#", variant: CoreLinkType.Inherit })}
      </Layout>
      <Layout padding={{ bottom: 4 }}>
        {renderLinks({
          linkTo: "#",
          disabled: true,
          variant: CoreLinkType.Inherit,
        })}
      </Layout>
    </Layout>
  </>
);

export const withOverlay = () => (
  <>
    <Layout margin={{ bottom: 2 }}>
      <CoreText>
        Links are underlined by default in an overlay context.
      </CoreText>
    </Layout>

    <OverlayPreview>
      <Title size={TitleSize.Small}>As Button Element</Title>
      <Layout padding={{ y: 2 }}>{renderLinks()}</Layout>
      <Layout padding={{ bottom: 4 }}>{renderLinks({ disabled: true })}</Layout>

      <Title size={TitleSize.Small}>As Anchor Element</Title>
      <Layout padding={{ y: 2 }}>{renderLinks({ linkTo: "#" })}</Layout>
      {renderLinks({ linkTo: "#", disabled: true })}
    </OverlayPreview>
  </>
);
