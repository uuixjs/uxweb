import { FC, ReactNode } from "react";
import { CoreInteractivePublicProps } from "../../core-interactive";
import { CoreLink, CoreLinkType } from "../../core-link";
import { CoreText, Lines, TextType } from "../../core-text";
import {
  AlignItems,
  Color,
  Display,
  FontSize,
  InjectLayout,
  Layout,
} from "../../layout";

export interface MediaCardTitleProps extends CoreInteractivePublicProps {
  badge?: ReactNode;
  children: string;
  lines?: Lines;
}

export const MediaCardTitle: FC<MediaCardTitleProps> = (props) => {
  let textElement: ReactNode = (
    <Layout display={Display.Flex} alignItems={AlignItems.Start}>
      <CoreText
        type={TextType.H3}
        fontSize={FontSize.Size5}
        lines={props.lines}
        ellipsis
      >
        {props.children}
      </CoreText>
      {props.badge && (
        <Layout display={Display.InlineFlex} margin={{ left: 0.5 }}>
          {props.badge}
        </Layout>
      )}
    </Layout>
  );

  if (props.linkTo || props.onClick || props.renderLink) {
    textElement = (
      <InjectLayout fullWidth>
        {/* fullWidth required on the CoreLink to make ellipsis work when it renders as an html `<button>` */}
        <CoreLink {...props} variant={CoreLinkType.Inherit} hoverUnderlineNone>
          {textElement}
        </CoreLink>
      </InjectLayout>
    );
  }

  return <Layout color={Color.Alt}>{textElement}</Layout>;
};

MediaCardTitle.defaultProps = {
  lines: 1,
};
