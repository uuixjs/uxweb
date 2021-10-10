import * as React from "react";

import { CoreLink, CoreText, Layout, TextType } from "v2";

import { PureComponent } from "react";
import { UpdateSettings } from "../transition-group-example";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface Props {
  setItemCount: (_: number) => void;
  setValues: (_?: Partial<UpdateSettings>) => void;
  updateView: () => void;
  addItem: (k: string, i?: number) => void;
  removeItem: (k: string) => void;
}

export class TransitionGroupChecklist extends PureComponent<Props> {
  public render() {
    const {
      setItemCount,
      setValues,
      updateView,
      addItem,
      removeItem,
    } = this.props;
    return (
      <div>
        <CoreText type={TextType.H3}>Manual Test Checklist</CoreText>

        {renderItem(
          "It can add many items smoothly",
          "Watch that all child items move smoothly and do not jump as more items are added. ",
          async () => {
            await setValues();
            updateView();
            await sleep(100);
            updateView();
            await sleep(100);
            updateView();
            await sleep(100);
            updateView();
            await sleep(100);
            updateView();
          },
        )}

        {renderItem(
          "It can remove many items smoothly",
          "Watch that the outgoing items transform smoothly and do not jump!",
          async () => {
            await setItemCount(10);
            await sleep(500);

            await setValues({ numToAdd: 0, numToRemove: 1 });
            updateView();
            await sleep(100);
            updateView();
            await sleep(100);
            updateView();
            await sleep(100);
            updateView();
            await sleep(100);
            updateView();
          },
        )}

        {renderItem(
          "It can remove items out of sequence",
          "No items should appear to jump!",
          async () => {
            await setItemCount(10);
            await sleep(500);

            await setValues({ numToAdd: 0, numToRemove: 1, removeAtIndex: 2 });
            updateView();
            await sleep(200);

            await setValues({ numToAdd: 0, numToRemove: 1, removeAtIndex: 0 });
            updateView();
          },
        )}

        {renderItem("It can change swap items", "", async () => {
          await setValues({ numToMove: 1, numToAdd: 0 });
          updateView();
          await sleep(100);
        })}

        {renderItem("It can move items more than one index", "", async () => {
          await setValues({ numToMove: 1, moveToIndex: 2, numToAdd: 0 });
          updateView();
          await sleep(100);
        })}

        {renderItem(
          "It can add + remove at different indexes",
          "",
          async () => {
            await setValues({
              numToAdd: 1,
              addAtIndex: 0,
              numToRemove: 1,
              removeAtIndex: 2,
            });
            updateView();
          },
        )}

        {renderItem(
          "It can remove + add at different indexes",
          "",
          async () => {
            await setValues({
              numToAdd: 1,
              addAtIndex: 2,
              numToRemove: 1,
              removeAtIndex: 0,
            });
            updateView();
          },
        )}

        {renderItem(
          "It can swap out an item at a specific index",
          "The outgoing transition should occur in the exact same space as the incoming transition",
          async () => {
            await setValues({
              numToAdd: 1,
              addAtIndex: 1,
              numToRemove: 1,
              removeAtIndex: 1,
            });
            updateView();
          },
        )}

        {renderItem(
          "It can toggle an item with the same key in and out repeatedly",
          "You should see the singular item moving in and out mid-transition",
          async () => {
            await setItemCount(3);
            addItem("TEST", 1);
            await sleep(1000);

            removeItem("TEST");
            await sleep(500);
            addItem("TEST", 1);
            await sleep(500);

            removeItem("TEST");
            await sleep(300);
            addItem("TEST", 1);
            await sleep(300);

            removeItem("TEST");
            await sleep(200);
            addItem("TEST", 1);
            await sleep(200);

            removeItem("TEST");
            await sleep(150);
            addItem("TEST", 1);
            await sleep(150);

            removeItem("TEST");
            await sleep(125);
            addItem("TEST", 1);
            await sleep(125);

            removeItem("TEST");
            await sleep(100);
            addItem("TEST", 1);
            await sleep(100);

            removeItem("TEST");
            await sleep(75);
            addItem("TEST", 1);
            await sleep(75);

            removeItem("TEST");
            await sleep(50);
            addItem("TEST", 1);
            await sleep(50);

            removeItem("TEST");
          },
        )}
      </div>
    );
  }
}

// export const TransitionGroupChecklist: FC<Props> = ({ setItemCount, setValues, updateView, addItem, removeItem }: Props) => (

// );

function renderItem(title: string, description: string, actions: () => void) {
  return (
    <Layout borderTop margin={{ y: 2 }} padding={0.5}>
      <CoreLink onClick={actions}>{title}</CoreLink>
      <CoreText>{description}</CoreText>
    </Layout>
  );
}
