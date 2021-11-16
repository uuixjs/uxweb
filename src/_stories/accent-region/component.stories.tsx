import * as React from "react";

import {
  AccentRegion,
  AlignItems,
  Avatar,
  Background,
  BorderRadius,
  Button,
  ButtonIcon,
  ButtonType,
  CheckBox,
  Color,
  Column,
  ComboInput,
  CoreButtonDropdownType,
  CoreLink,
  CoreText,
  Display,
  FlexDirection,
  FormGroup,
  Grid,
  GridGutterSize,
  InjectLayout,
  Input,
  InputType,
  Interactable,
  InteractableType,
  JustifyContent,
  Layout,
  LayoutProps,
  OverlayRegion,
  Position,
  ProgressBar,
  Radio,
  Range,
  SVGAsset,
  SegmentedButton,
  SegmentedButtonOption,
  SplitButton,
  TabSize,
  Tabs,
  TextAlign,
  Title,
  TitleSize,
  Toggle,
  Tower,
  TowerChildWidth,
  TowerGutter,
  generateAccentRegionProps,
} from "v2";
import { ExampleAvatars, ExampleThumbnails } from "../assets";
import { FC, useState } from "react";
import {
  RGBColor,
  accentColorGenerator,
  colorIsDark,
  getHoverColor,
  parse
} from "@uuixjs/uuixweb-lib";

import { ChannelNameBanner } from "./story-components/channel-name-banner";
import { ChatHiglight } from "./story-components/chat-highlight";
import { ColorPicker } from "./story-components/color-picker";
import { ColorSwatch } from "./story-components/color-swatch";
import { ExtrudedMediaCard } from "./story-components/extruded-media-card";
import { PaletteSwatches } from "./story-components/palette-swatches";
import { PaletteTable } from "./story-components/palette-table";
import { PaletteTokenTable } from "./story-components/palette-token-table";
import { useColorStorage } from "./story-components/utils";

export default { title: AccentRegion.displayName };

export function AlgorithmPalette() {
  const [color, setColor] = useColorStorage();

  const isDark = colorIsDark(parse(color) as RGBColor);

  const values = accentColorGenerator(parse(color) as RGBColor);
  const hoverColor = getHoverColor(parse(color) as RGBColor);

  return (
    <Layout margin={{ bottom: 2 }}>
      <AccentRegion {...generateAccentRegionProps(color)}>
        <Layout display={Display.Flex}>
          <Layout flexGrow={1}>
            <ColorPicker color={color} setColor={setColor} />

            <div style={{ width: "8rem" }}>
              <Layout display={Display.Block} margin={{ top: 2 }}>
                <CoreText bold>{isDark ? "White" : "Black"} text</CoreText>
                <ColorSwatch
                  bg={parse(color) as RGBColor}
                  fg={isDark ? [255, 255, 255] : [0, 0, 0]}
                />
              </Layout>

              <Layout display={Display.Block} margin={{ top: 1 }}>
                <CoreText bold>Hover + Text</CoreText>
                <ColorSwatch
                  bg={hoverColor}
                  fg={isDark ? [255, 255, 255] : [0, 0, 0]}
                />
              </Layout>
            </div>
          </Layout>

          <PaletteSwatches colors={values} />
        </Layout>

        <Layout background={Background.Base} elevation={1} margin={{ y: 2 }}>
          <PaletteTable
            colors={values}
            inputColor={parse(color) as RGBColor}
            inputColorHover={hoverColor}
          />
        </Layout>
      </AccentRegion>
    </Layout>
  );
}

export const TokenAssignment: FC = () => {
  const [color, setColor] = useColorStorage();

  return (
    <AccentRegion {...generateAccentRegionProps(color)}>
      <ColorPicker color={color} setColor={setColor} />
      <Layout margin={{ top: 2 }} background={Background.Base}>
        <PaletteTokenTable />
      </Layout>
    </AccentRegion>
  );
};

