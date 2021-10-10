import * as React from "react";
import styled, { css } from "styled-components";
import { Property } from "csstype";

export default { title: "Performance | styled-components" };

/**
 * Categories of tests:
 *
 * 1. Static CSS (no interpolation values)
 * 2. Interpolated Static Values (strings, objects, arrays)
 * 3. Interpolated Functions (with various return values)
 * 4. Composition and more realistic usages
 */

/**
 * Static CSS | Baseline
 */
const ScNoStyles = styled.div``;
export function StaticEmptyStyledComponents() {
  return (
    <>
      This story renders 50 simple Styled-Components:
      {[...Array(50)].map((_, i) => (
        <ScNoStyles key={i}>{i + 1}</ScNoStyles>
      ))}
    </>
  );
}

/**
 * Static CSS | With 10 css props as string
 */
const ScStaticCss = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  margin: 5px;
  background: blue;
  color: white;
  cursor: pointer;
  box-sizing: border-box;
`;
export function StaticString() {
  return (
    <>
      {[...Array(50)].map((_, i) => (
        <ScStaticCss key={i}>{i + 1}</ScStaticCss>
      ))}
    </>
  );
}

/**
 * Static CSS | With 10 css props as CSS object
 */
const ScCssObject = styled.div({
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  width: "25px",
  height: "25px",
  margin: "5px",
  background: "blue",
  color: "white",
  cursor: "pointer",
  boxSizing: "border-box",
});

export function StaticObject() {
  return (
    <>
      {[...Array(50)].map((_, i) => (
        <ScCssObject key={i}>{i + 1}</ScCssObject>
      ))}
    </>
  );
}

/**
 * Interpolated Static Values | strings
 */
const display = "inline-flex";
const justifyContent = "center";
const alignItems = "center";
const width = "25px";
const height = "25px";
const margin = "5px";
const background = "blue";
const color = "white";
const cursor = "pointer";
const boxSizing = "border-box";
const ScStringInterpolations = styled.div`
  display: ${display};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  width: ${width};
  height: ${height};
  margin: ${margin};
  background: ${background};
  color: ${color};
  cursor: ${cursor};
  box-sizing: ${boxSizing};
`;
export function InterpolatedStringValues() {
  return (
    <>
      {[...Array(50)].map((_, i) => (
        <ScStringInterpolations key={i}>{i + 1}</ScStringInterpolations>
      ))}
    </>
  );
}

/**
 * Interpolated Static Values | Objects
 */
const displayObj = { display: "inline-flex" };
const justifyContentObj = { justifyContent: "center" };
const alignItemsObj = { alignItems: "center" };
const widthObj = { width: "25px" };
const heightObj = { height: "25px" };
const marginObj = { margin: "5px" };
const backgroundObj = { background: "blue" };
const colorObj = { color: "white" };
const cursorObj = { cursor: "pointer" };
const boxSizingObj = { boxSizing: "border-box" as Property.BoxSizing };
const ScObjectInterpolations = styled.div`
  ${displayObj}
  ${justifyContentObj}
  ${alignItemsObj}
  ${widthObj}
  ${heightObj}
  ${marginObj}
  ${backgroundObj}
  ${colorObj}
  ${cursorObj}
  ${boxSizingObj}
`;
export function InterpolatedObjectValues() {
  return (
    <>
      {[...Array(50)].map((_, i) => (
        <ScObjectInterpolations key={i}>{i + 1}</ScObjectInterpolations>
      ))}
    </>
  );
}

/**
 * Interpolated Static Values | Arrays
 */
const displayArr = css`
  display: inline-flex;
`;
const justifyContentArr = css`
  justify-content: center;
`;
const alignItemsArr = css`
  align-items: center;
`;
const widthArr = css`
  width: 25px;
`;
const heightArr = css`
  height: 25px;
`;
const marginArr = css`
  margin: 5px;
`;
const backgroundArr = css`
  background: blue;
`;
const colorArr = css`
  color: white;
`;
const cursorArr = css`
  cursor: pointer;
`;
const boxSizingArr = css`
  box-sizing: border-box;
`;
const ScArrayInterpolations = styled.div`
  ${displayArr}
  ${justifyContentArr}
  ${alignItemsArr}
  ${widthArr}
  ${heightArr}
  ${marginArr}
  ${backgroundArr}
  ${colorArr}
  ${cursorArr}
  ${boxSizingArr}
`;
export function InterpolatedArrayValues() {
  return (
    <>
      {[...Array(50)].map((_, i) => (
        <ScArrayInterpolations key={i}>{i + 1}</ScArrayInterpolations>
      ))}
    </>
  );
}

/**
 * Interpolated Functions | Strings
 */
const displayFuncStr = () => "inline-flex";
const justifyContentFuncStr = () => "center";
const alignItemsFuncStr = () => "center";
const widthFuncStr = () => "25px";
const heightFuncStr = () => "25px";
const marginFuncStr = () => "5px";
const backgroundFuncStr = () => "blue";
const colorFuncStr = () => "white";
const cursorFuncStr = () => "pointer";
const boxSizingFuncStr = () => "border-box";
const ScFuncWithStrings = styled.div`
  display: ${displayFuncStr};
  justify-content: ${justifyContentFuncStr};
  align-items: ${alignItemsFuncStr};
  width: ${widthFuncStr};
  height: ${heightFuncStr};
  margin: ${marginFuncStr};
  background: ${backgroundFuncStr};
  color: ${colorFuncStr};
  cursor: ${cursorFuncStr};
  box-sizing: ${boxSizingFuncStr};
