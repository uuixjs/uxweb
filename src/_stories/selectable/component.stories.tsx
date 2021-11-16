import * as React from "react";

import {
  AlignItems,
  Avatar,
  Background,
  BorderRadius,
  ButtonIcon,
  ChannelStatusTextIndicator,
  CoreImage,
  CoreText,
  Cursor,
  Display,
  FontSize,
  InjectLayout,
  Layout,
  Position,
  SVGAsset,
  Selectable,
  SelectableProps,
  SelectableType,
  TextAlign,
  Title,
  TitleSize,
} from "v2";
import {
  CombinationGenerator,
  CombinationMode,
} from "../components/combination-generator";

import { ExampleSection } from "../components/example-section";
import { OverlayPreview } from "../components/overlay-preview";

export default { title: Selectable.displayName };

const PLACEHOLDER_IMG_URL = "https://placehold.jp/e6e6ea/53535f/200x200.jpg";

const requiredProps = {
  type: SelectableType.Checkbox,
  label: "Test",
  alt: "Test",
};

const renderExamples = ({
  borderRadius,
  children,
}: Pick<SelectableProps, "borderRadius" | "overlay" | "children">) => {
  const child = children ? (
    children
  ) : (
    <CoreImage src={PLACEHOLDER_IMG_URL} alt="Required alternative text." />
  );

  return (
    <>
      <CombinationGenerator
        mode={CombinationMode.Simple}
        fields={[
          {
            propKey: "type",
            propEnum: SelectableType,
            propEnumName: "SelectableType",
          },
        ]}
      >
        <Selectable
          {...requiredProps}
          borderRadius={borderRadius}
          name="selectable-checkbox"
        >
          {child}
        </Selectable>
        <Selectable
          {...requiredProps}
          borderRadius={borderRadius}
          name="selectable-checkbox"
        >
          {child}
        </Selectable>
        <Selectable
          {...requiredProps}
          borderRadius={borderRadius}
          name="selectable-checkbox"
        >
          {child}
        </Selectable>
      </CombinationGenerator>
      <ExampleSection label="Programmatically Checked">
        <Layout display={Display.InlineFlex}>
          <Layout margin={{ right: 2 }}>
            <Layout margin={{ bottom: 1 }}>
              <Title size={TitleSize.ExtraSmall}>SelectableType.Checkbox</Title>
            </Layout>
            <Layout display={Display.InlineFlex}>
              <Selectable
                {...requiredProps}
                borderRadius={borderRadius}
                checked
                name="selectable-checkbox-2"
              >
                {child}
              </Selectable>
            </Layout>
          </Layout>
          <div>
            <Layout margin={{ bottom: 1 }}>
              <Title size={TitleSize.ExtraSmall}>SelectableType.Radio</Title>
            </Layout>
            <Layout display={Display.InlineFlex}>
              <Selectable
                {...requiredProps}
                borderRadius={borderRadius}
                checked
                name="selectable-checkbox-2"
              >
                {child}
              </Selectable>
            </Layout>
          </div>
        </Layout>
      </ExampleSection>
      <ExampleSection label="Error State">
        <Layout display={Display.InlineFlex}>
          <Layout margin={{ right: 2 }}>
            <Layout margin={{ bottom: 1 }}>
              <Title size={TitleSize.ExtraSmall}>SelectableType.Checkbox</Title>
            </Layout>
            <Layout display={Display.InlineFlex}>
              <Selectable
                {...requiredProps}
                borderRadius={borderRadius}
                error
                name="selectable-checkbox-3"
              >
                {child}
              </Selectable>
            </Layout>
          </Layout>
          <div>
            <Layout margin={{ bottom: 1 }}>
              <Title size={TitleSize.ExtraSmall}>SelectableType.Radio</Title>
            </Layout>
            <Layout display={Display.InlineFlex}>
              <Selectable
                {...requiredProps}
                borderRadius={borderRadius}
                type={SelectableType.Radio}
                error
                name="selectable-checkbox-3"
              >
                {child}
              </Selectable>
            </Layout>
          </div>
        </Layout>
      </ExampleSection>
    </>
  );
};

export const imageExamples = () => renderExamples({});

export const imageWithTextExamples = () => (
  <div style={{ display: "flex" }}>
    <Layout textAlign={TextAlign.Center} margin={{ right: 2 }}>
      <Selectable
        type={SelectableType.Checkbox}
        name="selectable-checkbox"
        id="with-text"
      >
        <CoreImage
          src="https://static-cdn.jtvnw.net/ttv-boxart/StarCraft%20II-95x127.jpg"
          alt="Required alternative text."
        />
      </Selectable>
      <InjectLayout cursor={Cursor.Pointer}>
        <label htmlFor="with-text">Starcraft 2</label>
      </InjectLayout>
    </Layout>
    <Layout textAlign={TextAlign.Center} margin={{ right: 2 }}>
      <Selectable
        type={SelectableType.Checkbox}
        name="selectable-checkbox"
        id="with-text"
        checked
      >
        <CoreImage
          src="https://static-cdn.jtvnw.net/ttv-boxart/StarCraft%20II-95x127.jpg"
          alt="Required alternative text."
        />
      </Selectable>
      <InjectLayout cursor={Cursor.Pointer}>
        <label htmlFor="with-text">Starcraft 2</label>
      </InjectLayout>
    </Layout>
    <Layout textAlign={TextAlign.Center}>
      <Selectable
        type={SelectableType.Checkbox}
        name="selectable-checkbox"
        id="with-text"
        error
      >
        <CoreImage
          src="https://static-cdn.jtvnw.net/ttv-boxart/StarCraft%20II-95x127.jpg"
          alt="Required alternative text."
        />
      </Selectable>
      <InjectLayout cursor={Cursor.Pointer}>
        <label htmlFor="with-text">Starcraft 2</label>
      </InjectLayout>
    </Layout>
  </div>
);

export const avatarExamples = () =>
  renderExamples({
    borderRadius: BorderRadius.Rounded,
    children: <Avatar alt="Demo alt text" size={96} userLogin={null} />,
  });

export const cardExamples = () =>
  renderExamples({
    borderRadius: BorderRadius.Large,
    children: (
      <Layout
        display={Display.Flex}
        padding={1}
        alignItems={AlignItems.Center}
        background={Background.Base}
      >
        <Layout flexGrow={0} flexShrink={0}>
          <img src="https://static-cdn.jtvnw.net/ttv-boxart/StarCraft%20II-95x127.jpg" />
        </Layout>

        <Layout flexGrow={1} flexShrink={1} margin={{ left: 1, right: 5 }}>
          <CoreText fontSize={FontSize.Size5}>
            Call of Duty: Modern Warfare
          </CoreText>
          <CoreText>127k Viewers</CoreText>
        </Layout>
        <Layout position={Position.Absolute} padding={1} attachTop attachRight>
          <ChannelStatusTextIndicator label="Live" />
        </Layout>
        <Layout
          position={Position.Absolute}
          padding={1}
          attachBottom
          attachRight
        >
          <ButtonIcon aria-label="aria label" icon={SVGAsset.NavMore} />
        </Layout>
      </Layout>
    ),
  });

export const overlayExamples = () => (
  <OverlayPreview>{renderExamples({ overlay: true })}</OverlayPreview>
);