export const UIComponents: FC = () => {
  const [color, setColor] = useColorStorage();

  const titleLayoutProps: LayoutProps = { margin: { top: 4, bottom: 1 } };

  const overlayChildren = (
    <OverlayRegion>
      <CoreText>This is overlay text</CoreText>

      <Layout margin={{ y: 1 }}>
        <CheckBox label="Un-selected Checkbox" />
      </Layout>
      <Layout margin={{ y: 1 }}>
        <CheckBox label="Selected Checkbox" defaultChecked />
      </Layout>

      <Layout
        margin={{ top: 2 }}
        display={Display.Flex}
        justifyContent={JustifyContent.Start}
        flexDirection={FlexDirection.RowReverse}
      >
        <Layout margin={{ left: 1 }}>
          <Button>Primary</Button>
        </Layout>
        <Button variant={ButtonType.Secondary}>Secondary</Button>
      </Layout>
    </OverlayRegion>
  );

  return (
    <AccentRegion {...generateAccentRegionProps(color)}>
      <ColorPicker color={color} setColor={setColor} />

      <Grid gutterSize={GridGutterSize.Medium}>
        <Column cols={4}>
          <Layout {...titleLayoutProps}>
            <Title size={TitleSize.ExtraSmall}>Primary Buttons</Title>
          </Layout>
          <Button icon={SVGAsset.StarHollow}>Button Label</Button>
        </Column>

        <Column cols={4}>
          <Layout {...titleLayoutProps}>
            <Title size={TitleSize.ExtraSmall}>Secondary Buttons</Title>
          </Layout>
          <Button icon={SVGAsset.StarHollow} variant={ButtonType.Secondary}>
            Button Label
          </Button>
        </Column>

        <Column cols={4}>
          <Layout {...titleLayoutProps}>
            <Title size={TitleSize.ExtraSmall}>Text Buttons</Title>
          </Layout>
          <Button icon={SVGAsset.StarHollow} variant={ButtonType.Text}>
            Button Label
          </Button>
        </Column>

        <Column cols={4}>
          <Layout {...titleLayoutProps}>
            <Title size={TitleSize.ExtraSmall}>Primary Split Button</Title>
          </Layout>
          <SplitButton dropdown={{ type: CoreButtonDropdownType.ArrowDown }}>
            Button Label
          </SplitButton>
        </Column>

        <Column cols={4}>
          <Layout {...titleLayoutProps}>
            <Title size={TitleSize.ExtraSmall}>Purchase Buttons</Title>
          </Layout>
          <Button icon={SVGAsset.Star} purchase="$4.99">
            Subscribe
          </Button>
        </Column>

        <Column cols={4}>
          <Layout {...titleLayoutProps}>
            <Title size={TitleSize.ExtraSmall}>Button Icons</Title>
          </Layout>
          <ButtonIcon
            icon={SVGAsset.NotificationBell}
            aria-label="An example button icon"
          />
        </Column>

        <Column cols={4}>
          <Layout {...titleLayoutProps}>
            <Title size={TitleSize.ExtraSmall}>Core Link</Title>
          </Layout>
          <CoreLink>Text Link</CoreLink>
        </Column>

        <Column cols={12}>
          <Layout {...titleLayoutProps}>
            <Title size={TitleSize.ExtraSmall}>Tabs</Title>
          </Layout>
          <Tabs
            justifyContent={JustifyContent.Start}
            activeTabIndex={0}
            borderBottom={false}
            size={TabSize.Large}
            tabs={[
              { label: "Home" },
              { label: "About" },
              { label: "Schedule" },
              { label: "Videos" },
            ]}
          />
        </Column>

        <Column cols={4}>
          <Layout {...titleLayoutProps}>
            <Title size={TitleSize.ExtraSmall}>Input</Title>
          </Layout>
          <Input type={InputType.Text} placeholder="Placeholder" />
        </Column>

        <Column cols={4}>
          <Layout {...titleLayoutProps}>
            <Title size={TitleSize.ExtraSmall}>Focused Input</Title>
          </Layout>
          <Input type={InputType.Text} value={"Input text"} autoFocus />
        </Column>

        <Column cols={4}>
          <Layout {...titleLayoutProps}>
            <Title size={TitleSize.ExtraSmall}>Combo Input</Title>
          </Layout>
          <ComboInput
            type={InputType.Text}
            placeholder="Placeholder"
            buttonProps={{
              children: "Copy",
            }}
          />
        </Column>

        <Column cols={3}>
          <Layout {...titleLayoutProps}>
            <Title size={TitleSize.ExtraSmall}>Radio Button</Title>
          </Layout>
          <Layout margin={{ y: 1 }}>
            <Radio name="example-radio-group" label="Un-selected Option" />
          </Layout>
          <Layout margin={{ y: 1 }}>
            <Radio
              name="example-radio-group"
              label="Selected Option"
              defaultChecked
            />
          </Layout>
        </Column>

        <Column cols={3}>
          <Layout {...titleLayoutProps}>
            <Title size={TitleSize.ExtraSmall}>Checkbox</Title>
          </Layout>
          <Layout margin={{ y: 1 }}>
            <CheckBox label="Un-selected Checkbox" />
          </Layout>
          <Layout margin={{ y: 1 }}>
            <CheckBox label="Selected Checkbox" defaultChecked />
          </Layout>
        </Column>

        <Column cols={2}>
          <Layout {...titleLayoutProps}>
            <Title size={TitleSize.ExtraSmall}>Toggle</Title>
          </Layout>
          <Layout margin={{ y: 1 }}>
            <Toggle />
          </Layout>
          <Layout margin={{ y: 1 }}>
            <Toggle defaultChecked />
          </Layout>
        </Column>

        <Column cols={4}>
          <Layout {...titleLayoutProps}>
            <Title size={TitleSize.ExtraSmall}>Range</Title>
          </Layout>
          <Range fill min={0} max={100} value={"50"} />
        </Column>

        <Column cols={4}>
          <Layout {...titleLayoutProps}>
            <Title size={TitleSize.ExtraSmall}>Interactable</Title>
          </Layout>
          <Layout
            background={Background.Base}
            borderRadius={BorderRadius.Large}
            elevation={1}
            padding={1}
          >
            <Interactable variant={InteractableType.Inverted} hover>
              <Layout padding={{ x: 1, y: 0.5 }}>One (hovered)</Layout>
            </Interactable>
            <Interactable variant={InteractableType.Inverted}>
              <Layout padding={{ x: 1, y: 0.5 }}>Two</Layout>
            </Interactable>
            <Interactable variant={InteractableType.Inverted}>
              <Layout padding={{ x: 1, y: 0.5 }}>Three</Layout>
            </Interactable>
          </Layout>
        </Column>

        <Column cols={4}>
          <Layout {...titleLayoutProps}>
            <Title size={TitleSize.ExtraSmall}>Segmented Button</Title>
          </Layout>
          <SegmentedButton>
            <SegmentedButtonOption
              name="segmented-button-radio"
              label="One"
              defaultChecked
            />
            <SegmentedButtonOption name="segmented-button-radio" label="Two" />
            <SegmentedButtonOption
              name="segmented-button-radio"
              label="Three"
            />
          </SegmentedButton>
        </Column>

        <Column cols={4}>
          <Layout {...titleLayoutProps}>
            <Title size={TitleSize.ExtraSmall}>Progress Bar</Title>
          </Layout>
          <ProgressBar value={40} mask />
        </Column>

        <Column cols={4}>
          <Layout {...titleLayoutProps}>
            <Title size={TitleSize.ExtraSmall}>Background.Accent</Title>
          </Layout>
          <Layout
            padding={3}
            background={Background.Accent}
            color={Color.Overlay}
            borderRadius={BorderRadius.Large}
          >
            {overlayChildren}
          </Layout>
        </Column>

        <Column cols={4}>
          <Layout {...titleLayoutProps}>
            <Title size={TitleSize.ExtraSmall}>Background.AccentAlt</Title>
          </Layout>
          <Layout
            padding={3}
            background={Background.AccentAlt}
            color={Color.Overlay}
            borderRadius={BorderRadius.Large}
          >
            {overlayChildren}
          </Layout>
        </Column>

        <Column cols={4}>
          <Layout {...titleLayoutProps}>
            <Title size={TitleSize.ExtraSmall}>Background.AccentAlt2</Title>
          </Layout>
          <Layout
            padding={3}
            background={Background.AccentAlt2}
            color={Color.Overlay}
            borderRadius={BorderRadius.Large}
          >
            {overlayChildren}
          </Layout>
        </Column>
      </Grid>
    </AccentRegion>
  );
};