`;
export function FunctionsReturningStrings() {
  return (
    <>
      {[...Array(50)].map((_, i) => (
        <ScFuncWithStrings key={i}>{i + 1}</ScFuncWithStrings>
      ))}
    </>
  );
}

/**
 * Interpolated Functions | Objects
 */
const displayFuncObj = () => ({ display: "inline-flex" });
const justifyContentFuncObj = () => ({ justifyContent: "center" });
const alignItemsFuncObj = () => ({ alignItems: "center" });
const widthFuncObj = () => ({ width: "25px" });
const heightFuncObj = () => ({ height: "25px" });
const marginFuncObj = () => ({ margin: "5px" });
const backgroundFuncObj = () => ({ background: "blue" });
const colorFuncObj = () => ({ color: "white" });
const cursorFuncObj = () => ({ cursor: "pointer" });
const boxSizingFuncObj = () => ({
  boxSizing: "border-box" as Property.BoxSizing,
});
const ScFuncWithObj = styled.div`
  ${displayFuncObj}
  ${justifyContentFuncObj}
  ${alignItemsFuncObj}
  ${widthFuncObj}
  ${heightFuncObj}
  ${marginFuncObj}
  ${backgroundFuncObj}
  ${colorFuncObj}
  ${cursorFuncObj}
  ${boxSizingFuncObj}
 `;
export function FunctionsReturningObjects() {
  return (
    <>
      {[...Array(50)].map((_, i) => (
        <ScFuncWithObj key={i}>{i + 1}</ScFuncWithObj>
      ))}
    </>
  );
}

/**
 * Interpolated Functions | Arrays
 */
const displayFuncArr = () => css`
  display: inline-flex;
`;
const justifyContentFuncArr = () => css`
  justify-content: center;
`;
const alignItemsFuncArr = () => css`
  align-items: center;
`;
const widthFuncArr = () => css`
  width: 25px;
`;
const heightFuncArr = () => css`
  height: 25px;
`;
const marginFuncArr = () => css`
  margin: 5px;
`;
const backgroundFuncArr = () => css`
  background: blue;
`;
const colorFuncArr = () => css`
  color: white;
`;
const cursorFuncArr = () => css`
  cursor: pointer;
`;
const boxSizingFuncArr = () => css`
  box-sizing: border-box;
`;
const ScFuncWithArr = styled.div`
  ${displayFuncArr}
  ${justifyContentFuncArr}
  ${alignItemsFuncArr}
  ${widthFuncArr}
  ${heightFuncArr}
  ${marginFuncArr}
  ${backgroundFuncArr}
  ${colorFuncArr}
  ${cursorFuncArr}
  ${boxSizingFuncArr}
`;
export function FunctionsReturningArrays() {
  return (
    <>
      {[...Array(50)].map((_, i) => (
        <ScFuncWithArr key={i}>{i + 1}</ScFuncWithArr>
      ))}
    </>
  );
}

/**
 * With configurable props
 */
const ScConfigurableCss = styled.div<{
  width: string;
  height: string;
  margin: string;
  color: string;
  bg: string;
}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  background: ${(props) => props.bg};
  color: ${(props) => props.color};
  cursor: pointer;
  box-sizing: border-box;
`;
export function ConfiguredProps() {
  return (
    <>
      {[...Array(50)].map((_, i) => (
        <ScConfigurableCss
          key={i}
          width="25px"
          height="25px"
          margin="5px"
          color="white"
          bg="blue"
        >
          {i + 1}
        </ScConfigurableCss>
      ))}
    </>
  );
}

/**
 * Composition of parent -> child with static string styles
 */
const ScComposedBaseStatic = styled.div`
  width: 25px;
  height: 25px;
  margin: 5px;
  background: blue;
  color: white;
`;
const ScComposedComponentStatic = styled(ScComposedBaseStatic)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
`;

export function ExtendingBaseComponentStatic() {
  return (
    <>
      {[...Array(50)].map((_, i) => (
        <ScComposedComponentStatic key={i}>{i + 1}</ScComposedComponentStatic>
      ))}
    </>
  );
}

/**
 * Composition of parent -> child with child configurable props
 */
const ScComposedBase = styled.div<{
  width: string;
  height: string;
  margin: string;
  color: string;
  bg: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  background: ${(props) => props.bg};
  color: ${(props) => props.color};
`;
const ScComposedComponent = styled(ScComposedBase)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
`;
export function ExtendingBaseComponentWithConfiguredProps() {
  return (
    <>
      {[...Array(50)].map((_, i) => (
        <ScComposedComponent
          key={i}
          width="25px"
          height="25px"
          margin="5px"
          color="white"
          bg="blue"
        >
          {i + 1}
        </ScComposedComponent>
      ))}
    </>
  );
}
