import { AlignItems, Display, FontSize, Layout } from "../../layout";
import { styled, themeTokenRule } from "@uuixjs/uuixweb-lib";

import { FC } from "react";
import { Icon } from "../../icon";
import { SVGAsset } from "../../svg";
import { withOverlayContext } from "../../overlay-region/context";

export interface FormErrorProps {
  /**
   * @example The value you entered is invalid.
   */
  errorMessage: string;
  overlay?: boolean;
}

const ScFormError = styled(Layout)<{ $overlay?: FormErrorProps["overlay"] }>`
  color: ${({ $overlay }) =>
    $overlay
      ? themeTokenRule("color-text-overlay-error")
      : themeTokenRule("color-text-error")};
`;

export const FormErrorComponent: FC<FormErrorProps> = ({
  errorMessage,
  overlay,
  ...props
}) => {
  return (
    <ScFormError
      display={Display.Flex}
      fontSize={FontSize.Size7}
      $overlay={overlay}
      {...props}
    >
      <Layout
        margin={{ right: 0.5 }}
        display={Display.Flex}
        alignItems={AlignItems.Baseline}
        height="1.5em"
        width="1.5em"
      >
        <Icon fill asset={SVGAsset.NotificationError} />
      </Layout>
      <p>{errorMessage}</p>
    </ScFormError>
  );
};

FormErrorComponent.displayName = "FormErrorComponent";
export const FormError = withOverlayContext(FormErrorComponent);