export function SettingsPreview() {
  const [color, setColor] = useColorStorage();
  return (
    <AccentRegion {...generateAccentRegionProps(color)}>
      <ColorPicker color={color} setColor={setColor} />

      <Layout margin={{ y: 2 }}>
        <Title>Channel Settings Preview</Title>
      </Layout>

      <Grid gutterSize={GridGutterSize.Medium}>
        <Column cols={8}>
          <ChannelNameBanner channelLogin="RoboRaptor2000" lines={4} />
        </Column>
        <Column cols={4}>
          <ExtrudedMediaCard show />
          <ChatHiglight />
        </Column>
      </Grid>

      <Layout display={Display.Flex} margin={{ top: 2 }}>
        <Layout flexGrow={1}>
          <Tabs
            justifyContent={JustifyContent.Start}
            activeTabIndex={0}
            borderBottom={false}
            tabs={[
              { label: "Home" },
              { label: "About" },
              { label: "Schedule" },
              { label: "Videos" },
            ]}
          />
        </Layout>
        <Layout flexGrow={0} display={Display.Flex}>
          <Layout margin={{ left: 1 }}>
            <ButtonIcon
              aria-label="aria label"
              icon={SVGAsset.NotificationBell}
            />
          </Layout>
          <Layout margin={{ left: 1 }}>
            <ButtonIcon aria-label="aria label" icon={SVGAsset.FollowHollow} />
          </Layout>
          <Layout margin={{ left: 1 }}>
            <Button icon={SVGAsset.StarHollow}>Subscribe</Button>
          </Layout>
        </Layout>
      </Layout>
    </AccentRegion>
  );
}

