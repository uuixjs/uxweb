import * as React from "react";

import {
  CombinationGenerator,
  CombinationMode,
} from "../components/combination-generator";
import { Presence, PresenceStatus } from "v2";

export default { title: Presence.displayName };

export const examples = () => (
  <CombinationGenerator
    mode={CombinationMode.Simple}
    fields={[
      {
        propKey: "status",
        propEnum: PresenceStatus,
        propEnumName: "PresenceStatus",
      },
    ]}
  >
    <Presence />
  </CombinationGenerator>
);
