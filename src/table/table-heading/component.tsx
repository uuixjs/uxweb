import {
  AlignItems,
  Color,
  Display,
  Layout,
  TextAlign,
  VerticalAlign,
} from "../../layout";
import { FC, HTMLProps, MouseEventHandler, ReactNode } from "react";
import {
  Padding,
  staticTokenRule,
  styleVariant,
  styled,
  themeTokenRule,
} from "lib";

import { CoreText } from "../../core-text";
import { Icon } from "../../icon";
import { Interactable } from "../../interactable";
import { SVGAsset } from "../../svg";

export enum Sorting {
  Default = "default",
  Ascending = "ascending",
  Descending = "descending",
}

export interface TableHeadingProps extends ScTableHeadingProps {
  label?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLElement>;
  padding?: Padding;
  sorting?: Sorting | "default" | "ascending" | "descending"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
}

interface ScTableHeadingProps {
  textAlign?: TextAlign;
  verticalAlign?: VerticalAlign;
}

const ScTableHeading = styled.th<ScTableHeadingProps>`
  border-bottom-width: ${staticTokenRule("border-width-default")};
  border-bottom-style: solid;
  border-bottom-color: ${themeTokenRule("color-border-base")};
  background-color: ${themeTokenRule("color-background-alt")};

  vertical-align: ${styleVariant("verticalAlign", {
    [VerticalAlign.Top]: "top",
    [VerticalAlign.Middle]: "middle",
    [VerticalAlign.Bottom]: "bottom",
    [VerticalAlign.TextTop]: "text-top",
    [VerticalAlign.TextBottom]: "text-bottom",
    [VerticalAlign.Baseline]: "baseline",
  })};

  text-align: ${styleVariant("textAlign", {
    [TextAlign.Left]: "left",
    [TextAlign.Center]: "center",
    [TextAlign.Right]: "right",
    [TextAlign.Justify]: "justify",
  })};

  font-weight: ${staticTokenRule("font-weight-semibold")};

  &:first-child {
    border-top-left-radius: ${staticTokenRule("border-radius-medium")};
  }

  &:last-child {
    border-top-right-radius: ${staticTokenRule("border-radius-medium")};
  }
`;

export const TableHeading: FC<
  TableHeadingProps & Omit<HTMLProps<HTMLTableHeaderCellElement>, "ref" | "as">
> = ({
  label,
  textAlign = TextAlign.Left,
  padding = 1,
  sorting,
  verticalAlign = VerticalAlign.Middle,
  onClick,
  children,
  ...thProps
}) => {
  let heading: JSX.Element | undefined;
  let sortArrow: JSX.Element | undefined;

  const content = (
    <>
      {label && <CoreText bold>{label}</CoreText>}
      {children}
    </>
  );

  if (sorting !== undefined) {
    switch (sorting) {
      case "ascending":
        sortArrow = <Icon asset={SVGAsset.GlyphArrUp} />;
        break;

      case "descending":
        sortArrow = <Icon asset={SVGAsset.GlyphArrDown} />;
        break;
      case "default":
      default:
        sortArrow = <Icon asset={SVGAsset.GlyphArrUpDown} />;
        break;
    }

    heading = (
      <Interactable onClick={onClick}>
        <Layout
          color={Color.Link}
          display={Display.Flex}
          alignItems={AlignItems.Center}
          padding={padding}
        >
          <Layout margin={{ right: 0.5 }} flexGrow={1}>
            {content}
          </Layout>
          {sortArrow}
        </Layout>
      </Interactable>
    );
  } else {
    heading = <Layout padding={padding}>{content}</Layout>;
  }

  return (
    <ScTableHeading
      textAlign={textAlign}
      verticalAlign={verticalAlign}
      {...thProps}
      className="tw-table-heading"
    >
      {heading}
    </ScTableHeading>
  );
};

TableHeading.displayName = "TableHeading";
