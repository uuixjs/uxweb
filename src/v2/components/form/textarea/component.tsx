import {
  BorderRadius,
  cn,
  getAriaProps,
  getDataProps,
  rem,
  staticTokenRule,
  styled,
} from "lib/ui-utils";
import {
  CSSProperties,
  FormEventHandler,
  ForwardRefRenderFunction,
  KeyboardEventHandler,
  Ref,
  forwardRef,
} from "react";
import { INPUT_SIZES, InputSize } from "../form";
import { InjectLayout, Overflow } from "../../layout";

import { ScInputBase } from "../common";
import { withOverlayContext } from "../../overlay-region/context";

interface ScTextAreaProps {
  $noResize?: boolean;
}

const ScTextArea = styled(ScInputBase)<ScTextAreaProps>`
  display: block;
  width: 100%;
  padding: ${staticTokenRule("space-05")} ${staticTokenRule("space-1")};
  resize: ${({ $noResize }) => ($noResize ? "none" : "vertical")};

  -ms-overflow-style: none;

  &[cols] {
    width: auto;
    max-width: 100%;
  }
`;

export interface TextAreaProps {
  autoComplete?: string;
  autoFocus?: boolean;
  cols?: number;
  disabled?: boolean;
  error?: boolean;
  id?: string;
  maxLength?: number;
  name?: string;
  onBlur?: FormEventHandler<HTMLTextAreaElement>;
  onChange?: FormEventHandler<HTMLTextAreaElement>;
  onFocus?: FormEventHandler<HTMLTextAreaElement>;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
  overflow?: Overflow;
  paddingLeft?: number;
  paddingRight?: number;
  placeholder?: string;
  noResize?: boolean;
  readOnly?: boolean;
  rows?: number;
  size?: InputSize;
  tabIndex?: number;
  value?: string;
  /** @deprecated Ref forwarding is now supported; use the `ref` prop instead of `refDelegate` */
  refDelegate?: Ref<HTMLTextAreaElement>;
  defaultValue?: string;
  overlay?: boolean;
}

export const TextAreaComponent: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextAreaProps
> = (props, ref) => {
  const classesTextarea: ClassValue = {
    "tw-textarea": true,
    "tw-textarea--no-resize": props.noResize,
    "tw-textarea--error": props.error,
    "tw-textarea--overlay": props.overlay,
  };

  let inputSize = InputSize.Default;
  if (props.size) {
    inputSize = props.size;
  }

  const padding: CSSProperties = {
    paddingRight: props.paddingRight ? rem(props.paddingRight) : undefined,
    paddingLeft: props.paddingLeft ? rem(props.paddingLeft) : undefined,
  };

  return (
    <InjectLayout
      borderRadius={BorderRadius.Medium}
      overflow={props.overflow}
      fontSize={INPUT_SIZES[inputSize]}
    >
      <ScTextArea
        as="textarea"
        {...getDataProps(props)}
        {...getAriaProps(props)}
        ref={ref || props.refDelegate}
        className={cn(classesTextarea)}
        autoComplete={props.autoComplete}
        autoFocus={props.autoFocus}
        cols={props.cols}
        disabled={props.disabled}
        id={props.id}
        maxLength={props.maxLength}
        name={props.name}
        onBlur={props.onBlur}
        onChange={props.onChange}
        onFocus={props.onFocus}
        onKeyDown={props.onKeyDown}
        style={padding}
        placeholder={props.placeholder}
        rows={props.rows}
        tabIndex={props.tabIndex}
        value={props.value}
        defaultValue={props.defaultValue}
        readOnly={props.readOnly}
        error={props.error}
        overlay={props.overlay}
        $noResize={props.noResize}
      />
    </InjectLayout>
  );
};

TextAreaComponent.displayName = "TextArea";
const ComponentWithRef = forwardRef(TextAreaComponent);
const ComponentWithOverlayContext = withOverlayContext<
  TextAreaProps,
  HTMLTextAreaElement
>(ComponentWithRef);
export { ComponentWithOverlayContext as TextArea };
