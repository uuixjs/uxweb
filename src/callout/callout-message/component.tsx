import { Component, ReactNode } from "react";
import { Display, InjectLayout, Layout } from "../../layout";
import { Pill, PillProps } from "../../pill";
import { Title, TitleSize } from "../../title";
import { getAriaProps, styled } from "lib";

import { TextType } from "../../core-text";

export interface CalloutMessageProps {
  /**
   * Inline pill to display next to Callout title.
   */
  pill?: PillProps;
  /**
   * An inline string or element to display as the Callout title.
   */
  title?: string | JSX.Element;
  /**
   * Secondary descriptive text.
   */
  description?: ReactNode;
  /**
   * Determines if the title and description display inline with each other.
   */
  inline?: boolean;
}

const ScCalloutMessage = styled.div`
  margin-top: 0.1rem;
`;

const ScCalloutMessagePill = styled.div`
  display: inline-flex;
  align-items: center;
  position: relative;
  top: -0.1em;
`;

export class CalloutMessage extends Component<CalloutMessageProps> {
  public render() {
    const pill = this.props.pill && (
      <Layout margin={{ right: 0.5 }} display={Display.InlineBlock}>
        <Pill {...this.props.pill} />
      </Layout>
    );

    const title =
      this.props.title && typeof this.props.title === "string" ? (
        <InjectLayout
          display={Display.Inline}
          flexGrow={1}
          margin={{ right: this.props.inline ? 0.5 : 0 }}
          className="tw-callout-message__title"
        >
          <Title type={TextType.H4} size={TitleSize.Small}>
            {this.props.title}
          </Title>
        </InjectLayout>
      ) : (
        this.props.title
      );

    return (
      <ScCalloutMessage
        className="tw-callout-message"
        {...getAriaProps(this.props)}
      >
        {(pill || title) && (
          <Layout
            display={Display.Inline}
            className="tw-callout-message__header"
          >
            {pill && (
              <ScCalloutMessagePill className="tw-callout-message__pill">
                {pill}
              </ScCalloutMessagePill>
            )}
            {title}
          </Layout>
        )}
        {this.props.description && (
          <Layout display={this.props.inline ? Display.Inline : Display.Block}>
            {this.props.description}
          </Layout>
        )}
      </ScCalloutMessage>
    );
  }
}
