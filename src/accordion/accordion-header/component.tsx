import { Align, Aspect, AspectRatio } from "../../aspect";
import {
  AlignItems,
  Background,
  BorderRadiusProps,
  Color,
  Display,
  FlexDirection,
  InjectLayout,
  JustifyContent,
  Layout,
  Overflow,
  Position,
  ZIndex,
} from "../../layout";
import { Component, MouseEvent } from "react";
import { CoreImage, CoreImageProps } from "../../core-image";
import { CoreText, TextType } from "../../core-text";
import {
  ExpandableIndicator,
  ExpandableIndicatorDirection,
} from "../../expandable-indicator";
import { PaddingValue, getAriaProps, styled } from "lib";
import { Title, TitleSize } from "../../title";

import { Interactable } from "../../interactable";

export enum AccordionHeaderSize {
  Default = "default",
  Narrow = "narrow",
}

export interface AccordionDefaultHeaderProps {
  index?: number;
  /**
   * @example What is thy bidding?
   */
  title: string;
  /**
   * @example Reach 10 followers
   */
  description?: string;
  isOpen?: boolean;
  onClick?: (event: MouseEvent<HTMLElement>, index?: number) => void;
  imageProps?: CoreImageProps;
  imageRatio?: AspectRatio.Aspect1x1 | AspectRatio.Aspect3x4;
  backgroundImageProps?: CoreImageProps;
  imageLabelOverlay?: string;
  label?: string;
  borderRadius?: BorderRadiusProps;
  size?: AccordionHeaderSize.Default;
}

export interface AccordionNarrowHeaderProps {
  index?: number;
  title: string;
  isOpen?: boolean;
  onClick?: (event: MouseEvent<HTMLElement>, index?: number) => void;
  borderRadius?: BorderRadiusProps;
  size: AccordionHeaderSize.Narrow;
}

const defaultHeight = "8rem";
const narrowHeight = "5rem";

const ScAccordionHeaderContents = styled(Layout)<{
  $size: AccordionHeaderSize;
}>(({ $size }) =>
  $size && $size === AccordionHeaderSize.Default
    ? `min-height: ${defaultHeight};`
    : `height: ${narrowHeight};`,
);

const ScAccordionHeaderImageContainer = styled(Layout)<{
  $ratio: AccordionDefaultHeaderProps["imageRatio"];
}>(({ $ratio }) =>
  $ratio && $ratio === AspectRatio.Aspect3x4
    ? `min-width: calc(${defaultHeight} * (3/4));`
    : `min-width: ${defaultHeight};`,
);

const ScAccordionHeaderBackgroundImage = styled(CoreImage)`
  opacity: 0.5;
  object-fit: cover;
  object-position: center;
`;

export type AccordionHeaderProps =
  | AccordionDefaultHeaderProps
  | AccordionNarrowHeaderProps;

/**
 * An AccordionHeader is an interactable region which should be used to toggle
 * the visibility of additional information.
 */
export class AccordionHeader extends Component<AccordionHeaderProps, {}> {
  public render() {
    return (
      <Layout
        className="accordion-header"
        background={Background.Base}
        elevation={1}
        position={Position.Relative}
        borderRadius={this.props.borderRadius}
        {...getAriaProps(this.props)}
      >
        {this.renderBackgroundImage()}

        <Interactable
          onClick={this.onClick}
          aria-expanded={this.props.isOpen}
          borderRadius={this.props.borderRadius}
        >
          <ScAccordionHeaderContents
            $size={
              this.props.size === AccordionHeaderSize.Default ||
              this.props.size === undefined
                ? AccordionHeaderSize.Default
                : AccordionHeaderSize.Narrow
            }
            display={Display.Flex}
            position={Position.Relative}
            borderRadius={this.props.borderRadius}
            overflow={Overflow.Hidden}
          >
            {this.renderImageAndLabel()}
            {this.renderTitles()}
            {this.renderLabel()}
            {this.renderCaret()}
          </ScAccordionHeaderContents>
        </Interactable>
      </Layout>
    );
  }

  private getYPadding = (): PaddingValue => {
    if (isAccordionHeaderNarrowProps(this.props)) {
      return 2;
    }
    return this.props.description ? 2 : 3;
  };

