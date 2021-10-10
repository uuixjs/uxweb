import * as React from "react";

import {
  AlignItems,
  AspectRatio,
  AttachedDropDownMenu,
  Background,
  BalloonDirection,
  BalloonSize,
  Display,
  DropDownMenuHeading,
  DropDownMenuInputItem,
  DropDownMenuInputItemType,
  DropDownMenuItem,
  DropDownMenuSeparator,
  DropDownMenuWrapper,
  InjectLayout,
  InteractableType,
  JustifyContent,
  Layout,
  Position,
  SVGAsset,
  SplitButton,
} from "v2";
import {
  CombinationGenerator,
  CombinationMode,
} from "../../components/combination-generator";
import { ExampleBG, OverlayPreview } from "../../components/overlay-preview";
import { ExampleBoxArt, ExampleCharacters } from "../assets";

import { FC } from "react";

export default { title: "Dialogs / DropDownMenu" };

export const examples = () => (
  <CombinationGenerator
    fields={[
      {
        propKey: "size",
        propValues: [BalloonSize.Small],
      },
    ]}
    mode={CombinationMode.Simple}
  >
    <div>
      <Layout margin={{ bottom: 2 }}>
        <DropDownMenuWrapper
          items={[
            { label: "About", linkTo: "#" },
            { label: "Ad Choices", linkTo: "#" },
            { label: "Advertisers" },
            { label: "Blog" },
            { label: "Community Guidelines" },
            { label: "Cookie Policy" },
            { label: "Creative" },
            { label: "Developers" },
            { label: "Help" },
            { label: "Jobs" },
            { label: "Language" },
            { label: "Music" },
            { label: "Partners" },
            { label: "Press" },
            { label: "Privacy Policy" },
            { label: "Security" },
            { label: "Terms" },
          ]}
          elevation={3}
        />
      </Layout>
      <Layout margin={{ bottom: 2 }}>
        <DropDownMenuWrapper
          items={[
            {
              type: DropDownMenuInputItemType.CheckBox,
              name: "share-activity",
              label: "Share My Activity",
              hint: `Share what you're watching, playing, or streaming with your friends.`,
              defaultChecked: true,
            },
          ]}
          elevation={3}
        >
          <DropDownMenuSeparator />
          <DropDownMenuInputItem
            type={DropDownMenuInputItemType.Toggle}
            id="dark-mode"
            name="dark-mode"
            label="Dark Mode"
            figure={{ icon: SVGAsset.Moon }}
          />
          <DropDownMenuInputItem
            type={DropDownMenuInputItemType.CheckBox}
            name="staff-console"
            label="Staff Console"
            hint={`Enabling the "Staff Console" will reload the page.`}
            figure={{ icon: SVGAsset.NotificationInfo }}
          />
          <DropDownMenuSeparator />
          <DropDownMenuItem
            label="Channel"
            figure={{ icon: SVGAsset.NavMyChannel }}
          />
          <DropDownMenuItem
            label="Video Producer"
            figure={{ icon: SVGAsset.NavManager }}
          />
          <DropDownMenuItem
            label="Dashboard"
            figure={{ icon: SVGAsset.NavDashboard }}
          />
          <DropDownMenuSeparator />
          <DropDownMenuHeading>Account</DropDownMenuHeading>
          <DropDownMenuItem
            label="Settings"
            figure={{ icon: SVGAsset.NavSettings }}
          />
          <DropDownMenuItem
            label="Logout"
            figure={{ icon: SVGAsset.NavLogout }}
          />
        </DropDownMenuWrapper>
      </Layout>
    </div>
    <div>
      <Layout margin={{ bottom: 2 }}>
        <DropDownMenuWrapper
          items={[
            {
              label: "Aatrox",
              figure: {
                alt: "Aatrox avatar",
                src: ExampleCharacters.aatrox,
              },
            },
            {
              label: "Ashe",
              figure: {
                alt: "Ashe avatar",
                src: ExampleCharacters.ashe,
              },
            },
            {
              label: "Caitlyn",
              figure: {
                alt: "Caitlyn avatar",
                src: ExampleCharacters.caitlyn,
              },
            },
            {
              label: "Dr. Mundo",
              figure: {
                alt: "Dr. Mundo avatar",
                src: ExampleCharacters.drmundo,
              },
            },
            {
              label: "Fiora",
              figure: {
                alt: "Fiora avatar",
                src: ExampleCharacters.fiora,
              },
            },
          ]}
        />
      </Layout>
      <DropDownMenuWrapper
        items={[
          {
            label: "Fortnite",
            figure: {
              alt: "Fortnite box art",
              src: ExampleBoxArt.fortnite,
              aspectRatio: AspectRatio.Aspect3x4,
            },
          },
          {
            label: "League of Legends",
            figure: {
              alt: "League of Legends box art",
              src: ExampleBoxArt.league,
              aspectRatio: AspectRatio.Aspect3x4,
            },
          },
          {
            label: "Overcooked",
            figure: {
              alt: "Overcooked box art",
              src: ExampleBoxArt.overcooked,
              aspectRatio: AspectRatio.Aspect3x4,
            },
          },
          {
            label: "Zelda",
            figure: {
              alt: "Zelda box art",
              src: ExampleBoxArt.zelda,
              aspectRatio: AspectRatio.Aspect3x4,
            },
          },
        ]}
      />
    </div>
    <div>
      <Layout margin={{ bottom: 2 }}>
        <DropDownMenuWrapper
          items={[
            {
              label: "Games",
              figure: {
                icon: SVGAsset.NavGames,
              },
            },
            {
              label: "Channels",
              figure: {
                icon: SVGAsset.NavChannels,
              },
            },
            {
              label: "Creative",
              selected: true,
              figure: {
                icon: SVGAsset.NavCreative,
              },
            },
          ]}
        />
      </Layout>
      <Layout margin={{ bottom: 2 }}>
        <DropDownMenuWrapper
          items={[
            {
              label: "Games",
              figure: {
                icon: SVGAsset.NavGames,
              },
            },
            {
              label: "Channels",
              figure: {
                icon: SVGAsset.NavChannels,
              },
            },
            {
              label: "Creative",
              figure: {
                icon: SVGAsset.NavCreative,
              },
            },
            {
              label: "Language",
              figure: {
                icon: SVGAsset.Global,
              },
              actionIcon: SVGAsset.AngleRight,
              value: "EN",
            },
            {
              label: "Developers",
              figure: {
                icon: SVGAsset.Extensions,
              },
              actionIcon: SVGAsset.Popout,
            },
            {
              label: "Merchandise",
              figure: {
                icon: SVGAsset.Crate,
              },
              actionIcon: SVGAsset.Externallink,
            },
          ]}
        />
      </Layout>
      <DropDownMenuWrapper size={BalloonSize.Auto}>
        <div style={{ whiteSpace: "nowrap" }}>
          <DropDownMenuItem
            label="Viewers (High to Low)"
            figure={{ icon: SVGAsset.SortDescending }}
            selected
          />
          <DropDownMenuItem
            label="Viewers (Low to High)"
            figure={{ icon: SVGAsset.SortAscending }}
          />
          <DropDownMenuItem
            label="Recently Started"
            figure={{ icon: SVGAsset.GlyphLength }}
          />
          <DropDownMenuItem
            label="Recommended for You"
            figure={{ icon: SVGAsset.NavCreative }}
          />
        </div>
      </DropDownMenuWrapper>
    </div>
    <div>
      <Layout margin={{ bottom: 2 }}>
        <DropDownMenuWrapper
          maxHeight="40vh"
          items={[
            {
              label: "English",
              type: DropDownMenuInputItemType.CheckBox,
              name: "language-select",
            },
            {
              label: "Dansk",
              type: DropDownMenuInputItemType.CheckBox,
              name: "language-select",
            },
            {
              label: "Deutsch",
              type: DropDownMenuInputItemType.CheckBox,
              name: "language-select",
            },
            {
              label: "Español",
              type: DropDownMenuInputItemType.CheckBox,
              name: "language-select",
            },
            {
              label: "Français",
              type: DropDownMenuInputItemType.CheckBox,
              name: "language-select",
            },
            {
              label: "Italiano",
              type: DropDownMenuInputItemType.CheckBox,
              name: "language-select",
            },
            {
              label: "Magyar",
              type: DropDownMenuInputItemType.CheckBox,
              name: "language-select",
            },
            {
              label: "Nederlands",
              type: DropDownMenuInputItemType.CheckBox,
              name: "language-select",
            },
            {
              label: "Norsk",
              type: DropDownMenuInputItemType.CheckBox,
              name: "language-select",
            },
            {
              label: "Polski",
              type: DropDownMenuInputItemType.CheckBox,
              name: "language-select",
            },
            {
              label: "Português",
              type: DropDownMenuInputItemType.CheckBox,
              name: "language-select",
            },
            {
              label: "Română",
              type: DropDownMenuInputItemType.CheckBox,
              name: "language-select",
            },
            {
              label: "Slovenčina",
              type: DropDownMenuInputItemType.CheckBox,
              name: "language-select",
            },
            {
              label: "Suomi",
              type: DropDownMenuInputItemType.CheckBox,
              name: "language-select",
            },
            {
              label: "Svenska",
              type: DropDownMenuInputItemType.CheckBox,
              name: "language-select",
            },
            {
              label: "Tiếng Việt",
              type: DropDownMenuInputItemType.CheckBox,
              name: "language-select",
            },
            {
              label: "Türkçe",
              type: DropDownMenuInputItemType.CheckBox,
              name: "language-select",
            },
            {
              label: "Čeština",
              type: DropDownMenuInputItemType.CheckBox,
              name: "language-select",
            },
            {
              label: "Ελληνικά",
              type: DropDownMenuInputItemType.CheckBox,
              name: "language-select",
            },
            {
              label: "Български",
              type: DropDownMenuInputItemType.CheckBox,
              name: "language-select",
            },
            {
              label: "Русский",
              type: DropDownMenuInputItemType.CheckBox,
              name: "language-select",
            },
            {
              label: "العربية",
              type: DropDownMenuInputItemType.CheckBox,
              name: "language-select",
            },
            {
              label: "ภาษาไทย",
              type: DropDownMenuInputItemType.CheckBox,
              name: "language-select",
            },
            {
              label: "中文",
              type: DropDownMenuInputItemType.CheckBox,
              name: "language-select",
            },
            {
              label: "中文(粵語)",
              type: DropDownMenuInputItemType.CheckBox,
              name: "language-select",
            },
            {
              label: "日本語",
              type: DropDownMenuInputItemType.CheckBox,
              name: "language-select",
            },
            {
              label: "한국어",
              type: DropDownMenuInputItemType.CheckBox,
              name: "language-select",
            },
          ]}
        />
      </Layout>
      <Layout margin={{ bottom: 2 }}>
        <DropDownMenuWrapper
          size={BalloonSize.Auto}
          items={[
            {
              label: "PS4",
              type: DropDownMenuInputItemType.Toggle,
              name: "console-1",
            },
            {
              label: "Xbox",
              type: DropDownMenuInputItemType.Toggle,
              name: "console-1",
            },
            {
              label: "PC",
              type: DropDownMenuInputItemType.Toggle,
              name: "console-1",
              checked: true,
              disabled: true,
            },
          ]}
        />
      </Layout>
      <Layout margin={{ bottom: 2 }}>
        <DropDownMenuWrapper
          items={[
            {
              label: "PS4",
              type: DropDownMenuInputItemType.Toggle,
              name: "console-2",
            },
            {
              label: "Xbox",
              type: DropDownMenuInputItemType.Toggle,
              name: "console-2",
            },
            {
              label: "PC",
              type: DropDownMenuInputItemType.Toggle,
              name: "console-2",
              checked: true,
              disabled: true,
            },
          ]}
        />
      </Layout>
      <DropDownMenuWrapper
        items={[
          {
            label: "PS4",
            type: DropDownMenuInputItemType.Toggle,
            name: "console-3",
            figure: { icon: SVGAsset.NavGames },
          },
          {
            label: "Xbox",
            type: DropDownMenuInputItemType.Toggle,
            name: "console-3",
            figure: { icon: SVGAsset.NavGames },
          },
          {
            label: "PC",
            type: DropDownMenuInputItemType.Toggle,
            name: "console-3",
            figure: { icon: SVGAsset.NavGames },
          },
        ]}
      />
    </div>
    <div>
      <Layout margin={{ bottom: 2 }}>
        <DropDownMenuWrapper
          items={[
            {
              label: "PS4",
              type: DropDownMenuInputItemType.CheckBox,
              name: "console-4",
            },
            {
              label: "Xbox",
              type: DropDownMenuInputItemType.CheckBox,
              name: "console-4",
            },
            {
              label: "PC",
              type: DropDownMenuInputItemType.CheckBox,
              name: "console-4",
            },
          ]}
        />
      </Layout>
      <Layout margin={{ bottom: 2 }}>
        <DropDownMenuWrapper
          items={[
            {
              label: "PS4",
              type: DropDownMenuInputItemType.CheckBox,
              name: "console-5",
              figure: { icon: SVGAsset.NavGames },
            },
            {
              label: "Xbox",
              type: DropDownMenuInputItemType.CheckBox,
              name: "console-5",
              figure: { icon: SVGAsset.NavGames },
            },
            {
              label: "PC",
              type: DropDownMenuInputItemType.CheckBox,
              name: "console-5",
              figure: { icon: SVGAsset.NavGames },
            },
          ]}
        />
      </Layout>
      <Layout margin={{ bottom: 2 }}>
        <DropDownMenuWrapper
          items={[
            {
              label: "PS4",
              type: DropDownMenuInputItemType.Radio,
              name: "console-6",
            },
            {
              label: "Xbox",
              type: DropDownMenuInputItemType.Radio,
              name: "console-6",
            },
            {
              label: "PC",
              type: DropDownMenuInputItemType.Radio,
              name: "console-6",
            },
          ]}
        />
      </Layout>
      <Layout margin={{ bottom: 2 }}>
        <DropDownMenuWrapper
          items={[
            {
              label: "Aatrox",
              type: DropDownMenuInputItemType.CheckBox,
              figure: {
                alt: "Aatrox avatar",
                src: ExampleCharacters.aatrox,
              },
            },
            {
              label: "Ashe",
              type: DropDownMenuInputItemType.CheckBox,
              figure: {
                alt: "Ashe avatar",
                src: ExampleCharacters.ashe,
              },
            },
            {
              label: "Caitlyn",
              type: DropDownMenuInputItemType.CheckBox,
              figure: {
                alt: "Caitlyn avatar",
                src: ExampleCharacters.caitlyn,
              },
            },
            {
              label: "Dr. Mundo",
              type: DropDownMenuInputItemType.CheckBox,
              figure: {
                alt: "Dr. Mundo avatar",
                src: ExampleCharacters.drmundo,
              },
            },
            {
              label: "Fiora",
              type: DropDownMenuInputItemType.CheckBox,
              figure: {
                alt: "Fiora avatar",
                src: ExampleCharacters.fiora,
              },
            },
          ]}
        />
      </Layout>
      <Layout margin={{ bottom: 2 }}>
        <DropDownMenuWrapper
          items={[
            {
              label: "PS4",
              type: DropDownMenuInputItemType.Radio,
              name: "console-7",
              figure: { icon: SVGAsset.NavGames },
            },
            {
              label: "Xbox",
              type: DropDownMenuInputItemType.Radio,
              name: "console-7",
              figure: { icon: SVGAsset.NavGames },
            },
            {
              label: "PC",
              type: DropDownMenuInputItemType.Radio,
              name: "console-7",
              figure: { icon: SVGAsset.NavGames },
            },
          ]}
        />
      </Layout>
      <Layout margin={{ bottom: 2 }}>
        <DropDownMenuWrapper
          items={[
            {
              label: "Aatrox",
              type: DropDownMenuInputItemType.CheckBox,
              hint: "This is hint text for this item",
              figure: {
                alt: "Aatrox avatar",
                src: ExampleCharacters.aatrox,
              },
            },
            {
              label: "Ashe",
              type: DropDownMenuInputItemType.CheckBox,
              hint:
                "Some hint text could be longer or shorter, depending on the hint",
              figure: {
                alt: "Ashe avatar",
                src: ExampleCharacters.ashe,
              },
            },
            {
              label: "Caitlyn",
              type: DropDownMenuInputItemType.CheckBox,
              hint: "Beep boop hello",
              figure: {
                alt: "Caitlyn avatar",
                src: ExampleCharacters.caitlyn,
              },
            },
            {
              label: "Dr. Mundo",
              type: DropDownMenuInputItemType.CheckBox,
              hint: "Mundo means world in spanish",
              figure: {
                alt: "Dr. Mundo avatar",
                src: ExampleCharacters.drmundo,
              },
            },
            {
              label: "Fiora",
              type: DropDownMenuInputItemType.CheckBox,
              hint:
                "Some hint text could be longer or shorter, depending on the hint",
              figure: {
                alt: "Fiora avatar",
                src: ExampleCharacters.fiora,
              },
            },
          ]}
        />
      </Layout>
    </div>
  </CombinationGenerator>
);

