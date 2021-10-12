import "./styles.scss";

import * as React from "react";

import {
  AlignItems,
  Background,
  Button,
  ButtonType,
  Column,
  CoreText,
  Display,
  FormGroup,
  Grid,
  Layout,
  TextType,
  Toggle,
  TransitionDuration,
  TransitionGroup,
  TransitionType,
  Typeset,
} from "v2";
import { Component, FormEvent } from "react";

interface State {
  running: boolean;
  items: ExampleItem[];
}

interface ExampleItem {
  name: string;
  color: string;
}

const availableItems: ExampleItem[] = [
  { name: "D.Va", color: "#99249e" },
  { name: "Orisa", color: "#239e23" },
  { name: "Reinhardt", color: "#4c4c4c" },
  { name: "Winston", color: "#6d5656" },
  { name: "Wrecking Ball", color: "#8c7725" },
  { name: "Zarya", color: "#8c246d" },
  { name: "Ashe", color: "#919191" },
  { name: "Bastion", color: "#646d48" },
  { name: "Doomfist", color: "#58476d" },
  { name: "Hanzo", color: "#266b37" },
  { name: "Junkrat", color: "#66451d" },
  { name: "McCree", color: "#661d1d" },
  { name: "Mei", color: "#1d4866" },
  { name: "Pharah", color: "#211c66" },
  { name: "Reaper", color: "#393e3f" },
  { name: "Soldier 76", color: "#5559aa" },
  { name: "Sombra", color: "#7754a9" },
  { name: "Symmetra", color: "#5377a8" },
  { name: "Torbjorn", color: "#a85376" },
  { name: "Tracer", color: "#798e33" },
  { name: "Widowmaker", color: "#0d3325" },
  { name: "Ana", color: "#00107a" },
  { name: "Brigitte", color: "#408e3d" },
  { name: "Lucio", color: "#8d9b22" },
  { name: "Mercy", color: "#9b2298" },
  { name: "Moira", color: "#4c1e70" },
  { name: "Zenyatta", color: "#8e7f48" },
];

export class TransitionGroupDiscoTest extends Component<{}, State> {
  public timer: number | undefined = undefined;
  public state = {
    running: false,
    items: availableItems.slice(0, 5),
  };

  public changeChild = () => {
    this.setState((prevState) => {
      const newItems = prevState.items.concat();
      const names = prevState.items.map((e) => e.name);
      const notVisibleNow = availableItems.filter(
        (e) => !names.includes(e.name),
      );
      const newItem =
        notVisibleNow[Math.floor(Math.random() * notVisibleNow.length)];
      const deleteIndex = Math.floor(Math.random() * prevState.items.length);
      newItems.splice(deleteIndex, 1, newItem);

      return {
        items: newItems,
      };
    });
  };

  public componentDidUpdate(_: {}, prevState: State) {
    // Start
    if (!prevState.running && this.state.running) {
      this.timer = window.setInterval(this.changeChild, 100);
    }

    // Stop
    if (prevState.running && !this.state.running) {
      window.clearInterval(this.timer);
    }
  }

  public toggleRunning = (e: FormEvent<HTMLInputElement>) => {
    this.setState({
      running: !!e.currentTarget.checked,
    });
  };

  public render() {
    const elements = this.state.items.map((elem) => (
      <div
        key={elem.name}
        className="transition-group-disco-test__child"
        style={{
          padding: "15px",
          background: elem.color,
          color: "white",
          textAlign: "center",
        }}
      >
        {elem.name}
      </div>
    ));

    return (
      <Layout>
        <Layout
          border
          margin={{ y: 2 }}
          padding={2}
          background={Background.Base}
        >
          <Layout display={Display.Flex} alignItems={AlignItems.Center}>
            <Layout flexGrow={1}>
              <Layout margin={{ bottom: 1 }}>
                <CoreText type={TextType.H3}>AFK Disco Test</CoreText>
              </Layout>

              <Typeset>
                <p>
                  <strong>Overview:</strong> It should correctly maintain the
                  child list over a long period of time, even while the browser
                  is in the background.
                </p>

                <p>
                  <strong>How to Test:</strong> Turn on the simulation toggle,
                  then put your browser tab in the background for about 15
                  seconds. Come back and pause the simulation. You should see no
                  stray children on the left or right. Additionally, the CSS
                  hover FX for opacity should work on all children (indicating
                  they are not covered by anything).
                </p>
              </Typeset>
            </Layout>

            <Layout margin={{ left: 1 }}>
              <FormGroup label="Run Simulation">
                <Toggle
                  checked={this.state.running}
                  onChange={this.toggleRunning}
                />
              </FormGroup>

              <Layout margin={{ top: 1 }}>
                <Button
                  onClick={this.changeChild}
                  variant={ButtonType.Secondary}
                >
                  Swap just one item
                </Button>
              </Layout>
            </Layout>
          </Layout>

          <Grid>
            <Column cols={4}>
              <Layout background={Background.Alt2} fullWidth fullHeight />
            </Column>
            <Column cols={4}>
              <TransitionGroup
                duration={TransitionDuration.Long}
                transitionType={[
                  TransitionType.TranslateLeft,
                  TransitionType.TranslateRight,
                ]}
              >
                {elements}
              </TransitionGroup>
            </Column>
            <Column cols={4}>
              <Layout background={Background.Alt2} fullWidth fullHeight />
            </Column>
          </Grid>
        </Layout>
      </Layout>
    );
  }
}
