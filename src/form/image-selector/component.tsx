import {
  AlignItems,
  Color,
  Display,
  JustifyContent,
  Layout,
  LayoutProps,
  Position,
} from "../../layout";
import { Aspect, AspectRatio } from "../../aspect";
import {
  BorderRadius,
  a11yHide,
  css,
  getAriaProps,
  getBorderRadiusStyles,
  getDataProps,
  hoverCss,
  hoverCssWithSelector,
  newUUIDv4,
  staticTokenRule,
  styleVariant,
  styled,
  themeTokenRule,
} from "lib";
import { CoreImage, CoreImageProps } from "../../core-image";

import { Component } from "react";
import { Icon } from "../../icon";
import { InputControlProps } from "../form";
import { SVGAsset } from "../../svg";
import { getImageProps } from "../../../_utils/image-props";
import { withOverlayContext } from "../../overlay-region/context";

export enum ImageSelectorType {
  Checkbox = "checkbox",
  Radio = "radio",
}

export enum ImageSelectorIconPosition {
  TopLeft = 1,
  TopRight = 2,
  BottomLeft = 3,
  BottomRight = 4,
  Center = 5,
}

export interface ImageSelectorIcon {
  position?: ImageSelectorIconPosition;
  icon?: SVGAsset;
}

export interface ImageSelectorProps extends CoreImageProps, InputControlProps {
  /** Sets the image border radius. */
  borderRadius?: BorderRadius;
  /** ImageSelectors can behave a radio or checkbox controls. */
  type: ImageSelectorType | "checkbox" | "radio"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
  /** Animates image scale on hover. */
  hoverScale?: boolean;
  /** Displays a semi-opaque mask on selected images */
  selectedMask?: boolean;
  /** Displays an icon on selected images. Both icon and position are configurable. Default icon is a circle-check and position is TopRight. */
  selectedIcon?: boolean | ImageSelectorIcon;
  /** Sets the aspect ratio of the image in the selector. */
  ratio?: AspectRatio;
  /** Sets overlay representation */
  overlay?: boolean;
}

interface ScImageSelectorProps {
  fullWidth?: boolean;
}

const ScImageSelector = styled.div<ScImageSelectorProps>`
  width: ${({ fullWidth }) => fullWidth && "100%"};
  position: relative; /* wraps a position: absolute later on */
`;

const ScImageSelectorInput = styled.input`
  ${a11yHide}
`;

interface ScImageSelectorLabelProps {
  borderRadius?: BorderRadius;
  error?: boolean;
  overlay?: boolean;
}

