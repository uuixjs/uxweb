import * as React from "react";

import {
  Background,
  InputSize,
  Layout,
  OverlayRegion,
  Select,
} from "v2";
import {
  CombinationGenerator,
  CombinationMode,
} from "../../components/combination-generator";

export default { title: Select.displayName };

export const examples = () => renderExamples();

export const withOverlay = () => (
  <OverlayRegion overlay>
    <Layout background={Background.Overlay}>
      <Layout margin={{ bottom: 2 }}>{renderExamples()}</Layout>
    </Layout>
  </OverlayRegion>
);

const renderExamples = () => {
  return (
    <CombinationGenerator
      mode={CombinationMode.Simple}
      fields={[
        {
          propKey: "size",
          propValues: [
            undefined,
            InputSize.Small,
            InputSize.Default,
            InputSize.Large,
          ],
        },
        {
          propKey: "error",
          propValues: [true],
        },
        {
          propKey: "disabled",
          propValues: [true],
        },
      ]}
    >
      <Select>
        <option value="en">English</option>
        <option value="da">Dansk</option>
        <option value="de">Deutsch</option>
        <option value="en-gb">English - UK</option>
        <option value="es">Español - España</option>
        <option value="es-mx">Español - Latinoamérica</option>
        <option value="fr">Français</option>
        <option value="zh-cn">中文 简体</option>
        <option value="ja">日本語</option>
        <option value="ko">한국어</option>
      </Select>
    </CombinationGenerator>
  );
};
