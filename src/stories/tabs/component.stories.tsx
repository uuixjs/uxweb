import * as React from "react";

import {
  AlignItems,
  Background,
  CoreText,
  Display,
  FontSize,
  Icon,
  JustifyContent,
  Layout,
  NumberBadge,
  Pill,
  SVGAsset,
  TabSize,
  Tabs,
  TextType,
} from "v2";
import {
  CombinationGenerator,
  CombinationMode,
} from "../../components/combination-generator";
import { FormEvent, useState } from "react";

import { OverlayPreview } from "../../components/overlay-preview";
import { TabsParentExample } from "./story-components/tabs-parent-example";
import { TabsParentWithAsyncChanges } from "./story-components/tabs-parent-with-async-changes";
import { TabsParentWithResizeLogicExample } from "./story-components/tabs-parent-with-resize-logic-example";

export default { title: "Tabs" };

function preventDefault(e: FormEvent<HTMLElement>) {
  e.preventDefault();
}

export const ControlledResizeLogicExample = () => (
  <Layout>
    <CoreText type={TextType.H2}>Controlled Resize Logic Example</CoreText>
    <Layout>
      <TabsParentWithResizeLogicExample
        activeTabIndex={0}
        tabs={[
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "Lorem",
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "Ipsum",
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "Kappa",
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "perspiciatis",
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "omnis",
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "voluptatem",
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "accusantium",
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "doloremque",
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "Lorem",
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "Ipsum",
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "Kappa",
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "perspiciatis",
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "omnis",
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "voluptatem",
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "accusantium",
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "doloremque",
          },
        ]}
      />
    </Layout>
  </Layout>
);

export const AsyncUpdateExample = () => <TabsParentWithAsyncChanges />;

export const WithFewItems = () => {
  return (
    <CombinationGenerator
      mode={CombinationMode.Exhaustive}
      fields={[
        {
          propKey: "size",
          propValues: [TabSize.Default, TabSize.Large],
        },
        {
          propKey: "justifyContent",
          propValues: [
            undefined,
            JustifyContent.Start,
            JustifyContent.Center,
            JustifyContent.End,
          ],
        },
        {
          propKey: "borderBottom",
          propValues: [false, true],
        },
      ]}
    >
      <TabsParentExample
        activeTabIndex={0}
        tabs={[
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "Live Channels",
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "Videos",
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "Clips",
          },
        ]}
      />
    </CombinationGenerator>
  );
};

export const WithManyItems = () => {
  return (
    <CombinationGenerator
      mode={CombinationMode.Exhaustive}
      fields={[
        {
          propKey: "size",
          propValues: [TabSize.Default, TabSize.Large],
        },
        {
          propKey: "justifyContent",
          propValues: [
            undefined,
            JustifyContent.Start,
            JustifyContent.Center,
            JustifyContent.End,
          ],
        },
      ]}
    >
      <TabsParentExample
        activeTabIndex={0}
        tabs={[
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "About",
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "Videos",
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "Events",
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "Super Really Long Word",
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "Following",
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "Foobar",
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "Lorem",
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "Ipsum",
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "Kappa",
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "perspiciatis",
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "omnis",
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "voluptatem",
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "accusantium",
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: "doloremque",
          },
        ]}
      />
    </CombinationGenerator>
  );
};

export const WithTwoLineText = () => {
  return (
    <CombinationGenerator
      mode={CombinationMode.Exhaustive}
      fields={[
        {
          propKey: "size",
          propEnum: TabSize,
          propEnumName: "TabSize",
        },
        {
          propKey: "justifyContent",
          propValues: [
            undefined,
            JustifyContent.Start,
            JustifyContent.Center,
            JustifyContent.End,
          ],
        },
      ]}
    >
      <TabsParentExample
        activeTabIndex={0}
        tabs={[
          {
            linkTo: "#",
            onClick: preventDefault,
            label: ["206", "Messages"],
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: ["15", "Timeouts"],
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: ["2", "Mod Comments"],
          },
        ]}
      />
    </CombinationGenerator>
  );
};