const ScImageSelectorLabel = styled.label<ScImageSelectorLabelProps>`
  display: block;
  position: relative;
  padding: 0.2rem;
  cursor: pointer;
  ${getBorderRadiusStyles}
  border: ${staticTokenRule("border-width-default")} solid
    ${({ error, overlay }) =>
      error
        ? themeTokenRule("color-border-error")
        : overlay
        ? themeTokenRule("color-border-image-selector-overlay")
        : themeTokenRule("color-border-image-selector")};
  box-shadow: ${({ error }) =>
    error
      ? css`inset 0 0 0 0.1rem ${themeTokenRule("color-border-error")}`
      : undefined};

  /* Hover styles */
  ${hoverCss`
    border: ${staticTokenRule("border-width-default")} solid
      ${({ error, overlay }) =>
        error
          ? themeTokenRule("color-border-error")
          : overlay
          ? themeTokenRule("color-border-image-selector-overlay-selected")
          : themeTokenRule("color-border-input-checkbox-checked")};
  `}

  /* Focus styles */
  ${ScImageSelectorInput}[data-focus-visible-added] + && {
    border: ${staticTokenRule("border-width-default")} solid
      ${({ error, overlay }) =>
        error
          ? themeTokenRule("color-border-error")
          : overlay
          ? themeTokenRule("color-border-image-selector-overlay-selected")
          : themeTokenRule("color-border-input-checkbox-checked")};
    box-shadow: 0 0 ${staticTokenRule("border-radius-large")}
      ${({ error, overlay }) =>
        error
          ? themeTokenRule("color-border-error")
          : overlay
          ? themeTokenRule("color-border-image-selector-overlay-selected")
          : themeTokenRule("color-border-input-checkbox-checked")};
  }

  /* Disabled styles */
  ${ScImageSelectorInput}:disabled + && {
    opacity: 0.5;
    pointer-events: none;
  }

  /* Checked styles */
  ${ScImageSelectorInput}:checked + && {
    border: ${staticTokenRule("border-width-default")} solid
      ${({ overlay }) =>
        overlay
          ? themeTokenRule("color-border-image-selector-overlay-selected")
          : themeTokenRule("color-border-input-checkbox-checked")};
    background-color: ${({ overlay }) =>
      overlay
        ? themeTokenRule("color-background-image-selector-overlay")
        : themeTokenRule("color-background-base")};
    box-shadow: inset 0 0 0 0.1rem ${({ overlay }) =>
      overlay
        ? themeTokenRule("color-border-image-selector-overlay-selected")
        : themeTokenRule("color-border-input-checkbox-checked")};
  }

  ${ScImageSelectorInput}[data-focus-visible-added]:checked + && {
    box-shadow: ${({ overlay }) =>
      css`
        0 0 ${staticTokenRule("border-radius-large")} ${
        overlay
          ? themeTokenRule("color-border-image-selector-overlay-selected")
          : themeTokenRule("color-border-input-checkbox-checked")
      },
        inset 0 0 0 0.1rem ${
          overlay
            ? themeTokenRule("color-border-image-selector-overlay-selected")
            : themeTokenRule("color-border-input-checkbox-checked")
        }
      `};
  }
`;

const ScImageSelectorMask = styled.div`
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${themeTokenRule("color-background-accent")};
  opacity: 0.6;

  ${ScImageSelectorInput}:checked + ${ScImageSelectorLabel} & {
    display: block;
  }
`;

const ScImageSelectorImageBorder = styled.div<ScImageSelectorLabelProps>`
  position: relative;
  overflow: hidden;

  border-radius: ${styleVariant("borderRadius", {
    [BorderRadius.None]: staticTokenRule("border-radius-none"),
    [BorderRadius.Small]: staticTokenRule("border-radius-none"),
    [BorderRadius.Medium]: css`calc(${staticTokenRule(
      "border-radius-medium",
    )} / 2)`,
    [BorderRadius.Large]: css`calc(${staticTokenRule(
      "border-radius-large",
    )} / 2)`,
    [BorderRadius.Rounded]: staticTokenRule("border-radius-rounded"),
  })};
`;

const ScImageSelectorImage = styled(CoreImage)<{ $hoverScale?: boolean }>`
  transition: transform 150ms ease-out;

  ${({ $hoverScale }) =>
    $hoverScale &&
    hoverCssWithSelector(`${ScImageSelector}:hover &`)`
      transform: scale(1.1);
  `};
`;

export class ImageSelectorComponent extends Component<ImageSelectorProps, {}> {
  public static defaultProps: Partial<ImageSelectorProps> = {
    borderRadius: BorderRadius.Large,
  };
  public static displayName: string;

