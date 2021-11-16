import * as React from "react";

import {
  AccentRegion,
  AlignItems,
  AlignSelf,
  Aspect,
  AspectRatio,
  Avatar,
  Background,
  BorderRadius,
  Button,
  ButtonIcon,
  ButtonIconSize,
  ButtonType,
  ChannelStatusTextIndicator,
  CoreImage,
  CoreLink,
  CoreText,
  Display,
  FlexDirection,
  JustifyContent,
  Layout,
  MediaCard,
  MediaCardImage,
  MediaCardImageProps,
  MediaCardMeta,
  MediaCardMetaProps,
  MediaCardStat,
  Pill,
  Placeholder,
  ProgressBar,
  ProgressBarSize,
  SVG,
  SVGAsset,
  SVGType,
  Tag,
  Title,
  Tower,
  TowerChildWidth,
  TowerGutter,
  TowerProps,
  generateAccentRegionProps,
} from "v2";
import { ExampleAvatars, ExampleBoxArt, ExampleThumbnails } from "../assets";

import { Enum } from "lib";
import { FC } from "react";
import { Outline } from "../components/outline";

export default { title: "MediaCard" };

export const compositionFrame = () => (
  <AccentRegion {...generateAccentRegionProps("#999999")}>
    <ExampleTower>
      {Array.from({ length: 3 }, () => (
        <MediaCard
          image={
            <MediaCardImage
              linkProps={{ linkTo: "#" }}
              image={<Outline />}
              topLeft={<Outline>topLeft</Outline>}
              bottomLeft={<Outline>bottomLeft</Outline>}
              topRight={<Outline>topRight</Outline>}
              bottomRight={<Outline>bottomRight</Outline>}
              cover={
                <Outline>
                  <Layout padding={{ y: 2, x: 4 }}>cover</Layout>
                </Outline>
              }
            />
          }
          meta={
            <MediaCardMeta
              title={<Outline>Optional Title Here</Outline>}
              links={<Outline>Optional Link(s) Here</Outline>}
              menu={<Outline padding={1} />}
              image={
                <Outline padding={0}>
                  <Aspect ratio={AspectRatio.BoxArt} />
                </Outline>
              }
              actions={<Outline>actions</Outline>}
            />
          }
        />
      ))}
    </ExampleTower>
  </AccentRegion>
);

export const withPlaceholders = () => (
  <ExampleTower>
    {Array.from({ length: 3 }, () => (
      <MediaCard
        image={<MediaCardImage image={<Placeholder overlay={false} />} />}
        meta={
          <MediaCardMeta
            image={<Placeholder width={40} height={40} />}
            actions={
              <div>
                <Placeholder width={160} />
                <Placeholder width={100} />
              </div>
            }
          />
        }
      />
    ))}
  </ExampleTower>
);

export const withTags = () => (
  <ExampleTower>
    <MediaCard
      image={<MediaCardImage {...baseImageProps()} {...elementImageProps(0)} />}
      meta={
        <MediaCardMeta
          {...baseMetaProps()}
          {...elementMetaProps(0)}
          actions={renderTags("English")}
        />
      }
    />
    <MediaCard
      image={<MediaCardImage {...baseImageProps()} {...elementImageProps(1)} />}
      meta={
        <MediaCardMeta
          {...baseMetaProps()}
          {...elementMetaProps(1)}
          actions={renderTags("Adventure", "Speedrun", "100%")}
        />
      }
    />
    <MediaCard
      image={<MediaCardImage {...baseImageProps()} {...elementImageProps(2)} />}
      meta={
        <MediaCardMeta
          {...baseMetaProps()}
          {...elementMetaProps(2)}
          actions={renderTags(
            "100%",
            "Educational",
            "Analysis",
            "Engineering",
            "Speedrun",
          )}
        />
      }
    />
  </ExampleTower>
);

