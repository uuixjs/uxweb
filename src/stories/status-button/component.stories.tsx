// import * as React from "react";
// Eventually, we may want to export and publish this component, but for now, it is hidden.
//
// import React from "react";
// import {
//   CoreButtonSize,
//   NotificationType,
//   StatusButton,
//   SVGAsset,
// } from "v2";
// import {
//   CombinationGenerator,
//   CombinationMode,
// } from "../../components/combination-generator";
// import { OverlayPreview } from "../../components/overlay-preview";

// export default { title: "StatusButton" };

// export const combinations = () => (
//   <>
//     <CombinationGenerator
//       mode={CombinationMode.Simple}
//       fields={[
//         {
//           propKey: "fullWidth",
//           propValues: [false, true],
//         },
//         {
//           propKey: "disabled",
//           propValues: [false, true],
//         },
//         {
//           propKey: "icon",
//           propValues: [SVGAsset.NavProfile, undefined],
//         },
//         {
//           propKey: "size",
//           propEnum: CoreButtonSize,
//           propEnumName: "CoreButtonSize",
//         },
//       ]}
//     >
//       <StatusButton type={NotificationType.Info}>Status</StatusButton>
//       <StatusButton type={NotificationType.Warning}>Status</StatusButton>
//       <StatusButton type={NotificationType.Success}>Status</StatusButton>
//       <StatusButton type={NotificationType.Error}>Status</StatusButton>
//     </CombinationGenerator>
//     <OverlayPreview>
//       <CombinationGenerator
//         mode={CombinationMode.Simple}
//         fields={[
//           {
//             propKey: "disabled",
//             propValues: [false, true],
//           },
//         ]}
//       >
//         <StatusButton type={NotificationType.Info}>Status</StatusButton>
//         <StatusButton type={NotificationType.Warning}>Status</StatusButton>
//         <StatusButton type={NotificationType.Success}>Status</StatusButton>
//         <StatusButton type={NotificationType.Error}>Status</StatusButton>
//       </CombinationGenerator>
//     </OverlayPreview>
//   </>
// );
