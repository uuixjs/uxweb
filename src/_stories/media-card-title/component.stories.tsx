import * as React from "react";
import { FC } from "react";
import {
  InjectLayout,
  Layout,
  MediaCardTitle,
  MediaCardTitleProps,
  SVG,
  SVGAsset,
  SVGType,
  Title,
} from "v2";

export default { title: "MediaCardTitle" };

export const TextVsLinks: FC = () => (
  <>
    <Layout margin={{ bottom: 1 }}>
      <MediaCardTitle>This title is just plain text</MediaCardTitle>
    </Layout>

    <Layout margin={{ bottom: 1 }}>
      <MediaCardTitle linkTo="#">This title is a hyperlink</MediaCardTitle>
    </Layout>

    <Layout margin={{ bottom: 1 }}>
      <MediaCardTitle
        onClick={() => {
          return null;
        }}
      >
        This title has an onClick event
      </MediaCardTitle>
    </Layout>
  </>
);

export const BadgeSlot: FC = () => (
  <MediaCardTitle
    badge={
      <SVG
        asset={SVGAsset.Verified}
        width={16}
        height={16}
        type={SVGType.Brand}
      />
    }
  >
    This badge appears next to the title:
  </MediaCardTitle>
);

export const TextOverflowBehavior: FC = () => (
  <>
    <ExampleTitle>With plain text only</ExampleTitle>
    <TextOverflowExample />

    <ExampleTitle>With "a" tags</ExampleTitle>
    <TextOverflowExample linkTo="#" />

    <ExampleTitle>With "button" tags</ExampleTitle>
    <TextOverflowExample onClick={() => null} />
  </>
);

const ExampleTitle: FC = (props) => (
  <Layout margin={{ y: 2 }}>
    <Title>{props.children}</Title>
  </Layout>
);

const TextOverflowExample: FC<Partial<MediaCardTitleProps>> = (props) => (
  <>
    <InjectLayout border margin={{ bottom: 1 }}>
      <div style={{ width: 200 }}>
        <MediaCardTitle {...props}>
          Default: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </MediaCardTitle>
      </div>
    </InjectLayout>

    <InjectLayout border margin={{ bottom: 1 }}>
      <div style={{ width: 200 }}>
        <MediaCardTitle {...props} lines={1}>
          1 line: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </MediaCardTitle>
      </div>
    </InjectLayout>

    <InjectLayout border margin={{ bottom: 1 }}>
      <div style={{ width: 200 }}>
        <MediaCardTitle {...props} lines={2}>
          2 lines: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </MediaCardTitle>
      </div>
    </InjectLayout>
  </>
);
