import * as React from "react";

import {
  AlignItems,
  AttachedPopover,
  AttachedPopoverProps,
  Background,
  BalloonDirection,
  BalloonSize,
  Color,
  CoreText,
  Display,
  FlexDirection,
  InjectLayout,
  JustifyContent,
  Layout,
  OverlayRegion,
  PopoverBody,
  PopoverFooter,
  PopoverHeader,
  PopoverWrapper,
  Position,
  SVG,
  SVGAsset,
  TextType,
} from "v2";
import {
  CombinationGenerator,
  CombinationMode,
} from "../components/combination-generator";
import { Component, FC } from "react";

const TITLE = "Popover Title";
const SUB_TITLE = "Popover sub title with additional info";

export default { title: "Dialogs / Popover" };

export const examples = () => <PopoverPage />;

class PopoverPage extends Component {
  public render() {
    return (
      <Layout margin={{ bottom: 2 }} fullWidth>
        <CoreText type={TextType.H2}>Popover</CoreText>
        <Layout display={Display.Flex} flexDirection={FlexDirection.Row}>
          <Layout flexGrow={1}>
            <InjectLayout position={Position.Relative}>
              <div>
                <PopoverWrapper popoverId="popover-example-1">
                  <PopoverHeader
                    popoverId="popover-example-1"
                    buttonRightPrimary={{
                      "aria-label": "Close",
                    }}
                    title={
                      <Layout display={Display.Flex}>
                        <SVG asset={SVGAsset.Bits} />
                        <CoreText>BITS!</CoreText>
                      </Layout>
                    }
                  />
                  <PopoverBody popoverId="popover-example-1">
                    <div style={{ height: 100 }}>
                      <CoreText>Test Content</CoreText>
                    </div>
                  </PopoverBody>
                </PopoverWrapper>
              </div>
            </InjectLayout>
            <InjectLayout position={Position.Relative}>
              <div style={{ height: 250 }}>
                <PopoverWrapper popoverId="popover-example-2">
                  <PopoverHeader
                    popoverId="popover-example-2"
                    buttonRightPrimary={{
                      "aria-label": "Close",
                    }}
                    title={{
                      title: TITLE,
                    }}
                  />
                  <PopoverBody popoverId="popover-example-2">
                    <div style={{ height: 100 }}>
                      <CoreText>Test Content</CoreText>
                    </div>
                  </PopoverBody>
                </PopoverWrapper>
              </div>
            </InjectLayout>
            <InjectLayout position={Position.Relative}>
              <div style={{ height: 250 }}>
                <PopoverWrapper popoverId="popover-example-3">
                  <PopoverHeader
                    popoverId="popover-example-3"
                    title={{
                      title: TITLE,
                    }}
                    buttonLeftPrimary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.AngleLeft,
                    }}
                    buttonRightPrimary={{
                      "aria-label": "Close",
                    }}
                  />
                  <PopoverBody popoverId="popover-example-3">
                    <div style={{ height: 100 }}>
                      <CoreText>Test Content</CoreText>
                    </div>
                  </PopoverBody>
                </PopoverWrapper>
              </div>
            </InjectLayout>
            <InjectLayout position={Position.Relative}>
              <div style={{ height: 250 }}>
                <PopoverWrapper popoverId="popover-example-4">
                  <PopoverHeader
                    popoverId="popover-example-4"
                    title={{
                      title: TITLE,
                    }}
                    buttonRightPrimary={{
                      "aria-label": "Close",
                    }}
                  />
                  <PopoverBody popoverId="popover-example-4">
                    <div style={{ height: 100 }}>
                      <CoreText>Test Content</CoreText>
                    </div>
                  </PopoverBody>
                </PopoverWrapper>
              </div>
            </InjectLayout>
            <InjectLayout position={Position.Relative}>
              <div style={{ height: 250 }}>
                <PopoverWrapper popoverId="popover-example-5">
                  <PopoverHeader
                    popoverId="popover-example-5"
                    title={{
                      title: TITLE,
                    }}
                    buttonLeftSecondary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.Check,
                    }}
                    buttonRightPrimary={{
                      "aria-label": "Close",
                    }}
                  />
                  <PopoverBody popoverId="popover-example-5">
                    <div style={{ height: 100 }}>
                      <CoreText>Test Content</CoreText>
                    </div>
                  </PopoverBody>
                </PopoverWrapper>
              </div>
            </InjectLayout>
            <InjectLayout position={Position.Relative}>
              <div style={{ height: 250 }}>
                <PopoverWrapper popoverId="popover-example-6">
                  <PopoverHeader
                    popoverId="popover-example-6"
                    title={{
                      title: TITLE,
                    }}
                    buttonLeftPrimary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.AngleLeft,
                    }}
                    buttonLeftSecondary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.Check,
                    }}
                    buttonRightPrimary={{
                      "aria-label": "Close",
                    }}
                  />
                  <PopoverBody popoverId="popover-example-6">
                    <div style={{ height: 100 }}>
                      <CoreText>Test Content</CoreText>
                    </div>
                  </PopoverBody>
                </PopoverWrapper>
              </div>
            </InjectLayout>
            <InjectLayout position={Position.Relative}>
              <div style={{ height: 250 }}>
                <PopoverWrapper popoverId="popover-example-7">
                  <PopoverHeader
                    popoverId="popover-example-7"
                    title={{
                      title: TITLE,
                    }}
                    buttonRightSecondary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.Gear,
                    }}
                    buttonRightPrimary={{
                      "aria-label": "Close",
                    }}
                  />
                  <PopoverBody popoverId="popover-example-7">
                    <div style={{ height: 100 }}>
                      <CoreText>Test Content</CoreText>
                    </div>
                  </PopoverBody>
                </PopoverWrapper>
              </div>
            </InjectLayout>
            <InjectLayout position={Position.Relative}>
              <div style={{ height: 250 }}>
                <PopoverWrapper popoverId="popover-example-8">
                  <PopoverHeader
                    popoverId="popover-example-8"
                    title={{
                      title: TITLE,
                    }}
                    buttonLeftSecondary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.Check,
                    }}
                    buttonRightSecondary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.Gear,
                    }}
                    buttonRightPrimary={{
                      "aria-label": "Close",
                    }}
                  />
                  <PopoverBody popoverId="popover-example-8">
                    <div style={{ height: 100 }}>
                      <CoreText>Test Content</CoreText>
                    </div>
                  </PopoverBody>
                </PopoverWrapper>
              </div>
            </InjectLayout>
            <InjectLayout position={Position.Relative}>
              <div style={{ height: 250 }}>
                <PopoverWrapper popoverId="popover-example-9">
                  <PopoverHeader
                    popoverId="popover-example-9"
                    title={{
                      title: TITLE,
                    }}
                    buttonLeftPrimary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.AngleLeft,
                    }}
                    buttonLeftSecondary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.Check,
                    }}
                    buttonRightSecondary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.Gear,
                    }}
                    buttonRightPrimary={{
                      "aria-label": "Close",
                    }}
                  />
                  <PopoverBody popoverId="popover-example-9">
                    <div style={{ height: 100 }}>
                      <CoreText>Test Content</CoreText>
                    </div>
                  </PopoverBody>
                </PopoverWrapper>
              </div>
            </InjectLayout>
            <InjectLayout position={Position.Relative}>
              <div style={{ height: 250 }}>
                <PopoverWrapper
                  popoverId="popover-example-10"
                  maxHeight="15rem"
                >
                  <PopoverHeader
                    popoverId="popover-example-10"
                    title={{
                      title: TITLE,
                    }}
                    buttonLeftPrimary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.AngleLeft,
                    }}
                    buttonLeftSecondary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.Check,
                    }}
                    buttonRightSecondary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.Gear,
                    }}
                    buttonRightPrimary={{
                      "aria-label": "Close",
                    }}
                  />
                  <PopoverBody popoverId="popover-example-10">
                    <div style={{ height: 100 }}>
                      <CoreText>Test Content</CoreText>
                    </div>
                  </PopoverBody>
                </PopoverWrapper>
              </div>
            </InjectLayout>
          </Layout>
          <Layout flexGrow={1}>
            <InjectLayout position={Position.Relative}>
              <div>
                <PopoverWrapper popoverId="popover-example-11">
                  <PopoverHeader
                    popoverId="popover-example-11"
                    title={{
                      title: TITLE,
                      subtitle: SUB_TITLE,
                    }}
                    buttonRightPrimary={{
                      "aria-label": "Close",
                    }}
                  />
                  <PopoverBody popoverId="popover-example-11">
                    <div style={{ height: 100 }}>
                      <CoreText>Test Content</CoreText>
                    </div>
                  </PopoverBody>
                </PopoverWrapper>
              </div>
            </InjectLayout>
            <InjectLayout position={Position.Relative}>
              <div style={{ height: 250 }}>
                <PopoverWrapper popoverId="popover-example-12">
                  <PopoverHeader
                    popoverId="popover-example-12"
                    title={{
                      title: TITLE,
                      subtitle: SUB_TITLE,
                    }}
                    buttonLeftPrimary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.AngleLeft,
                    }}
                    buttonRightPrimary={{
                      "aria-label": "Close",
                    }}
                  />
                  <PopoverBody popoverId="popover-example-12">
                    <div style={{ height: 100 }}>
                      <CoreText>Test Content</CoreText>
                    </div>
                  </PopoverBody>
                </PopoverWrapper>
              </div>
            </InjectLayout>
            <InjectLayout position={Position.Relative}>
              <div style={{ height: 250 }}>
                <PopoverWrapper popoverId="popover-example-13">
                  <PopoverHeader
                    popoverId="popover-example-13"
                    title={{
                      title: TITLE,
                      subtitle: SUB_TITLE,
                    }}
                    buttonRightPrimary={{
                      "aria-label": "Close",
                    }}
                  />
                  <PopoverBody popoverId="popover-example-13">
                    <div style={{ height: 100 }}>
                      <CoreText>Test Content</CoreText>
                    </div>
                  </PopoverBody>
                </PopoverWrapper>
              </div>
            </InjectLayout>
            <InjectLayout position={Position.Relative}>
              <div style={{ height: 250 }}>
                <PopoverWrapper popoverId="popover-example-14">
                  <PopoverHeader
                    popoverId="popover-example-14"
                    title={{
                      title: TITLE,
                      subtitle: SUB_TITLE,
                    }}
                    buttonLeftPrimary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.AngleLeft,
                    }}
                    buttonRightPrimary={{
                      "aria-label": "Close",
                    }}
                  />
                  <PopoverBody popoverId="popover-example-14">
                    <div style={{ height: 100 }}>
                      <CoreText>Test Content</CoreText>
                    </div>
                  </PopoverBody>
                </PopoverWrapper>
              </div>
            </InjectLayout>
            <InjectLayout position={Position.Relative}>
              <div style={{ height: 250 }}>
                <PopoverWrapper popoverId="popover-example-15">
                  <PopoverHeader
                    popoverId="popover-example-15"
                    title={{
                      title: TITLE,
                      subtitle: SUB_TITLE,
                    }}
                    buttonLeftPrimary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.AngleLeft,
                    }}
                    buttonLeftSecondary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.Check,
                    }}
                    buttonRightPrimary={{
                      "aria-label": "Close",
                    }}
                  />
                  <PopoverBody popoverId="popover-example-15">
                    <div style={{ height: 100 }}>
                      <CoreText>Test Content</CoreText>
                    </div>
                  </PopoverBody>
                </PopoverWrapper>
              </div>
            </InjectLayout>
            <InjectLayout position={Position.Relative}>
              <div style={{ height: 250 }}>
                <PopoverWrapper popoverId="popover-example-16">
                  <PopoverHeader
                    popoverId="popover-example-16"
                    title={{
                      title: TITLE,
                      subtitle: SUB_TITLE,
                    }}
                    buttonLeftPrimary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.AngleLeft,
                    }}
                    buttonLeftSecondary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.Check,
                    }}
                    buttonRightSecondary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.Gear,
                    }}
                    buttonRightPrimary={{
                      "aria-label": "Close",
                    }}
                  />
                  <PopoverBody popoverId="popover-example-16">
                    <div style={{ height: 100 }}>
                      <CoreText>Test Content</CoreText>
                    </div>
                  </PopoverBody>
                </PopoverWrapper>
              </div>
            </InjectLayout>
            <InjectLayout position={Position.Relative}>
              <div style={{ height: 250 }}>
                <PopoverWrapper
                  maxHeight="15rem"
                  popoverId="popover-example-17"
                >
                  <PopoverHeader
                    popoverId="popover-example-17"
                    title={{
                      title: TITLE,
                      subtitle: SUB_TITLE,
                    }}
                    buttonLeftPrimary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.AngleLeft,
                    }}
                    buttonLeftSecondary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.Check,
                    }}
                    buttonRightSecondary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.Gear,
                    }}
                    buttonRightPrimary={{
                      "aria-label": "Close",
                    }}
                  />
                  <PopoverBody popoverId="popover-example-17">
                    <div style={{ height: 100 }}>
                      <CoreText>Test Content</CoreText>
                    </div>
                  </PopoverBody>
                </PopoverWrapper>
              </div>
            </InjectLayout>
          </Layout>
          <Layout flexGrow={1}>
            <InjectLayout position={Position.Relative}>
              <div>
                <PopoverWrapper popoverId="popover-example-18">
                  <PopoverHeader
                    popoverId="popover-example-18"
                    title={{
                      title: TITLE,
                    }}
                    buttonRightPrimary={{
                      "aria-label": "Close",
                    }}
                  />
                  <PopoverBody popoverId="popover-example-18">
                    <div style={{ height: 100 }}>
                      <CoreText>Test Content</CoreText>
                    </div>
                  </PopoverBody>
                  <PopoverFooter
                    primaryButtonProps={{
                      children: "Default",
                    }}
                  />
                </PopoverWrapper>
              </div>
            </InjectLayout>
            <InjectLayout position={Position.Relative}>
              <div style={{ height: 300 }}>
                <PopoverWrapper popoverId="popover-example-19">
                  <PopoverHeader
                    popoverId="popover-example-19"
                    title={{
                      title: TITLE,
                    }}
                    buttonRightPrimary={{
                      "aria-label": "Close",
                    }}
                  />
                  <PopoverBody popoverId="popover-example-19">
                    <div style={{ height: 100 }}>
                      <CoreText>Test Content</CoreText>
                    </div>
                  </PopoverBody>
                  <PopoverFooter
                    primaryButtonProps={{
                      children: "Default",
                    }}
                    secondaryButtonProps={{
                      children: "Default",
                    }}
                  />
                </PopoverWrapper>
              </div>
            </InjectLayout>
            <InjectLayout position={Position.Relative}>
              <div style={{ height: 300 }}>
                <PopoverWrapper popoverId="popover-example-20">
                  <PopoverHeader
                    popoverId="popover-example-20"
                    title={{
                      title: TITLE,
                      subtitle: SUB_TITLE,
                    }}
                    buttonLeftPrimary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.AngleLeft,
                    }}
                    buttonRightPrimary={{
                      "aria-label": "Close",
                    }}
                  />
                  <PopoverBody popoverId="popover-example-20">
                    <div style={{ height: 100 }}>
                      <CoreText>Test Content</CoreText>
                    </div>
                  </PopoverBody>
                  <PopoverFooter
                    primaryButtonProps={{
                      children: "Default",
                    }}
                    secondaryButtonProps={{
                      children: "Default",
                    }}
                  />
                </PopoverWrapper>
              </div>
            </InjectLayout>
            <InjectLayout position={Position.Relative}>
              <div style={{ height: 300 }}>
                <PopoverWrapper popoverId="popover-example-21">
                  <PopoverHeader
                    popoverId="popover-example-21"
                    title={{
                      title: TITLE,
                      subtitle: SUB_TITLE,
                    }}
                    buttonLeftPrimary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.AngleLeft,
                    }}
                    buttonLeftSecondary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.Check,
                    }}
                    buttonRightSecondary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.Gear,
                    }}
                    buttonRightPrimary={{
                      "aria-label": "Close",
                    }}
                  />
                  <PopoverBody popoverId="popover-example-21">
                    <div style={{ height: 100 }}>
                      <CoreText>Test Content</CoreText>
                    </div>
                  </PopoverBody>
                  <PopoverFooter
                    primaryButtonProps={{
                      children: "Default",
                    }}
                    secondaryButtonProps={{
                      children: "Default",
                    }}
                  />
                </PopoverWrapper>
              </div>
            </InjectLayout>
            <InjectLayout position={Position.Relative}>
              <div style={{ height: 300 }}>
                <PopoverWrapper
                  popoverId="popover-example-23"
                  maxHeight="20rem"
                >
                  <PopoverHeader
                    popoverId="popover-example-23"
                    title={{
                      title: TITLE,
                      subtitle: SUB_TITLE,
                    }}
                    buttonLeftPrimary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.AngleLeft,
                    }}
                    buttonLeftSecondary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.Check,
                    }}
                    buttonRightSecondary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.Gear,
                    }}
                    buttonRightPrimary={{
                      "aria-label": "Close",
                    }}
                  />
                  <PopoverBody popoverId="popover-example-23">
                    <div style={{ height: 100 }}>
                      <CoreText>Test Content</CoreText>
                    </div>
                  </PopoverBody>
                  <PopoverFooter
                    primaryButtonProps={{
                      children: "Default",
                    }}
                    secondaryButtonProps={{
                      children: "Default",
                    }}
                  />
                </PopoverWrapper>
              </div>
            </InjectLayout>
          </Layout>
          <Layout flexGrow={1}>
            <InjectLayout position={Position.Relative}>
              <div>
                <PopoverWrapper
                  size={BalloonSize.Large}
                  popoverId="popover-example-24"
                >
                  <PopoverHeader
                    popoverId="popover-example-24"
                    title={{
                      title: TITLE,
                    }}
                    buttonRightPrimary={{
                      "aria-label": "Close",
                    }}
                  />
                  <PopoverBody popoverId="popover-example-24">
                    <div style={{ height: 100 }}>
                      <CoreText>Test Content</CoreText>
                    </div>
                  </PopoverBody>
                  <PopoverFooter
                    primaryButtonProps={{
                      children: "Default",
                    }}
                  />
                </PopoverWrapper>
              </div>
            </InjectLayout>
            <InjectLayout position={Position.Relative}>
              <div style={{ height: 300 }}>
                <PopoverWrapper
                  size={BalloonSize.Large}
                  popoverId="popover-example-25"
                >
                  <PopoverHeader
                    popoverId="popover-example-25"
                    title={{
                      title: TITLE,
                    }}
                    buttonRightPrimary={{
                      "aria-label": "Close",
                    }}
                  />
                  <PopoverBody popoverId="popover-example-25">
                    <div style={{ height: 100 }}>
                      <CoreText>Test Content</CoreText>
                    </div>
                  </PopoverBody>
                  <PopoverFooter
                    primaryButtonProps={{
                      children: "Default",
                    }}
                    secondaryButtonProps={{
                      children: "Default",
                    }}
                  />
                </PopoverWrapper>
              </div>
            </InjectLayout>
            <InjectLayout position={Position.Relative}>
              <div style={{ height: 300 }}>
                <PopoverWrapper
                  size={BalloonSize.Large}
                  popoverId="popover-example-26"
                >
                  <PopoverHeader
                    popoverId="popover-example-26"
                    title={{
                      title: TITLE,
                      subtitle: SUB_TITLE,
                    }}
                    buttonLeftPrimary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.AngleLeft,
                    }}
                    buttonRightPrimary={{
                      "aria-label": "Close",
                    }}
                  />
                  <PopoverBody popoverId="popover-example-26">
                    <div style={{ height: 100 }}>
                      <CoreText>Test Content</CoreText>
                    </div>
                  </PopoverBody>
                  <PopoverFooter
                    primaryButtonProps={{
                      children: "Default",
                    }}
                    secondaryButtonProps={{
                      children: "Default",
                    }}
                  />
                </PopoverWrapper>
              </div>
            </InjectLayout>
            <InjectLayout position={Position.Relative}>
              <div style={{ height: 300 }}>
                <PopoverWrapper
                  size={BalloonSize.Large}
                  popoverId="popover-example-27"
                >
                  <PopoverHeader
                    popoverId="popover-example-27"
                    title={{
                      title: TITLE,
                      subtitle: SUB_TITLE,
                    }}
                    buttonLeftPrimary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.AngleLeft,
                    }}
                    buttonLeftSecondary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.Check,
                    }}
                    buttonRightSecondary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.Gear,
                    }}
                    buttonRightPrimary={{
                      "aria-label": "Close",
                    }}
                  />
                  <PopoverBody popoverId="popover-example-27">
                    <div style={{ height: 100 }}>
                      <CoreText>Test Content</CoreText>
                    </div>
                  </PopoverBody>
                  <PopoverFooter
                    primaryButtonProps={{
                      children: "Default",
                    }}
                    secondaryButtonProps={{
                      children: "Default",
                    }}
                  />
                </PopoverWrapper>
              </div>
            </InjectLayout>
            <InjectLayout position={Position.Relative}>
              <div style={{ height: 300 }}>
                <PopoverWrapper
                  popoverId="popover-example-28"
                  size={BalloonSize.Large}
                  maxHeight="20rem"
                >
                  <PopoverHeader
                    popoverId="popover-example-28"
                    title={{
                      title: TITLE,
                      subtitle: SUB_TITLE,
                    }}
                    buttonLeftPrimary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.AngleLeft,
                      title: "Back",
                    }}
                    buttonLeftSecondary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.Check,
                      title: "Mark All as Read",
                    }}
                    buttonRightSecondary={{
                      "aria-label": "aria label",
                      icon: SVGAsset.Gear,
                      title: "Settings",
                    }}
                    buttonRightPrimary={{
                      "aria-label": "Close Menu",
                      title: "Close Menu",
                    }}
                  />
                  <PopoverBody popoverId="popover-example-28">
                    <div style={{ height: 100 }}>
                      <CoreText>Test Content with tooltips</CoreText>
                    </div>
                  </PopoverBody>
                  <PopoverFooter
                    primaryButtonProps={{
                      children: "Default",
                    }}
                    secondaryButtonProps={{
                      children: "Default",
                    }}
                  />
                </PopoverWrapper>
              </div>
            </InjectLayout>
          </Layout>
        </Layout>
        <div style={{ height: 250 }} />
        <Layout margin={{ y: 2 }} fullWidth>
          <CoreText type={TextType.H2}>Popover Overlay</CoreText>
          <OverlayRegion>
            <InjectLayout
              background={Background.AccentAlt2}
              position={Position.Relative}
            >
              <div style={{ height: 250 }}>
                <Layout position={Position.Absolute} attachTop>
                  <PopoverWrapper
                    size={BalloonSize.Large}
                    popoverId="popover-example-27"
                  >
                    <PopoverHeader
                      popoverId="popover-example-27"
                      title={{
                        title: TITLE,
                        subtitle: SUB_TITLE,
                      }}
                      buttonLeftPrimary={{
                        "aria-label": "aria label",
                        icon: SVGAsset.AngleLeft,
                      }}
                      buttonLeftSecondary={{
                        "aria-label": "aria label",
                        icon: SVGAsset.Check,
                      }}
                      buttonRightSecondary={{
                        "aria-label": "aria label",
                        icon: SVGAsset.Gear,
                      }}
                      buttonRightPrimary={{
                        "aria-label": "Close",
                      }}
                    />
                    <PopoverBody popoverId="popover-example-27">
                      <div style={{ height: 100 }}>
                        <CoreText>Test Content</CoreText>
                      </div>
                    </PopoverBody>
                    <PopoverFooter
                      primaryButtonProps={{
                        children: "Default",
                      }}
                      secondaryButtonProps={{
                        children: "Default",
                      }}
                    />
                  </PopoverWrapper>
                </Layout>
              </div>
            </InjectLayout>
          </OverlayRegion>
        </Layout>
      </Layout>
    );
  }
}

