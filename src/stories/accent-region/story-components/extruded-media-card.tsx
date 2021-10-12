import * as React from "react";

import {
  AlignItems,
  Aspect,
  CoreImage,
  Display,
  HoverAccentEffect,
  JustifyContent,
  Layout,
} from "v2";

import { ExampleThumbnails } from "../../assets";
import { FC } from "react";

export const ExtrudedMediaCard: FC<{ show?: boolean; src?: string }> = ({
  show,
  src,
}) => (
  <Layout fullWidth>
    <HoverAccentEffect show={show}>
      <Aspect>
        <Layout
          display={Display.Flex}
          alignItems={AlignItems.Center}
          justifyContent={JustifyContent.Center}
        >
          <CoreImage src={src || ExampleThumbnails.missing} alt="" />
        </Layout>
      </Aspect>
    </HoverAccentEffect>
  </Layout>
);
