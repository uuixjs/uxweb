import { Display, InjectLayout } from "../../layout";
import {
  FormEventHandler,
  ForwardRefRenderFunction,
  KeyboardEventHandler,
  Ref,
  forwardRef,
} from "react";
import { Input, InputType } from "../input";
import {
  cn,
  getAriaProps,
  getDataProps,
  newUUIDv4,
} from "lib/ui-utils";

import { InputSize } from "../form";
import { SVGAsset } from "../../svg";

export interface SearchInputProps {
  autoComplete?: string;
  autoCapitalize?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  id?: string;
  error?: boolean;
  maxLength?: number;
  name?: string;
  onBlur?: FormEventHandler<HTMLInputElement>;
  onChange?: FormEventHandler<HTMLInputElement>;
  onFocus?: FormEventHandler<HTMLInputElement>;
  /** Fires on all keypresses, including those that don't change the input value (e.g. the ↑ and ↓ keys). */
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  placeholder?: string;
  /** @deprecated Ref forwarding is now supported; use the `ref` prop instead of `refDelegate` */
  refDelegate?: Ref<HTMLInputElement>;
  size?: InputSize;
  spellCheck?: boolean;
  tabIndex?: number;
  value?: string;
  /**
   * @deprecated Use `<OverlayRegion>` instead.
   */
  overlay?: boolean;
}

const SearchInput: ForwardRefRenderFunction<
  HTMLInputElement,
  SearchInputProps
> = (props, ref) => {
  const generatedId = `tw-${newUUIDv4()}`;

  return (
    <div className={cn("tw-search-input")} {...getDataProps(props)}>
      <InjectLayout display={Display.HideAccessible}>
        <label htmlFor={props.id ? props.id : generatedId}>Search</label>
      </InjectLayout>
      <Input
        {...getAriaProps(props)}
        ref={ref || props.refDelegate}
        autoCapitalize={props.autoCapitalize}
        autoFocus={props.autoFocus}
        autoComplete={props.autoComplete || "off"}
        disabled={props.disabled}
        error={props.error}
        icon={SVGAsset.NavSearch}
        id={props.id ? props.id : generatedId}
        maxLength={props.maxLength}
        name={props.name}
        onBlur={props.onBlur}
        onChange={props.onChange}
        onFocus={props.onFocus}
        onKeyDown={props.onKeyDown}
        placeholder={props.placeholder}
        spellCheck={props.spellCheck}
        tabIndex={props.tabIndex}
        size={props.size}
        type={InputType.Search}
        value={props.value}
        overlay={props.overlay}
      />
    </div>
  );
};

SearchInput.displayName = "SearchInput";
const ComponentWithRef = forwardRef(SearchInput);
export { ComponentWithRef as SearchInput };