export const AttachedPopoverEample: FC = () => (
  <CombinationGenerator
    mode={CombinationMode.Exhaustive}
    fields={[
      {
        propKey: "direction",
        propValues: [
          BalloonDirection.TopLeft,
          BalloonDirection.TopRight,
          BalloonDirection.BottomLeft,
          BalloonDirection.BottomRight,
        ],
      },
    ]}
  >
    <RenderLayout size={BalloonSize.Auto} />
    <RenderLayout size={BalloonSize.Medium} />
  </CombinationGenerator>
);

const RenderLayout: FC<Partial<AttachedPopoverProps>> = (props) => {
  const directionName = Object.keys(BalloonDirection).find(
    (key) =>
      BalloonDirection[key as keyof typeof BalloonDirection] ===
      props.direction,
  );

  const sizeName = Object.keys(BalloonSize).find(
    (key) => BalloonSize[key as keyof typeof BalloonSize] === props.size,
  );

  return (
    <div>
      <CoreText color={Color.Alt2}>
        {sizeName}, {directionName}
      </CoreText>
      <InjectLayout
        background={Background.Alt}
        display={Display.Flex}
        alignItems={AlignItems.Center}
        justifyContent={JustifyContent.Center}
      >
        <div style={{ width: 500, height: 500 }}>
          <InjectLayout
            border
            background={Background.Alt2}
            position={Position.Relative}
          >
            <div style={{ width: 400, height: 100 }}>
              <AttachedPopover
                show
                {...props}
                popoverId={`layout-popover-example-${props.direction}`}
              >
                <PopoverHeader
                  popoverId={`layout-popover-example-${props.direction}`}
                  buttonRightPrimary={{
                    "aria-label": "Close",
                  }}
                  title={{
                    title: "Popover Title",
                  }}
                />
                <PopoverBody
                  popoverId={`layout-popover-example-${props.direction}`}
                >
                  <div style={{ height: 100 }}>
                    <CoreText>Test Content</CoreText>
                  </div>
                </PopoverBody>
              </AttachedPopover>
            </div>
          </InjectLayout>
        </div>
      </InjectLayout>
    </div>
  );
};
