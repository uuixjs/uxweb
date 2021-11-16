import { AlignItems, Display, FontSize, Layout } from "../../layout";
import { BorderRadius, PaddingValue } from "lib";
import { FC, ReactNode } from "react";

import { CoreInteractivePublicProps } from "../../core-interactive";
import { CoreText } from "../../core-text";
import { Icon } from "../../icon";
import { Interactable } from "../../interactable";
import { SVGAsset } from "../../svg";

export interface VerticalNavigationItemBaseProps
  extends CoreInteractivePublicProps {
  children: string;
  iconAsset?: SVGAsset;
  selected?: boolean;
  indentLevel?: 0 | 1 | 2;
  rightElement?: ReactNode;
}

export const VerticalNavigationItemBase: FC<VerticalNavigationItemBaseProps> = ({
  children,
  iconAsset,
  selected,
  indentLevel,
  rightElement,
  ...interactiveProps
}) => {
  const indentLevelPaddingValues: PaddingValue[] = [1, 2, 4];
  const paddingLeft = indentLevelPaddingValues[indentLevel || 0];

  return (
    <Layout className="vertical-navigation-item-base">
      <Interactable
        selected={selected}
        borderRadius={BorderRadius.Medium}
        {...interactiveProps}
      >
        <Layout
          padding={{
            top: 1,
            right: 1,
            bottom: 1,
            left: paddingLeft,
          }}
          display={Display.Flex}
          alignItems={AlignItems.Center}
          className="vertical-navigation-item-base__text-container"
        >
          {iconAsset && (
            <Layout
              padding={{ right: 1 }}
              display={Display.Flex}
              alignItems={AlignItems.Center}
            >
              <Icon asset={iconAsset} />
            </Layout>
          )}
          <Layout padding={{ right: 1 }} margin={{ right: "auto" }}>
            <CoreText fontSize={FontSize.Size5}>{children}</CoreText>
          </Layout>
          {rightElement && rightElement}
        </Layout>
      </Interactable>
    </Layout>
  );
};
