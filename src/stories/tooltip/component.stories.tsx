import * as React from "react";

import {
  AttachedTooltip,
  BalloonWrapper,
  Button,
  ButtonIcon,
  ButtonType,
  CheckBox,
  Column,
  CoreText,
  DialogLayer,
  Grid,
  JustifyContent,
  Layout,
  ResponsiveWrapper,
  SVGAsset,
  Title,
  TitleSize,
  Tooltip,
  TooltipAlign,
  TooltipDirection,
  TooltipWrapper,
  useDialogState,
} from "v2";
import {
  CombinationGenerator,
  CombinationMode,
} from "../../components/combination-generator";

import { useState } from "react";

export default { title: "Dialogs / Tooltip" };

const SHORT_STRING = "A Short Label";

const LONG_STRING =
  "A much longer label: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

export const AttachedTooltipExamples = () => (
  <>
    <Grid justifyContent={JustifyContent.Center}>
      <Column cols={4}>
        <Layout padding={{ x: 5, y: 5 }}>
          <CombinationGenerator
            mode={CombinationMode.Exhaustive}
            fields={[
              {
                propKey: "label",
                propValues: [SHORT_STRING, LONG_STRING],
              },
              {
                propKey: "width",
                propValues: [undefined, 200],
              },
            ]}
          >
            <AttachedTooltip label="" show>
              <ButtonIcon icon={SVGAsset.Gear} aria-label="Gear Icon" />
            </AttachedTooltip>
          </CombinationGenerator>
          <CombinationGenerator
            mode={CombinationMode.Exhaustive}
            fields={[
              {
                propKey: "direction",
                propValues: [
                  TooltipDirection.Top,
                  TooltipDirection.Right,
                  TooltipDirection.Bottom,
                  TooltipDirection.Left,
                ],
              },
              {
                propKey: "align",
                propValues: [
                  TooltipAlign.Left,
                  TooltipAlign.Center,
                  TooltipAlign.Right,
                ],
              },
            ]}
          >
            <AttachedTooltip label={SHORT_STRING} show>
              <ButtonIcon icon={SVGAsset.Gear} aria-label="Gear Icon" />
              <br />
            </AttachedTooltip>
          </CombinationGenerator>
        </Layout>
      </Column>
    </Grid>

    <CombinationGenerator
      mode={CombinationMode.Simple}
      fields={[
        {
          propKey: "show",
          propValues: [undefined, false, true],
        },
      ]}
    >
      <AttachedTooltip
        direction={TooltipDirection.Right}
        label="This is a tooltip label"
      >
        <ButtonIcon icon={SVGAsset.Gear} aria-label="Gear Icon" />
      </AttachedTooltip>
    </CombinationGenerator>
  </>
);

export const AttachedTooltipOffsetExamples = () => (
  <ResponsiveWrapper centered>
    <Grid>
      <Column cols={{ default: 10, lg: 6 }} offset={{ default: 1, lg: 3 }}>
        <CombinationGenerator
          mode={CombinationMode.Exhaustive}
          fields={[
            {
              propKey: "direction",
              propEnum: TooltipDirection,
              propEnumName: "TooltipDirection",
            },
            {
              propKey: "align",
              propEnum: TooltipAlign,
              propEnumName: "TooltipAlign",
            },
            {
              propKey: "offsetX",
              propValues: ["10px", "-15px"],
            },
            {
              propKey: "offsetY",
              propValues: ["10px", "-15px"],
            },
          ]}
        >
          <AttachedTooltip label={SHORT_STRING} show>
            <ButtonIcon icon={SVGAsset.Gear} aria-label="Gear Icon" />
          </AttachedTooltip>
        </CombinationGenerator>
      </Column>
    </Grid>
  </ResponsiveWrapper>
);

export function TooltipWrapperExamples() {
  return (
    <Layout>
      <Layout margin={{ bottom: 1 }}>
        <Layout margin={{ right: 1 }}>Default:</Layout>
        <TooltipWrapper>{SHORT_STRING}</TooltipWrapper>
      </Layout>
      <Layout margin={{ bottom: 1 }}>
        <Layout margin={{ right: 1 }}>Default:</Layout>
        <TooltipWrapper>{LONG_STRING}</TooltipWrapper>
      </Layout>
      <Layout margin={{ bottom: 1 }}>
        <Layout margin={{ right: 1 }}>Custom Fixed Width:</Layout>
        <TooltipWrapper width="450px" maxWidth="">
          {SHORT_STRING}
        </TooltipWrapper>
      </Layout>
      <Layout margin={{ bottom: 1 }}>
        <Layout margin={{ right: 1 }}>Custom Max Width:</Layout>
        <TooltipWrapper maxWidth="450px">{LONG_STRING}</TooltipWrapper>
      </Layout>
    </Layout>
  );
}

export function Defaults() {
  return (
    <>
      <Layout margin={{ y: 2 }}>
        <Title size={TitleSize.Small}>Show on Hover</Title>
        <Tooltip label={LONG_STRING}>
          <ButtonIcon icon={SVGAsset.Gear} aria-label="Gear Icon" />
        </Tooltip>
      </Layout>
      <Layout margin={{ y: 2 }}>
        <Title size={TitleSize.Small}>Always Show</Title>
        <Tooltip label={LONG_STRING} show>
          <ButtonIcon icon={SVGAsset.Gear} aria-label="Gear Icon" />
        </Tooltip>
      </Layout>
    </>
  );
}

export function LongerDelayTimes() {
  return (
    <>
      <CoreText>
        This tooltip has a longer timeout before it will show, and a longer
        transition duration:
      </CoreText>
      <Tooltip label={LONG_STRING} enterDelay={1000} transitionDuration={1000}>
        <ButtonIcon icon={SVGAsset.Gear} aria-label="Gear Icon" />
      </Tooltip>
    </>
  );
}

export function DisableOrForceShow() {
  const [show, setShow] = useState(false);
  const [disabled, setDisabled] = useState(false);
  return (
    <Layout>
      <CoreText>Tooltip props allow the behavior to be modified:</CoreText>

      <Layout margin={{ y: 2 }}>
        <CheckBox
          label="Always Show"
          checked={show}
          onChange={(e) => setShow(e.currentTarget.checked)}
        />
        <CheckBox
          label="Disable Interaction"
          checked={disabled}
          onChange={(e) => setDisabled(e.currentTarget.checked)}
        />
      </Layout>

      <Tooltip show={show} disabled={disabled} label={SHORT_STRING}>
        <ButtonIcon icon={SVGAsset.Gear} aria-label="Gear Icon" />
      </Tooltip>
    </Layout>
  );
}

export function WithDialogAndTooltip() {
  const { anchorProps, dialogProps } = useDialogState();

  return (
    <Layout padding={5}>
      <Tooltip label="Hello World">
        <Button variant={ButtonType.Secondary} {...anchorProps}>
          Button with tooltip and dialog
        </Button>
      </Tooltip>
      <DialogLayer {...dialogProps} options={{ placement: "top" }}>
        <BalloonWrapper>
          <Layout padding={1}>This is the balloon</Layout>
        </BalloonWrapper>
      </DialogLayer>
    </Layout>
  );
}
