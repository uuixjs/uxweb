import * as React from "react";

import {
  AlignItems,
  Background,
  Button,
  ButtonType,
  CheckBox,
  CoreText,
  Display,
  FormGroup,
  FormHint,
  InjectLayout,
  InputSize,
  Layout,
  OverlayRegion,
  Title,
  TitleSize,
} from "v2";
import { ChangeEvent, FC, useState } from "react";

import { ExampleSection } from "../../components/example-section";

export default { title: CheckBox.displayName };

export const Examples = () => {
  return (
    <>
      <ExampleSection label="Default">
        <FormGroup label="Select Pizza Toppings">
          <CheckBox label="Cheese" />
          <CheckBox label="Mushrooms" />
          <CheckBox label="Pineapple" defaultChecked />
        </FormGroup>
      </ExampleSection>

      <ExampleSection label="Error State">
        <FormGroup
          label="Select Pizza Toppings"
          error
          errorMessage="Sorry, we are sold out of those toppings."
        >
          <CheckBox label="Cheese" error />
          <CheckBox label="Mushrooms" error />
          <CheckBox label="Pineapple" error defaultChecked />
        </FormGroup>
      </ExampleSection>

      <ExampleSection label="Disabled State">
        <FormGroup label="Select Pizza Toppings">
          <CheckBox label="Cheese" disabled />
          <CheckBox label="Mushrooms" disabled />
          <CheckBox label="Pineapple" disabled defaultChecked />
        </FormGroup>
      </ExampleSection>

      <ExampleSection label="Large Size">
        <FormGroup label="Select Pizza Toppings">
          <CheckBox size={InputSize.Large} label="Cheese" />
          <CheckBox size={InputSize.Large} label="Mushrooms" />
          <CheckBox size={InputSize.Large} label="Pineapple" defaultChecked />
        </FormGroup>
      </ExampleSection>

      <ExampleSection label="Indeterminate">
        <IndeterminateExample />
      </ExampleSection>
    </>
  );
};

const IndeterminateExample: FC = () => {
  const [boxes, setBoxes] = useState<
    { id: string; label: string; checked: boolean }[]
  >([
    {
      id: "ps",
      label: "PlayStation",
      checked: false,
    },
    {
      id: "xbox",
      label: "Xbox",
      checked: false,
    },
    {
      id: "pc",
      label: "PC",
      checked: true,
    },
    {
      id: "nintendo",
      label: "Nintendo",
      checked: false,
    },
  ]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBoxes(
      boxes.map((box) => {
        if (box.id === e.target.id) {
          box.checked = e.target.checked;
        }
        return box;
      }),
    );
  };

  const handleAllChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setBoxes(
        boxes.map((box) => {
          box.checked = true;
          return box;
        }),
      );
    } else {
      setBoxes(
        boxes.map((box) => {
          box.checked = false;
          return box;
        }),
      );
    }
  };

  return (
    <>
      <CheckBox
        label="Select Game Consoles"
        onChange={handleAllChange}
        indeterminate={
          !boxes.every((box) => box.checked === true) &&
          !boxes.every((box) => box.checked === false)
        }
        checked={!boxes.every((box) => box.checked === false)}
      />
      <Layout margin={{ y: 1 }} borderBottom />
      {boxes.map((box) => (
        <CheckBox
          name="console-select"
          key={box.id}
          id={box.id}
          label={box.label}
          checked={box.checked}
          onChange={handleChange}
        />
      ))}
    </>
  );
};

export const WithOverlay = () => (
  <OverlayRegion overlay>
    <Layout background={Background.Overlay}>
      <Examples />
    </Layout>
  </OverlayRegion>
);

export const LabelLayoutAndComposition = () => (
  <>
    <ExampleSection
      label="Click Target"
      description="Test that the entire rectangle is clickable; the label should grow to fill the container."
    >
      <Layout>
        <Layout border background={Background.Base} margin={1}>
          <CheckBox name="layout-example-1" label="Cheese" defaultChecked />
        </Layout>
        <Layout border background={Background.Base} margin={1}>
          <CheckBox name="layout-example-1" label="Vegetable Delux" />
        </Layout>
        <Layout border background={Background.Base} margin={1}>
          <CheckBox name="layout-example-1" label="Pineapple and Ham" />
        </Layout>
      </Layout>
    </ExampleSection>

    <ExampleSection label="Label Composition">
      <Layout
        display={Display.Flex}
        alignItems={AlignItems.Center}
        margin={{ bottom: 1 }}
      >
        <CheckBox
          label={null}
          name="example-composed-label"
          id="composed-checkbox-input-1"
          defaultChecked
        />
        <InjectLayout margin={{ left: 1 }}>
          <label htmlFor="composed-checkbox-input-1">
            <Title size={TitleSize.Small}>Input Option A</Title>
            <FormHint hint="Some Grouped Hint Text" />
          </label>
        </InjectLayout>
      </Layout>

      <Layout
        display={Display.Flex}
        alignItems={AlignItems.Center}
        margin={{ bottom: 1 }}
      >
        <CheckBox
          label={null}
          name="example-composed-label"
          id="composed-checkbox-input-2"
        />
        <InjectLayout margin={{ left: 1 }}>
          <label htmlFor="composed-checkbox-input-2">
            <Title size={TitleSize.Small}>Input Option B</Title>
            <FormHint hint="Some Grouped Hint Text" />
          </label>
        </InjectLayout>
      </Layout>

      <Layout
        display={Display.Flex}
        alignItems={AlignItems.Center}
        margin={{ bottom: 1 }}
      >
        <CheckBox
          label={null}
          name="example-composed-label"
          id="composed-checkbox-input-3"
        />
        <InjectLayout margin={{ left: 1 }}>
          <label htmlFor="composed-checkbox-input-3">
            <Title size={TitleSize.Small}>Input Option C</Title>
            <FormHint hint="Some Grouped Hint Text" />
          </label>
        </InjectLayout>
      </Layout>
    </ExampleSection>
  </>
);

export const RefDelegation = () => {
  let checkboxRef: HTMLInputElement | null;

  const handleClick = () => {
    if (checkboxRef) {
      checkboxRef.focus();
    }
  };

  return (
    <>
      <Layout margin={{ bottom: 1 }}>
        <CoreText>
          Ensure the refDelegate functions if we use the indeterminate
          attribute. Clicking the button should move the browser focus to the
          checkbox. Use keyboard navigation (Tab + Enter) in order to visually
          see the focus ring move; it will not appear on mouse click.
        </CoreText>
      </Layout>
      <Layout margin={{ bottom: 2 }}>
        <Button variant={ButtonType.Secondary} onClick={handleClick}>
          Focus on checkbox
        </Button>
      </Layout>
      <Layout>
        <CheckBox
          label="Show All"
          refDelegate={(ref) => (checkboxRef = ref)}
          indeterminate
        />
      </Layout>
    </>
  );
};
