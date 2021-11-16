import {
  FormEventHandler,
  ForwardRefRenderFunction,
  Ref,
  forwardRef,
} from "react";
import {
  css,
  getAriaProps,
  getDataProps,
  hoverCss,
  newUUIDv4,
  staticTokenRule,
  styleVariant,
  styled,
} from "@uuixjs/uuixweb-lib";

import { CoreFocusEventHandlers } from "../core-interactive";
import { darken } from "polished";
import { focusRingStyleReplacement } from "../form/common";

export interface ThemeToggleProps
  extends CoreFocusEventHandlers<HTMLInputElement> {
  checked?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  onChange?: FormEventHandler<HTMLInputElement>;
  /** @deprecated Ref forwarding is now supported; use the `ref` prop instead of `refDelegate` */
  refDelegate?: Ref<HTMLInputElement>;
  tabIndex?: number;
  value?: string;
}

// Dark mode toggle with sun and moon
const boxShadowColor = "rgba(0, 0, 0, 0.1)";
const lightToggle = "#ffc361";
const darkToggle = "#fffbf3";

const darkToggleBackground = "#6d51aa";
const darkToggleBackgroundHover = staticTokenRule("color-twitch-purple-7");
const lightToggleBackground = "#8eb4e0";
const lightToggleBackgroundHover = darken(0.1, lightToggleBackground);

const crater = "#d8d3cb";
const glare = "#ffe1a9";
const rayHeight = "2px";

const time = staticTokenRule("timing-short");

const height = "25px";
const width = "55px";
const offset = "6px";

const ScThemeToggleItems = styled.span`
  background-color: ${lightToggle};
  border-radius: 50%;
  box-shadow: 0 2px 4px ${boxShadowColor};
  display: inline-block;
  height: calc(${height} - ${offset});
  left: calc(${offset} / 2);
  position: relative;
  top: calc(${offset} / 2);
  transform: rotate(-90deg);
  transition-duration: ${time};
  transition-property: transform, top, left;
  width: calc(${height} - ${offset});
`;

const ScThemeToggleGlare = styled.span`
  border: solid calc(${height} / 14) ${glare};
  border-color: transparent transparent ${glare};
  border-radius: 0 0 200px 200px;
  height: calc(${height} / 2);
  left: 15%;
  opacity: 1;
  position: absolute;
  top: 15%;
  transform: rotate(220deg);
  transition: opacity calc(${time} / 4);
  width: calc(${height} / 2);
`;

const ScThemeToggleDot = styled.span<{ dot: 1 | 2 | 3 }>`
  background-color: ${crater};
  border-radius: 100%;
  opacity: 0;
  position: absolute;
  transition: opacity calc(${time} / 4);

  ${styleVariant("dot", {
    1: css`
      height: calc(${height} / 7);
      left: 25%;
      top: 30%;
      width: calc(${height} / 7);
    `,
    2: css`
      height: calc(${height} / 6);
      left: 50%;
      top: 60%;
      width: calc(${height} / 6);
    `,
    3: css`
      height: calc(${height} / 5);
      right: 20%;
      top: 20%;
      width: calc(${height} / 5);
    `,
  })}
`;

const ScThemeToggleRays = styled.span`
  opacity: 1;
  pointer-events: none;
  transition: opacity calc(${time} / 4);
  transition-delay: calc(${time} / 4);
`;

const ScThemeToggleRay = styled.span<{ ray: 1 | 2 | 3 }>`
  background: ${lightToggle};
  border-radius: ${offset};
  height: ${rayHeight};
  position: absolute;

  ${styleVariant("ray", {
    1: css`
      width: calc(${height} / 4);
      left: calc(${height} + 1px);
      top: calc(${height} / 2 - ${offset} / 4);
    `,
    2: css`
      left: ${height};
      top: calc(20%);
      transform: rotate(-20deg);
      width: calc(${height} / 5);
    `,
    3: css`
      left: ${height};
      top: calc(80% - 3px);
      transform: rotate(20deg);
      width: calc(${height} / 5);
    `,
  })}
`;

const ScThemeToggleInput = styled.input`
  position: absolute;
  opacity: 0;
`;

const ScThemeToggleButton = styled.label`
  background-color: ${lightToggleBackground};
  border-radius: calc(${width} - ${offset});
  cursor: pointer;
  display: inline-block;
  height: ${height};
  position: relative;
  transition: background-color ${time};
  width: ${width};

  ${focusRingStyleReplacement(ScThemeToggleInput)}

  ${hoverCss`
    background: ${lightToggleBackgroundHover};
  `}

  ${ScThemeToggleInput} {
    + && {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  ${ScThemeToggleInput}:checked + && {
    background-color: ${darkToggleBackground};

    ${hoverCss`
      background: ${darkToggleBackgroundHover};
    `}

    // Need to set the ray opacity to 0 for Edge, otherwise they are visible. Changed from the container
    ${ScThemeToggleRay} {
      opacity: 0;
    }

    ${ScThemeToggleItems} {
      background-color: ${darkToggle};
      transform: translate3d(calc(${width} - ${height}), 0, 0) rotate(0);

      ${ScThemeToggleDot} {
        opacity: 1;
      }

      ${ScThemeToggleGlare} {
        opacity: 0;
      }
    }
  }
`;

const ScThemeToggle = styled.div`
  position: relative;
  user-select: none;
`;

const ThemeToggle: ForwardRefRenderFunction<
  HTMLInputElement,
  ThemeToggleProps
> = (props, ref) => {
  const id = props.id || newUUIDv4();

  return (
    <ScThemeToggle className="tw-theme-toggle" {...getDataProps(props)}>
      <ScThemeToggleInput
        className="tw-theme-toggle__input"
        ref={ref || props.refDelegate}
        checked={props.checked}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        id={id}
        name={props.name}
        onBlur={props.onBlur}
        onChange={props.onChange}
        onFocus={props.onFocus}
        tabIndex={props.tabIndex}
        type="checkbox"
        value={props.value}
        data-a-target="tw-theme-toggle"
        {...getAriaProps(props)}
      />
      <ScThemeToggleButton htmlFor={id}>
        <ScThemeToggleRays>
          <ScThemeToggleRay ray={1} />
          <ScThemeToggleRay ray={2} />
          <ScThemeToggleRay ray={3} />
        </ScThemeToggleRays>
        <ScThemeToggleItems>
          <ScThemeToggleGlare />
          <ScThemeToggleDot dot={1} />
          <ScThemeToggleDot dot={2} />
          <ScThemeToggleDot dot={3} />
        </ScThemeToggleItems>
      </ScThemeToggleButton>
    </ScThemeToggle>
  );
};

ThemeToggle.displayName = "ThemeToggle";
const ComponentWithRef = forwardRef(ThemeToggle);
export { ComponentWithRef as ThemeToggle };
