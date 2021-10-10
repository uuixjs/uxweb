import * as React from "react";

import {
  AlignItems,
  Background,
  BorderRadius,
  ButtonIcon,
  Color,
  CoreText,
  Display,
  FontSize,
  Icon,
  Interactable,
  InteractableType,
  Layout,
  NumberBadge,
  SVGAsset,
  TextType,
} from "v2";

export default { title: NumberBadge.displayName };

export const examples = () => {
  return (
    <Layout fontSize={FontSize.Size8}>
      {[1, 7, 100, 1000].map((value, i) => (
        <Layout key={i} margin={{ bottom: 1 }}>
          <NumberBadge value={value} />
        </Layout>
      ))}
    </Layout>
  );
};

export const inContext = () => (
  <Layout
    display={Display.Flex}
    alignItems={AlignItems.Center}
    fontSize={FontSize.Size8}
    padding={3}
  >
    <Layout padding={{ x: 1 }}>
      <NumberBadge value={1} mask={Background.Alt}>
        <ButtonIcon aria-label="aria label" icon={SVGAsset.NotificationBell} />
      </NumberBadge>
    </Layout>
    <Layout padding={{ x: 1 }}>
      <NumberBadge value={140} mask={Background.Alt}>
        <ButtonIcon aria-label="aria label" icon={SVGAsset.NotificationBell} />
      </NumberBadge>
    </Layout>
    <Layout padding={{ left: 4 }}>
      <NumberBadge value={14} mask={Background.Alt}>
        <Interactable
          variant={InteractableType.Alpha}
          borderRadius={BorderRadius.Medium}
        >
          <Layout
            padding={1}
            display={Display.Flex}
            alignItems={AlignItems.Center}
            borderRadius={{
              topLeft: BorderRadius.Medium,
              topRight: BorderRadius.Medium,
            }}
            color={Color.Link}
            border
          >
            <Icon asset={SVGAsset.Whisper} />
          </Layout>
        </Interactable>
      </NumberBadge>
    </Layout>

    <Layout padding={{ left: 4 }}>
      <Layout
        background={Background.Accent}
        display={Display.Flex}
        padding={{ y: 2, left: 2, right: 5 }}
      >
        <Layout padding={{ right: 2 }}>
          <NumberBadge value={10} mask={Background.Accent}>
            <ButtonIcon aria-label="aria label" icon={SVGAsset.Crown} overlay />
          </NumberBadge>
        </Layout>
        <Layout padding={{ right: 5 }}>
          <NumberBadge value={140} mask={Background.Accent}>
            <ButtonIcon
              aria-label="aria label"
              icon={SVGAsset.NotificationBell}
              overlay
            />
          </NumberBadge>
        </Layout>
      </Layout>
    </Layout>
  </Layout>
);

export const withFormatValue = () => {
  const formatValueExample = (value: number) => {
    if (value > 99) {
      return "99+";
    }
    return value;
  };
  return (
    <Layout>
      <Layout margin={{ bottom: 2 }}>
        <CoreText>
          In many cases where we want to display an unread count, we want to
          truncate the number. We can pass a formatting function into the
          component to handle this logic. An example of a formatting function
          could be have a maximum number and if the value is greater than the
          max, return a string such as "99+".
        </CoreText>
      </Layout>
      <Layout margin={{ bottom: 2 }}>
        <CoreText>
          When the value is less{" "}
          <CoreText type={TextType.Span} bold>
            than or equal to 99
          </CoreText>
          :
        </CoreText>
        <NumberBadge value={10} formatValue={formatValueExample} />
      </Layout>
      <Layout margin={{ bottom: 2 }}>
        <CoreText>
          When the value is{" "}
          <CoreText type={TextType.Span} bold>
            greater than 99
          </CoreText>
          :
        </CoreText>
        <NumberBadge value={150} formatValue={formatValueExample} />
      </Layout>
    </Layout>
  );
};