export const WithTwoLineTextAndManyItems = () => {
  return (
    <CombinationGenerator
      mode={CombinationMode.Exhaustive}
      fields={[
        {
          propKey: "size",
          propValues: [TabSize.Default, TabSize.Large],
        },
        {
          propKey: "justifyContent",
          propValues: [
            undefined,
            JustifyContent.Start,
            JustifyContent.Center,
            JustifyContent.End,
          ],
        },
      ]}
    >
      <TabsParentExample
        activeTabIndex={0}
        tabs={[
          {
            linkTo: "#",
            onClick: preventDefault,
            label: ["206", "Messages"],
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: ["15", "Timeouts"],
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: ["2", "Mod Comments"],
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: ["507", "Emotes"],
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: ["123,456,789,123,456", "Kappas"],
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: ["1", "Super really long text"],
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: ["12", "Achievements"],
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: ["127,597", "Loot Boxes"],
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: ["79", "Level Ups"],
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: ["46", "Players"],
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: ["123", "Bits Available"],
          },
          {
            linkTo: "#",
            onClick: preventDefault,
            label: ["7", "Subscribers"],
          },
        ]}
      />
    </CombinationGenerator>
  );
};

export const WithOverlay = () => (
  <OverlayPreview>
    <TabsParentWithResizeLogicExample
      activeTabIndex={0}
      tabs={[
        {
          linkTo: "#",
          onClick: preventDefault,
          label: "Lorem",
        },
        {
          linkTo: "#",
          onClick: preventDefault,
          label: "Kappa",
        },
        {
          linkTo: "#",
          onClick: preventDefault,
          label: "accusantium",
        },
        {
          linkTo: "#",
          onClick: preventDefault,
          label: "doloremque",
        },
      ]}
    />

    <TabsParentWithResizeLogicExample
      borderBottom={false}
      activeTabIndex={0}
      tabs={[
        {
          linkTo: "#",
          onClick: preventDefault,
          label: "Lorem",
        },
        {
          linkTo: "#",
          onClick: preventDefault,
          label: "Kappa",
        },
        {
          linkTo: "#",
          onClick: preventDefault,
          label: "accusantium",
        },
        {
          linkTo: "#",
          onClick: preventDefault,
          label: "doloremque",
        },
      ]}
    />
  </OverlayPreview>
);

export const withButtons = () => (
  <div>
    <Tabs
      activeTabIndex={1}
      tabs={[
        { label: "One", onClick: () => undefined },
        { label: "Two", onClick: () => undefined },
        { label: "Three", onClick: () => undefined },
      ]}
    />
    <Layout margin={{ top: 2 }}>
      <CoreText>
        In this example, the tab items render as html button tags. The focus
        ring should be visible during keyboard interaction but not during mouse
        clicks.
      </CoreText>
    </Layout>
  </div>
);

export function WithCustomChildren() {
  const [active, setActive] = useState(0);
  return (
    <Tabs
      activeTabIndex={active}
      tabs={[
        {
          children: (
            <Layout
              display={Display.Flex}
              justifyContent={JustifyContent.Center}
              alignItems={AlignItems.Center}
            >
              <Layout margin={{ right: 1 }}>
                <div
                  style={{
                    width: "2.4rem",
                    height: "2.4rem",
                    opacity: active === 0 ? 1 : 0.5,
                    transform:
                      active === 0
                        ? "rotate(1080deg) scale(1.2)"
                        : "rotate(0deg) scale(0.8)",
                    transformOrigin: "center",
                    transition: "800ms all ease",
                  }}
                >
                  <Icon asset={SVGAsset.Star} />
                </div>
              </Layout>
              Favorites
            </Layout>
          ),
          onClick: (_, index) => setActive(index),
        },
        {
          children: (
            <Layout
              display={Display.Flex}
              justifyContent={JustifyContent.Center}
            >
              Unread Messages
              <Layout margin={{ left: 1 }}>
                <Pill label="10" />
              </Layout>
            </Layout>
          ),
          onClick: (_, index) => setActive(index),
        },
        {
          children: (
            <Layout fontSize={FontSize.Size6} background={Background.Alt}>
              <NumberBadge value={10} mask={Background.Alt}>
                <Layout
                  padding={{ x: 1 }}
                  display={Display.Flex}
                  alignItems={AlignItems.Center}
                >
                  Inbox
                  <Layout margin={{ left: 1 }}>
                    <Icon asset={SVGAsset.Email} />
                  </Layout>
                </Layout>
              </NumberBadge>
            </Layout>
          ),
          onClick: (_, index) => setActive(index),
        },
        {
          children: <div>Bits Balance (1,000)</div>,
          onClick: (_, index) => {
            setActive(index);
          },
        },
      ]}
    />
  );
}
