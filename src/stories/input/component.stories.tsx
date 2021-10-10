import * as React from "react";

import {
  Background,
  CheckBox,
  Column,
  Display,
  FormGroup,
  FormHint,
  FormLabel,
  Grid,
  Input,
  InputRounding,
  InputSize,
  InputType,
  Layout,
  OverlayRegion,
  Radio,
  SVGAsset,
  Select,
  TextAlign,
  Tower,
} from "v2";

import { ExampleSection } from "../../components/example-section";
import { ExampleThumbnails } from "../assets";

export default { title: Input.displayName };

const LONG_SENTENCE =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

export const examples = () => (
  <Layout margin={{ bottom: 2 }}>
    <Layout padding={{ bottom: 2 }}>
      <Tower>
        <FormGroup label="Text">
          <Input type={InputType.Text} value="twitch" />
        </FormGroup>
        <FormGroup label="Search">
          <Input type={InputType.Search} value="Twitch" />
        </FormGroup>
        <FormGroup label="Password">
          <Input type={InputType.Password} value="0000000000" />
        </FormGroup>
        <FormGroup label="Number">
          <Input type={InputType.Number} value="37" />
        </FormGroup>
        <FormGroup label="Email">
          <Input type={InputType.Email} value="glitch@twitch.tv" />
        </FormGroup>
      </Tower>
    </Layout>

    <Layout background={Background.Accent} padding={2}>
      <Layout margin={{ bottom: 0.5 }}>
        <FormLabel label="Test Form Label" id="" overlay />
      </Layout>
      <Grid>
        <Column cols={3}>
          <Layout flexGrow={1} margin={{ bottom: 0.5 }}>
            <Input
              type={InputType.Text}
              placeholder="Placeholder Text"
              overlay
            />
          </Layout>
          <Layout flexGrow={1} margin={{ bottom: 0.5 }}>
            <Select overlay>
              <option>Test</option>
            </Select>
          </Layout>
        </Column>
      </Grid>
      <Layout margin={{ bottom: 2 }}>
        <FormHint hint="Test Form Hint" overlay />
      </Layout>
      <Layout display={Display.Flex}>
        <Layout margin={{ bottom: 2, right: 2 }}>
          <CheckBox label="Test" overlay />
        </Layout>
        <Layout margin={{ bottom: 0 }}>
          <Radio label="Test" overlay />
        </Layout>
      </Layout>
    </Layout>
    <Layout background={Background.AccentAlt} padding={2}>
      <Layout margin={{ bottom: 0.5 }}>
        <FormLabel label="Test Form Label" id="" overlay />
      </Layout>
      <Grid>
        <Column cols={3}>
          <Layout flexGrow={1} margin={{ bottom: 0.5 }}>
            <Input
              type={InputType.Text}
              placeholder="Placeholder Text"
              overlay
            />
          </Layout>
          <Layout flexGrow={1} margin={{ bottom: 0.5 }}>
            <Select overlay>
              <option>Test</option>
            </Select>
          </Layout>
        </Column>
      </Grid>
      <Layout margin={{ bottom: 2 }}>
        <FormHint hint="Test Form Hint" overlay />
      </Layout>
      <Layout display={Display.Flex}>
        <Layout margin={{ bottom: 2, right: 2 }}>
          <CheckBox label="Test" overlay />
        </Layout>
        <Layout margin={{ bottom: 0 }}>
          <Radio label="Test" overlay />
        </Layout>
      </Layout>
    </Layout>
    <Layout background={Background.AccentAlt2} padding={2}>
      <Layout margin={{ bottom: 0.5 }}>
        <FormLabel label="Test Form Label" id="" overlay />
      </Layout>
      <Grid>
        <Column cols={3}>
          <Layout flexGrow={1} margin={{ bottom: 0.5 }}>
            <Input
              type={InputType.Text}
              placeholder="Placeholder Text"
              overlay
            />
          </Layout>
          <Layout flexGrow={1} margin={{ bottom: 0.5 }}>
            <Select overlay>
              <option>Test</option>
            </Select>
          </Layout>
        </Column>
      </Grid>
      <Layout margin={{ bottom: 2 }}>
        <FormHint hint="Test Form Hint" overlay />
      </Layout>
      <Layout display={Display.Flex}>
        <Layout margin={{ bottom: 2, right: 2 }}>
          <CheckBox label="Test" overlay />
        </Layout>
        <Layout margin={{ bottom: 0 }}>
          <Radio label="Test" overlay />
        </Layout>
      </Layout>
    </Layout>
    <div style={{ backgroundColor: "black" }}>
      <Layout background={Background.Overlay} padding={2}>
        <Layout margin={{ bottom: 0.5 }}>
          <FormLabel label="Test Form Label" id="" overlay />
        </Layout>
        <Grid>
          <Column cols={3}>
            <Layout flexGrow={1} margin={{ bottom: 0.5 }}>
              <Input
                type={InputType.Text}
                placeholder="Placeholder Text"
                overlay
              />
            </Layout>
            <Layout flexGrow={1} margin={{ bottom: 0.5 }}>
              <Select overlay>
                <option>Test</option>
              </Select>
            </Layout>
          </Column>
        </Grid>
        <Layout margin={{ bottom: 2 }}>
          <FormHint hint="Test Form Hint" overlay />
        </Layout>
        <Layout display={Display.Flex}>
          <Layout margin={{ bottom: 2, right: 2 }}>
            <CheckBox label="Test" overlay />
          </Layout>
          <Layout margin={{ bottom: 0 }}>
            <Radio label="Test" overlay />
          </Layout>
        </Layout>
      </Layout>
    </div>
    <div
      style={{
        backgroundImage: `url(${ExampleThumbnails.stream1})`,
        backgroundSize: "cover",
      }}
    >
      <Layout background={Background.Overlay} padding={2}>
        <Layout margin={{ bottom: 0.5 }}>
          <FormLabel label="Test Form Label" id="" overlay />
        </Layout>
        <Grid>
          <Column cols={3}>
            <Layout flexGrow={1} margin={{ bottom: 0.5 }}>
              <Input
                type={InputType.Text}
                placeholder="Placeholder Text"
                overlay
              />
            </Layout>
            <Layout flexGrow={1} margin={{ bottom: 0.5 }}>
              <Input
                type={InputType.Text}
                placeholder="Placeholder Text"
                overlay
                error
              />
            </Layout>
            <Layout flexGrow={1} margin={{ bottom: 0.5 }}>
              <Select overlay>
                <option>Test</option>
              </Select>
            </Layout>
          </Column>
        </Grid>
        <Layout margin={{ bottom: 2 }}>
          <FormHint hint="Test Form Hint" overlay />
        </Layout>
        <Layout display={Display.Flex}>
          <Layout margin={{ bottom: 2, right: 2 }}>
            <CheckBox label="Test" overlay />
          </Layout>
          <Layout margin={{ bottom: 0 }}>
            <Radio label="Test" overlay />
          </Layout>
        </Layout>
      </Layout>
    </div>
  </Layout>
);