export const withTitleBadges = () => (
  <ExampleTower>
    <MediaCard
      image={<MediaCardImage {...baseImageProps()} {...elementImageProps(0)} />}
      meta={
        <MediaCardMeta
          {...baseMetaProps()}
          title={{
            children: "SomeVerifiedStreamer",
            badge: (
              <SVG
                asset={SVGAsset.Verified}
                width={16}
                height={16}
                type={SVGType.Brand}
              />
            ),
          }}
          {...elementMetaProps(0)}
        />
      }
    />
    <MediaCard
      image={<MediaCardImage {...baseImageProps()} {...elementImageProps(1)} />}
      meta={
        <MediaCardMeta
          {...baseMetaProps()}
          title={{ children: "SomeRegularStreamer" }}
          {...elementMetaProps(1)}
        />
      }
    />
  </ExampleTower>
);

export const withMenuButtons = () => (
  <ExampleTower>
    <MediaCard
      image={<MediaCardImage {...baseImageProps()} {...elementImageProps(0)} />}
      meta={
        <MediaCardMeta
          {...baseMetaProps()}
          menu={
            <ButtonIcon
              aria-label="aria label"
              icon={SVGAsset.More}
              size={ButtonIconSize.Small}
            />
          }
        />
      }
    />

    <MediaCard
      image={<MediaCardImage {...baseImageProps()} {...elementImageProps(1)} />}
      meta={
        <MediaCardMeta
          {...baseMetaProps()}
          menu={
            <ButtonIcon
              aria-label="aria label"
              icon={SVGAsset.More}
              size={ButtonIconSize.Small}
            />
          }
          title={{
            linkTo: "#",
            children:
              "Extremely long stream title that goes on for a long time and takes up space",
          }}
          links={[
            { linkTo: "#", children: "RoboRaptor2000" },
            {
              linkTo: "#",
              children:
                "Amazingly long game name that takes up a lot of space and probably gets truncated or wrapped in some way",
            },
          ]}
        />
      }
    />

    <MediaCard
      image={<MediaCardImage {...baseImageProps()} {...elementImageProps(2)} />}
      meta={
        <MediaCardMeta
          {...baseMetaProps()}
          menu={
            <ButtonIcon
              aria-label="aria label"
              icon={SVGAsset.More}
              size={ButtonIconSize.Small}
            />
          }
          title={{
            linkTo: "#",
            children: "Short title",
          }}
        />
      }
    />
  </ExampleTower>
);

export const asVodCards = () => (
  <ExampleTower>
    <MediaCard
      image={
        <MediaCardImage
          {...baseImageProps()}
          {...elementImageProps(0)}
          topLeft={<MediaCardStat children="1:23:45" icon={SVGAsset.Play} />}
          bottomLeft={<MediaCardStat children="123 views" />}
          bottomRight={<MediaCardStat children="6 hours ago" />}
        />
      }
      meta={
        <MediaCardMeta
          {...baseMetaProps()}
          links={undefined}
          image={
            <CoreLink linkTo="#">
              <CoreImage src={boxArts[0]} alt="" />
            </CoreLink>
          }
          actions={
            <Layout margin={{ top: 0.5 }}>
              <Button variant={ButtonType.Secondary} icon={SVGAsset.ViewerList}>
                <Layout display={Display.Flex}>
                  <CoreText>Chapters</CoreText>
                  <Layout margin={{ left: 1 }}>
                    <Pill label="10" />
                  </Layout>
                </Layout>
              </Button>
            </Layout>
          }
        />
      }
    />

    <MediaCard
      image={
        <MediaCardImage
          {...baseImageProps()}
          {...elementImageProps(1)}
          topLeft={<MediaCardStat children="1:23:45" icon={SVGAsset.Play} />}
          bottomLeft={<MediaCardStat children="123 views" />}
          bottomRight={<MediaCardStat children="6 hours ago" />}
          cover={
            <Layout fullWidth alignSelf={AlignSelf.End}>
              <ProgressBar
                size={ProgressBarSize.Small}
                borderRadius={BorderRadius.None}
                mask
                value={50}
              />
            </Layout>
          }
        />
      }
      meta={
        <MediaCardMeta
          {...baseMetaProps()}
          image={
            <CoreLink linkTo="#">
              <CoreImage src={boxArts[1]} alt="" />
            </CoreLink>
          }
        />
      }
    />

    <MediaCard
      image={
        <MediaCardImage
          {...baseImageProps()}
          {...elementImageProps(2)}
          topLeft={<MediaCardStat children="0:35" icon={SVGAsset.Clip} />}
          bottomLeft={<MediaCardStat children="123 views" />}
          bottomRight={<MediaCardStat children="6 hours ago" />}
          cover={
            <Layout
              background={Background.Overlay}
              fullWidth
              fullHeight
              display={Display.Flex}
              flexDirection={FlexDirection.Column}
              justifyContent={JustifyContent.Center}
              alignItems={AlignItems.Center}
            >
              <CoreText>Watch with All-Access Pass</CoreText>
              <Button>Get It Now</Button>
            </Layout>
          }
        />
      }
      meta={
        <MediaCardMeta
          {...baseMetaProps()}
          image={
            <CoreLink linkTo="#">
              <CoreImage src={boxArts[2]} alt="" />
            </CoreLink>
          }
        />
      }
    />
  </ExampleTower>
);

