import { AlignItems, Display, InjectLayout, Layout } from "../../../layout";
import {
  DropDownMenuItemFigure,
  DropDownMenuItemFigureProps,
} from "../drop-down-menu-item-figure";
import { newUUIDv4, styled } from "lib";

import { CheckBox } from "../../../form/checkbox";
import { FC } from "react";
import { FormHint } from "../../../form/hint";
import { InputControlProps } from "../../../form/form";
import { Radio } from "../../../form/radio";
import { Toggle } from "../../../form/toggle";

// It seems that even though these are enum members, there is still a
// possibility that they can shadow variables in some cases. See:
// https://github.com/typescript-eslint/typescript-eslint/issues/325
export enum DropDownMenuInputItemType {
  CheckBox = "checkbox", // eslint-disable-line @typescript-eslint/no-shadow
  Radio = "radio", // eslint-disable-line @typescript-eslint/no-shadow
  Toggle = "toggle", // eslint-disable-line @typescript-eslint/no-shadow
}

export interface DropDownMenuInputItemProps extends InputControlProps {
  label: string;
  type: DropDownMenuInputItemType | "checkbox" | "radio" | "toggle"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
  hint?: string;
  figure?: DropDownMenuItemFigureProps;
}

const ScDropDownMenuInputItemLabel = styled.label`
  cursor: pointer;
`;

const ScDropDownMenuInputItemHint = styled.div`
  margin-left: 2.6rem;
`;

export const DropDownMenuInputItem: FC<DropDownMenuInputItemProps> = ({
  label,
  type,
  hint,
  figure,
  ...inputProps
}) => {
  const icon = figure && (
    <Layout
      flexShrink={0}
      padding={{
        left: type === DropDownMenuInputItemType.Toggle ? undefined : 1,
        right: type === DropDownMenuInputItemType.Toggle ? 0.5 : undefined,
      }}
    >
      <DropDownMenuItemFigure {...figure} />
    </Layout>
  );

  const generatedId = newUUIDv4();

  return (
    <Layout padding={0.5}>
      <Layout display={Display.Flex} alignItems={AlignItems.Center}>
        {type === DropDownMenuInputItemType.CheckBox && (
          <Layout flexGrow={1}>
            <CheckBox label={label} {...inputProps} />
          </Layout>
        )}
        {type === DropDownMenuInputItemType.Radio && (
          <Layout flexGrow={1}>
            <Radio label={label} {...inputProps} />
          </Layout>
        )}
        {icon}
        {type === DropDownMenuInputItemType.Toggle && (
          <>
            <InjectLayout flexGrow={1} margin={{ right: 2 }}>
              <ScDropDownMenuInputItemLabel
                className="tw-drop-down-menu-input-item__label"
                htmlFor={inputProps.id || generatedId}
              >
                {label}
              </ScDropDownMenuInputItemLabel>
            </InjectLayout>
            <Toggle {...inputProps} id={inputProps.id || generatedId} />
          </>
        )}
      </Layout>
      {hint && (
        <ScDropDownMenuInputItemHint className="tw-drop-down-menu-input-item__hint">
          <FormHint hint={hint} />
        </ScDropDownMenuInputItemHint>
      )}
    </Layout>
  );
};

DropDownMenuInputItem.displayName = "DropDownMenuInputItem";
