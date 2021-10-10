import {
  css,
  getAriaProps,
  getDataProps,
  keyframes,
  staticTokenRule,
  styleVariant,
  styled,
  themeTokenRule,
} from "lib/ui-utils";

import { FC } from "react";

export enum SpinnerSize {
  Default = "default",
  Small = "small",
  Large = "large",
}

export interface LoadingSpinnerProps {
  size?: SpinnerSize | "default" | "small" | "large"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
  /** Delay the appearance of the loading spinner; if you unmount the component before this time has elapsed, the user will not see a loading spinner */
  delay?: number;
  inheritColor?: boolean;
  fillContent?: boolean;
}

const loadingSpinnerAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const loadingSpinnerAppear = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ScLoadingSpinner = styled.div<LoadingSpinnerProps>`
  ${({ fillContent }) =>
    fillContent &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
    `}

  ${({ delay }) =>
    !!delay &&
    css`
      opacity: 0;
      animation-name: ${loadingSpinnerAppear};
      animation-iteration-count: 1;
      animation-timing-function: ease;
      animation-fill-mode: forwards;
      animation-duration: ${staticTokenRule("timing-medium")};
      animation-delay: ${delay}ms;
    `}
`;

const ScLoadingSpinnerCircle = styled.div<LoadingSpinnerProps>`
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;

  border: ${staticTokenRule("border-width-spinner")} solid
    ${themeTokenRule("color-border-spinner")};
  border-left: ${staticTokenRule("border-width-spinner")} solid
    ${themeTokenRule("color-border-spinner-fill")};
  position: relative;
  transform: translateZ(0);
  animation-name: ${loadingSpinnerAnimation};
  animation-iteration-count: infinite;
  animation-duration: 1s;
  animation-timing-function: linear;

  ${styleVariant("size", {
    [SpinnerSize.Small]: { width: "1.6rem", height: "1.6rem" },
    [SpinnerSize.Default]: { width: "2.2rem", height: "2.2rem" },
    [SpinnerSize.Large]: { width: "2.8rem", height: "2.8rem" },
  })}

  ${({ inheritColor }) =>
    inheritColor &&
    css`
      border-top-color: ${themeTokenRule("color-border-spinner")};
      border-right-color: ${themeTokenRule("color-border-spinner")};
      border-bottom-color: ${themeTokenRule("color-border-spinner")};
      border-left-color: currentColor;
    `}
`;

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({
  delay = 300,
  fillContent,
  inheritColor,
  size,
  ...props
}) => {
  return (
    <ScLoadingSpinner
      className="tw-loading-spinner"
      fillContent={fillContent}
      delay={delay}
      {...getAriaProps(props)}
    >
      <ScLoadingSpinnerCircle
        size={size}
        inheritColor={inheritColor}
        {...getDataProps(props)}
      />
    </ScLoadingSpinner>
  );
};

LoadingSpinner.displayName = "LoadingSpinner";