  public render() {
    const generatedId = newUUIDv4();

    return (
      <ScImageSelector
        className="tw-image-selector"
        fullWidth={this.props.ratio !== undefined}
        {...getDataProps(this.props)}
      >
        <ScImageSelectorInput
          {...getAriaProps(this.props)}
          className="tw-image-selector__input"
          type={this.props.type}
          data-a-target="tw-image-selector"
          checked={this.props.checked}
          defaultChecked={this.props.defaultChecked}
          disabled={this.props.disabled}
          id={this.props.id ? this.props.id : generatedId}
          name={this.props.name}
          onBlur={this.props.onBlur}
          onChange={this.props.onChange}
          onFocus={this.props.onFocus}
          ref={this.props.refDelegate}
          required={this.props.required}
          tabIndex={this.props.tabIndex}
          value={this.props.value}
        />
        <ScImageSelectorLabel
          htmlFor={this.props.id ? this.props.id : generatedId}
          borderRadius={this.props.borderRadius}
          error={this.props.error}
          overlay={this.props.overlay}
        >
          <ScImageSelectorImageBorder borderRadius={this.props.borderRadius}>
            {this.renderImage()}
            {(!!this.props.selectedIcon || !!this.props.selectedMask) &&
              this.renderMask()}
          </ScImageSelectorImageBorder>
        </ScImageSelectorLabel>
      </ScImageSelector>
    );
  }

  private renderImage = () => {
    const image = (
      <ScImageSelectorImage
        className="tw-image-selector__image"
        $hoverScale={this.props.hoverScale}
        {...getImageProps(this.props)}
      />
    );

    if (this.props.ratio === undefined) {
      return image;
    }

    return (
      <Aspect ratio={this.props.ratio || AspectRatio.Aspect1x1}>{image}</Aspect>
    );
  };

  private renderMask = () => {
    return (
      <>
        <ScImageSelectorMask />
        {this.props.selectedIcon && this.renderIcon()}
      </>
    );
  };

  private renderIcon = () => {
    const iconLayoutProps: LayoutProps = {
      color: Color.Overlay,
      position: Position.Absolute,
      margin: 0.5,
    };

    const icon = (
      <Icon
        asset={
          typeof this.props.selectedIcon === "object" &&
          this.props.selectedIcon.icon
            ? this.props.selectedIcon.icon
            : SVGAsset.NotificationSuccess
        }
      />
    );

    if (
      typeof this.props.selectedIcon === "object" &&
      this.props.selectedIcon.position
    ) {
      return (
        <Layout
          {...iconLayoutProps}
          attachTop={
            this.props.selectedIcon.position ===
              ImageSelectorIconPosition.Center ||
            this.props.selectedIcon.position ===
              ImageSelectorIconPosition.TopLeft ||
            this.props.selectedIcon.position ===
              ImageSelectorIconPosition.TopRight
          }
          attachRight={
            this.props.selectedIcon.position ===
              ImageSelectorIconPosition.Center ||
            this.props.selectedIcon.position ===
              ImageSelectorIconPosition.TopRight ||
            this.props.selectedIcon.position ===
              ImageSelectorIconPosition.BottomRight
          }
          attachBottom={
            this.props.selectedIcon.position ===
              ImageSelectorIconPosition.Center ||
            this.props.selectedIcon.position ===
              ImageSelectorIconPosition.BottomLeft ||
            this.props.selectedIcon.position ===
              ImageSelectorIconPosition.BottomRight
          }
          attachLeft={
            this.props.selectedIcon.position ===
              ImageSelectorIconPosition.Center ||
            this.props.selectedIcon.position ===
              ImageSelectorIconPosition.TopLeft ||
            this.props.selectedIcon.position ===
              ImageSelectorIconPosition.BottomLeft
          }
          display={
            this.props.selectedIcon.position ===
            ImageSelectorIconPosition.Center
              ? Display.Flex
              : undefined
          }
          alignItems={
            this.props.selectedIcon.position ===
            ImageSelectorIconPosition.Center
              ? AlignItems.Center
              : undefined
          }
          justifyContent={
            this.props.selectedIcon.position ===
            ImageSelectorIconPosition.Center
              ? JustifyContent.Center
              : undefined
          }
        >
          {icon}
        </Layout>
      );
    } else {
      return (
        <Layout
          {...iconLayoutProps}
          display={Display.Flex}
          attachTop
          attachRight
        >
          {icon}
        </Layout>
      );
    }
  };
}

ImageSelectorComponent.displayName = "ImageSelectorComponent";

export const ImageSelector = withOverlayContext(ImageSelectorComponent);