export const asBoxArtCards = () => (
  <ExampleTower childWidth={TowerChildWidth.Small}>
    {Array.from({ length: 5 }, (_, index) => (
      <MediaCard
        image={<MediaCardImage {...boxArtImageProps(index)} />}
        meta={<MediaCardMeta {...boxArtMetaProps()} />}
      />
    ))}
  </ExampleTower>
);

export const textOverflowBehavior = () => (
  <>
    <ExampleTitle>With "a" tags"</ExampleTitle>
    <ExampleTower childWidth={TowerChildWidth.Medium}>
      <MediaCard
        image={
          <MediaCardImage {...baseImageProps()} {...elementImageProps(0)} />
        }
        meta={
          <MediaCardMeta
            {...baseMetaProps()}
            title={{
              linkTo: "#",
              lines: 2,
              children:
                "Two Lines: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
            }}
            links={[
              {
                linkTo: "#",
                children:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              },
              {
                linkTo: "#",
                children:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              },
            ]}
            {...elementMetaProps(0)}
          />
        }
      />
      <MediaCard
        image={
          <MediaCardImage {...baseImageProps()} {...elementImageProps(0)} />
        }
        meta={
          <MediaCardMeta
            {...baseMetaProps()}
            title={{
              linkTo: "#",
              children:
                "One Line: Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            }}
            links={[
              {
                linkTo: "#",
                children:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              },
              {
                linkTo: "#",
                children:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              },
            ]}
          />
        }
      />
      <MediaCard
        image={
          <MediaCardImage {...baseImageProps()} {...elementImageProps(0)} />
        }
        meta={
          <MediaCardMeta
            {...baseMetaProps()}
            menu={
              <ButtonIcon
                aria-label="aria label"
                icon={SVGAsset.More}
                size={ButtonIconSize.Small}
              />
            }
            title={{
              linkTo: "#",
              children:
                "One Line: Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              badge: (
                <SVG
                  asset={SVGAsset.Verified}
                  width={16}
                  height={16}
                  type={SVGType.Brand}
                />
              ),
            }}
            links={[
              {
                linkTo: "#",
                children:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              },
              {
                linkTo: "#",
                children:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              },
            ]}
          />
        }
      />
    </ExampleTower>

    <ExampleTitle>With "button" tags</ExampleTitle>
    <ExampleTower childWidth={TowerChildWidth.Medium}>
      <MediaCard
        image={
          <MediaCardImage {...baseImageProps()} {...elementImageProps(0)} />
        }
        meta={
          <MediaCardMeta
            {...baseMetaProps()}
            title={{
              onClick: () => undefined,
              lines: 2,
              children:
                "Two Lines: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
            }}
            links={[
              {
                onClick: () => undefined,
                children:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              },
              {
                onClick: () => undefined,
                children:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              },
            ]}
            {...elementMetaProps(0)}
          />
        }
      />
      <MediaCard
        image={
          <MediaCardImage {...baseImageProps()} {...elementImageProps(0)} />
        }
        meta={
          <MediaCardMeta
            {...baseMetaProps()}
            title={{
              onClick: () => undefined,
              children:
                "One Line: Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            }}
            links={[
              {
                onClick: () => undefined,
                children:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              },
              {
                onClick: () => undefined,
                children:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              },
            ]}
          />
        }
      />
      <MediaCard
        image={
          <MediaCardImage {...baseImageProps()} {...elementImageProps(0)} />
        }
        meta={
          <MediaCardMeta
            {...baseMetaProps()}
            menu={
              <ButtonIcon
                aria-label="aria label"
                icon={SVGAsset.More}
                size={ButtonIconSize.Small}
              />
            }
            title={{
              onClick: () => undefined,
              children:
                "One Line: Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              badge: (
                <SVG
                  asset={SVGAsset.Verified}
                  width={16}
                  height={16}
                  type={SVGType.Brand}
                />
              ),
            }}
            links={[
              {
                onClick: () => undefined,
                children:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              },
              {
                onClick: () => undefined,
                children:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              },
            ]}
          />
        }
      />
    </ExampleTower>
  </>
);

const baseImageProps = (): MediaCardImageProps => ({
  linkProps: { linkTo: "#" },
  image: null,
});

const elementImageProps = (id: number): MediaCardImageProps => {
  const thumbs = Enum.values(ExampleThumbnails);

  return {
    image: <CoreImage src={thumbs[id % thumbs.length]} alt="" />,
    topLeft: <ChannelStatusTextIndicator label="Live" />,
    bottomLeft: <MediaCardStat>123 Viewers</MediaCardStat>,
  };
};

const baseMetaProps = (): MediaCardMetaProps => ({
  title: {
    linkTo: "#",
    children: "Super creative stream title",
  },
  links: [
    { linkTo: "#", children: "RoboRaptor2000" },
    { linkTo: "#", children: "Overwatch" },
  ],
});

const elementMetaProps = (id: number): MediaCardMetaProps => {
  const images = Enum.values(ExampleAvatars);

  return {
    image: (
      <CoreLink linkTo="#">
        <Avatar
          alt=""
          src={images[id % images.length]}
          size={40}
          userLogin={`username-${id}`}
        />
      </CoreLink>
    ),
  };
};

const boxArtImageProps = (index: number): MediaCardImageProps => ({
  linkProps: { linkTo: "#" },
  ratio: AspectRatio.BoxArt,
  image: <CoreImage src={boxArts[index]} alt="" />,
});

const boxArtMetaProps = (): MediaCardMetaProps => ({
  title: {
    children: "Legend of Zelda: Links Awakening",
    linkTo: "#",
  },
  links: { children: "1.2K viewers", linkTo: "#" },
  actions: renderTags("Adventure Games"),
});

const ExampleTower: FC<TowerProps> = (props) => (
  <Tower
    childWidth={TowerChildWidth.Large}
    gutterSize={TowerGutter.ExtraSmall}
    placeholderItems={20}
    {...props}
  />
);

const ExampleTitle: FC = (props) => (
  <Layout margin={{ y: 2 }}>
    <Title>{props.children}</Title>
  </Layout>
);

const renderTags = (...words: string[]) => {
  return words.map((word, index) => (
    <Layout
      key={index}
      margin={{ right: 0.5, bottom: 0.5 }}
      display={Display.InlineBlock}
    >
      <Tag label={word} />
    </Layout>
  ));
};

const boxArts = [
  ExampleBoxArt.zelda,
  ExampleBoxArt.overcooked,
  ExampleBoxArt.luigi,
  ExampleBoxArt.league,
  ExampleBoxArt.missing,
];
