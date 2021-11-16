import { FC, ReactNode } from "react";
import { StatusButton } from "../../../button/status-button";
import { CoreInteractivePublicProps } from "../../../core-interactive";
import {
  Display,
  FlexDirection,
  JustifyContent,
  Layout,
} from "../../../layout";
import { SVGAsset } from "../../../svg";
import { NotificationType } from "../../notification";

export interface SnackbarAction extends CoreInteractivePublicProps {
  children?: ReactNode;
  icon?: SVGAsset;
  dropdown?: boolean;
}

export interface SnackbarActionsProps {
  primaryButton: SnackbarAction;
  type: NotificationType;
}

export const SnackbarActions: FC<SnackbarActionsProps> = (props) => {
  return (
    <Layout
      display={Display.Flex}
      justifyContent={JustifyContent.Start}
      flexDirection={FlexDirection.RowReverse}
      margin={{ left: 0.5 }}
    >
      <StatusButton type={props.type} {...props.primaryButton} />
    </Layout>
  );
};

SnackbarActions.displayName = "SnackbarActions";
