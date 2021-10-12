import * as React from "react";

import {
  CoreText,
  Display,
  FlexDirection,
  FormGroup,
  Layout,
  SVGAsset,
  Toggle,
  VerticalNavigation,
  VerticalNavigationGroup,
  VerticalNavigationItem,
  VerticalNavigationSpacer,
  VerticalNavigationStateProvider,
  VerticalNavigationSubHeader,
  VerticalNavigationTitle,
} from "v2";

import { Component } from "react";
import { OverlayPreview } from "../components/overlay-preview";

export default { title: "VerticalNavigation" };

export const examples = () => <VerticalNavigationPage />;

export const overlay = () => (
  <OverlayPreview>
    <VerticalNavigation>
      <VerticalNavigationItem>Set Up Camera</VerticalNavigationItem>
      <VerticalNavigationItem>Set Up Audio</VerticalNavigationItem>
      <VerticalNavigationItem selected>Review</VerticalNavigationItem>
    </VerticalNavigation>
  </OverlayPreview>
);

export const headerSelectedState = () => {
  const ExampleWithSelectedItem = ({
    title,
    groupIsOpen,
  }: {
    title: string;

    groupIsOpen: boolean;
  }) => (
    <Layout fullHeight border style={{ width: 200 }}>
      <VerticalNavigation>
        <VerticalNavigationTitle>{title}</VerticalNavigationTitle>

        <VerticalNavigationGroup
          label="Vegetables"
          open={false}
          onOpen={() => null}
          onClose={() => null}
        >
          <VerticalNavigationItem>Carrots</VerticalNavigationItem>
        </VerticalNavigationGroup>

        <VerticalNavigationGroup
          label="Fruits"
          open={groupIsOpen}
          onOpen={() => null}
          onClose={() => null}
        >
          <VerticalNavigationItem>Apples</VerticalNavigationItem>
          <VerticalNavigationItem selected>Bananas</VerticalNavigationItem>
          <VerticalNavigationItem>Cantaloupe</VerticalNavigationItem>
        </VerticalNavigationGroup>

        <VerticalNavigationGroup
          label="Pantry Items"
          open={false}
          onOpen={() => null}
          onClose={() => null}
        >
          <VerticalNavigationItem>Flour</VerticalNavigationItem>
        </VerticalNavigationGroup>
      </VerticalNavigation>
    </Layout>
  );

  return (
    <>
      <CoreText>
        In both examples below, "Bananas" is always selected but the group
        header is toggled open/closed:
      </CoreText>
      <Layout display={Display.Flex} margin={{ top: 2 }}>
        <Layout margin={{ right: 2 }}>
          <ExampleWithSelectedItem groupIsOpen={true} title="Expanded Group" />
        </Layout>

        <ExampleWithSelectedItem groupIsOpen={false} title="Collapsed Group" />
      </Layout>
    </>
  );
};

class VerticalNavigationPage extends Component {
  public state = {
    disableTransition: false,
  };

  public render() {
    return (
      <Layout
        display={Display.Flex}
        flexDirection={FlexDirection.Column}
        fullWidth
      >
        <Layout margin={{ bottom: 2 }}>
          <FormGroup label="Disable Transition">
            <Toggle
              checked={this.state.disableTransition}
              onChange={(e) => {
                this.setState({
                  disableTransition: !!e.currentTarget.checked,
                });
              }}
            />
          </FormGroup>
        </Layout>

        <Layout fullWidth display={Display.Flex}>
          <div style={{ width: 200 }}>
            <Layout fullHeight border>
              <VerticalNavigationStateProvider
                defaultOpenGroupIDs={["Button", "Form"]}
              >
                {({
                  openGroupIDs: openGroupIDs,
                  onOpenGroup,
                  onCloseGroup,
                }) => (
                  <VerticalNavigation
                    disableTransition={this.state.disableTransition}
                  >
                    <VerticalNavigationTitle>Core UI</VerticalNavigationTitle>
                    <VerticalNavigationSubHeader>
                      Without Icons
                    </VerticalNavigationSubHeader>
                    <VerticalNavigationItem linkTo="#">
                      Accordion
                    </VerticalNavigationItem>
                    <VerticalNavigationItem>Balloon</VerticalNavigationItem>

                    <VerticalNavigationGroup
                      label="Button"
                      open={openGroupIDs.includes("Button")}
                      onOpen={() => onOpenGroup("Button")}
                      onClose={() => onCloseGroup("Button")}
                    >
                      <VerticalNavigationItem linkTo="#" selected>
                        CoreButton
                      </VerticalNavigationItem>
                      <VerticalNavigationItem>
                        SelectButton
                      </VerticalNavigationItem>
                    </VerticalNavigationGroup>

                    <VerticalNavigationItem>Aspect</VerticalNavigationItem>

                    <VerticalNavigationSpacer />

                    <VerticalNavigationTitle>Core UI</VerticalNavigationTitle>
                    <VerticalNavigationSubHeader>
                      With Icons
                    </VerticalNavigationSubHeader>
                    <VerticalNavigationItem iconAsset={SVGAsset.Gift}>
                      CoreText
                    </VerticalNavigationItem>
                    <VerticalNavigationItem iconAsset={SVGAsset.GlyphLive}>
                      CoreDismissable
                    </VerticalNavigationItem>
                    <VerticalNavigationGroup
                      label="Form"
                      iconAsset={SVGAsset.Heart}
                      open={openGroupIDs.includes("Form")}
                      onOpen={() => onOpenGroup("Form")}
                      onClose={() => onCloseGroup("Form")}
                    >
                      <VerticalNavigationItem>Checkbox</VerticalNavigationItem>
                      <VerticalNavigationItem>
                        ComboInput
                      </VerticalNavigationItem>
                      <VerticalNavigationSpacer />
                      <VerticalNavigationItem>FormGroup</VerticalNavigationItem>
                    </VerticalNavigationGroup>
                    <VerticalNavigationGroup
                      label="Icon"
                      iconAsset={SVGAsset.Ignore}
                      open={openGroupIDs.includes("Icon")}
                      onOpen={() => onOpenGroup("Icon")}
                      onClose={() => onCloseGroup("Icon")}
                    >
                      <VerticalNavigationItem>Hidden</VerticalNavigationItem>
                    </VerticalNavigationGroup>
                    <VerticalNavigationItem iconAsset={SVGAsset.Gear}>
                      SVG
                    </VerticalNavigationItem>
                    <VerticalNavigationItem
                      iconAsset={SVGAsset.Global}
                      linkTo="#"
                      targetBlank
                      externalLink
                    >
                      Tabs
                    </VerticalNavigationItem>
                  </VerticalNavigation>
                )}
              </VerticalNavigationStateProvider>
            </Layout>
          </div>
        </Layout>
      </Layout>
    );
  }
}
