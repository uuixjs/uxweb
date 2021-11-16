import { FC } from "react";
import { CoreInteractivePublicProps } from "../../core-interactive";
import { Icon } from "../../icon";
import { Display } from "../../layout";
import { Layout } from "../../layout/layout";
import { SVGAsset } from "../../svg";
import { VerticalNavigationItemBase } from "../vertical-navigation-item-base";

export enum TestSelectors {
  externalLinkIndicator = "external-link-indicator",
}

interface VerticalNavigationItemProps {
  /**
   * A title for this item.
   *
   * @example CoreButton
   */
  children: string;
  /**
   * An left icon SVGAsset for this item.
   */
  iconAsset?: SVGAsset;
  /**
   * The left-indent amount of the item.
   */
  indentLevel?: 0 | 1 | 2;
  /**
   * Is this list item selected? For example, does it correspond to the
   * currently active route?
   *
   * @example false
   */
  selected?: boolean;
  /**
   * Does clicking the item open an external link? (shows the external link icon)
   *
   * @example false
   */
  externalLink?: boolean;
}

export type Props = VerticalNavigationItemProps & CoreInteractivePublicProps;

export const VerticalNavigationItem: FC<Props> = (props) => {
  return (
    <VerticalNavigationItemBase
      rightElement={
        props.externalLink && (
          <Layout
            data-test-selector={TestSelectors.externalLinkIndicator}
            display={Display.InlineFlex}
          >
            <Icon asset={SVGAsset.Popout} />
          </Layout>
        )
      }
      {...props}
    />
  );
};
