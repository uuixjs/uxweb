import * as React from "react";

import { FC, FormEvent } from "react";

import { FormGroup } from "v2";

interface Props {
  color: string;
  setColor: (s: string) => void;
}

export const ColorPicker: FC<Props> = ({ color, setColor }) => (
  <FormGroup label="Primary Input Color" hint={color}>
    <input
      style={{
        width: 60,
        height: 60,
        padding: 1,
      }}
      type="color"
      value={color}
      onChange={(e: FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setColor(value);
      }}
    />
  </FormGroup>
);