export function ChannelPreview() {
  const [color, setColor] = useColorStorage();
  return (
    <AccentRegion {...generateAccentRegionProps(color)}>
      <ColorPicker color={color} setColor={setColor} />

      <Layout position={Position.Relative}>
        <ChannelNameBanner channelLogin="RoboRaptor2000" lines={5} />
        <Layout
          position={Position.Absolute}
          attachTop
          attachLeft
          attachRight
          attachBottom
          padding={3}
          display={Display.Flex}
          justifyContent={JustifyContent.Start}
          alignItems={AlignItems.Center}
        >
          <InjectLayout
            elevation={2}
            background={Background.Base}
            margin={{ right: 2 }}
          >
            <div style={{ width: 168, height: 168 }} />
          </InjectLayout>
          <InjectLayout elevation={2}>
            <img src={ExampleThumbnails.stream5} alt="" width="300" />
          </InjectLayout>
        </Layout>
      </Layout>

      <Layout
        display={Display.Flex}
        alignItems={AlignItems.Center}
        margin={{ top: 2 }}
      >
        <Avatar
          src={ExampleAvatars.pokimane}
          size={60}
          userLogin="RoboRaptor2000"
          alt=""
        />

        <Layout margin={{ left: 2 }} flexGrow={1}>
          <Title>Channel Name</Title>
          <CoreText tabularNums>3,456 Followers</CoreText>
        </Layout>

        <Layout flexGrow={0} display={Display.Flex}>
          <Layout margin={{ left: 1 }}>
            <ButtonIcon
              aria-label="aria label"
              icon={SVGAsset.NotificationBell}
            />
          </Layout>
          <Layout margin={{ left: 1 }}>
            <ButtonIcon aria-label="aria label" icon={SVGAsset.FollowHollow} />
          </Layout>
          <Layout margin={{ left: 1 }}>
            <Button icon={SVGAsset.StarHollow}>Subscribe</Button>
          </Layout>
        </Layout>
      </Layout>

      <Layout margin={{ top: 4 }}>
        <Tabs
          size={TabSize.Large}
          justifyContent={JustifyContent.Start}
          activeTabIndex={0}
          borderBottom={false}
          tabs={[
            { label: "Home" },
            { label: "About" },
            { label: "Schedule" },
            { label: "Videos" },
          ]}
        />
      </Layout>

      <Layout margin={{ top: 4 }}>
        <Tower
          childWidth={TowerChildWidth.Small}
          gutterSize={TowerGutter.Small}
          placeholderItems={6}
        >
          <div>
            <ExtrudedMediaCard src={ExampleThumbnails.stream1} show />
          </div>
          <div>
            <ExtrudedMediaCard src={ExampleThumbnails.stream2} />
          </div>
          <div>
            <ExtrudedMediaCard src={ExampleThumbnails.stream3} />
          </div>
          <div>
            <ExtrudedMediaCard src={ExampleThumbnails.stream4} />
          </div>
        </Tower>
      </Layout>
    </AccentRegion>
  );
}

