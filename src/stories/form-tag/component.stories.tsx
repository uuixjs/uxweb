import * as React from "react";

import {
  CombinationGenerator,
  CombinationMode,
} from "../../components/combination-generator";
import {
  CoreButtonSize,
  CoreText,
  Display,
  FormTag,
  FormTagProps,
  FormTagStatus,
  Input,
  InputSize,
  InputType,
  Layout,
  SelectButton,
  Title,
  TitleSize,
} from "v2";

export default { title: FormTag.displayName };

export const examples = () => {
  const requireProps: FormTagProps = {
    label: "Tag label",
  };
  return (
    <CombinationGenerator
      mode={CombinationMode.Simple}
      fields={[
        {
          propKey: "linkTo",
          propValues: [undefined, "#"],
        },
        {
          propKey: "size",
          propEnum: InputSize,
          propEnumName: "InputSize",
        },
        {
          propKey: "size",
          propEnum: InputSize,
          propEnumName: "InputSize",
        },
        {
          propKey: "disabled",
          propValues: [false, true],
        },
      ]}
    >
      <FormTag {...requireProps} />
      <FormTag status={FormTagStatus.Unselected} {...requireProps} />
      <FormTag status={FormTagStatus.Selected} {...requireProps} />
      <FormTag status={FormTagStatus.Locked} {...requireProps} />
    </CombinationGenerator>
  );
};

export const withOverflow = () => {
  const requireProps: FormTagProps = {
    label: "Excepteur sint occaecat cupidatat non proident",
  };
  return (
    <>
      <Layout margin={{ bottom: 2 }}>
        <Title size={TitleSize.ExtraSmall}>
          It's expected that these will overflow their container and not wrap.
        </Title>
      </Layout>
      <div style={{ width: "100px", border: "1px dashed red" }}>
        <Layout margin={{ bottom: 2 }}>
          <FormTag size={InputSize.Small} {...requireProps} />
        </Layout>
        <Layout margin={{ bottom: 2 }}>
          <FormTag size={InputSize.Default} {...requireProps} />
        </Layout>
        <FormTag size={InputSize.Large} {...requireProps} />
      </div>
    </>
  );
};

export const alignment = () => (
  <>
    <Layout margin={{ bottom: 2 }}>
      <CoreText>
        These elements should have the same height at each size:
      </CoreText>
    </Layout>

    {renderAlignmentExample(InputSize.Small)}
    {renderAlignmentExample(InputSize.Default)}
    {renderAlignmentExample(InputSize.Large)}
  </>
);

const renderAlignmentExample = (size: InputSize) => {
  let coreButtonSize = CoreButtonSize.Default;

  if (size === InputSize.Small) {
    coreButtonSize = CoreButtonSize.Small;
  } else if (size === InputSize.Large) {
    coreButtonSize = CoreButtonSize.Large;
  }

  return (
    <Layout
      display={Display.Flex}
      borderBottom
      borderTop
      padding={{ x: 3 }}
      margin={{ y: 2 }}
    >
      <Layout margin={{ right: 1 }}>
        <SelectButton size={coreButtonSize}>Select Something</SelectButton>
      </Layout>
      <Layout margin={{ right: 1 }}>
        <Input
          size={size}
          type={InputType.Text}
          placeholder="Type something..."
        />
      </Layout>
      <Layout margin={{ right: 1 }}>
        <FormTag size={size} label="Action" status={FormTagStatus.Selected} />
      </Layout>
      <Layout margin={{ right: 1 }}>
        <FormTag
          size={size}
          label="Adventure"
          status={FormTagStatus.Selected}
        />
      </Layout>
      <Layout margin={{ right: 1 }}>
        <FormTag size={size} label="Add New" />
      </Layout>
    </Layout>
  );
};
