import * as React from "react";

import {
  Background,
  Color,
  Column,
  CoreText,
  FontSize,
  FontWeight,
  Grid,
  InjectLayout,
  Layout,
  LineHeight,
  Overflow,
  TextDecoration,
  TextTransform,
  TextType,
  VerticalAlign,
  WhiteSpace,
  WordBreak,
} from "v2";

import { Enum } from "lib";

export default { title: "CoreText" };

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export const ellipsis = () => (
  <Grid>
    <Column cols={6}>
      <Layout padding={1} fullHeight border>
        <CoreText bold>One Line</CoreText>
        <CoreText ellipsis>{loremIpsum}</CoreText>
      </Layout>
    </Column>
    <Column cols={6}>
      <Layout padding={1} fullHeight border>
        <CoreText bold>Two Lines</CoreText>
        <CoreText ellipsis lines={2}>
          {loremIpsum}
        </CoreText>
      </Layout>
    </Column>
  </Grid>
);

export const textWrap = () => (
  <Grid>
    <Column cols={6}>
      <Layout padding={1} fullHeight border>
        <CoreText bold>Pre-Wrap</CoreText>
        <CoreText whiteSpace={WhiteSpace.PreWrap}>
          These line breaks should be preserved:
          {`
Line One
Line Two

Line Four
Line Five

Line Seven

`}
          {loremIpsum}
        </CoreText>
      </Layout>
    </Column>
    <Column cols={6}>
      <Layout padding={1} overflow={Overflow.Hidden} border>
        <CoreText bold>No Wrap</CoreText>
        <CoreText whiteSpace={WhiteSpace.NoWrap}>{loremIpsum}</CoreText>
      </Layout>
    </Column>
  </Grid>
);

export const tabularNums = () => (
  <Layout padding={1} fullHeight border>
    <table>
      <tr>
        <td>Without tabular nums: &nbsp;</td>
        <td>
          <CoreText>1234</CoreText>
        </td>
      </tr>
      <tr>
        <td>With tabular nums: &nbsp;</td>
        <td>
          <CoreText tabularNums>1234</CoreText>
        </td>
      </tr>
    </table>
  </Layout>
);

export const textStyling = () => (
  <>
    <Layout padding={{ y: 1, x: 2 }} margin={{ bottom: 2 }} border>
      {Enum.keys(TextType).map((key) => (
        <Layout key={key} margin={{ y: 0.5 }}>
          <CoreText type={TextType[key]}>TextType.{key}</CoreText>
        </Layout>
      ))}
    </Layout>

    <Layout padding={{ y: 1, x: 2 }} margin={{ bottom: 2 }} border>
      {Enum.keys(FontSize).map((key) => (
        <Layout key={key} margin={{ y: 0.5 }}>
          <CoreText fontSize={FontSize[key]}>FontSize.{key}</CoreText>
        </Layout>
      ))}
    </Layout>

    <Layout padding={{ y: 1, x: 2 }} margin={{ bottom: 2 }} border>
      {Enum.keys(Color).map((key) => (
        <Layout key={key} margin={{ y: 0.5 }}>
          <CoreText color={Color[key]}>Color.{key}</CoreText>
        </Layout>
      ))}
    </Layout>

    <Layout padding={{ y: 1, x: 2 }} margin={{ bottom: 2 }} border>
      {Enum.keys(FontWeight).map((key) => (
        <Layout key={key} margin={{ y: 0.5 }}>
          <CoreText fontWeight={FontWeight[key]}>FontWeight.{key}</CoreText>
        </Layout>
      ))}
    </Layout>

    <Layout padding={{ y: 1, x: 2 }} margin={{ bottom: 2 }} border>
      {Enum.keys(TextDecoration).map((key) => (
        <Layout key={key} margin={{ y: 0.5 }}>
          <CoreText decoration={TextDecoration[key]}>
            TextDecoration.{key}
          </CoreText>
        </Layout>
      ))}
    </Layout>

    <Layout padding={{ y: 1, x: 2 }} margin={{ bottom: 2 }} border>
      <Layout margin={{ y: 0.5 }}>
        <CoreText italic>italic</CoreText>
      </Layout>
      <Layout margin={{ y: 0.5 }}>
        <CoreText bold>bold</CoreText>
      </Layout>
    </Layout>
  </>
);

export const textTransformations = () => (
  <>
    <Layout padding={{ y: 1, x: 2 }} margin={{ bottom: 2 }} border>
      {Enum.keys(TextTransform).map((key) => (
        <Layout key={key} margin={{ y: 0.5 }}>
          <CoreText bold>TextTransform.{key}:</CoreText>
          <CoreText transform={TextTransform[key]}>
            The quick brown fox jumps over the lazy dog
          </CoreText>
        </Layout>
      ))}
    </Layout>

    <Layout padding={{ y: 1, x: 2 }} margin={{ bottom: 2 }} border>
      {Enum.keys(LineHeight).map((key) => (
        <Layout key={key} margin={{ y: 0.5 }}>
          <CoreText bold>LineHeight.{key}:</CoreText>
          <CoreText lineHeight={LineHeight[key]}>{loremIpsum}</CoreText>
        </Layout>
      ))}
    </Layout>

    <Layout padding={{ y: 1, x: 2 }} margin={{ bottom: 2 }} border>
      {Enum.keys(WordBreak).map((key) => (
        <Layout key={key} margin={{ top: 0.5, bottom: 1 }}>
          <CoreText bold>WordBreak.{key}:</CoreText>
          <InjectLayout border>
            <div style={{ width: "20rem" }}>
              <CoreText wordBreak={WordBreak[key]}>
                Honorificabilitudinitatibus califragilisticexpialidocious
                Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu
                次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
              </CoreText>
            </div>
          </InjectLayout>
        </Layout>
      ))}
    </Layout>

    <Layout padding={{ y: 1, x: 2 }} margin={{ bottom: 2 }} border>
      {Enum.keys(VerticalAlign).map((key) => (
        <Layout key={key} margin={{ top: 0.5, bottom: 1 }}>
          <Layout borderTop borderBottom>
            <InjectLayout
              verticalAlign={VerticalAlign[key]}
              background={Background.Alt}
              margin={{ right: 1 }}
            >
              <img src="" width="50" height="50" />
            </InjectLayout>
            <CoreText
              align={VerticalAlign[key]}
              type={TextType.Span}
              fontSize={FontSize.Size6}
            >
              VerticalAlign.{key}
            </CoreText>
          </Layout>
        </Layout>
      ))}
    </Layout>
  </>
);