export function NestedRegions() {
  const [color1, setColor1] = useState("#00C7AF");
  const [color2, setColor2] = useState("#26183B");
  const [color3, setColor3] = useState("#FFE40B");
  const [color4, setColor4] = useState("#FE9117");
  const [color5, setColor5] = useState("#CCB58D");

  const ProfileBox = ({
    name,
    color,
    src,
  }: {
    name: string;
    color: string;
    src: string;
  }) => (
    <AccentRegion {...generateAccentRegionProps(color)}>
      <Layout
        display={Display.Flex}
        flexDirection={FlexDirection.Column}
        alignItems={AlignItems.Center}
      >
        <InjectLayout
          borderRadius={BorderRadius.Rounded}
          display={Display.InlineBlock}
        >
          <div
            style={{
              border: "0.3rem solid var(--color-accent)",
              padding: "0.3rem",
            }}
          >
            <Avatar
              src={src}
              alt={`User avatar of ${name}`}
              size={96}
              userLogin={name}
            />
          </div>
        </InjectLayout>
        <Layout margin={{ y: 0.5 }}>
          <Title size={TitleSize.Small}>
            <CoreLink>{name}</CoreLink>
          </Title>
        </Layout>
        <Layout textAlign={TextAlign.Center} display={Display.Flex}>
          <Button icon={SVGAsset.AddFriend}>Add</Button>
        </Layout>
      </Layout>
    </AccentRegion>
  );

  return (
    <Layout>
      <Layout
        borderBottom
        padding={{ bottom: 1 }}
        margin={{ bottom: 2 }}
        display={Display.Flex}
      >
        <FormGroup label="RoboRaptor2000" hint={color1}>
          <input
            type="color"
            value={color1}
            onChange={(e) => setColor1(e.currentTarget.value)}
          />
        </FormGroup>
        <FormGroup label="brookaeb" hint={color1}>
          <input
            type="color"
            value={color2}
            onChange={(e) => setColor2(e.currentTarget.value)}
          />
        </FormGroup>
        <FormGroup label="castro" hint={color1}>
          <input
            type="color"
            value={color3}
            onChange={(e) => setColor3(e.currentTarget.value)}
          />
        </FormGroup>
        <FormGroup label="fuslie" hint={color1}>
          <input
            type="color"
            value={color4}
            onChange={(e) => setColor4(e.currentTarget.value)}
          />
        </FormGroup>
        <FormGroup label="timethetatman" hint={color1}>
          <input
            type="color"
            value={color5}
            onChange={(e) => setColor5(e.currentTarget.value)}
          />
        </FormGroup>
      </Layout>

      <AccentRegion {...generateAccentRegionProps(color1)}>
        <Layout
          background={Background.Base}
          border
          borderRadius={BorderRadius.Large}
        >
          <Layout
            borderRadius={{
              topLeft: BorderRadius.Large,
              topRight: BorderRadius.Large,
            }}
            padding={2}
            display={Display.Flex}
          >
            <Title>
              <CoreLink>RoboRaptor2000's Friends</CoreLink>
            </Title>
            <Layout margin={{ left: 1 }}>
              <Button icon={SVGAsset.AddFriend}>Add</Button>
            </Layout>
          </Layout>

          <Layout padding={2}>
            <Grid>
              <Column cols={3}>
                <ProfileBox
                  name={"brookaeb"}
                  color={color2}
                  src={ExampleAvatars.brookeab}
                />
              </Column>
              <Column cols={3}>
                <ProfileBox
                  name={"castro"}
                  color={color3}
                  src={ExampleAvatars.castro}
                />
              </Column>
              <Column cols={3}>
                <ProfileBox
                  name={"fuslie"}
                  color={color4}
                  src={ExampleAvatars.fuslie}
                />
              </Column>
              <Column cols={3}>
                <ProfileBox
                  name={"timethetatman"}
                  color={color5}
                  src={ExampleAvatars.timthetatman}
                />
              </Column>
            </Grid>
          </Layout>
        </Layout>
      </AccentRegion>
    </Layout>
  );
}
