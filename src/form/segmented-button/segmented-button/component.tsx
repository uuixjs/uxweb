import { FC, ReactNode } from "react";

import { InputSize } from "../../form";
import { getInputSizeValue } from "../../common";
import { styled } from "@uuixjs/uuixweb-lib";

export interface SegmentedButtonProps {
  /**
   * @example <SegmentedButtonOption label="Chart" name="graph-view" />
   *  <SegmentedButtonOption label="Table" name="graph-view" />
   */
  children?: ReactNode;
}

const ScSegmentedButton = styled.div`
  display: flex;
  height: ${getInputSizeValue};
`;

export const SegmentedButton: FC<SegmentedButtonProps> = (props) => {
  return (
    <ScSegmentedButton
      className="tw-segmented-button"
      size={InputSize.Default}
      {...props}
    >
      {props.children}
    </ScSegmentedButton>
  );
};

SegmentedButton.displayName = "SegmentedButton";
