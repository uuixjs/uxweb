import * as React from "react";

import {
  AspectRatio,
  BorderRadius,
  Column,
  CoreText,
  Display,
  Grid,
  ImageSelector,
  ImageSelectorIconPosition,
  ImageSelectorProps,
  ImageSelectorType,
  Layout,
  SVGAsset,
  TextType,
} from "v2";
import {
  CombinationGenerator,
  CombinationMode,
} from "../../components/combination-generator";
import {
  ExampleAvatars,
  ExampleImageSizes,
  ExampleThumbnails,
} from "../assets";

import { OverlayPreview } from "../../components/overlay-preview";

export default { title: ImageSelector.displayName };

export const examples = () => {
  const requiredProps = {
    type: ImageSelectorType.Checkbox,
    label: "Test",
    alt: "Test",
  };

  return (
    <CombinationGenerator
      mode={CombinationMode.Simple}
      fields={[
        {
          propKey: "type",
          propEnum: ImageSelectorType,
          propEnumName: "ImageSelectorType",
        },
        {
          propKey: "selectedMask",
          propValues: [false, true],
        },
        {
          propKey: "hoverScale",
          propValues: [false, true],
        },
        {
          propKey: "disabled",
          propValues: [false, true],
        },
        {
          propKey: "error",
          propValues: [false, true],
        },
      ]}
    >
      <ImageSelector
        {...requiredProps}
        name="image-selector-checkbox"
        src={ExampleThumbnails.stream1}
      />
      <ImageSelector
        {...requiredProps}
        name="image-selector-checkbox"
        src={ExampleThumbnails.stream2}
      />
      <ImageSelector
        {...requiredProps}
        name="image-selector-checkbox"
        src={ExampleThumbnails.stream3}
      />
    </CombinationGenerator>
  );
};

export const overlay = () => <OverlayPreview>{examples()}</OverlayPreview>;

export const withSelectedIcon = () => {
  const requiredProps = {
    type: ImageSelectorType.Checkbox,
    label: "Test",
    alt: "Test",
    checked: true,
  };

  return (
    <CombinationGenerator
      mode={CombinationMode.Exhaustive}
      fields={[
        {
          propKey: "selectedIcon",
          propValues: [
            true,
            { position: ImageSelectorIconPosition.Center },
            { icon: SVGAsset.Star },
            {
              icon: SVGAsset.Star,
              position: ImageSelectorIconPosition.BottomLeft,
            },
          ],
        },
      ]}
    >
      <ImageSelector
        {...requiredProps}
        name="image-selector-checkbox"
        src={ExampleAvatars.brookeab}
      />
      <ImageSelector
        {...requiredProps}
        name="image-selector-checkbox"
        src={ExampleAvatars.tsmdaequan}
      />
      <ImageSelector
        {...requiredProps}
        name="image-selector-checkbox"
        src={ExampleAvatars.nickmercs}
      />
    </CombinationGenerator>
  );
};

export const withBorderRadius = () => {
  const requiredProps = {
    type: ImageSelectorType.Checkbox,
    label: "Test",
    alt: "Test",
  };

  return (
    <CombinationGenerator
      mode={CombinationMode.Simple}
      fields={[
        {
          propKey: "borderRadius",
          propValues: [
            BorderRadius.None,
            BorderRadius.Small,
            BorderRadius.Medium,
            BorderRadius.Large,
            BorderRadius.Rounded,
          ],
        },
      ]}
    >
      <ImageSelector
        {...requiredProps}
        name="image-selector-checkbox"
        src={ExampleThumbnails.stream1}
      />
      <ImageSelector
        {...requiredProps}
        name="image-selector-checkbox"
        src={ExampleThumbnails.stream2}
      />
      <ImageSelector
        {...requiredProps}
        name="image-selector-checkbox"
        src={ExampleThumbnails.stream3}
      />
    </CombinationGenerator>
  );
};

export const withAspectRatio = () => {
  const requiredProps = {
    type: ImageSelectorType.Checkbox,
    label: "Test",
    alt: "Test",
  };

  return (
    <CombinationGenerator
      mode={CombinationMode.Simple}
      fields={[
        {
          propKey: "ratio",
          propValues: [
            undefined,
            AspectRatio.Aspect16x9,
            AspectRatio.Aspect1x1,
            AspectRatio.BoxArt,
          ],
        },
      ]}
    >
      <ImageSelector
        {...requiredProps}
        name="image-selector-checkbox"
        src={ExampleThumbnails.stream1}
      />
      <ImageSelector
        {...requiredProps}
        name="image-selector-checkbox"
        src={ExampleThumbnails.stream2}
      />
      <ImageSelector
        {...requiredProps}
        name="image-selector-checkbox"
        src={ExampleThumbnails.stream3}
      />
    </CombinationGenerator>
  );
};

export const layoutBehavior = () => (
  <>
    {renderLayoutExamples("Layout Behavior without AspectRatio")}
    {renderLayoutExamples("Layout Behavior with AspectRatio (16x9)", {
      ratio: AspectRatio.Aspect16x9,
    })}
  </>
);

function renderLayoutExamples(
  title: string,
  additionalProps?: Partial<ImageSelectorProps>,
) {
  const props: ImageSelectorProps = {
    type: ImageSelectorType.Checkbox,
    alt: "This image will always fail to load!",
    name: "image-selector-checkbox",
    src: "",
    ...additionalProps,
  };

  return (
    <>
      <CoreText type={TextType.H2}>{title}</CoreText>

      <Layout margin={{ y: 2 }}>
        <Layout margin={{ y: 1 }}>
          <CoreText type={TextType.H4}>
            Layout when images have not loaded:
          </CoreText>
        </Layout>

        <Layout display={Display.Flex}>
          <Layout flexGrow={1}>
            <ImageSelector {...props} />
          </Layout>
          <Layout flexGrow={1}>
            <ImageSelector {...props} />
          </Layout>
          <Layout flexGrow={1}>
            <ImageSelector {...props} />
          </Layout>
        </Layout>
      </Layout>

      <Layout margin={{ y: 2 }}>
        <Layout margin={{ y: 1 }}>
          <CoreText type={TextType.H4}>
            Layout when the container is a different size than image:
          </CoreText>
        </Layout>
        <Grid>
          <Column cols={6}>
            When image is very small:
            <ImageSelector {...props} src={ExampleImageSizes.size50x50} />
          </Column>
          <Column cols={6}>
            When image is very large:
            <ImageSelector {...props} src={ExampleImageSizes.size1280x720} />
          </Column>
        </Grid>
      </Layout>
    </>
  );
}
