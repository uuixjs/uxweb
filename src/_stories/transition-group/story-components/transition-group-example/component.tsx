import * as React from "react";

import {
  AlignItems,
  Background,
  Button,
  ButtonType,
  Column,
  Display,
  FlexDirection,
  FlexWrap,
  FormGroup,
  Grid,
  Input,
  InputType,
  JustifyContent,
  Layout,
  Range,
  Select,
  Tower,
  TowerChildWidth,
  TowerGutter,
  TransitionDuration,
  TransitionGroup,
  TransitionType,
  TransitionTypeOption,
} from "v2";
import { Component, FormEvent, MouseEvent } from "react";

import { TransitionGroupChecklist } from "../transition-group-checklist";
import { newUUIDv4 } from "@uuixjs/uuixweb-lib";

enum DemoLayoutType {
  Ordinary = "ordinary",
  Flexbox = "flexbox",
  // eslint-disable-next-line @typescript-eslint/no-shadow
  Tower = "tower",
}

interface Item {
  key: string;
}

export interface UpdateSettings {
  numToAdd: number;
  addAtIndex: number;
  numToRemove: number;
  removeAtIndex: number;
  numToMove: number;
  moveFromIndex: number;
  moveToIndex: number;
}

export interface LayoutSettings {
  layout: DemoLayoutType;
  direction: FlexDirection;
  duration: TransitionDuration | number;
  transitionType: TransitionTypeOption;
  boxSize: number;
}

interface Props {}

interface State extends UpdateSettings, LayoutSettings {
  showItems: boolean;
  items: Item[];
}

const INITIAL_VALUES: UpdateSettings = {
  numToAdd: 1,
  addAtIndex: 1,
  numToRemove: 0,
  removeAtIndex: 1,
  numToMove: 0,
  moveFromIndex: 0,
  moveToIndex: 1,
};

export class TransitionGroupExample extends Component<Props, State> {
  public state: State = {
    ...INITIAL_VALUES,
    layout: DemoLayoutType.Ordinary,
    direction: FlexDirection.Column,
    duration: TransitionDuration.Long,
    transitionType: [TransitionType.ScaleOver, TransitionType.ScaleOver],
    boxSize: 240,
    showItems: true,
    items: [],
  };

  public componentDidMount() {
    this.init();
  }

  public render() {
    return (
      <Layout margin={{ top: 2 }} border background={Background.Base}>
        <Grid>
          <Column cols={{ default: 12, md: 6, lg: 5, xxl: 4 }}>
            {this.renderListControls()}
          </Column>

          <Column cols={{ default: 12, md: 6, lg: 7, xxl: 8 }}>
            {this.renderLayoutControls()}
          </Column>

          <Column cols={{ default: 12, lg: 12, xxl: 8 }}>
            {this.state.showItems && (
              <div
                style={{
                  display: "block",
                  border: "2px dashed lightgray",
                  margin: "2rem",
                }}
              >
                {this.renderExample()}
              </div>
            )}
          </Column>

          <Column cols={{ default: 12, lg: 12, xxl: 4 }}>
            <Layout padding={2}>
              <TransitionGroupChecklist
                setValues={this.setValues}
                updateView={this.changeItems}
                setItemCount={this.resetItemsWithoutTransition}
                addItem={this.addItem}
                removeItem={this.removeItem}
              />
            </Layout>
          </Column>
        </Grid>
      </Layout>
    );
  }

  private renderExample() {
    if (this.state.layout === DemoLayoutType.Ordinary) {
      return (
        <TransitionGroup
          duration={this.state.duration}
          transitionType={this.state.transitionType}
        >
          {this.renderItems()}
        </TransitionGroup>
      );
    }
    if (this.state.layout === DemoLayoutType.Flexbox) {
      return (
        <TransitionGroup
          duration={this.state.duration}
          transitionType={this.state.transitionType}
          component={
            <Layout
              display={Display.Flex}
              flexDirection={this.state.direction}
              flexWrap={FlexWrap.Wrap}
              padding={1}
            />
          }
        >
          {this.renderItems()}
        </TransitionGroup>
      );
    }

    if (this.state.layout === DemoLayoutType.Tower) {
      return (
        <TransitionGroup
          duration={this.state.duration}
          transitionType={this.state.transitionType}
          component={
            <Tower
              childWidth={TowerChildWidth.Medium}
              gutterSize={TowerGutter.ExtraSmall}
              placeholderItems={20}
            />
          }
        >
          {this.renderItems()}
        </TransitionGroup>
      );
    }
  }

