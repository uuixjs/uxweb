import { FC, ReactNode } from "react";
import { FontSize, Layout } from "../layout";
import { staticTokenRule, styled, themeTokenRule } from "lib/ui-utils";

export interface TypesetProps {
  /**
   * The font size for body text, as well as `<p>`, `<code>`, `<li>`, and
   * `<code>`.
   */
  baseFontSize?: FontSize;
  /**
   * The markup to be formatted.
   *
   * @example <h1>Join us for TwitchCon Developer Day!</h1>
   */
  children?: ReactNode;
}

const ScTypeset = styled(Layout)`
  /* stylelint-disable selector-max-type */

  line-height: ${staticTokenRule("line-height-body")};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: ${staticTokenRule("space-2")};
    line-height: ${staticTokenRule("line-height-heading")};

    &:first-child {
      margin-top: ${staticTokenRule("space-0")};
    }
  }

  h1 {
    margin-bottom: ${staticTokenRule("space-2")};
    font-family: ${staticTokenRule("font-display")};
    font-size: ${staticTokenRule("font-size-1")};
    font-weight: ${staticTokenRule("font-weight-bold")};
  }

  h2 {
    margin-bottom: ${staticTokenRule("space-2")};
    font-family: ${staticTokenRule("font-display")};
    font-size: ${staticTokenRule("font-size-2")};
    font-weight: ${staticTokenRule("font-weight-bold")};
  }

  h3 {
    margin-bottom: ${staticTokenRule("space-1")};
    font-family: ${staticTokenRule("font-display")};
    font-size: ${staticTokenRule("font-size-3")};
    font-weight: ${staticTokenRule("font-weight-semibold")};
  }

  h4 {
    margin-bottom: ${staticTokenRule("space-1")};
    font-family: ${staticTokenRule("font-display")};
    font-size: ${staticTokenRule("font-size-4")};
    font-weight: ${staticTokenRule("font-weight-semibold")};
  }

  h5 {
    margin-bottom: ${staticTokenRule("space-1")};
    font-family: ${staticTokenRule("font-display")};
    font-size: ${staticTokenRule("font-size-5")};
  }

  h6 {
    margin-bottom: ${staticTokenRule("space-1")};
    font-size: ${staticTokenRule("font-size-base")};
    text-transform: uppercase;
  }

  p,
  dd {
    margin-bottom: ${staticTokenRule("space-1")};
    font-size: inherit;
  }

  dt {
    font-weight: ${staticTokenRule("font-weight-bold")};
  }

  ol,
  ul {
    margin-bottom: ${staticTokenRule("space-1")};
    padding-left: ${staticTokenRule("space-2")};
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  li {
    font-size: inherit;
    list-style-position: outside;
    list-style-type: inherit;
  }

  pre,
  code {
    font-size: inherit;
    font-family: ${staticTokenRule("font-mono")};
  }

  p {
    code {
      background-color: ${themeTokenRule("color-background-alt-2")};
      padding: ${staticTokenRule("space-05")};
    }
  }

  pre {
    border-width: ${staticTokenRule("border-width-default")};
    border-style: solid;
    border-color: ${themeTokenRule("color-border-base")};
    background-color: ${themeTokenRule("color-background-alt-2")};
    margin-top: ${staticTokenRule("space-2")};
    margin-bottom: ${staticTokenRule("space-2")};

    code {
      display: block;
      padding: ${staticTokenRule("space-1")};
      overflow-x: auto;
    }
  }

  blockquote {
    border-left-width: ${staticTokenRule("border-width-marked")};
    border-left-style: solid;
    border-left-color: ${themeTokenRule("color-border-brand")};
    padding-top: ${staticTokenRule("space-05")};
    padding-right: ${staticTokenRule("space-0")};
    padding-bottom: ${staticTokenRule("space-05")};
    padding-left: ${staticTokenRule("space-1")};

    p {
      margin-bottom: ${staticTokenRule("space-0")};
    }
  }

  hr {
    border-bottom-width: ${staticTokenRule("border-width-default")};
    border-bottom-style: solid;
    border-bottom-color: ${themeTokenRule("color-border-base")};
    display: block;
    width: 100%;
    margin-top: ${staticTokenRule("space-3")};
    margin-bottom: ${staticTokenRule("space-3")};
  }
`;

/**
 * A component wrapper to use for a set of styled text markup. This component
 * provides a sane set of styling rules to common text elements, including
 * `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`, `<p>`, `<ul>`, `<ol>`,
 * `<code>`, `<pre>`, `<blockquote>`, and `<hr>`.
 */
export const Typeset: FC<TypesetProps> = (props) => {
  return (
    <ScTypeset
      className="tw-typeset"
      fontSize={props.baseFontSize || FontSize.Size5}
      {...props}
    />
  );
};

Typeset.displayName = "Typeset";
