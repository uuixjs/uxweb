import { Display, Layout } from "../../layout";
import { SVG, SVGAsset } from "../../svg";
import { staticTokenRule, styled, themeTokenRule } from "lib/ui-utils";

import { CoreText } from "../../core-text";
import { FC } from "react";

const ScMediaCardStatWrapper = styled.div`
  padding: 0 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${themeTokenRule("color-background-overlay")};
  color: ${themeTokenRule("color-text-overlay")};
  font-size: ${staticTokenRule("font-size-6")};
  border-radius: ${staticTokenRule("border-radius-small")};
`;

export interface MediaCardStatProps {
  children: string;
  icon?: SVGAsset;
}

export const MediaCardStat: FC<MediaCardStatProps> = (props) => {
  const icon = props.icon && (
    <Layout display={Display.Flex} margin={{ right: 0.5 }}>
      <SVG asset={props.icon} width={10} height={10} />
    </Layout>
  );

  return (
    <ScMediaCardStatWrapper className="tw-media-card-stat">
      {icon}
      <CoreText>{props.children}</CoreText>
    </ScMediaCardStatWrapper>
  );
};