  private renderCaret = () => {
    return (
      <Layout
        flexGrow={0}
        flexShrink={0}
        display={Display.Flex}
        alignItems={AlignItems.Center}
        justifyContent={JustifyContent.Center}
        padding={{ y: this.getYPadding(), right: 2 }}
      >
        <ExpandableIndicator
          open={this.props.isOpen}
          openDirection={ExpandableIndicatorDirection.Up}
          closedDirection={ExpandableIndicatorDirection.Down}
        />
      </Layout>
    );
  };

  private renderTitles = () => {
    return (
      <Layout
        flexGrow={1}
        flexShrink={1}
        display={Display.Flex}
        flexDirection={FlexDirection.Column}
        alignItems={AlignItems.Start}
        justifyContent={JustifyContent.Center}
        overflow={Overflow.Hidden}
        padding={{ y: this.getYPadding(), left: 2, right: 1 }}
      >
        <Layout fullWidth>
          <Title type={TextType.H3} size={TitleSize.Small} ellipsis>
            {this.props.title}
          </Title>
          {!isAccordionHeaderNarrowProps(this.props) && this.props.description && (
            <CoreText color={Color.Alt2} ellipsis>
              {this.props.description}
            </CoreText>
          )}
        </Layout>
      </Layout>
    );
  };

  private renderBackgroundImage = () => {
    if (isAccordionHeaderNarrowProps(this.props)) {
      return;
    }

    if (!this.props.backgroundImageProps) {
      return;
    }

    return (
      <InjectLayout
        className="accordion-header__background-image"
        position={Position.Absolute}
        attachTop
        attachLeft
        fullWidth
        fullHeight
        borderRadius={this.props.borderRadius}
      >
        <ScAccordionHeaderBackgroundImage
          {...this.props.backgroundImageProps}
        />
      </InjectLayout>
    );
  };

  private renderLabel = () => {
    if (isAccordionHeaderNarrowProps(this.props)) {
      return;
    }

    if (!this.props.label) {
      return;
    }

    return (
      <Layout
        padding={{ right: 2 }}
        flexGrow={1}
        flexShrink={0}
        display={Display.Flex}
        alignItems={AlignItems.Center}
        justifyContent={JustifyContent.End}
      >
        <CoreText>{this.props.label}</CoreText>
      </Layout>
    );
  };

  private renderImageAndLabel = () => {
    if (isAccordionHeaderNarrowProps(this.props)) {
      return;
    }

    if (!this.props.imageProps && !this.props.imageLabelOverlay) {
      return;
    }

    return (
      <ScAccordionHeaderImageContainer
        $ratio={this.props.imageRatio}
        flexGrow={0}
        flexShrink={0}
        background={Background.Alt2}
        position={Position.Relative}
      >
        {this.props.imageLabelOverlay && (
          <Layout
            position={Position.Relative}
            fullHeight
            zIndex={ZIndex.Above}
            display={Display.Flex}
            alignItems={AlignItems.Center}
            justifyContent={JustifyContent.Center}
            padding={1}
            color={this.props.imageProps ? Color.Overlay : Color.Inherit}
            background={this.props.imageProps ? Background.Overlay : undefined}
          >
            <Title>{this.props.imageLabelOverlay}</Title>
          </Layout>
        )}
        {this.props.imageProps && (
          <Layout
            position={Position.Absolute}
            fullWidth
            fullHeight
            attachTop
            attachLeft
            overflow={Overflow.Hidden}
          >
            <Aspect
              ratio={this.props.imageRatio || AspectRatio.Aspect1x1}
              align={Align.Center}
            >
              <CoreImage {...this.props.imageProps} />
            </Aspect>
          </Layout>
        )}
      </ScAccordionHeaderImageContainer>
    );
  };

  private onClick = (event: MouseEvent<HTMLElement>) => {
    if (this.props.onClick !== undefined) {
      this.props.onClick(event, this.props.index);
    }
  };
}

function isAccordionHeaderNarrowProps(
  props: AccordionDefaultHeaderProps | AccordionNarrowHeaderProps,
): props is AccordionNarrowHeaderProps {
  return props.size === AccordionHeaderSize.Narrow;
}
