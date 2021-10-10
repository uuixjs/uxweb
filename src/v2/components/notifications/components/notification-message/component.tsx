import { FC } from "react";
import { CoreLink, CoreLinkProps } from "../../../core-link";
import { CoreText } from "../../../core-text";
import {
  AlignItems,
  Color,
  Display,
  FlexDirection,
  FontSize,
  FontWeight,
  Layout,
} from "../../../layout";

export interface NotificationMessageProps {
  /**
   * Short text for the title.
   *
   * @example No Internet Connection
   */
  title: string;
  /**
   * Long text for the message.
   *
   * @example It appears your computer has gone offline. You'll need to reconnect to the internet before you can stream more content.
   */
  description?: string;
  /**
   * Optional link CTA for further context.
   */
  link?: CoreLinkProps;
  /**
   *
   */
  inline?: boolean;
}

export const NotificationMessage: FC<NotificationMessageProps> = (props) => {
  return (
    <Layout
      display={Display.Flex}
      flexDirection={props.inline ? FlexDirection.Row : FlexDirection.Column}
      alignItems={props.inline ? AlignItems.Baseline : undefined}
    >
      <Layout margin={{ right: props.inline ? 0.5 : 0 }}>
        <CoreText fontSize={FontSize.Size5} fontWeight={FontWeight.SemiBold}>
          {props.title}
        </CoreText>
      </Layout>
      {props.description && (
        <Layout
          margin={{
            bottom: props.inline ? undefined : 0.5,
            right: props.inline ? 0.5 : 0,
          }}
        >
          <CoreText color={Color.Alt}>{props.description}</CoreText>
        </Layout>
      )}
      {props.link && (
        <Layout margin={{ bottom: props.inline ? undefined : 0.5 }}>
          <CoreLink {...props.link} />
        </Layout>
      )}
    </Layout>
  );
};

NotificationMessage.displayName = "NotificationMessage";
