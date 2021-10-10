import * as React from "react";

import {
  Background,
  ChannelStatusTextIndicator,
  ChannelStatusTextIndicatorSize,
  ChannelStatusTextIndicatorType,
  CoreText,
  Display,
  Layout,
} from "v2";

import { OverlayPreview } from "../../components/overlay-preview";

export default { title: ChannelStatusTextIndicator.displayName };

export const example = () => (
  <Layout>
    <Layout display={Display.Flex}>
      <CoreText>Default Size</CoreText>
      <Layout padding={{ left: 1 }}>
        <ChannelStatusTextIndicator label="Live" />
      </Layout>
      <Layout padding={{ left: 1 }}>
        <ChannelStatusTextIndicator label="實況" />
      </Layout>
      <Layout padding={{ left: 1 }}>
        <ChannelStatusTextIndicator label="Mask" mask={Background.Accent} />
      </Layout>
    </Layout>

    <Layout margin={{ top: 2 }} display={Display.Flex}>
      <CoreText>Size Large</CoreText>
      <Layout padding={{ left: 1 }}>
        <ChannelStatusTextIndicator
          size={ChannelStatusTextIndicatorSize.Large}
          label="Live"
        />
      </Layout>
      <Layout padding={{ left: 1 }}>
        <ChannelStatusTextIndicator
          size={ChannelStatusTextIndicatorSize.Large}
          label="實況"
        />
      </Layout>
      <Layout padding={{ left: 1 }}>
        <ChannelStatusTextIndicator
          size={ChannelStatusTextIndicatorSize.Large}
          label="Mask"
          mask={Background.Accent}
        />
      </Layout>
    </Layout>

    <Layout margin={{ top: 2 }} display={Display.Flex}>
      <CoreText>Types</CoreText>
      <Layout padding={{ left: 1 }}>
        <ChannelStatusTextIndicator
          label="Live"
          type={ChannelStatusTextIndicatorType.Live}
        />
      </Layout>
      <Layout padding={{ left: 1 }}>
        <ChannelStatusTextIndicator
          label="Recording"
          type={ChannelStatusTextIndicatorType.Recording}
        />
      </Layout>
      <Layout padding={{ left: 1 }}>
        <ChannelStatusTextIndicator
          label="Rerun"
          type={ChannelStatusTextIndicatorType.Rerun}
        />
      </Layout>
      <Layout padding={{ left: 1 }}>
        <ChannelStatusTextIndicator
          label="Hosting"
          type={ChannelStatusTextIndicatorType.Hosting}
        />
      </Layout>
      <Layout padding={{ left: 1 }}>
        <ChannelStatusTextIndicator
          label="Offline"
          type={ChannelStatusTextIndicatorType.Offline}
        />
      </Layout>
    </Layout>

    <Layout margin={{ top: 2 }} display={Display.Flex}>
      <CoreText>Types in Overlay</CoreText>
      <Layout padding={{ left: 1 }}>
        <ChannelStatusTextIndicator
          overlay
          label="Live"
          type={ChannelStatusTextIndicatorType.Live}
        />
      </Layout>
      <Layout padding={{ left: 1 }}>
        <ChannelStatusTextIndicator
          overlay
          label="Recording"
          type={ChannelStatusTextIndicatorType.Recording}
        />
      </Layout>
      <Layout padding={{ left: 1 }}>
        <ChannelStatusTextIndicator
          overlay
          label="Rerun"
          type={ChannelStatusTextIndicatorType.Rerun}
        />
      </Layout>
      <Layout padding={{ left: 1 }}>
        <ChannelStatusTextIndicator
          overlay
          label="Hosting"
          type={ChannelStatusTextIndicatorType.Hosting}
        />
      </Layout>
      <Layout padding={{ left: 1 }}>
        <ChannelStatusTextIndicator
          overlay
          label="Offline"
          type={ChannelStatusTextIndicatorType.Offline}
        />
      </Layout>
    </Layout>

    <Layout margin={{ top: 4 }}>
      <OverlayPreview>
        <Layout display={Display.Flex}>
          <Layout padding={{ left: 1 }}>
            <ChannelStatusTextIndicator
              label="Live"
              type={ChannelStatusTextIndicatorType.Live}
            />
          </Layout>
          <Layout padding={{ left: 1 }}>
            <ChannelStatusTextIndicator
              label="Recording"
              type={ChannelStatusTextIndicatorType.Recording}
            />
          </Layout>
          <Layout padding={{ left: 1 }}>
            <ChannelStatusTextIndicator
              label="Rerun"
              type={ChannelStatusTextIndicatorType.Rerun}
            />
          </Layout>
          <Layout padding={{ left: 1 }}>
            <ChannelStatusTextIndicator
              label="Hosting"
              type={ChannelStatusTextIndicatorType.Hosting}
            />
          </Layout>
          <Layout padding={{ left: 1 }}>
            <ChannelStatusTextIndicator
              label="Offline"
              type={ChannelStatusTextIndicatorType.Offline}
            />
          </Layout>
        </Layout>
      </OverlayPreview>
    </Layout>
  </Layout>
);
