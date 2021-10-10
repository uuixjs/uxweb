import * as React from "react";

import {
  AlignItems,
  Background,
  Display,
  FormGroup,
  FormHint,
  InjectLayout,
  InputSize,
  Layout,
  OverlayRegion,
  Radio,
  Title,
  TitleSize,
} from "v2";

import { ExampleSection } from "../components/example-section";

export default { title: Radio.displayName };

export const Examples = () => {
  return (
    <>
      <ExampleSection label="Default">
        <FormGroup label="Select Pizza Type">
          <Radio name="example-1" label="Cheese" defaultChecked />
          <Radio name="example-1" label="Vegetable Delux" />
          <Radio name="example-1" label="Pineapple and Ham" />
        </FormGroup>
      </ExampleSection>

      <ExampleSection label="Error State">
        <FormGroup
          label="Select Pizza Type"
          error
          errorMessage="Sorry, we are sold out of that kind of pizza."
        >
          <Radio name="example-2" label="Cheese" error defaultChecked />
          <Radio name="example-2" label="Vegetable Delux" error />
          <Radio name="example-2" label="Pineapple and Ham" error />
        </FormGroup>
      </ExampleSection>

      <ExampleSection label="Disabled State">
        <FormGroup label="Select Pizza Type">
          <Radio name="example-3" label="Cheese" disabled defaultChecked />
          <Radio name="example-3" label="Vegetable Delux" disabled />
          <Radio name="example-3" label="Pineapple and Ham" disabled />
        </FormGroup>
      </ExampleSection>

      <ExampleSection label="Large Size">
        <FormGroup label="Select Pizza Type">
          <Radio
            name="example-4"
            size={InputSize.Large}
            label="Cheese"
            defaultChecked
          />
          <Radio
            name="example-4"
            size={InputSize.Large}
            label="Vegetable Delux"
          />
          <Radio
            name="example-4"
            size={InputSize.Large}
            label="Pineapple and Ham"
          />
        </FormGroup>
      </ExampleSection>
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
          <Radio name="layout-example-1" label="Cheese" defaultChecked />
        </Layout>
        <Layout border background={Background.Base} margin={1}>
          <Radio name="layout-example-1" label="Vegetable Delux" />
        </Layout>
        <Layout border background={Background.Base} margin={1}>
          <Radio name="layout-example-1" label="Pineapple and Ham" />
        </Layout>
      </Layout>
    </ExampleSection>

    <ExampleSection label="Label Composition">
      <Layout
        display={Display.Flex}
        alignItems={AlignItems.Center}
        margin={{ bottom: 1 }}
      >
        <Radio
          label={null}
          name="example-composed-label"
          id="composed-radio-input-1"
          defaultChecked
        />
        <InjectLayout margin={{ left: 1 }}>
          <label htmlFor="composed-radio-input-1">
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
        <Radio
          label={null}
          name="example-composed-label"
          id="composed-radio-input-2"
        />
        <InjectLayout margin={{ left: 1 }}>
          <label htmlFor="composed-radio-input-2">
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
        <Radio
          label={null}
          name="example-composed-label"
          id="composed-radio-input-3"
        />
        <InjectLayout margin={{ left: 1 }}>
          <label htmlFor="composed-radio-input-3">
            <Title size={TitleSize.Small}>Input Option C</Title>
            <FormHint hint="Some Grouped Hint Text" />
          </label>
        </InjectLayout>
      </Layout>
    </ExampleSection>
  </>
);
