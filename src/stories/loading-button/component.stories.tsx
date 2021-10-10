import * as React from "react";

import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  CoreButtonSize,
  CoreButtonType,
  LoadingButton,
  LoadingStatus,
  SVGAsset,
} from "v2";
import {
  CombinationGenerator,
  CombinationMode,
} from "../../components/combination-generator";

export default { title: "LoadingButton" };
export const legacyExamples = () => (
  <>
    <CombinationGenerator
      mode={CombinationMode.Simple}
      fields={[
        {
          propKey: "variant",
          propEnum: ButtonType,
          propEnumName: "ButtonType",
        },
        {
          propKey: "fullWidth",
          propValues: [false, true],
        },

        {
          propKey: "size",
          propEnum: ButtonSize,
          propEnumName: "ButtonSize",
        },
        {
          propKey: "icon",
          propValues: [undefined, SVGAsset.NavGames],
        },
        {
          propKey: "disabled",
          propValues: [false, true],
        },
      ]}
    >
      <Button state={ButtonState.Default}>Loading</Button>
      <Button state={ButtonState.Loading}>Loading</Button>
      <Button state={ButtonState.Success}>Loading</Button>
    </CombinationGenerator>
  </>
);

export const examples = () => (
  <>
    <CombinationGenerator
      mode={CombinationMode.Simple}
      fields={[
        {
          propKey: "variant",
          propEnum: CoreButtonType,
          propEnumName: "CoreButtonType",
        },
      ]}
    >
      <LoadingButton loadingStatus={LoadingStatus.Default}>
        Loading
      </LoadingButton>
      <LoadingButton loadingStatus={LoadingStatus.Loading}>
        Loading
      </LoadingButton>
      <LoadingButton loadingStatus={LoadingStatus.Success}>
        Loading
      </LoadingButton>
    </CombinationGenerator>
    <CombinationGenerator
      mode={CombinationMode.Simple}
      fields={[
        {
          propKey: "fullWidth",
          propValues: [false, true],
        },

        {
          propKey: "size",
          propEnum: CoreButtonSize,
          propEnumName: "CoreButtonSize",
        },
        {
          propKey: "icon",
          propValues: [undefined, SVGAsset.NavGames],
        },
        {
          propKey: "disabled",
          propValues: [false, true],
        },
      ]}
    >
      <LoadingButton
        variant={CoreButtonType.Primary}
        loadingStatus={LoadingStatus.Default}
      >
        Loading
      </LoadingButton>
      <LoadingButton
        variant={CoreButtonType.Primary}
        loadingStatus={LoadingStatus.Loading}
      >
        Loading
      </LoadingButton>
      <LoadingButton
        variant={CoreButtonType.Primary}
        loadingStatus={LoadingStatus.Success}
      >
        Loading
      </LoadingButton>
    </CombinationGenerator>
  </>
);
