import * as React from "react";

import {
  AlignItems,
  CoreText,
  Display,
  Enum,
  FontSize,
  InjectLayout,
  JustifyContent,
  Layout,
  Title,
  TitleSize,
} from "v2";
import {
  Children,
  Component,
  Fragment,
  ReactNode,
  cloneElement,
  isValidElement,
} from "react";

import { ExampleSection } from "../example-section";

export type ComponentPropConfig = {
  propKey: string;
  propValues: unknown[];
};

export type ComponentPropConfigEnum = {
  propKey: string;
  /** The entire enum object. For example: "ButtonType" or "SVGAsset" or "BalloonDirection" */
  propEnum: Record<string, string | number>;
  /** The name of the enum. For example: "ButtonType" or "SVGAsset" or "BalloonDirection" */
  propEnumName: string;
};

function isComponentPropConfigEnum(
  obj: ComponentPropConfig | ComponentPropConfigEnum,
): obj is ComponentPropConfigEnum {
  return obj.hasOwnProperty("propEnum");
}

export interface ComponentProps {
  [key: string]: unknown;
}

export enum CombinationMode {
  /* Include every possible permutation */
  Exhaustive = "exhaustive",
  /* Show one of each provided option without permutations */
  Simple = "simple",
}

export interface Props {
  children: ReactNode;
  fields: Array<ComponentPropConfig | ComponentPropConfigEnum>;
  mode: CombinationMode | "simple" | "exhaustive"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
}

interface State { }

export class CombinationGenerator extends Component<Props, State> {
  public render() {
    if (this.props.mode === CombinationMode.Simple) {
      return this.renderSimple();
    }
    return this.renderExhaustive();
  }

  private renderSimple() {
    return this.props.fields.map((field, i) => (
      <ExampleSection label={field.propKey} key={i}>
        {!isComponentPropConfigEnum(field)
          ? field.propValues.map((value, x) =>
            this.renderRow(
              { [field.propKey]: value },
              field.propKey + x,
              <Title size={TitleSize.ExtraSmall}>
                {typeof value === "object"
                  ? JSON.stringify(value)
                  : typeof value === "string"
                    ? `"${value}"`
                    : String(value)}
              </Title>,
            ),
          )
          : Enum.entries(field.propEnum).map(([key, value], x) =>
            this.renderRow(
              { [field.propKey]: value },
              field.propKey + x,
              <Title size={TitleSize.ExtraSmall}>
                {field.propEnumName}.{key}
              </Title>,
            ),
          )}
      </ExampleSection>
    ));
  }

  private renderExhaustive() {
    const propSets = fieldsToPropPermutations(this.props.fields);
    return (
      <div>
        <Layout>
          <Title>{propSets.length} combinations</Title>
          <CoreText>
            From all permutations of:{" "}
            {this.props.fields
              .map(
                (item) =>
                  `${item.propKey} [${(isComponentPropConfigEnum(item)
                    ? Enum.values(item.propEnum)
                    : item.propValues
                  ).length
                  }]`,
              )
              .join(", ")}
          </CoreText>
        </Layout>

        <Layout margin={{ y: 2 }}>
          {propSets.map((value, index, all) => {
            return this.renderRow(
              value,
              index,
              this.getRowSetHeading(value, index, all),
            );
          })}
        </Layout>
      </div>
    );
  }

  private renderRow = (
    currentProps: ComponentProps,
    key: number | string,
    heading: ReactNode,
  ) => {
    const basis = 100 / Math.max(1, Children.count(this.props.children));
    const items = Children.map(this.props.children, (child, childIndex) => {
      let newChild;
      if (isValidElement(child)) {
        newChild = cloneElement(child, currentProps);
      }

      return (
        <InjectLayout
          key={childIndex}
          padding={1}
          display={Display.Flex}
          alignItems={AlignItems.Start}
          justifyContent={JustifyContent.Start}
          flexGrow={1}
        >
          <div style={{ flexBasis: `${basis}%` }}>{newChild}</div>
        </InjectLayout>
      );
    });

    return (
      <Fragment key={key}>
        {heading}
        <Layout display={Display.Flex} justifyContent={JustifyContent.Start}>
          {items}
        </Layout>
      </Fragment>
    );
  };

