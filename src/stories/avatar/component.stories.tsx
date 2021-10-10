import * as React from "react";

import {
  Avatar,
  AvatarProps,
  BorderRadius,
  Display,
  FlexWrap,
  Layout,
  PresenceStatus,
} from "v2";
import {
  CombinationGenerator,
  CombinationMode,
} from "../components/combination-generator";

import { ExampleAvatars } from "../assets";

export default { title: Avatar.displayName };

const requireProps: AvatarProps = {
  alt: "",
  size: 30,
  userLogin: undefined,
};

export const DefaultAvatars = () => (
  <>
    <Layout display={Display.Flex} flexWrap={FlexWrap.Wrap}>
      {Array.from(Array(13).keys()).map((i) => (
        <Layout key={i} margin={0.5}>
          <Avatar size={64} alt="" userLogin={`qoi${i}`} />
        </Layout>
      ))}
    </Layout>
    <Layout display={Display.Flex} flexWrap={FlexWrap.Wrap}>
      {Array.from(Array(13).keys()).map((i) => (
        <Layout key={i} margin={0.5}>
          <Avatar
            size={64}
            alt=""
            userLogin={`qoi${i}`}
            presenceIndicator
            presenceStatus={PresenceStatus.Online}
          />
        </Layout>
      ))}
    </Layout>
  </>
);

export const withSize = () => (
  <Layout>
    <CombinationGenerator
      mode={CombinationMode.Simple}
      fields={[
        {
          propKey: "size",
          propValues: [
            10,
            15,
            20,
            24,
            30,
            36,
            40,
            50,
            60,
            64,
            80,
            96,
            120,
            300,
          ],
        },
      ]}
    >
      <Avatar {...requireProps} userLogin="testUser" />
    </CombinationGenerator>
  </Layout>
);

export const placeholders = () => (
  <Layout display={Display.Flex} fullWidth>
    <Layout padding={1} flexGrow={1}>
      <Avatar {...requireProps} borderRadius={BorderRadius.None} />
    </Layout>
    <Layout padding={1} flexGrow={1}>
      <Avatar {...requireProps} borderRadius={BorderRadius.Small} />
    </Layout>
    <Layout padding={1} flexGrow={1}>
      <Avatar {...requireProps} borderRadius={BorderRadius.Medium} />
    </Layout>
    <Layout padding={1} flexGrow={1}>
      <Avatar {...requireProps} borderRadius={BorderRadius.Large} />
    </Layout>
    <Layout padding={1} flexGrow={1}>
      <Avatar {...requireProps} borderRadius={BorderRadius.Rounded} />
    </Layout>
  </Layout>
);

export const presenceIndicator = () => (
  <Layout display={Display.Flex}>
    <Layout padding={1}>
      <Avatar
        src={ExampleAvatars.nickmercs}
        alt=""
        size={40}
        borderRadius={BorderRadius.Medium}
        presenceIndicator
        presenceStatus={PresenceStatus.Online}
        userLogin={undefined}
      />
    </Layout>
    <Layout padding={1}>
      <Avatar
        src={ExampleAvatars.nickmercs}
        alt=""
        size={40}
        borderRadius={BorderRadius.Rounded}
        presenceIndicator
        presenceStatus={PresenceStatus.Online}
        userLogin={undefined}
      />
    </Layout>
  </Layout>
);

export const withImage = () => (
  <Layout>
    <CombinationGenerator
      mode={CombinationMode.Simple}
      fields={[
        {
          propKey: "size",
          propValues: [30, 36, 40, 50, 64, 80, 96, 300],
        },
      ]}
    >
      <Avatar
        {...requireProps}
        borderRadius={BorderRadius.None}
        src={ExampleAvatars.fuslie}
      />
      <Avatar
        {...requireProps}
        borderRadius={BorderRadius.Large}
        src={ExampleAvatars.fuslie}
      />
      <Avatar
        {...requireProps}
        borderRadius={BorderRadius.Rounded}
        src={ExampleAvatars.fuslie}
      />
    </CombinationGenerator>
  </Layout>
);
