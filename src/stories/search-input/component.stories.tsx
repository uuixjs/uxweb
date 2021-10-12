import * as React from "react";

import {
  CombinationGenerator,
  CombinationMode,
} from "../components/combination-generator";
import {
  CoreText,
  InputSize,
  SearchInput,
  SearchInputProps,
  TextType,
} from "v2";

import { OverlayPreview } from "../components/overlay-preview";

export default { title: "SearchInput" };

export const examples = () => renderExamples();

export const withOverlay = () => (
  <OverlayPreview blur>
    <CoreText type={TextType.H2}>Overlay Examples</CoreText>
    {renderExamples({ overlay: true })}
  </OverlayPreview>
);

const renderExamples = (props?: Partial<SearchInputProps>) => {
  return (
    <CombinationGenerator
      mode={CombinationMode.Exhaustive}
      fields={[
        {
          propKey: "error",
          propValues: [false, true],
        },
        {
          propKey: "size",
          propValues: [undefined, InputSize.Large],
        },
      ]}
    >
      <SearchInput {...props} placeholder="Search" />
      <SearchInput {...props} placeholder="Search" disabled />
    </CombinationGenerator>
  );
};