  private getRowSetHeading(
    currentObj: ComponentProps = {},
    index: number,
    allObjs: ComponentProps[],
  ) {
    const diffProps = [];

    const next = allObjs[index + 1] || {};
    const prev = allObjs[index - 1] || {};

    for (const key in currentObj) {
      if (currentObj[key] === undefined) {
        continue;
      }

      if (currentObj[key] === false) {
        continue;
      }

      if (prev.hasOwnProperty(key) && prev[key] === currentObj[key]) {
        continue;
      }

      if (next.hasOwnProperty(key) && next[key] === currentObj[key]) {
        diffProps.push(key + " = " + currentObj[key]);
      }
    }

    let propString = "";

    Object.entries(currentObj)
      .filter(([_key, value]) => value !== undefined)
      .forEach(([key, value]) => {
        propString += ` ${this.formatHumanReadable(key, value)}`;
      });

    const moreProps = this.morePropsDescription();

    let spacer;

    if (diffProps.length > 0) {
      spacer = <Layout margin={{ y: 3 }} borderBottom />;
    }

    return (
      <Layout
        margin={{ top: 1 }}
        fontSize={FontSize.Size8}
        ellipsis
        style={{ opacity: 0.6 }}
      >
        {spacer}
        {`<${this.getComponentName()}${propString}>`}
        {moreProps && <span style={{ opacity: 0.6 }}>{moreProps}</span>}
      </Layout>
    );
  }

  private getComponentName() {
    const children = Children.toArray(this.props.children);

    const child = children[0];

    if (!isValidElement(child)) {
      return "";
    }

    if (typeof child.type === "string") {
      return child.type;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const childType = child.type as any;

    const name =
      childType.displayName ||
      childType.name ||
      childType.render?.displayName ||
      childType.render?.name ||
      "Unkonwn";

    return name;
  }

  private morePropsDescription(): string {
    const children = Children.toArray(this.props.children);

    const otherPropNames: string[] = [];

    // If there are ANY children with ANY hard-coded props, list the props:
    children.forEach((child) => {
      if (!isValidElement(child)) {
        return;
      }
      Object.keys(child.props).forEach((k) => {
        if (!otherPropNames.includes(k)) {
          otherPropNames.push(k);
        }
      });
    });

    if (otherPropNames.length) {
      return ` (+ ${otherPropNames.join(", ")})`;
    }

    return "";
  }

  /**
   * @returns A string like "padding={0}" or "variant={ButtonType.Primary}"
   */
  private formatHumanReadable(propName: string, propValue: unknown): string {
    const propConfig = this.props.fields.find((f) => f.propKey === propName);

    if (propConfig && isComponentPropConfigEnum(propConfig)) {
      const enumEntry = Enum.entries(propConfig.propEnum).find(
        ([_key, value]) => value === propValue,
      );

      if (enumEntry) {
        const enumKey = enumEntry[0];

        return `${propName}={${propConfig.propEnumName}.${enumKey}}`;
      }
    }

    if (typeof propValue === "object") {
      return `${propName}={${JSON.stringify(propValue)}}`;
    }

    if (typeof propValue === "string") {
      return `${propName}="${propValue}"`;
    }

    return `${propName}={${propValue}}`;
  }
}

/**
 * Generates all possible permutations of component props, given a list of possible prop values.
 *
 * Ordering will group latter entries more closely and earlier entries further apart.
 * In other words:
 *   - put props higher in the list of you don't care to see their values next to each other.
 *   - put props lower in the list if you want their values to always be shown side by side.
 *   - props in the middle get spread out accordingly.
 *
 * Example:
 *
 * Given this input:
 * [
 *  [A1, A2, A3],
 *  [B1, B2, B3],
 * ]
 *
 * Function will output:
 *
 * A1 + B1
 * A1 + B2
 * A1 + B3
 *
 * A2 + B1
 * A2 + B2
 * A3 + B3
 *
 * A3 + B1
 * A3 + B2
 * A3 + B3
 *
 *
 * @param fields
 * @param obj Used when this function is called recursively; don't set on first call.
 */
function fieldsToPropPermutations(
  fields: Props["fields"],
  obj: ComponentProps = {},
): ComponentProps[] {
  let results: ComponentProps[] = [];

  if (fields.length === 1) {
    const field = fields[0];

    if (field) {
      if (!isComponentPropConfigEnum(field)) {
        field.propValues.forEach((value) => {
          results.push({ ...obj, [`${field.propKey}`]: value });
        });
      } else {
        Enum.values(field.propEnum).forEach((value) => {
          results.push({ ...obj, [`${field.propKey}`]: value });
        });
      }
    }
  }

  fields.forEach((field, index) => {
    if (index === fields.length - 1) {
      return;
    }

    if (obj.hasOwnProperty(field.propKey)) {
      return;
    }

    if (!isComponentPropConfigEnum(field)) {
      field.propValues.forEach((value) => {
        const nextResults = fieldsToPropPermutations(fields.slice(1), {
          ...obj,
          [`${field.propKey}`]: value,
        });

        results = results.concat(nextResults);
      });
    } else {
      Enum.values(field.propEnum).forEach((value) => {
        const nextResults = fieldsToPropPermutations(fields.slice(1), {
          ...obj,
          [`${field.propKey}`]: value,
        });

        results = results.concat(nextResults);
      });
    }
  });

  return results;
}
