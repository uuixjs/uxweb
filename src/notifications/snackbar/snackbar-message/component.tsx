import { AlignItems, Display, Layout, Position } from "../../../layout";
import { LineHeight, TextType } from "../../../core-text";
import { Title, TitleSize } from "../../../title";
import { getAriaProps, styled } from "lib";

import { Component } from "react";
import { Icon } from "../../../icon";
import { NotificationType } from "../../notification";
import { SVGAsset } from "../../../svg";

export interface SnackbarMessageProps {
  iconType?: NotificationType;
  title?: string | JSX.Element;
}

const SNACKBAR_ICON: { [key: string]: SVGAsset } = {
  [NotificationType.Error]: SVGAsset.NotificationError,
  [NotificationType.Info]: SVGAsset.NotificationInfo,
  [NotificationType.Success]: SVGAsset.NotificationSuccess,
  [NotificationType.Warning]: SVGAsset.NotificationWarning,
};

const ScSnackbarMessage = styled.div`
  display: inline-flex;
  align-items: center;
  min-height: 3rem;
`;

export class SnackbarMessage extends Component<SnackbarMessageProps> {
  public render() {
    const icon = this.props.iconType && (
      <Layout margin={{ x: 0.5 }}>
        <Icon asset={SNACKBAR_ICON[this.props.iconType]} />
      </Layout>
    );

    const title =
      this.props.title && typeof this.props.title === "string" ? (
        <Layout flexGrow={1} margin={{ left: 0.5, right: 1 }}>
          <Title
            lineHeight={LineHeight.Heading}
            type={TextType.H5}
            size={TitleSize.ExtraSmall}
          >
            {this.props.title}
          </Title>
        </Layout>
      ) : (
        this.props.title
      );

    return (
      <Layout {...getAriaProps(this.props)}>
        {(icon || title) && (
          <ScSnackbarMessage className="tw-snackbar-message">
            {icon && (
              <Layout
                margin={{ top: 0.5 }}
                display={Display.Flex}
                position={Position.Relative}
                alignItems={AlignItems.Start}
                flexGrow={0}
                flexShrink={0}
              >
                {icon}
              </Layout>
            )}
            {title}
          </ScSnackbarMessage>
        )}
      </Layout>
    );
  }
}
