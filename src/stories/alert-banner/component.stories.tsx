import * as React from "react";

import {
  AlertBanner,
  AlertBannerType,
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  Layout,
  Title,
  TitleSize,
} from "v2";
import {
  CombinationGenerator,
  CombinationMode,
} from "../components/combination-generator";

export default { title: AlertBanner.displayName };

export const wordWrapBehavior = () => (
  <>
    <Layout margin={{ bottom: 2 }}>
      <AlertBanner
        type={AlertBannerType.Info}
        status="A very short string."
        message="Description with only a few words."
        closeButton={{
          "aria-label": "Close Modal",
          onClick: () => alert("Closed Modal"),
        }}
        actions={[
          { children: "First CTA Button" },
          { children: "Second CTA Button" },
        ]}
      />
    </Layout>
    <Layout margin={{ bottom: 2 }}>
      <AlertBanner
        type={AlertBannerType.Info}
        status="Medium length string: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
        message="Description with medium length string: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
        closeButton={{
          "aria-label": "Close Modal",
          onClick: () => alert("Closed Modal"),
        }}
        actions={[
          { children: "First CTA Button" },
          { children: "Second CTA Button" },
        ]}
      />
    </Layout>
    <Layout margin={{ bottom: 2 }}>
      <AlertBanner
        type={AlertBannerType.Info}
        status="Short multi-word string"
        message="Description with very long string: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        closeButton={{
          "aria-label": "Close Modal",
          onClick: () => alert("Closed Modal"),
        }}
        actions={[
          { children: "First CTA Button" },
          { children: "Second CTA Button" },
        ]}
      />
    </Layout>
  </>
);

export const combinations = () => {
  return (
    <div>
      <Title size={TitleSize.Small}>Types</Title>
      <Layout margin={{ bottom: 2 }}></Layout>
      <AlertBanner
        type={AlertBannerType.Info}
        status="A very short string."
        message="Description with only a few words."
        link={{ linkTo: "#/", text: "Link Item" }}
        closeButton={{
          "aria-label": "Close Modal",
          onClick: () => alert("Closed Modal"),
        }}
        actions={[{ children: "First CTA Button" }]}
      />
      <Layout margin={{ top: 2 }}></Layout>
      <AlertBanner
        type={AlertBannerType.Error}
        status="A very short string."
        message="Description with only a few words."
        link={{ linkTo: "#/", text: "Link Item" }}
        closeButton={{
          "aria-label": "Close Modal",
          onClick: () => alert("Closed Modal"),
        }}
        actions={[{ children: "First CTA Button" }]}
      />
      <Layout margin={{ top: 2 }}></Layout>
      <AlertBanner
        type={AlertBannerType.Success}
        status="A very short string."
        message="Description with only a few words."
        link={{ linkTo: "#/", text: "Link Item" }}
        closeButton={{
          "aria-label": "Close Modal",
          onClick: () => alert("Closed Modal"),
        }}
        actions={[{ children: "First CTA Button" }]}
      />
      <Layout margin={{ top: 2 }}></Layout>
      <AlertBanner
        type={AlertBannerType.Warning}
        status="A very short string."
        message="Description with only a few words."
        link={{ linkTo: "#/", text: "Link Item" }}
        closeButton={{
          "aria-label": "Close Modal",
          onClick: () => alert("Closed Modal"),
        }}
        actions={[{ children: "First CTA Button" }]}
      />
      <Layout margin={{ top: 2 }}></Layout>
      <CombinationGenerator
        mode={CombinationMode.Simple}
        fields={[
          {
            propKey: "status",
            propValues: [undefined, "Status Message"],
          },
          {
            propKey: "message",
            propValues: [
              "Message text.",
              "Donec auctor massa sit amet enim auctor, eu sollicitudin mauris imperdiet. Aenean sed lorem diam. Integer semper nibh ac metus dictum, a dictum massa eleifend. Nunc risus mi, sollicitudin sit amet aliquet eu, efficitur sit amet massa. Proin mattis justo quam, eu porta augue venenatis a. Phasellus blandit urna vel tellus euismod hendrerit. Nam ut augue lectus. Etiam metus augue, vehicula at justo vitae, placerat pulvinar arcu. Pellentesque ultrices nisi quis finibus eleifend.",
            ],
          },
          {
            propKey: "link",
            propValues: [undefined, { linkTo: "#", text: "Link Item" }],
          },
          {
            propKey: "actions",
            propValues: [
              undefined,
              [{ children: "action1" }],
              [{ children: "action1" }, { children: "action2" }],
            ],
          },
        ]}
      >
        <AlertBanner
          type={AlertBannerType.Info}
          status="A very short string."
          message="Description with only a few words."
          closeButton={{
            "aria-label": "Close Modal",
            onClick: () => alert("Closed Modal"),
          }}
          actions={[{ children: "First CTA Button" }]}
        />
      </CombinationGenerator>
    </div>
  );
};
export const withCustomElements = () => {
  return (
    <div>
      <AlertBanner
        type={AlertBannerType.Info}
        message={
          <Title>A Message With a Title Element and Custom Action</Title>
        }
        link={{ linkTo: "#/", text: "Link Item" }}
        closeButton={{
          "aria-label": "Close Modal",
          onClick: () => alert("Closed Modal"),
        }}
        actions={
          <Button
            size={ButtonSize.Large}
            variant={ButtonType.Success}
            state={ButtonState.Loading}
          >
            Confirm
          </Button>
        }
      />
    </div>
  );
};
