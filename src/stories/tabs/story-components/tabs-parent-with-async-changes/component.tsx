import * as React from "react";

import {
  AlignItems,
  Button,
  CoreText,
  Display,
  FormGroup,
  Input,
  InputType,
  JustifyContent,
  Layout,
  TabItemPublicProps,
} from "v2";
import { Component, FormEvent } from "react";

import { TabsParentExample } from "../tabs-parent-example";
import { newUUIDv4 } from "lib";

interface State {
  asyncNumTabsInput: number;
  asyncTabs: TabItemPublicProps[];
}

export class TabsParentWithAsyncChanges extends Component<{}, State> {
  public state = {
    asyncNumTabsInput: 0,
    asyncTabs: [],
  };

  public render() {
    return (
      <Layout padding={{ y: 3 }}>
        <CoreText>
          In this example, the list of tabs can be provided async. The component
          can initialize with zero or more tabs, and then the list can be
          updated later on and it will re-measure itself when the tabs change.
          To test, change the number of tabs and see that it properly
          re-measures on every update.
        </CoreText>
        <Layout>
          <TabsParentExample
            activeTabIndex={0}
            tabs={this.state.asyncTabs}
            justifyContent={JustifyContent.Start}
          />
          <form onSubmit={this.onSubmit}>
            <Layout
              display={Display.InlineFlex}
              alignItems={AlignItems.Center}
              margin={{ y: 2 }}
            >
              <FormGroup label="Number of Tabs">
                <Input
                  type={InputType.Number}
                  min={0}
                  max={99}
                  placeholder="Number of Tabs"
                  value={this.state.asyncNumTabsInput.toString()}
                  onChange={this.onChangeAsyncNumTabs}
                />
              </FormGroup>
              <Layout margin={{ left: 2 }}>
                <Button onClick={this.onUpdateAsyncTabsShown}>Update</Button>
              </Layout>
            </Layout>
          </form>
        </Layout>
      </Layout>
    );
  }

  private onChangeAsyncNumTabs = (e: FormEvent<HTMLInputElement>) => {
    this.setState({
      asyncNumTabsInput: e.currentTarget.valueAsNumber,
    });
  };

  private onUpdateAsyncTabsShown = () => {
    this.setState((prevState) => ({
      asyncTabs: Array.from(Array(prevState.asyncNumTabsInput), () => ({
        label: newUUIDv4().substring(0, Math.floor(Math.random() * 35 + 1)),
      })),
    }));
  };

  private onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
}
