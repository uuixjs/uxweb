import { FormEventHandler, Ref } from "react";

import { BorderRadius } from "lib/ui-utils";
import { FontSize } from "../layout";

export interface InputControlProps {
  autoFocus?: boolean;
  /** Programatically check the box. */
  checked?: boolean;
  defaultChecked?: boolean;
  /** Display as disabled. */
  disabled?: boolean;
  error?: boolean;
  id?: string;
  /**
   * @example PlayStation 4
   */
  name?: string;
  onBlur?: FormEventHandler<HTMLInputElement>;
  onChange?: FormEventHandler<HTMLInputElement>;
  onFocus?: FormEventHandler<HTMLInputElement>;
  refDelegate?: Ref<HTMLInputElement>;
  readOnly?: boolean;
  required?: boolean;
  tabIndex?: number;
  value?: string;
}

export enum InputSize {
  Small = "small",
  Default = "default",
  Large = "large",
}

export const INPUT_SIZES = {
  [InputSize.Small]: FontSize.Size7,
  [InputSize.Default]: FontSize.Size6,
  [InputSize.Large]: FontSize.Size5,
};

export const INPUT_BORDER_RADIUS = {
  [InputSize.Small]: BorderRadius.Small,
  [InputSize.Default]: BorderRadius.Medium,
  [InputSize.Large]: BorderRadius.Large,
};
