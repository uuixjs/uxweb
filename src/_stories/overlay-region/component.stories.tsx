import * as React from "react";

import {
  AlignItems,
  Background,
  Button,
  ButtonIcon,
  ButtonType,
  CheckBox,
  CoreImage,
  CoreLink,
  CoreText,
  Display,
  FormGroup,
  Input,
  InputType,
  JustifyContent,
  Layout,
  Overflow,
  OverlayRegion,
  ProgressBar,
  Radio,
  SVGAsset,
  Select,
  SelectButton,
  SplitButton,
  Stat,
  TextType,
} from "v2";

import { Component } from "react";
import { ExampleBoxArt } from "../assets";

export default { title: "OverlayRegion" };

export const examples = () => <OverlayContextPage />;

class OverlayContextPage extends Component {
  public render() {
    return (
      <Layout margin={{ bottom: 2 }}>
        <Layout padding={1} margin={{ y: 2 }} border>
          <Layout margin={{ bottom: 1 }}>
            <CoreText type={TextType.H4}>
              Ordinary, without overlay context:
            </CoreText>
          </Layout>
          {this.renderBox()}
        </Layout>

        <Layout padding={1} margin={{ y: 2 }} border>
          <Layout margin={{ bottom: 1 }}>
            <CoreText type={TextType.H4}>With overlay context:</CoreText>
          </Layout>
          <OverlayRegion>
            <Layout background={Background.AccentAlt2}>
              {this.renderBox()}
            </Layout>
          </OverlayRegion>
        </Layout>

        <Layout padding={1} margin={{ y: 2 }} border>
          <Layout margin={{ bottom: 1 }}>
            <CoreText type={TextType.H4}>
              Ordinary, without overlay context:
            </CoreText>
          </Layout>
          {this.renderForm()}
        </Layout>

        <Layout padding={1} margin={{ y: 2 }} border>
          <Layout margin={{ bottom: 1 }}>
            <CoreText type={TextType.H4}>With overlay context:</CoreText>
          </Layout>
          <OverlayRegion>
            <Layout background={Background.AccentAlt2}>
              {this.renderForm()}
            </Layout>
          </OverlayRegion>
        </Layout>

        <Layout padding={1} margin={{ y: 2 }} border>
          <Layout margin={{ bottom: 1 }}>
            <CoreText type={TextType.H4}>Nested Example</CoreText>
          </Layout>

          <Layout background={Background.AccentAlt2} padding={2}>
            <OverlayRegion>
              This is an overlay
              <Layout background={Background.Base} padding={2}>
                <OverlayRegion overlay={false}>
                  This is NOT an overlay
                </OverlayRegion>
              </Layout>
            </OverlayRegion>
          </Layout>
        </Layout>
      </Layout>
    );
  }

  private renderBox() {
    return (
      <Layout
        display={Display.Flex}
        alignItems={AlignItems.Center}
        padding={1}
        elevation={1}
      >
        <Layout flexGrow={0} flexShrink={0} margin={{ right: 1 }}>
          <div style={{ width: "80px" }}>
            <CoreImage src={ExampleBoxArt.luigi} alt="BoxArt Thumbnail" />
          </div>
        </Layout>
        <Layout flexGrow={1} flexShrink={1} overflow={Overflow.Hidden}>
          <CoreText ellipsis>
            Monstercat Radio - 24/7 Music Stream - live.monstercat.com - Always
            live 24/7, follow today to join the party and never miss out!
          </CoreText>
          <CoreText>
            <CoreLink>Monstercat</CoreLink> &bull;{" "}
            <CoreLink>Variety Streaming</CoreLink>
          </CoreText>
        </Layout>
        <Layout flexGrow={0} flexShrink={0} margin={{ x: 1 }}>
          <Stat
            label="Viewers"
            value="123,456,789"
            icon={SVGAsset.GlyphViews}
          />
        </Layout>
        <Layout flexGrow={0} flexShrink={0}>
          <Button variant={ButtonType.Secondary}>Share</Button>
          <Layout margin={{ left: 1 }} display={Display.InlineBlock}>
            <ButtonIcon aria-label="aria label" icon={SVGAsset.More} />
          </Layout>
        </Layout>
      </Layout>
    );
  }

  private renderForm() {
    return (
      <Layout padding={{ x: 2, y: 0.5 }}>
        <Layout margin={{ y: 3 }}>
          <FormGroup
            error
            errorMessage="Sorry, your name was not found in our system."
            label="Name"
            hint="Tell us who to deliver pizza to"
          >
            <Input type={InputType.Text} value="Ben Cole" />
          </FormGroup>
        </Layout>

        <Layout margin={{ y: 3 }}>
          <FormGroup
            label="Pizza Type"
            hint="Pick the one that sounds best (hint: it's not Pineapple)"
          >
            <Layout margin={{ bottom: 1 }}>
              <Radio name="settings-pizza" label="Vegetarian" />
            </Layout>
            <Layout margin={{ bottom: 1 }}>
              <Radio name="settings-pizza" label="Pepperoni delux" />
            </Layout>
            <Layout margin={{ bottom: 1 }}>
              <Radio
                name="settings-pizza"
                label="Pineapple and ham supreme"
                checked
              />
            </Layout>
          </FormGroup>
        </Layout>

        <Layout margin={{ y: 3 }}>
          <Layout margin={{ bottom: 2 }}>
            <CheckBox label="Restrict Chat Language" />
          </Layout>
          <Layout margin={{ bottom: 2 }}>
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
          </Layout>
          <SelectButton>Filter</SelectButton>
        </Layout>

        <Layout>
          A Progress Bar:
          <ProgressBar value={50} mask />
        </Layout>

        <Layout
          margin={{ y: 3 }}
          display={Display.Flex}
          justifyContent={JustifyContent.End}
        >
          <Layout margin={{ x: 1 }}>
            <ButtonIcon aria-label="aria label" icon={SVGAsset.ChatRiskFlag} />
          </Layout>

          <Layout margin={{ x: 1 }}>
            <ButtonIcon aria-label="aria label" icon={SVGAsset.ChatRiskFlag} />
          </Layout>

          <Layout margin={{ x: 1 }}>
            <Button variant={ButtonType.Secondary}>Cancel</Button>
          </Layout>

          <SplitButton dropdown={{}}>Submit</SplitButton>
        </Layout>
      </Layout>
    );
  }
}
