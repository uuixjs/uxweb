import { StoryContext, StoryGetter } from "@storybook/addons";
import { useChannel } from "@storybook/client-api";
import {
  memo,
  Profiler,
  ProfilerOnRenderCallback,
  ReactNode,
  useCallback,
  useState,
} from "react";
import { Events } from "../constants";

export function StoryDecorator(getStory: StoryGetter, context: StoryContext) {
  const [updateCount, setUpdateCount] = useState(0);
  const [mountCount, setMountCount] = useState(0);

  const emit = useChannel({
    [Events.SetMountCount]: (n) => setMountCount(n),
    [Events.SetUpdateCount]: (n) => setUpdateCount(n),
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onRender = useCallback((...d) => emit(Events.OnRenderUpdate, d), []);

  return (
    <MemoizedProfiler
      onRender={onRender}
      children={getStory(context)}
      // Changing `update` prop causes an update
      update={updateCount}
      // Changing `key` causes a full re-mount
      key={mountCount}
    />
  );
}

// eslint-disable-next-line react/display-name
const MemoizedProfiler = memo(
  ({
    children,
    onRender,
  }: {
    children: ReactNode;
    onRender: ProfilerOnRenderCallback;
    update: number;
  }) => (
    <Profiler id={"my-render-profiler-tool"} onRender={onRender}>
      {children}
    </Profiler>
  ),
);