export const Combinations = () => (
  <>
    <ExampleSection label="Icons">
      <Layout margin={{ bottom: 2 }}>
        <FormGroup label="Left icon">
          <Layout margin={{ bottom: 1 }}>
            <Input
              type={InputType.Text}
              icon={SVGAsset.Email}
              defaultValue="Hello World"
            />
          </Layout>
          <Input
            type={InputType.Text}
            icon={SVGAsset.Email}
            defaultValue={LONG_SENTENCE}
          />
        </FormGroup>
      </Layout>

      <Layout margin={{ bottom: 2 }}>
        <FormGroup label="Right icon">
          <Layout margin={{ bottom: 1 }}>
            <Input
              type={InputType.Text}
              icon={SVGAsset.Email}
              iconRight
              defaultValue="Hello World"
            />
          </Layout>
          <Input
            type={InputType.Text}
            icon={SVGAsset.Email}
            iconRight
            defaultValue={LONG_SENTENCE}
          />
        </FormGroup>
      </Layout>
    </ExampleSection>

    <ExampleSection label="Sizes">
      <Layout margin={{ bottom: 2 }}>
        <FormGroup label="Small">
          <Layout margin={{ bottom: 1 }}>
            <Input
              type={InputType.Text}
              size={InputSize.Small}
              defaultValue="Hello World"
            />
          </Layout>
        </FormGroup>
      </Layout>
      <Layout margin={{ bottom: 2 }}>
        <FormGroup label="Default">
          <Layout margin={{ bottom: 1 }}>
            <Input
              type={InputType.Text}
              size={InputSize.Default}
              defaultValue="Hello World"
            />
          </Layout>
        </FormGroup>
      </Layout>
      <Layout margin={{ bottom: 0 }}>
        <FormGroup label="Large">
          <Layout margin={{ bottom: 1 }}>
            <Input
              type={InputType.Text}
              size={InputSize.Large}
              defaultValue="Hello World"
            />
          </Layout>
        </FormGroup>
      </Layout>
    </ExampleSection>

    <ExampleSection label="Text Alignment">
      <Layout margin={{ bottom: 2 }}>
        <FormGroup label="Left">
          <Layout margin={{ bottom: 1 }}>
            <Input
              type={InputType.Text}
              textAlign={TextAlign.Left}
              defaultValue="Hello World"
            />
          </Layout>
        </FormGroup>
      </Layout>
      <Layout margin={{ bottom: 2 }}>
        <FormGroup label="Center">
          <Layout margin={{ bottom: 1 }}>
            <Input
              type={InputType.Text}
              textAlign={TextAlign.Center}
              defaultValue="Hello World"
            />
          </Layout>
        </FormGroup>
      </Layout>
      <Layout margin={{ bottom: 0 }}>
        <FormGroup label="Right">
          <Layout margin={{ bottom: 1 }}>
            <Input
              type={InputType.Text}
              textAlign={TextAlign.Right}
              defaultValue="Hello World"
            />
          </Layout>
        </FormGroup>
      </Layout>
    </ExampleSection>

    <ExampleSection label="Rounding">
      <Layout margin={{ bottom: 2 }}>
        <FormGroup label="Left Rounding">
          <Layout margin={{ bottom: 1 }}>
            <Input
              type={InputType.Text}
              rounding={InputRounding.Left}
              defaultValue="Hello World"
            />
          </Layout>
        </FormGroup>
      </Layout>
      <Layout margin={{ bottom: 0 }}>
        <FormGroup label="Right Rounding">
          <Layout margin={{ bottom: 1 }}>
            <Input
              type={InputType.Text}
              rounding={InputRounding.Right}
              defaultValue="Hello World"
            />
          </Layout>
        </FormGroup>
      </Layout>
    </ExampleSection>

    <ExampleSection label="Placeholder Text">
      <Layout margin={{ bottom: 2 }}>
        <FormGroup label="Default Placeholder">
          <Layout margin={{ bottom: 1 }}>
            <Input
              type={InputType.Text}
              placeholder="This text is a placeholder..."
            />
          </Layout>
        </FormGroup>
      </Layout>

      <Layout margin={{ bottom: 2 }}>
        <FormGroup label="With Center Alignment">
          <Layout margin={{ bottom: 1 }}>
            <Input
              type={InputType.Text}
              textAlign={TextAlign.Center}
              placeholder="This text is a placeholder..."
            />
          </Layout>
        </FormGroup>
      </Layout>
    </ExampleSection>

    <ExampleSection label="Error State">
      <FormGroup
        label="Form Input"
        error
        errorMessage="Something is wrong with this input value."
      >
        <Layout margin={{ bottom: 1 }}>
          <Input
            type={InputType.Text}
            defaultValue="Hello World"
            error
            icon={SVGAsset.Email}
          />
        </Layout>
      </FormGroup>
    </ExampleSection>

    <ExampleSection label="Disabled State">
      <FormGroup label="Form Input">
        <Layout margin={{ bottom: 1 }}>
          <Input
            type={InputType.Text}
            defaultValue="Hello World"
            disabled
            icon={SVGAsset.Email}
          />
        </Layout>
      </FormGroup>
    </ExampleSection>
  </>
);

export const WithOverlay = () => (
  <OverlayRegion overlay>
    <Layout background={Background.Overlay}>
      <Combinations />
    </Layout>
  </OverlayRegion>
);
