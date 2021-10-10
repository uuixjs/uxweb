import * as React from "react";

import {
  Color,
  FontSize,
  FormGroup,
  FormGroupOrientation,
  FormGroupProps,
  Input,
  InputType,
  Layout,
  Radio,
  Range,
  TextArea,
  Title,
  Toggle,
} from "v2";
import {
  CombinationGenerator,
  CombinationMode,
} from "../../components/combination-generator";

import { Outline } from "../../components/outline";
import { useState } from "react";

export default { title: FormGroup.displayName };

export const Examples = () => {
  const requiredProps: FormGroupProps = {
    label: "Form Group Label",
    errorMessage: "OMG, You did something wrong.",
  };

  return (
    <CombinationGenerator
      mode={CombinationMode.Simple}
      fields={[
        {
          propKey: "error",
          propValues: [false, true],
        },
        {
          propKey: "required",
          propValues: [false, true],
        },
        {
          propKey: "label",
          propValues: [
            "Form Group Label",
            "EXPERIMENT_TWILIGHT_ID_TRANSFORM_CHANNEL_PAGE",
          ],
        },
        {
          propKey: "labelOptional",
          propValues: [undefined, "This is an optional label"],
        },
        {
          propKey: "hint",
          propValues: [
            undefined,
            "Hint copy to explain how to fill out this form",
          ],
        },
        {
          propKey: "orientation",
          propValues: [
            FormGroupOrientation.Vertical,
            FormGroupOrientation.Horizontal,
          ],
        },
      ]}
    >
      <FormGroup {...requiredProps}>
        <Input type={InputType.Text} />
      </FormGroup>
      <FormGroup {...requiredProps}>
        <Radio name="settings-pizza" label="Vegetarian" />
        <Radio name="settings-pizza" label="Pepperoni delux" />
        <Radio name="settings-pizza" label="Pineapple and ham supreme" />
      </FormGroup>
      <FormGroup {...requiredProps}>
        <Range />
      </FormGroup>
      <FormGroup {...requiredProps}>
        <TextArea />
      </FormGroup>
    </CombinationGenerator>
  );
};

export const Composition = () => {
  const [error, setError] = useState(false);
  return (
    <>
      <FormGroup
        label="Toggle Error State"
        error={error && "Now the toggle is in error"}
        orientation={FormGroupOrientation.Horizontal}
      >
        <Toggle
          checked={error}
          error={error}
          onChange={(e) => {
            setError(e.currentTarget.checked);
          }}
        />
      </FormGroup>
      <Layout margin={{ top: 2 }} />
      <Title>FormGroup Anatomy</Title>
      <Layout margin={{ bottom: 0.5 }} />
      <FormGroup
        error={error && <Outline padding={{ y: 1, x: 2 }}>error</Outline>}
        label={<Outline padding={{ y: 1, x: 2 }}>label</Outline>}
        hint={<Outline padding={{ y: 1, x: 2 }}>hint</Outline>}
      >
        <Outline padding={{ y: 1, x: 2 }}>children (input)</Outline>
      </FormGroup>

      <Layout margin={{ top: 2 }} />
      <FormGroup
        label={<Title>Custom Label</Title>}
        hint={
          <Layout color={Color.Alt} margin={{ left: 1 }}>
            Custom Hint
          </Layout>
        }
        error={
          error && (
            <Layout
              color={Color.Error}
              margin={{ left: 1 }}
              fontSize={FontSize.Size4}
            >
              Custom Error
            </Layout>
          )
        }
      >
        <Input placeholder="Any Input" type={InputType.Text} />
      </FormGroup>
    </>
  );
};
