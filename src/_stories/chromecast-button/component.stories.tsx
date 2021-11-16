import * as React from "react";

import {
  Background,
  ButtonIcon,
  ChromecastButton,
  ChromecastButtonStatus,
  Color,
  Layout,
  OverlayRegion,
  SVGAsset,
} from "v2";

export default { title: "ChromecastButton" };

export const standardSize = () => (
  <Layout padding={2}>
    Available:
    <br />
    <ChromecastButton
      aria-label="Available"
      status={ChromecastButtonStatus.Available}
    />
    <br />
    Connecting:
    <br />
    <ChromecastButton
      aria-label="Connecting"
      status={ChromecastButtonStatus.Connecting}
    />
    <br />
    Connected:
    <br />
    <ChromecastButton
      aria-label="Connected"
      status={ChromecastButtonStatus.Connected}
    />
  </Layout>
);

export const withOverlay = () => (
  <OverlayRegion overlay>
    <Layout padding={2} background={Background.AccentAlt} color={Color.Overlay}>
      Available:
      <br />
      <ChromecastButton
        aria-label="Available"
        status={ChromecastButtonStatus.Available}
      />
      <br />
      Connecting:
      <br />
      <ChromecastButton
        aria-label="Connecting"
        status={ChromecastButtonStatus.Connecting}
      />
      <br />
      Connected:
      <br />
      <ChromecastButton
        aria-label="Connected"
        status={ChromecastButtonStatus.Connected}
      />
    </Layout>
  </OverlayRegion>
);

export const inline = () => (
  <>
    <Layout border margin={{ y: 1 }}>
      <ChromecastButton
        aria-label="Available"
        status={ChromecastButtonStatus.Available}
      />
      <ButtonIcon aria-label="aria label" icon={SVGAsset.Fullscreen} />
      <ButtonIcon aria-label="aria label" icon={SVGAsset.Gear} />
    </Layout>
    <OverlayRegion overlay>
      <Layout border margin={{ y: 1 }} background={Background.Accent}>
        <ChromecastButton
          aria-label="Available"
          status={ChromecastButtonStatus.Available}
        />
        <ButtonIcon aria-label="aria label" icon={SVGAsset.Fullscreen} />
        <ButtonIcon aria-label="aria label" icon={SVGAsset.Gear} />
      </Layout>
    </OverlayRegion>
  </>
);
