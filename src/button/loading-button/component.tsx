import {
  CoreButton,
  CoreButtonPublicProps,
  CoreButtonSize,
  CoreButtonType,
} from "../core-button";
import { ForwardRefRenderFunction, ReactNode, forwardRef } from "react";
import { JustifyContent, Layout, Visibility } from "../../layout";
import { LoadingSpinner, SpinnerSize } from "../../loading-spinner";
import { css, styled, themeTokenRule } from "lib";

import { CoreButtonLabel } from "../core-button/core-button-label";
import { CoreInteractiveElement } from "../../core-interactive";
import { Icon } from "../../icon";
import { SVGAsset } from "../../svg";
import { ScCoreButtonSuccess } from "../core-button/component";
import { TEST_AUTOMATION_SELECTORS } from "../../_tests/selectors";

export enum LoadingStatus {
  Default = "default",
  Loading = "loading",
  Success = "success",
}

export interface LoadingButtonProps extends CoreButtonPublicProps {
  children: ReactNode;
  icon?: SVGAsset;
  loadingStatus?: LoadingStatus | "default" | "loading" | "success"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
  variant?: CoreButtonType;
}

const SpinnerSizeMap: Record<CoreButtonSize, SpinnerSize> = {
  [CoreButtonSize.Small]: SpinnerSize.Small,
  [CoreButtonSize.Default]: SpinnerSize.Default,
  [CoreButtonSize.Large]: SpinnerSize.Large,
};

export const ScLoader = styled.div`
  position: absolute;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const ScSuccessCheck = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ScLoadingSuccessButton = styled(ScCoreButtonSuccess)<
  CoreButtonPublicProps
>((props) => {
  if (props.disabled) {
    return css`
      background-color: ${themeTokenRule("color-background-button-disabled")};
      color: ${themeTokenRule("color-text-button-disabled")};
    `;
  }
});

const LoadingButton: ForwardRefRenderFunction<
  CoreInteractiveElement,
  LoadingButtonProps
> = (
  {
    children,
    fullWidth,
    icon,
    loadingStatus = "default",
    size = CoreButtonSize.Default,
    variant = CoreButtonType.Secondary,
    ...buttonProps
  },
  ref,
) => {
  const label = (
    <CoreButtonLabel
      icon={icon}
      size={size}
      fullWidth={fullWidth}
      labelAlign={JustifyContent.Center}
    >
      {children}
    </CoreButtonLabel>
  );

  const successCheck = loadingStatus === LoadingStatus.Success && (
    <ScSuccessCheck data-a-target={TEST_AUTOMATION_SELECTORS.ButtonSuccessIcon}>
      <Icon asset={SVGAsset.Check} />
    </ScSuccessCheck>
  );

  if (loadingStatus === LoadingStatus.Success) {
    return (
      <ScLoadingSuccessButton
        {...buttonProps}
        $fullWidth={fullWidth}
        $size={size}
        ref={ref}
        disabledInteraction
      >
        <Layout visibility={Visibility.Hidden}>{label}</Layout>
        {successCheck}
      </ScLoadingSuccessButton>
    );
  }

  return (
    <CoreButton
      {...buttonProps}
      disabledInteraction={loadingStatus === LoadingStatus.Loading}
      fullWidth={fullWidth}
      ref={ref}
      size={size}
      variant={variant}
    >
      {loadingStatus === LoadingStatus.Loading ? (
        <>
          <Layout visibility={Visibility.Hidden}>{label}</Layout>
          <ScLoader>
            <LoadingSpinner
              delay={0}
              size={SpinnerSizeMap[size]}
              inheritColor
            />
          </ScLoader>
        </>
      ) : (
        label
      )}
    </CoreButton>
  );
};

LoadingButton.displayName = "LoadingButton";
const ComponentWithRef = forwardRef(LoadingButton);
export { ComponentWithRef as LoadingButton };
