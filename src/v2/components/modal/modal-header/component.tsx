import { CloseButtonProps, CoreDismissible } from "../../core-dismissible";
import {
  MarginProps,
  Padding,
  PaddingProps,
  PaddingValue,
  getMarginStyles,
  getPaddingStyles,
  styleVariant,
  styled,
} from "lib/ui-utils";
import { Title, TitleSize } from "../../title";

import { ButtonIconSize } from "../../button/button-icon";
import { FC } from "react";
import { ModalSize } from "../modal-wrapper";
import { TextType } from "../../core-text";

export interface ModalHeaderProps {
  /**
   * Renders a close button target.
   */
  closeButton?: CloseButtonProps;
  title: string;
  id?: string;
  imageSrc?: string;
  size?: ModalSize;
  padding?: PaddingValue;
}

interface ScModalHeaderProps {
  $size: ModalHeaderProps["size"];
  $imageSrc: ModalHeaderProps["imageSrc"];
}

const ScModalHeader = styled.div<PaddingProps & ScModalHeaderProps>`
  ${getPaddingStyles};
  display: flex;
  align-items: center;
  position: relative;

  background-image: ${({ $imageSrc }) => $imageSrc && `url(${$imageSrc})`};
  background-size: cover;

  min-height: ${styleVariant("$size", {
    [ModalSize.Small]: "3.4rem",
    [ModalSize.Medium]: "5.5rem",
    [ModalSize.Large]: "8.3rem",
  })};
`;

const ScModalHeaderButton = styled.div<MarginProps>`
  ${getMarginStyles};
  width: 2.4rem;
  align-self: start;
`;

const ScModalHeaderTitle = styled.div<PaddingProps & ScModalHeaderProps>`
  ${getPaddingStyles};
  margin-top: ${styleVariant("$size", {
    [ModalSize.Small]: "0.3rem",
    [ModalSize.Medium]: "0.9rem",
    [ModalSize.Large]: "1.9rem",
  })};

  margin-left: ${({ $size }) => $size !== ModalSize.Small && "3rem"};
  flex-grow: 1;
  visibility: ${({ $imageSrc }) => ($imageSrc ? "hidden" : "visible")};
  text-align: ${({ $size }) =>
    $size === ModalSize.Small ? "center" : undefined};
`;
export const ModalHeader: FC<ModalHeaderProps> = ({
  closeButton,
  title,
  id,
  imageSrc,
  size = ModalSize.Medium,
  padding,
  ...props
}) => {
  let titleSize: TitleSize;
  switch (size) {
    case ModalSize.Small:
      titleSize = TitleSize.ExtraSmall;
      break;
    case ModalSize.Large:
      titleSize = TitleSize.Large;
      break;
    default:
      titleSize = TitleSize.Default;
  }

  let containerPadding: Padding;
  switch (size) {
    case ModalSize.Small:
      containerPadding = { x: 0.5, y: 0.5 };
      break;
    case ModalSize.Large:
      containerPadding = { y: 1, right: 1 };
      break;
    default:
      containerPadding = { bottom: 0.5, top: 1, right: 1 };
  }

  let titlePadding: Padding | undefined = undefined;
  if (padding !== undefined) {
    titlePadding = padding;
  } else if (size === ModalSize.Small && !closeButton) {
    titlePadding = { x: 2 };
  }

  return (
    <ScModalHeader
      padding={containerPadding}
      className="tw-modal-header"
      $size={size}
      $imageSrc={imageSrc}
      {...props}
    >
      {closeButton && size === ModalSize.Small && (
        <ScModalHeaderButton
          margin={{ right: 1 }}
          className="tw-modal-header__button"
        />
      )}
      <ScModalHeaderTitle
        padding={titlePadding}
        className="tw-modal-header__title"
        $size={size}
        $imageSrc={imageSrc}
      >
        <Title type={TextType.H2} size={titleSize} id={id}>
          {title}
        </Title>
      </ScModalHeaderTitle>
      {closeButton && (
        <ScModalHeaderButton
          className="tw-modal-header__button"
          margin={{ left: 1 }}
        >
          <CoreDismissible
            aria-label={closeButton["aria-label"]}
            size={ButtonIconSize.Small}
            onClick={closeButton.onClick}
            overlay={!!imageSrc}
          />
        </ScModalHeaderButton>
      )}
    </ScModalHeader>
  );
};

ModalHeader.displayName = "ModalHeader";