  private renderItems() {
    return this.state.items.map((item, index) => (
      <div
        key={item.key}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: `100%`,
          height: this.state.boxSize ? `${this.state.boxSize / 2}px` : "100px",
          background: "green",
          color: "rgba(255,255,255,0.9)",
          fontSize: "1.5rem",
          border: "2px solid darkgreen",
          margin: "",
        }}
      >
        <Layout
          display={Display.Flex}
          flexDirection={FlexDirection.Column}
          alignItems={AlignItems.Center}
          margin={{ bottom: 1 }}
        >
          <div>index: {index}</div>
          <Layout display={Display.Flex} alignItems={AlignItems.Center}>
            <div>key: {item.key.substring(item.key.length - 6)}</div>
            <div
              style={{
                width: "20px",
                height: "20px",
                background: `#${item.key.substring(item.key.length - 6)}`,
                margin: "0 0.5rem",
              }}
            />
          </Layout>
        </Layout>
        <Button
          variant={ButtonType.Secondary}
          onClick={() => this.removeItem(item.key)}
          overlay
        >
          Remove
        </Button>
      </div>
    ));
  }

  private renderListControls = () => {
    return (
      <form onSubmit={this.onSubmitForm}>
        <Layout
          display={Display.InlineFlex}
          flexDirection={FlexDirection.Column}
          alignItems={AlignItems.End}
          padding={2}
        >
          <Layout margin={{ bottom: 1 }}>
            Move
            <div
              style={{
                display: "inline-block",
                width: "50px",
                margin: "0 0.5rem",
              }}
            >
              <Input
                type={InputType.Number}
                value={this.state.numToMove.toString()}
                onChange={this.setNumToMove}
                min={0}
                max={10}
              />
            </div>
            items from
            <div
              style={{
                display: "inline-block",
                width: "50px",
                margin: "0 0.5rem",
              }}
            >
              <Input
                type={InputType.Number}
                value={this.state.moveFromIndex.toString()}
                onChange={this.setMoveFromIndex}
                min={0}
              />
            </div>
            to
            <div
              style={{
                display: "inline-block",
                width: "50px",
                margin: "0 0 0 0.5rem",
              }}
            >
              <Input
                type={InputType.Number}
                value={this.state.moveToIndex.toString()}
                onChange={this.setMoveToIndex}
                min={0}
              />
            </div>
          </Layout>

          <Layout margin={{ top: 0.5 }}>
            Add
            <div
              style={{
                display: "inline-block",
                width: "50px",
                margin: "0 0.5rem",
              }}
            >
              <Input
                type={InputType.Number}
                value={this.state.numToAdd.toString()}
                onChange={this.setNumToAdd}
                min={0}
                max={10}
              />
            </div>
            items at index
            <div
              style={{
                display: "inline-block",
                width: "50px",
                margin: "0 0 0 0.5rem",
              }}
            >
              <Input
                type={InputType.Number}
                value={this.state.addAtIndex.toString()}
                onChange={this.setAddAtIndex}
                min={0}
              />
            </div>
          </Layout>

          <Layout margin={{ top: 0.5 }}>
            Remove
            <div
              style={{
                display: "inline-block",
                width: "50px",
                margin: "0 0.5rem",
              }}
            >
              <Input
                type={InputType.Number}
                value={this.state.numToRemove.toString()}
                onChange={this.setNumToRemove}
                min={0}
                max={10}
              />
            </div>
            items at index
            <div
              style={{
                display: "inline-block",
                width: "50px",
                margin: "0 0 0 0.5rem",
              }}
            >
              <Input
                type={InputType.Number}
                value={this.state.removeAtIndex.toString()}
                onChange={this.setRemoveAtIndex}
                min={0}
              />
            </div>
          </Layout>

          <Layout display={Display.Flex} margin={{ top: 1 }}>
            <Layout margin={{ right: 1 }}>
              <Button onClick={this.onSubmitForm}>Update</Button>
            </Layout>
            <Button onClick={this.init} variant={ButtonType.Secondary}>
              Reset
            </Button>
          </Layout>
        </Layout>
      </form>
    );
  };

  private generateItem = (): Item => {
    return {
      key: newUUIDv4(),
    };
  };

  private init = (e?: MouseEvent<HTMLElement>) => {
    if (e) {
      e.preventDefault();
    }

    this.setState({
      ...INITIAL_VALUES,
      // Initial items have static keys and color values to ensure screenshot diff passes
      items: [{ key: "aa0000" }, { key: "bbbb00" }, { key: "0033cc" }],
    });
  };

  private resetItemsWithoutTransition = async (num: number) => {
    return new Promise<void>((resolve) => {
      this.setState(
        {
          showItems: false,
        },
        () => {
          // wait for full re-render
          requestAnimationFrame(() => {
            this.setState(
              {
                showItems: true,
                items: Array.from(Array(num), this.generateItem),
              },
              resolve,
            );
          });
        },
      );
    });
  };

  private onSubmitForm = (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLElement>,
  ) => {
    e.preventDefault();
    this.changeItems();
  };

  private changeItems = () => {
    this.setState((prevState) => {
      const {
        numToAdd,
        addAtIndex,
        numToRemove,
        removeAtIndex,
        numToMove,
        moveFromIndex,
        moveToIndex,
      } = prevState;

      const items = prevState.items.concat();
      const newItems = Array.from(Array(numToAdd), this.generateItem);

      // Remove some
      items.splice(removeAtIndex, numToRemove);

      // Add some
      items.splice(addAtIndex, 0, ...newItems);

      // Move some
      const moving = items.splice(moveFromIndex, numToMove);
      items.splice(moveToIndex, 0, ...moving);

      return {
        items,
      };
    });
  };

  private addItem = (key: string, index: number = 0) => {
    this.setState((prevState) => {
      const items = prevState.items.concat();
      items.splice(index, 0, { key });
      return {
        items,
      };
    });
  };

  private removeItem = (key: string) => {
    this.setState((prevState) => ({
      items: prevState.items.filter((item) => item.key !== key),
    }));
  };

  private setNumToAdd = (e: FormEvent<HTMLInputElement>) => {
    this.setState({
      numToAdd: parseInt(e.currentTarget.value, undefined),
    });
  };

  private setAddAtIndex = (e: FormEvent<HTMLInputElement>) => {
    this.setState({
      addAtIndex: parseInt(e.currentTarget.value, undefined),
    });
  };

  private setNumToRemove = (e: FormEvent<HTMLInputElement>) => {
    this.setState({
      numToRemove: parseInt(e.currentTarget.value, undefined),
    });
  };

  private setRemoveAtIndex = (e: FormEvent<HTMLInputElement>) => {
    this.setState({
      removeAtIndex: parseInt(e.currentTarget.value, undefined),
    });
  };

  private setNumToMove = (e: FormEvent<HTMLInputElement>) => {
    this.setState({
      numToMove: parseInt(e.currentTarget.value, undefined),
    });
  };

  private setMoveFromIndex = (e: FormEvent<HTMLInputElement>) => {
    this.setState({
      moveFromIndex: parseInt(e.currentTarget.value, undefined),
    });
  };

  private setMoveToIndex = (e: FormEvent<HTMLInputElement>) => {
    this.setState({
      moveToIndex: parseInt(e.currentTarget.value, undefined),
    });
  };

  private setValues = async (settings?: Partial<UpdateSettings>) => {
    return new Promise<void>((resolve) =>
      this.setState(
        {
          ...INITIAL_VALUES,
          ...settings,
        },
        resolve,
      ),
    );
  };

  private renderLayoutControls() {
    return (
      <Layout
        padding={2}
        fullWidth
        display={Display.Flex}
        justifyContent={JustifyContent.Start}
        flexWrap={FlexWrap.Wrap}
      >
        <Layout flexGrow={0} margin={{ right: 2 }}>
          <FormGroup label="Layout Demo">
            <Select value={this.state.layout} onChange={this.updateLayout}>
              {Object.keys(DemoLayoutType).map((key: string) => (
                <option
                  value={DemoLayoutType[key as keyof typeof DemoLayoutType]}
                  key={DemoLayoutType[key as keyof typeof DemoLayoutType]}
                >
                  {key}
                </option>
              ))}
            </Select>
          </FormGroup>
        </Layout>

        <Layout flexGrow={0} margin={{ right: 2 }}>
          <FormGroup label="FlexDirection">
            <Select
              value={this.state.direction}
              onChange={this.updateDirection}
              disabled
            >
              <option value={FlexDirection.Row}>Row</option>
              <option value={FlexDirection.Column}>Column</option>
            </Select>
          </FormGroup>
        </Layout>

        <Layout flexGrow={0} margin={{ right: 2 }}>
          <FormGroup label="TransitionDuration">
            <Select
              value={String(this.state.duration)}
              onChange={this.updateDuration}
            >
              {Object.keys(TransitionDuration).map((key: string) => (
                <option
                  value={
                    TransitionDuration[key as keyof typeof TransitionDuration]
                  }
                  key={
                    TransitionDuration[key as keyof typeof TransitionDuration]
                  }
                >
                  {key}
                </option>
              ))}
              <option value="1000" key="1000ms">
                1,000ms
              </option>
              <option value="3000" key="3000ms">
                3,000ms
              </option>
              <option value="5000" key="5000ms">
                5,000ms
              </option>
              <option value="10000" key="10000ms">
                10,000ms
              </option>
              <option value="0" key="0ms">
                0ms
              </option>
            </Select>
          </FormGroup>
        </Layout>

        <Layout flexGrow={0} margin={{ right: 2 }}>
          <FormGroup label="TransitionType [Enter]">
            <Select
              value={this.state.transitionType[0]}
              onChange={this.updateTransitionTypeEnter}
            >
              {Object.keys(TransitionType).map((key: string) => (
                <option
                  value={TransitionType[key as keyof typeof TransitionType]}
                  key={TransitionType[key as keyof typeof TransitionType]}
                >
                  {key}
                </option>
              ))}
            </Select>
          </FormGroup>
        </Layout>

        <Layout flexGrow={0} margin={{ right: 2 }}>
          <FormGroup label="TransitionType [Exit]">
            <Select
              value={this.state.transitionType[1]}
              onChange={this.updateTransitionTypeExit}
            >
              {Object.keys(TransitionType).map((key: string) => (
                <option
                  value={TransitionType[key as keyof typeof TransitionType]}
                  key={TransitionType[key as keyof typeof TransitionType]}
                >
                  {key}
                </option>
              ))}
            </Select>
          </FormGroup>
        </Layout>

        <Layout flexGrow={0} margin={{ right: 2 }}>
          <FormGroup label="Box Size">
            <Range
              min={100}
              max={600}
              value={this.state.boxSize.toString()}
              onChange={this.updateBoxSize}
              disabled
            />
          </FormGroup>
        </Layout>
      </Layout>
    );
  }

  private updateLayout = (e: FormEvent<HTMLSelectElement>) => {
    this.setState({
      layout: e.currentTarget.value as DemoLayoutType,
    });
  };

  private updateDirection = (e: FormEvent<HTMLSelectElement>) => {
    this.setState({
      direction: e.currentTarget.value as FlexDirection,
    });
  };

  private updateDuration = (e: FormEvent<HTMLSelectElement>) => {
    if (e.currentTarget.value.match(/^[0-9]+$/)) {
      this.setState({
        duration: Number(e.currentTarget.value),
      });
    } else {
      this.setState({
        duration: e.currentTarget.value as TransitionDuration,
      });
    }
  };

  private updateTransitionTypeEnter = (e: FormEvent<HTMLSelectElement>) => {
    this.setState({
      transitionType: [
        e.currentTarget.value as TransitionType,
        this.state.transitionType[1] as TransitionType,
      ],
    });
  };

  private updateTransitionTypeExit = (e: FormEvent<HTMLSelectElement>) => {
    this.setState({
      transitionType: [
        this.state.transitionType[0] as TransitionType,
        e.currentTarget.value as TransitionType,
      ],
    });
  };

  private updateBoxSize = (e: FormEvent<HTMLInputElement>) => {
    this.setState({
      boxSize: Number.parseInt(e.currentTarget.value, undefined),
    });
  };
}
