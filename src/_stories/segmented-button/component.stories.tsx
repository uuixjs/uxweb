import * as React from "react";

import {
  AlignItems,
  Display,
  Icon,
  InjectLayout,
  Layout,
  SVGAsset,
  SegmentedButton,
  SegmentedButtonOption,
  SegmentedButtonType,
} from "v2";

export default { title: SegmentedButton.displayName };

export const examples = () => (
  <div>
    <SegmentedButton>
      <SegmentedButtonOption
        name="segmented-button-radio"
        label="Option 1"
        defaultChecked
      />
      <SegmentedButtonOption name="segmented-button-radio" label="Option 2" />
      <SegmentedButtonOption name="segmented-button-radio" label="Option 3" />
    </SegmentedButton>
    <Layout margin={2} />
    <SegmentedButton>
      <SegmentedButtonOption
        name="segmented-button-checkbox"
        label="Option 1"
        type={SegmentedButtonType.Checkbox}
        defaultChecked
      />
      <SegmentedButtonOption
        name="segmented-button-checkbox"
        label="Option 2"
        type={SegmentedButtonType.Checkbox}
      />
      <SegmentedButtonOption
        name="segmented-button-checkbox"
        label="Option 3"
        type={SegmentedButtonType.Checkbox}
      />
    </SegmentedButton>
    <Layout margin={2} />
    <SegmentedButton>
      <SegmentedButtonOption
        name="segmented-button-radio-composed"
        defaultChecked
      >
        <InjectLayout
          display={Display.Flex}
          alignItems={AlignItems.Center}
          fullHeight
          margin={{ x: 0.5 }}
        >
          <div style={{ width: "2rem" }}>
            <Icon asset={SVGAsset.NavGames} fill />
          </div>
        </InjectLayout>
      </SegmentedButtonOption>
      <SegmentedButtonOption name="segmented-button-radio-composed">
        <InjectLayout
          display={Display.Flex}
          alignItems={AlignItems.Center}
          fullHeight
          margin={{ x: 0.5 }}
        >
          <div style={{ width: "2rem" }}>
            <Icon asset={SVGAsset.NavBackpack} fill />
          </div>
        </InjectLayout>
      </SegmentedButtonOption>
      <SegmentedButtonOption
        name="segmented-button-radio-composed"
        label="Sparkles"
      >
        <InjectLayout
          display={Display.Flex}
          alignItems={AlignItems.Center}
          fullHeight
          margin={{ x: 0.5 }}
        >
          <div style={{ width: "2rem" }}>
            <Icon asset={SVGAsset.NavCreative} fill />
          </div>
        </InjectLayout>
      </SegmentedButtonOption>
      <SegmentedButtonOption name="segmented-button-radio-composed">
        A Text Label
      </SegmentedButtonOption>
      <SegmentedButtonOption
        name="segmented-button-radio-composed"
        label="Test Label"
      >
        A Text Label, with Label
      </SegmentedButtonOption>
    </SegmentedButton>
  </div>
);
