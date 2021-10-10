import {
  CoreInteractive,
  CoreInteractivePublicProps,
} from "../../../../core-interactive";
import {
  Display,
  FlexDirection,
  FontSize,
  InjectLayout,
  Layout,
  TextAlign,
} from "../../../../layout";
import { FC, MouseEvent, ReactElement, ReactNode, useCallback } from "react";
import {
  Padding,
  hoverCss,
  styled,
  themeTokenRule,
} from "lib/ui-utils";
import { Title, TitleSize } from "../../../../title";

import { CoreText } from "../../../../core-text";
import { TabSize } from "../../component";
import { withOverlayContext } from "../../../../overlay-region/context";

interface ScInteractiveProps {
  $overlay: TabItemPublicProps["overlay"];
}

const ScInteractive = styled(CoreInteractive)<ScInteractiveProps>`
  display: block;
  height: 100%;
  width: 100%;

  color: ${(props) =>
    props.$overlay ? themeTokenRule("color-text-overlay") : "inherit"};

  ${hoverCss`
    color: ${(props) =>
      props.$overlay ? themeTokenRule("color-text-overlay") : undefined};
    text-decoration: none;
  `};
`;

interface ScTextWrapperProps {
  hasActiveIndicator: boolean;
}

const ScTextWrapper = styled.div<ScTextWrapperProps>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-grow: 1;

  border-bottom: ${(props) =>
    !props.hasActiveIndicator && "0.1rem solid transparent"};
`;

export type TabItemLabel = string | [string, string];

export interface TabItemPublicProps
  extends Omit<CoreInteractivePublicProps, "onClick"> {
  label?: TabItemLabel;
  children?: ReactElement;
  onClick?: (e: MouseEvent<HTMLElement>, index: number) => void;
  overlay?: boolean;
}

export interface TabItemProps extends TabItemPublicProps {
  originalIndex: number;
  padding?: Padding;
  textAlign?: TextAlign;
  size?: TabSize;
  activeIndicator?: ReactNode;
}

export const TabItemComponent: FC<TabItemProps> = ({
  label,
  children,
  overlay,
  originalIndex,
  padding,
  textAlign,
  size,
  activeIndicator,
  ...coreInteractiveProps
}) => {
  let labelOne: string | undefined;
  let labelTwo: string | undefined;
  const onClick = coreInteractiveProps.onClick;

  if (typeof label === "string") {
    labelOne = label;
  } else if (typeof label === "object") {
    labelOne = label[0];
    labelTwo = label[1];
  }

  const handleTabOnClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (onClick) {
        onClick(e, originalIndex);
      }
    },
    [onClick, originalIndex],
  );

  return (
    <InjectLayout padding={padding === undefined ? { x: 1 } : padding}>
      <ScInteractive
        {...coreInteractiveProps}
        onClick={handleTabOnClick}
        role="tab"
        $overlay={overlay}
      >
        <Layout
          fullHeight
          textAlign={textAlign}
          display={Display.Flex}
          flexDirection={FlexDirection.Column}
        >
          <ScTextWrapper hasActiveIndicator={!!activeIndicator}>
            {labelOne && (
              <Title
                size={
                  size === TabSize.Large
                    ? TitleSize.Small
                    : TitleSize.ExtraSmall
                }
              >
                {labelOne}
              </Title>
            )}
            {labelTwo && (
              <CoreText fontSize={FontSize.Size5}>{labelTwo}</CoreText>
            )}
            {children}
          </ScTextWrapper>
          <Layout flexGrow={0}>{activeIndicator}</Layout>
        </Layout>
      </ScInteractive>
    </InjectLayout>
  );
};
export const TabItem = withOverlayContext(TabItemComponent);
