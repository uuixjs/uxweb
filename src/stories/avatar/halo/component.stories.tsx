import * as React from "react";

import {
  AccentRegion,
  Avatar,
  AvatarHalo,
  AvatarProps,
  Background,
  BorderRadius,
  ChannelStatusIndicatorStatus,
  ChannelStatusTextIndicator,
  Column,
  Display,
  Grid,
  JustifyContent,
  Layout,
  generateAccentRegionProps,
} from "v2";
import { FC, ReactNode } from "react";

import { ColorPicker } from "../../accent-region/story-components/color-picker";
import { ExampleAvatars } from "../../assets";
import { useColorStorage } from "../../accent-region/story-components/utils";

export default { title: AvatarHalo.displayName };

const requireProps: AvatarProps = {
  alt: "",
  size: 30,
  userLogin: undefined,
};

export const withImage = () => (
  <>
    <Grid>
      <Column cols={4}>
        <AvatarHalo size={72}>
          <Avatar
            {...requireProps}
            borderRadius={BorderRadius.Rounded}
            src={ExampleAvatars.fuslie}
          />
        </AvatarHalo>
      </Column>
      <Column cols={4}>
        <AvatarHalo size={72}>
          <Avatar
            {...requireProps}
            borderRadius={BorderRadius.Rounded}
            src={ExampleAvatars.annemunition}
          />
        </AvatarHalo>
      </Column>
      <Column cols={4}>
        <AvatarHalo size={72} status={ChannelStatusIndicatorStatus.Offline}>
          <Avatar
            {...requireProps}
            borderRadius={BorderRadius.Rounded}
            src={ExampleAvatars.lirik}
          />
        </AvatarHalo>
      </Column>
      <Column cols={4}>
        <AvatarHalo
          size={72}
          indicator={
            <ChannelStatusTextIndicator
              label="LIVE"
              mask={Background.Inherit}
            />
          }
        >
          <Avatar
            {...requireProps}
            borderRadius={BorderRadius.Rounded}
            src={ExampleAvatars.nickmercs}
          />
        </AvatarHalo>
      </Column>
      <Column cols={4}>
        <AvatarHalo
          size={160}
          indicator={
            <ChannelStatusTextIndicator
              label="EN VIVO"
              mask={Background.Inherit}
            />
          }
        >
          <Avatar
            {...requireProps}
            borderRadius={BorderRadius.Rounded}
            src={ExampleAvatars.pokimane}
          />
        </AvatarHalo>
      </Column>
      <Column cols={4}>
        <AvatarHalo
          size={72}
          indicator={
            <ChannelStatusTextIndicator
              label="TOO LONG LABEL"
              mask={Background.Inherit}
            />
          }
        >
          <Avatar
            {...requireProps}
            borderRadius={BorderRadius.Rounded}
            src={ExampleAvatars.tsmdaequan}
          />
        </AvatarHalo>
      </Column>
    </Grid>
  </>
);
export function WithAccent() {
  const [color, setColor] = useColorStorage();

  const HaloWrapper: FC<{
    children: ReactNode;
    background?: Background;
  }> = (props) => (
    <Layout
      background={props.background}
      padding={2}
      display={Display.Flex}
      justifyContent={JustifyContent.Center}
    >
      {props.children}
    </Layout>
  );

  return (
    <>
      <AccentRegion {...generateAccentRegionProps(color)}>
        <ColorPicker color={color} setColor={setColor} />
        <Grid>
          <Column cols={4}>
            <HaloWrapper>
              <AvatarHalo
                size={72}
                indicator={
                  <ChannelStatusTextIndicator
                    label="LIVE"
                    mask={Background.Inherit}
                  />
                }
              >
                <Avatar
                  {...requireProps}
                  borderRadius={BorderRadius.Rounded}
                  src={ExampleAvatars.annemunition}
                />
              </AvatarHalo>
            </HaloWrapper>
          </Column>
          <Column cols={4}>
            <HaloWrapper>
              <AvatarHalo
                size={72}
                indicator={
                  <ChannelStatusTextIndicator
                    label="EN VIVO"
                    mask={Background.Inherit}
                  />
                }
              >
                <Avatar
                  {...requireProps}
                  borderRadius={BorderRadius.Rounded}
                  src={ExampleAvatars.annemunition}
                />
              </AvatarHalo>
            </HaloWrapper>
          </Column>
          <Column cols={4}>
            <HaloWrapper>
              <AvatarHalo
                size={72}
                indicator={
                  <ChannelStatusTextIndicator
                    label="TOO LONG LABEL"
                    mask={Background.Inherit}
                  />
                }
              >
                <Avatar
                  {...requireProps}
                  borderRadius={BorderRadius.Rounded}
                  src={ExampleAvatars.annemunition}
                />
              </AvatarHalo>
            </HaloWrapper>
          </Column>
        </Grid>
        <Grid>
          <Column cols={4}>
            <HaloWrapper background={Background.Base}>
              <AvatarHalo
                size={72}
                background={Background.Inherit}
                indicator={
                  <ChannelStatusTextIndicator
                    label="LIVE"
                    mask={Background.Inherit}
                  />
                }
              >
                <Avatar
                  {...requireProps}
                  borderRadius={BorderRadius.Rounded}
                  src={ExampleAvatars.annemunition}
                />
              </AvatarHalo>
            </HaloWrapper>
          </Column>
          <Column cols={4}>
            <HaloWrapper background={Background.Alt}>
              <AvatarHalo
                size={72}
                background={Background.Inherit}
                indicator={
                  <ChannelStatusTextIndicator
                    label="EN VIVO"
                    mask={Background.Inherit}
                  />
                }
              >
                <Avatar
                  {...requireProps}
                  borderRadius={BorderRadius.Rounded}
                  src={ExampleAvatars.annemunition}
                />
              </AvatarHalo>
            </HaloWrapper>
          </Column>
          <Column cols={4}>
            <HaloWrapper background={Background.Alt2}>
              <AvatarHalo
                size={72}
                background={Background.Inherit}
                indicator={
                  <ChannelStatusTextIndicator
                    label="TOO LONG LABEL"
                    mask={Background.Inherit}
                  />
                }
              >
                <Avatar
                  {...requireProps}
                  borderRadius={BorderRadius.Rounded}
                  src={ExampleAvatars.annemunition}
                />
              </AvatarHalo>
            </HaloWrapper>
          </Column>
        </Grid>
      </AccentRegion>
    </>
  );
}