export const overlay = () => (
  <OverlayPreview defaultBg={ExampleBG.Photo2}>
    <Layout margin={{ bottom: 2 }}>
      <DropDownMenuWrapper
        items={[
          {
            label: "Games",
            figure: {
              icon: SVGAsset.NavGames,
            },
          },
          {
            label: "Channels",
            figure: {
              icon: SVGAsset.NavChannels,
            },
          },
          {
            label: "Creative",
            selected: true,
            figure: {
              icon: SVGAsset.NavCreative,
            },
          },
        ]}
      />
    </Layout>
  </OverlayPreview>
);

export const destructiveItems = () => (
  <DropDownMenuWrapper>
    <DropDownMenuItem figure={{ icon: SVGAsset.Webcam }}>
      Watch Now
    </DropDownMenuItem>
    <DropDownMenuSeparator />
    <DropDownMenuItem
      figure={{ icon: SVGAsset.Ban }}
      variant={InteractableType.Alert}
    >
      Block NoYeahOkaySure
    </DropDownMenuItem>
  </DropDownMenuWrapper>
);

export const AttachedDropDownMenuExample = () => (
  <>
    <ExampleRelativeContainer>
      <AttachedDropDownMenu show direction={BalloonDirection.BottomRight}>
        <DropDownMenuItem figure={{ icon: SVGAsset.Global }}>
          Language
        </DropDownMenuItem>
        <DropDownMenuItem figure={{ icon: SVGAsset.Friends }}>
          Friends
        </DropDownMenuItem>
        <DropDownMenuItem figure={{ icon: SVGAsset.Star }}>
          Subscriptions
        </DropDownMenuItem>
        <DropDownMenuItem figure={{ icon: SVGAsset.Crate }}>
          Inventory
        </DropDownMenuItem>
      </AttachedDropDownMenu>
    </ExampleRelativeContainer>
  </>
);

const ExampleRelativeContainer: FC = ({ children }) => (
  <InjectLayout
    background={Background.Alt}
    display={Display.Flex}
    alignItems={AlignItems.Start}
    justifyContent={JustifyContent.End}
    padding={1}
  >
    <div style={{ width: 300, height: 200 }}>
      <Layout border background={Background.Alt2} position={Position.Relative}>
        <SplitButton dropdown={{}} children="Example" />
        {children}
      </Layout>
    </div>
  </InjectLayout>
);
