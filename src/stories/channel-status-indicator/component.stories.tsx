import * as React from "react";
import styled from "styled-components";
import {
  Background,
  BorderRadius,
  ChannelStatusIndicator,
  ChannelStatusIndicatorSize,
  ChannelStatusIndicatorStatus,
  Display,
  Layout,
  Position,
  Typeset,
} from "v2";
import {
  CombinationGenerator,
  CombinationMode,
} from "../../components/combination-generator";

export default { title: ChannelStatusIndicator.displayName };

export const statuses = () => (
  <Layout display={Display.Flex}>
    <Layout padding={{ right: 1 }}>
      <div>Default (Offline)</div>
      <ChannelStatusIndicator />
    </Layout>
    <Layout padding={{ right: 1 }}>
      <div>Live</div>
      <ChannelStatusIndicator status={ChannelStatusIndicatorStatus.Live} />
    </Layout>
    <Layout padding={{ right: 1 }}>
      <div>Offline</div>
      <ChannelStatusIndicator status={ChannelStatusIndicatorStatus.Offline} />
    </Layout>
    <Layout padding={{ right: 1 }}>
      <div>Hosting</div>
      <ChannelStatusIndicator status={ChannelStatusIndicatorStatus.Hosting} />
    </Layout>
    <Layout padding={{ right: 1 }}>
      <div>Recording</div>
      <ChannelStatusIndicator status={ChannelStatusIndicatorStatus.Recording} />
    </Layout>
  </Layout>
);

export const size = () => (
  <Layout display={Display.Flex}>
    <Layout padding={{ right: 1 }}>
      <div>Default (Small)</div>
      <ChannelStatusIndicator />
    </Layout>
    <Layout padding={{ right: 1 }}>
      <div>Small</div>
      <ChannelStatusIndicator size={ChannelStatusIndicatorSize.Small} />
    </Layout>
    <Layout padding={{ right: 1 }}>
      <div>Medium</div>
      <ChannelStatusIndicator size={ChannelStatusIndicatorSize.Medium} />
    </Layout>
    <Layout padding={{ right: 1 }}>
      <div>Large</div>
      <ChannelStatusIndicator size={ChannelStatusIndicatorSize.Large} />
    </Layout>
  </Layout>
);

export const withMask = () => {
  const ScIndicatorWrapper = styled(Layout)`
    transform: translate3d(50%, 50%, 0);
  `;

  return (
    <Layout background={Background.Base} padding={2}>
      <Typeset>
        Use the <code>mask</code> property, matching the background color of
        another component, to give the effect of a mask around the indicator.
      </Typeset>
      <Layout
        background={Background.Alt}
        borderRadius={BorderRadius.Medium}
        display={Display.InlineFlex}
        padding={3}
        position={Position.Relative}
        margin={{ top: 2 }}
      >
        <ScIndicatorWrapper
          position={Position.Absolute}
          attachRight
          attachBottom
        >
          <ChannelStatusIndicator
            mask={Background.Base}
            status={ChannelStatusIndicatorStatus.Live}
            size={ChannelStatusIndicatorSize.Medium}
          />
        </ScIndicatorWrapper>
      </Layout>
    </Layout>
  );
};

export const withPulse = () => (
  <Layout display={Display.Flex}>
    <Layout padding={{ right: 2 }}>
      <ChannelStatusIndicator pulse />
    </Layout>
    <Layout padding={{ right: 2 }}>
      <ChannelStatusIndicator
        status={ChannelStatusIndicatorStatus.Live}
        pulse
      />
    </Layout>
    <Layout padding={{ right: 2 }}>
      <ChannelStatusIndicator
        status={ChannelStatusIndicatorStatus.Offline}
        pulse
      />
    </Layout>
    <Layout padding={{ right: 2 }}>
      <ChannelStatusIndicator
        status={ChannelStatusIndicatorStatus.Hosting}
        pulse
      />
    </Layout>
    <Layout padding={{ right: 2 }}>
      <ChannelStatusIndicator
        status={ChannelStatusIndicatorStatus.Recording}
        pulse
      />
    </Layout>
  </Layout>
);

// Keep temporarily for screenshot diff testing
export const examples = () => (
  <CombinationGenerator
    mode={CombinationMode.Exhaustive}
    fields={[
      {
        propKey: "status",
        propValues: [
          ChannelStatusIndicatorStatus.Offline,
          ChannelStatusIndicatorStatus.Hosting,
          ChannelStatusIndicatorStatus.Live,
          ChannelStatusIndicatorStatus.Recording,
        ],
      },
      {
        propKey: "size",
        propValues: [
          ChannelStatusIndicatorSize.Small,
          ChannelStatusIndicatorSize.Medium,
          ChannelStatusIndicatorSize.Large,
        ],
      },
      {
        propKey: "mask",
        propValues: [undefined, Background.Accent, Background.Inherit],
      },
    ]}
  >
    <ChannelStatusIndicator />
    <ChannelStatusIndicator pulse />
  </CombinationGenerator>
);
