import * as React from "react";

import {
  AlignItems,
  Attached,
  AttachedProps,
  Background,
  BalloonDirection,
  Display,
  InjectLayout,
  JustifyContent,
  Layout,
  Position,
} from "v2";
import {
  CombinationGenerator,
  CombinationMode,
} from "../../components/combination-generator";

import { ExampleSection } from "../../components/example-section";

export default { title: "Dialogs / Attached" };

export const positionDirections = () => (
  <>
    <CombinationGenerator
      mode={CombinationMode.Simple}
      fields={[
        {
          propKey: "direction",
          propEnum: BalloonDirection,
          propEnumName: "BalloonDirection",
        },
      ]}
    >
      <RenderLayout />
    </CombinationGenerator>

    <ExampleSection label="Default Props">
      <RenderLayout />
    </ExampleSection>
  </>
);

const RenderLayout = (props: Partial<AttachedProps>) => {
  const directionName = Object.keys(BalloonDirection).find(
    (key) =>
      BalloonDirection[key as keyof typeof BalloonDirection] ===
      props.direction,
  );

  return (
    <InjectLayout
      background={Background.Alt}
      display={Display.Flex}
      alignItems={AlignItems.Center}
      justifyContent={JustifyContent.Center}
    >
      <div style={{ width: 300, height: 200 }}>
        <InjectLayout
          border
          background={Background.Alt2}
          position={Position.Relative}
        >
          <div style={{ width: 150, height: 100 }}>
            <Attached {...props}>
              <Layout padding={1} elevation={1} background={Background.Base}>
                {directionName || "undefined"}
              </Layout>
            </Attached>
          </div>
        </InjectLayout>
      </div>
    </InjectLayout>
  );
};
