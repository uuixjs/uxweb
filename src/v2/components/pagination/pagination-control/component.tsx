import { FC } from "react";
import { ButtonIcon } from "../../button/button-icon";
import { CoreInteractivePublicProps } from "../../core-interactive";
import { SVGAsset } from "../../svg";

export enum PaginationControlType {
  Default = 0,
  Previous = 1,
  Next = 2,
}

export interface PaginationControlProps extends CoreInteractivePublicProps {
  "aria-label": string;
  /**
   * Represents the current page of data.
   *
   * @example 1
   */
  currentPage: number;
  /**
   * Represents the total number of pages available from the dataset.
   *
   * @example 10
   */
  totalPages: number;
  /**
   * The type of control to display.
   */
  type: PaginationControlType;
}

export const PaginationControl: FC<PaginationControlProps> = ({
  currentPage,
  totalPages,
  type,
  ...coreInteractiveProps
}) => {
  const controlType = PaginationControlType[type];

  return (
    <ButtonIcon
      icon={
        controlType === "Previous"
          ? SVGAsset.GlyphArrLeft
          : SVGAsset.GlyphArrRight
      }
      disabled={
        (controlType === "Previous" && currentPage === 1) ||
        (controlType === "Next" && currentPage === totalPages)
      }
      {...coreInteractiveProps}
    />
  );
};

PaginationControl.displayName = "PaginationControl";
